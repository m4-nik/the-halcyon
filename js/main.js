// ---------------------------------------------------------------------------
// APP ENTRY POINT
// Wires the data files and engine modules to the DOM. Owns the game's
// in-memory state (current room, clues found, plan progress). Nothing is
// persisted between sessions on purpose — no accounts, no save/load.
// ---------------------------------------------------------------------------

import { ROOMS } from "../data/rooms.js";
import { SUSPECTS } from "../data/suspects.js";
import {
  CASE_FILE_CODE,
  REQUIRED_HINT_RATIO,
  MIN_HINT_RATIO_TO_ACCUSE,
} from "../data/config.js";
import { renderRoom } from "./hotspotEngine.js";
import {
  addClueToLog,
  countValidHints,
  countTotalRealHotspots,
  renderCaseLog,
} from "./caseLog.js";
import { renderSuspects, renderSuspectCard } from "./suspects.js";
import { renderRoomAccess } from "./roomAccess.js";
import { getAISuggestion, setAIMisleadSuspect } from "./aiAssist.js";
import { checkAccusation, renderAccusationForm, renderResult } from "./accusation.js";
import { calculatePlanPercent, renderPlanBar } from "./antagonistPlan.js";
import {
  startAmbient,
  retryAmbientIfStalled,
  playGameOverStinger,
  stopAmbient,
  setMuted,
  isMuted,
  setVolume,
  getVolume,
} from "./audioManager.js";

const state = {
  currentRoomId: ROOMS[0].id,
  foundClues: [],
  foundHotspotIds: new Set(),
  planPercent: 0,
  planStartTime: null,
  gameOver: false,
};

let transitioning = false;
let planTimerId = null;

// Y in "X / Y needed" — derived from the room data itself, not hardcoded.
const totalRealHotspots = countTotalRealHotspots(ROOMS);
const hintTarget = Math.max(1, Math.ceil(totalRealHotspots * REQUIRED_HINT_RATIO));

// Minimum valid clues required before the player is allowed to accuse
// anyone — also derived from the data, never a fixed count.
const minHintsToAccuse = Math.max(1, Math.ceil(hintTarget * MIN_HINT_RATIO_TO_ACCUSE));

// --- Screen switching -------------------------------------------------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// --- Landing -> Case File Gate -----------------------------------------
document.getElementById("btn-begin").addEventListener("click", () => {
  if (transitioning) return;
  playLockTransition(() => {
    showScreen("screen-gate");
    document.getElementById("gate-input").focus();
  });
});

// Seals the current screen behind a closing iris (like a hatch locking
// shut), swaps screens while sealed, then opens back up on the next one.
function playLockTransition(onSealed) {
  transitioning = true;
  const overlay = document.getElementById("lock-transition");

  overlay.classList.remove("active");
  void overlay.offsetWidth; // force reflow so the animation restarts cleanly
  overlay.classList.add("active");

  window.setTimeout(onSealed, 1050); // fires while the iris is fully sealed shut
  window.setTimeout(() => {
    overlay.classList.remove("active");
    transitioning = false;
  }, 2350);
}

document.getElementById("gate-submit").addEventListener("click", attemptUnlock);
document.getElementById("gate-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") attemptUnlock();
});

function attemptUnlock() {
  if (transitioning) return;

  const input = document.getElementById("gate-input");
  const error = document.getElementById("gate-error");

  if (input.value.trim().toUpperCase() === CASE_FILE_CODE.toUpperCase()) {
    error.textContent = "";
    suspectIntroIndex = 0;
    renderSuspectIntro();
    showScreen("screen-suspect-intro");
  } else {
    error.textContent =
      "Access denied. That code doesn't match any log on file. Try again.";
    input.value = "";
    input.focus();
  }
}

// Carries the player from the case-file gate into the investigation with a
// rising dark tide (see .dive-wave in style.css). `onCovered` fires once
// the screen is fully covered, which is where the underlying screen swaps.
function playWaterTransition(onCovered) {
  transitioning = true;
  const overlay = document.getElementById("water-transition");

  overlay.classList.remove("active");
  void overlay.offsetWidth; // force reflow so the animation restarts cleanly
  overlay.classList.add("active");

  window.setTimeout(onCovered, 1000);
  window.setTimeout(() => {
    overlay.classList.remove("active");
    transitioning = false;
  }, 2500);
}

// --- Know the Suspects (briefing carousel) --------------------------------
let suspectIntroIndex = 0;

function renderSuspectIntro() {
  const card = document.getElementById("suspect-card-large");
  renderSuspectCard(card, SUSPECTS[suspectIntroIndex]);

  // Restart the entrance animation on every swap, not just the first render.
  card.classList.remove("card-enter");
  void card.offsetWidth;
  card.classList.add("card-enter");

  document.getElementById("suspect-counter").textContent =
    `${suspectIntroIndex + 1} / ${SUSPECTS.length}`;

  // Begin Investigation only appears once the player has arrived at the
  // last suspect — it isn't an escape hatch from the first one.
  const isLastSuspect = suspectIntroIndex === SUSPECTS.length - 1;
  document.getElementById("btn-begin-investigation").hidden = !isLastSuspect;
}

document.getElementById("suspect-prev").addEventListener("click", () => {
  suspectIntroIndex = (suspectIntroIndex - 1 + SUSPECTS.length) % SUSPECTS.length;
  renderSuspectIntro();
});
document.getElementById("suspect-next").addEventListener("click", () => {
  suspectIntroIndex = (suspectIntroIndex + 1) % SUSPECTS.length;
  renderSuspectIntro();
});

document.getElementById("btn-begin-investigation").addEventListener("click", () => {
  if (transitioning) return;
  playWaterTransition(startGame);
});

// --- Game start ---------------------------------------------------------
function startGame() {
  showScreen("screen-game");
  document.getElementById("hint-total").textContent = hintTarget;
  renderRoomNav();
  goToRoom(state.currentRoomId);
  updateHintCounter();
  renderPlanBar(document.getElementById("plan-bar-fill"), state.planPercent);
  startAmbient();
  setAIMisleadSuspect(SUSPECTS);

  state.planStartTime = Date.now();
  planTimerId = window.setInterval(tickPlanTimer, 1000);
}

// Ticks the Antagonist's Plan bar forward based on real elapsed time —
// not on anything the player does. Runs once a second in the background
// for the whole 15-minute countdown; the player never sees a clock, only
// the bar (and the room atmosphere) reacting to it.
function tickPlanTimer() {
  if (state.gameOver) return;

  state.planPercent = calculatePlanPercent(state.planStartTime);
  renderPlanBar(document.getElementById("plan-bar-fill"), state.planPercent);
  updateRoomUrgency(state.planPercent);

  if (state.planPercent >= 100) {
    triggerGameOver();
  }
}

// Updates just the currently-rendered room's atmosphere classes in place,
// rather than fully re-rendering it every second — a full re-render would
// restart the fog/dust animation and could interrupt whatever the player
// is doing.
function updateRoomUrgency(planPercent) {
  const stage = document.querySelector(".room-stage");
  if (!stage) return;
  stage.classList.toggle("urgency-critical", planPercent >= 75);
  stage.classList.toggle("urgency-elevated", planPercent >= 40 && planPercent < 75);
}

// --- Room navigation -----------------------------------------------------
function renderRoomNav() {
  const nav = document.getElementById("room-nav");
  nav.innerHTML = "";

  ROOMS.forEach((room) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = room.name;
    btn.className = "room-nav-btn";
    btn.dataset.roomId = room.id;
    btn.addEventListener("click", () => goToRoom(room.id));
    nav.appendChild(btn);
  });
}

function goToRoom(roomId) {
  state.currentRoomId = roomId;
  const room = ROOMS.find((r) => r.id === roomId);

  document.querySelectorAll(".room-nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.roomId === roomId);
  });

  renderRoom(room, document.getElementById("room-view"), {
    foundHotspotIds: state.foundHotspotIds,
    onHotspotClick: (r, hotspot) => handleHotspotClick(r, hotspot),
    planPercent: state.planPercent,
  });
}

// --- Hotspot click handling -----------------------------------------------
function handleHotspotClick(room, hotspot) {
  if (state.gameOver) return;

  retryAmbientIfStalled(); // this click is a real user gesture — good moment to retry a blocked autoplay

  showEvidenceModal(room, hotspot);

  const alreadyFound = state.foundHotspotIds.has(hotspot.id);
  if (alreadyFound) return; // reopening a checked hotspot doesn't re-count it

  state.foundHotspotIds.add(hotspot.id);
  state.foundClues = addClueToLog(state.foundClues, room, hotspot);
  updateHintCounter();

  goToRoom(state.currentRoomId); // re-render so this hotspot shows as checked
}

function updateHintCounter() {
  document.getElementById("hint-count").textContent = countValidHints(state.foundClues);
  updateAccuseButtonState();
}

// Keeps the Accuse button locked until the player has found enough real
// evidence — stops an accusation with no proof behind it.
function updateAccuseButtonState() {
  const btn = document.getElementById("btn-accuse");
  const validCount = countValidHints(state.foundClues);
  const unlocked = validCount >= minHintsToAccuse;

  btn.disabled = !unlocked;
  btn.textContent = unlocked ? "Accuse" : `Accuse (${validCount}/${minHintsToAccuse} proof)`;
  btn.title = unlocked
    ? ""
    : `You need at least ${minHintsToAccuse} pieces of real evidence before you can accuse anyone.`;
}

function triggerGameOver() {
  state.gameOver = true;
  window.clearInterval(planTimerId);
  closeAllPanels();
  stopAmbient();
  playGameOverStinger();
  showScreen("screen-game-over");
}

// --- Evidence modal ------------------------------------------------------
// One shared popup for every hotspot. Shows 3D/image media when the
// hotspot has it, then three things in order, each its own small reveal:
// 1. Portrait-first — who this points toward (or a neutral line when it
//    points at no one), leading the card before any reading happens.
// 2. The clue's short description, typed out rather than dumped at once.
// 3. Two fact chips — where it was found, and why it matters.
let typewriterIntervalId = null;

function showEvidenceModal(room, hotspot) {
  const mediaBlock = document.getElementById("evidence-media");
  const viewer = document.getElementById("evidence-model-viewer");
  const imageViewer = document.getElementById("evidence-image-viewer");

  if (hotspot.examineModel) {
    mediaBlock.hidden = false;
    viewer.setAttribute("src", hotspot.examineModel);
    viewer.style.display = "block";
    imageViewer.style.display = "none";
  } else if (hotspot.examineImage) {
    mediaBlock.hidden = false;
    imageViewer.src = hotspot.examineImage;
    imageViewer.style.display = "block";
    viewer.removeAttribute("src");
    viewer.style.display = "none";
  } else {
    mediaBlock.hidden = true;
    viewer.removeAttribute("src");
  }

  const suspect = hotspot.pointsToSuspectId
    ? SUSPECTS.find((s) => s.id === hotspot.pointsToSuspectId)
    : null;

  const portraitReveal = document.getElementById("evidence-portrait-reveal");
  portraitReveal.classList.remove("pop-in", "evidence-portrait-none");
  void portraitReveal.offsetWidth; // restart the pop animation on every open, not just the first
  if (suspect) {
    const portraitHtml = suspect.portrait
      ? `<img class="evidence-portrait-img" src="${suspect.portrait}" alt="${suspect.name}" />`
      : `<span class="evidence-portrait-img evidence-portrait-placeholder">${initials(suspect.name)}</span>`;
    portraitReveal.innerHTML = `${portraitHtml}<span class="evidence-portrait-name">${suspect.name}</span>`;
  } else {
    portraitReveal.classList.add("evidence-portrait-none");
    portraitReveal.innerHTML =
      '<span class="evidence-portrait-none-text">Not linked to anyone in particular</span>';
  }
  portraitReveal.classList.add("pop-in");

  typewriterText(document.getElementById("evidence-modal-text"), hotspot.clueText);

  const whyText = suspect
    ? hotspot.whyItMatters || ""
    : "Just set dressing — this one doesn't point anywhere in particular.";
  document.getElementById("evidence-fact-chips").innerHTML = `
    <div class="evidence-fact-chip">
      <span class="evidence-fact-chip-label">Found In</span>
      <span class="evidence-fact-chip-value">${room.name}</span>
    </div>
    <div class="evidence-fact-chip">
      <span class="evidence-fact-chip-label">${suspect ? "Why It Matters" : "Note"}</span>
      <span class="evidence-fact-chip-value">${whyText}</span>
    </div>
  `;

  document.getElementById("evidence-modal").classList.add("open");
}

// Reveals `text` into `el` a character at a time rather than all at once.
// Clears any typewriter already running (e.g. the player closed one clue
// and immediately opened another) so two intervals never race on the
// same element.
function typewriterText(el, text) {
  window.clearInterval(typewriterIntervalId);
  el.textContent = "";
  el.classList.add("typing");

  let i = 0;
  typewriterIntervalId = window.setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      window.clearInterval(typewriterIntervalId);
      el.classList.remove("typing");
    }
  }, 16);
}

function closeEvidenceModal() {
  document.getElementById("evidence-modal").classList.remove("open");
  window.clearInterval(typewriterIntervalId);
}
document.getElementById("evidence-modal-close").addEventListener("click", closeEvidenceModal);
document.getElementById("evidence-modal-continue").addEventListener("click", closeEvidenceModal);

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

// --- Reference panels -------------------------------------------------
function closeAllPanels() {
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("open"));
}

document.querySelectorAll(".panel-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).classList.remove("open");
  });
});

// Clicking the dimmed backdrop closes a panel too, same as the × button —
// only when the click lands on the backdrop itself, not the sheet inside it.
document.querySelectorAll(".panel").forEach((panel) => {
  panel.addEventListener("click", (e) => {
    if (e.target === panel) panel.classList.remove("open");
  });
});

document.getElementById("btn-case-log").addEventListener("click", () => {
  renderCaseLog(document.getElementById("case-log-list"), state.foundClues);
  document.getElementById("case-log-panel").classList.add("open");
});

document.getElementById("btn-suspects").addEventListener("click", () => {
  renderSuspects(document.getElementById("suspects-list"), SUSPECTS);
  document.getElementById("suspects-panel").classList.add("open");
});

document.getElementById("btn-room-access").addEventListener("click", () => {
  renderRoomAccess(document.getElementById("room-access-list"), ROOMS, SUSPECTS);
  document.getElementById("room-access-panel").classList.add("open");
});

document.getElementById("btn-ai-assist").addEventListener("click", () => {
  const suggestion = getAISuggestion(state.foundClues);
  const content = document.getElementById("ai-assist-content");

  if (!suggestion.suspectId) {
    content.innerHTML = `<p class="ai-empty">${suggestion.summary}</p>`;
  } else {
    const suspect = SUSPECTS.find((s) => s.id === suggestion.suspectId);
    const confidenceLabel = { faint: "Faint lean", moderate: "Moderate lean", strong: "Strong lean" }[
      suggestion.confidence
    ];
    const portraitHtml = suspect.portrait
      ? `<img class="ai-suggestion-portrait" src="${suspect.portrait}" alt="${suspect.name}" />`
      : `<div class="ai-suggestion-portrait ai-suggestion-portrait-placeholder">${suspect.name
          .split(" ")
          .map((w) => w[0])
          .join("")}</div>`;
    const clueCardsHtml = suggestion.supportingClues
      .map(
        (c) => `
        <div class="ai-clue-card">
          <span class="ai-clue-room">${c.roomName}</span>
          <p>"${c.clueText}"</p>
        </div>`
      )
      .join("");
    content.innerHTML = `
      <div class="ai-suggestion-header">
        ${portraitHtml}
        <p class="ai-suggestion-name">${confidenceLabel} toward <strong>${suspect.name}</strong></p>
      </div>
      <p class="ai-summary">${suggestion.summary}</p>
      <div class="ai-clue-cards">${clueCardsHtml}</div>
      <p class="ai-disclaimer">This is a rule-based lean built from the clues you've logged so far — never proof, and never a verdict. The final call is yours.</p>
    `;
  }

  document.getElementById("ai-assist-panel").classList.add("open");
});

document.getElementById("btn-accuse").addEventListener("click", () => {
  if (state.gameOver) return;
  if (countValidHints(state.foundClues) < minHintsToAccuse) return; // belt and suspenders — button is disabled anyway
  renderAccusationForm(
    document.getElementById("accusation-content"),
    SUSPECTS,
    handleAccusationSubmit
  );
  document.getElementById("accusation-panel").classList.add("open");
});

function handleAccusationSubmit(suspectId, reasoning) {
  document.getElementById("accusation-panel").classList.remove("open");
  state.gameOver = true;
  window.clearInterval(planTimerId);
  stopAmbient();

  const result = checkAccusation(SUSPECTS, suspectId);
  const supportingRealClues = state.foundClues.filter(
    (c) => c.isReal && c.pointsToSuspectId === result.antagonist.id
  );

  renderResult(document.getElementById("result-content"), result, reasoning, supportingRealClues);
  showScreen("screen-result");
}

// --- Restart -------------------------------------------------------------
function restart() {
  window.clearInterval(planTimerId);
  state.currentRoomId = ROOMS[0].id;
  state.foundClues = [];
  state.foundHotspotIds = new Set();
  state.planPercent = 0;
  state.planStartTime = null;
  state.gameOver = false;
  stopAmbient();
  document.getElementById("gate-input").value = "";
  document.getElementById("gate-error").textContent = "";
  showScreen("screen-landing");
}
document.getElementById("btn-restart-1").addEventListener("click", restart);
document.getElementById("btn-restart-2").addEventListener("click", restart);

// --- Audio toggle (visible on every screen, defaults to unmuted) ---------
const audioToggleBtn = document.getElementById("audio-toggle");
const volumeSlider = document.getElementById("audio-volume-slider");

function setMutedUI(nextMuted) {
  setMuted(nextMuted);
  audioToggleBtn.classList.toggle("muted", nextMuted);
  audioToggleBtn.setAttribute("aria-pressed", String(nextMuted));
  audioToggleBtn.setAttribute("aria-label", nextMuted ? "Unmute audio" : "Mute audio");
}

function paintVolumeSlider(percent) {
  volumeSlider.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${percent}%, var(--color-border) ${percent}%, var(--color-border) 100%)`;
}

// Slider starts at getVolume()'s default rather than a hardcoded value.
volumeSlider.value = String(Math.round(getVolume() * 100));
paintVolumeSlider(Number(volumeSlider.value));

audioToggleBtn.addEventListener("click", () => {
  setMutedUI(!isMuted());
  retryAmbientIfStalled(); // clicking the toggle is as real a gesture as any — worth a retry too
});

volumeSlider.addEventListener("input", () => {
  const percent = Number(volumeSlider.value);
  setVolume(percent / 100);
  paintVolumeSlider(percent);
  // Dragging the slider is a clear signal the player wants sound —
  // unmute automatically rather than leaving them dragging a silent bar.
  if (isMuted()) setMutedUI(false);
  retryAmbientIfStalled();
});

// --- Ambient background particles (landing + gate screens) ---------------
// Quiet drifting dust/embers behind the compass watermark — reinforces a
// tense, serious mood rather than being decoration for its own sake.
function initAtmosphereParticles() {
  document.querySelectorAll(".landing-atmosphere").forEach((container) => {
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = (Math.random() * 2 + 1).toFixed(1);
      const left = (Math.random() * 100).toFixed(1);
      const duration = (Math.random() * 16 + 14).toFixed(1);
      const delay = (Math.random() * -30).toFixed(1);
      const driftX = (Math.random() * 40 - 20).toFixed(0);

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.setProperty("--drift-x", `${driftX}px`);
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      container.appendChild(particle);
    }
  });
}
initAtmosphereParticles();
