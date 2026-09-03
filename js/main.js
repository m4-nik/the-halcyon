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
import { getAISuggestion } from "./aiAssist.js";
import { checkAccusation, renderAccusationForm, renderResult } from "./accusation.js";
import { advancePlan, renderPlanBar } from "./antagonistPlan.js";
import {
  startAmbient,
  retryAmbientIfStalled,
  playGameOverStinger,
  stopAmbient,
  setMuted,
  isMuted,
} from "./audioManager.js";

const state = {
  currentRoomId: ROOMS[0].id,
  foundClues: [],
  foundHotspotIds: new Set(),
  planPercent: 0,
  gameOver: false,
};

let transitioning = false;

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

  renderSuspectDots();
  renderSuspectCastStrip();
}

// The "meet the cast" row — all 5 suspects at once, each a clickable
// portrait that jumps the carousel above straight to them.
function renderSuspectCastStrip() {
  const strip = document.getElementById("suspect-cast-strip");
  strip.innerHTML = "";

  SUSPECTS.forEach((suspect, i) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "suspect-cast-thumb" + (i === suspectIntroIndex ? " active" : "");

    const portraitHtml = suspect.portrait
      ? `<img class="suspect-cast-portrait" src="${suspect.portrait}" alt="${suspect.name}" />`
      : `<div class="suspect-cast-portrait suspect-cast-portrait-placeholder">${initials(suspect.name)}</div>`;

    thumb.innerHTML = `
      ${portraitHtml}
      <span class="suspect-cast-name">${suspect.name}</span>
      <span class="suspect-cast-role">${suspect.role}</span>
    `;
    thumb.addEventListener("click", () => {
      suspectIntroIndex = i;
      renderSuspectIntro();
    });
    strip.appendChild(thumb);
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}

function renderSuspectDots() {
  const dotsContainer = document.getElementById("suspect-dots");
  dotsContainer.innerHTML = "";

  SUSPECTS.forEach((suspect, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "suspect-dot" + (i === suspectIntroIndex ? " active" : "");
    dot.setAttribute("aria-label", `View ${suspect.name}`);
    dot.addEventListener("click", () => {
      suspectIntroIndex = i;
      renderSuspectIntro();
    });
    dotsContainer.appendChild(dot);
  });
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

  if (hotspot.examineModel) {
    showExamineModal({ model: hotspot.examineModel, text: hotspot.clueText });
  } else if (hotspot.examineImage) {
    showExamineModal({ image: hotspot.examineImage, text: hotspot.clueText });
  } else {
    showClueModal(hotspot.clueText);
  }

  const alreadyFound = state.foundHotspotIds.has(hotspot.id);
  if (alreadyFound) return; // reopening a checked hotspot doesn't re-count it

  state.foundHotspotIds.add(hotspot.id);
  state.foundClues = addClueToLog(state.foundClues, room, hotspot);
  updateHintCounter();

  state.planPercent = advancePlan(state.planPercent);
  renderPlanBar(document.getElementById("plan-bar-fill"), state.planPercent);

  goToRoom(state.currentRoomId); // re-render so this hotspot shows as checked

  if (state.planPercent >= 100) {
    triggerGameOver();
  }
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
  closeAllPanels();
  stopAmbient();
  playGameOverStinger();
  showScreen("screen-game-over");
}

// --- Clue popup modal -------------------------------------------------
function showClueModal(text) {
  document.getElementById("clue-modal-text").textContent = text;
  document.getElementById("clue-modal").classList.add("open");
}
function closeClueModal() {
  document.getElementById("clue-modal").classList.remove("open");
}
document.getElementById("clue-modal-close").addEventListener("click", closeClueModal);
document.getElementById("clue-modal-continue").addEventListener("click", closeClueModal);

// 3D examine modal — same role as the plain clue modal above, used
// instead of it whenever a hotspot sets `examineModel`. Any hotspot can
// opt into this just by pointing examineModel at a .glb file; nothing
// here needs to change to support more models later.
function showExamineModal({ model, image, text }) {
  const viewer = document.getElementById("examine-model-viewer");
  const imageViewer = document.getElementById("examine-image-viewer");

  if (model) {
    viewer.setAttribute("src", model);
    viewer.style.display = "block";
    imageViewer.style.display = "none";
  } else {
    imageViewer.src = image;
    imageViewer.style.display = "block";
    viewer.removeAttribute("src");
    viewer.style.display = "none";
  }

  document.getElementById("examine-modal-text").textContent = text;
  document.getElementById("examine-modal").classList.add("open");
}
function closeExamineModal() {
  document.getElementById("examine-modal").classList.remove("open");
}
document.getElementById("examine-modal-close").addEventListener("click", closeExamineModal);
document.getElementById("examine-modal-continue").addEventListener("click", closeExamineModal);

// --- Slide-out panels -------------------------------------------------
function closeAllPanels() {
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("open"));
}

document.querySelectorAll(".panel-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.close).classList.remove("open");
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

document.getElementById("btn-ai-assist").addEventListener("click", () => {
  const suggestion = getAISuggestion(state.foundClues);
  const content = document.getElementById("ai-assist-content");

  if (!suggestion.suspectId) {
    content.innerHTML = `<p>${suggestion.reasoning}</p>`;
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
    content.innerHTML = `
      <div class="ai-suggestion-header">
        ${portraitHtml}
        <p class="ai-suggestion-name">${confidenceLabel} toward <strong>${suspect.name}</strong></p>
      </div>
      <p>${suggestion.reasoning}</p>
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
  state.currentRoomId = ROOMS[0].id;
  state.foundClues = [];
  state.foundHotspotIds = new Set();
  state.planPercent = 0;
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
audioToggleBtn.addEventListener("click", () => {
  const nextMuted = !isMuted();
  setMuted(nextMuted);
  audioToggleBtn.classList.toggle("muted", nextMuted);
  audioToggleBtn.setAttribute("aria-pressed", String(nextMuted));
  audioToggleBtn.setAttribute("aria-label", nextMuted ? "Unmute audio" : "Mute audio");
  retryAmbientIfStalled(); // clicking the toggle is as real a gesture as any — worth a retry too
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
