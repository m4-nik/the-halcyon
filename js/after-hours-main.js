// ---------------------------------------------------------------------------
// AFTER HOURS (LEVEL 2) ENTRY POINT
// ---------------------------------------------------------------------------

import { ROOMS } from "../data/after-hours-rooms.js";
const captainEmergencyAudio = new Audio(
  "assets/audio/captain-emergency.mp4"
);

captainEmergencyAudio.preload = "auto";
captainEmergencyAudio.volume = 1;
import { SUSPECTS } from "../data/after-hours-suspects.js";
import { TIMER_CONFIG } from "../data/after-hours-config.js";
import { renderRoom } from "./hotspotEngine.js";
import {
  startAmbient,
  retryAmbientIfStalled,
  setMuted,
  isMuted,
  setVolume,
  getVolume
} from "./audioManager.js";

const state = {
  currentRoomId: ROOMS[0].id,
  foundHotspotIds: new Set(),
  timerRemaining: TIMER_CONFIG.durationSeconds,
  revealedUnknownSuspect: false,
};

let timerInterval = null;

// Start the game immediately for Level 2 (no intro gates)
function playCaptainEmergency() {
  if (!captainEmergencyAudio.paused || captainEmergencyAudio.currentTime > 0) {
    return;
  }

  captainEmergencyAudio.play().catch(() => {
    // Chrome may block autoplay until the player interacts.
    const playOnInteraction = () => {
      captainEmergencyAudio.play().catch(() => { });
    };

    document.addEventListener("pointerdown", playOnInteraction, { once: true });
  });
}
function initGame() {
  playCaptainEmergency();
  renderRoomNav();
  goToRoom(state.currentRoomId);
  initTimer();
  initAudioControls();
  startAmbient();
}

// --- Timer System --------------------------------------------------------
function initTimer() {
  const labelEl = document.getElementById("timer-label");
  const displayEl = document.getElementById("timer-display");
  const timerContainer = document.getElementById("level2-timer");

  if (!TIMER_CONFIG.enabled) {
    if (timerContainer) timerContainer.style.display = "none";
    return;
  }

  if (labelEl) labelEl.textContent = TIMER_CONFIG.label;
  updateTimerDisplay(displayEl, state.timerRemaining);

  const startCountdown = () => {
    if (timerInterval) return; // Ensure it only starts once
    timerInterval = setInterval(() => {
      if (state.timerRemaining > 0) {
        state.timerRemaining -= 1;
        updateTimerDisplay(displayEl, state.timerRemaining);
      }

      if (state.timerRemaining <= 0) {
        state.timerRemaining = 0;
        updateTimerDisplay(displayEl, 0);
        clearInterval(timerInterval);
        triggerGameOver();
      }
    }, 1000);
  };

  if (captainEmergencyAudio.ended) {
    startCountdown();
  } else {
    captainEmergencyAudio.addEventListener("ended", startCountdown, { once: true });
  }
}

let gameOverTriggered = false;
function triggerGameOver() {
  if (gameOverTriggered) return;
  gameOverTriggered = true;

  document.getElementById("failure-modal").classList.add("open");

  document.getElementById("failure-modal-retry").addEventListener("click", () => {
    window.location.reload();
  }, { once: true });
}

function updateTimerDisplay(el, seconds) {
  if (!el) return;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  el.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// --- Room navigation -----------------------------------------------------
function renderRoomNav() {
  const nav = document.getElementById("room-nav");
  nav.innerHTML = "";

  ROOMS.forEach((room) => {
    if (room.isHidden) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = room.name;
    btn.className = "room-nav-btn";
    if (room.isLocked) {
      btn.classList.add("locked");
    }
    btn.dataset.roomId = room.id;

    btn.addEventListener("click", () => {
      retryAmbientIfStalled();
      if (room.isLocked) {
        showAccessDeniedModal();
      } else {
        goToRoom(room.id);
      }
    });

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
    planPercent: 0, // Not using the plan mechanic yet
  });
}

// --- Hotspot click handling -----------------------------------------------
function handleHotspotClick(room, hotspot) {
  retryAmbientIfStalled();

  // Show the correct evidence modal
  if (hotspot.examineModel || hotspot.examineImage) {
    showExamineModal({
      model: hotspot.examineModel,
      image: hotspot.examineImage,
      text: hotspot.clueText,
      connection: hotspot.connectionText,
      whyItMatters: hotspot.whyItMatters
    });
  } else {
    showClueModal({
      text: hotspot.clueText,
      connection: hotspot.connectionText,
      whyItMatters: hotspot.whyItMatters
    });
  }

  // Allow evidence to reopen, but only discover it once
  const alreadyFound = state.foundHotspotIds.has(hotspot.id);
  if (alreadyFound) return;

  state.foundHotspotIds.add(hotspot.id);

  if (hotspot.id === "ve22-03-service-jacket") {
    state.revealedUnknownSuspect = true;
  }

  // Unlock VE-22 only after first discovering the blueprint
  if (hotspot.id === "lower-02-blueprint") {
    const ve22 = ROOMS.find((r) => r.id === "ve-22");

    if (ve22 && ve22.isHidden) {
      ve22.isHidden = false;
      renderRoomNav();
      showUnlockToast();
    }
  }

  goToRoom(state.currentRoomId);
}

// --- Modals -----------------------------------------------------------
function renderEvidenceText(container, text, connection, whyItMatters) {
  container.innerHTML = "";

  const observation = document.createElement("div");
  observation.className = "evidence-observation";
  observation.textContent = text;
  container.appendChild(observation);

  if (connection) {
    const connectionLabel = document.createElement("div");
    connectionLabel.className = "evidence-detail-label";
    connectionLabel.textContent = "CONNECTION";

    const connectionText = document.createElement("div");
    connectionText.className = "evidence-detail-text";
    connectionText.textContent = connection;

    container.appendChild(connectionLabel);
    container.appendChild(connectionText);
  }

  if (whyItMatters) {
    const whyLabel = document.createElement("div");
    whyLabel.className = "evidence-detail-label";
    whyLabel.textContent = "WHY IT MATTERS";

    const whyText = document.createElement("div");
    whyText.className = "evidence-detail-text";
    whyText.textContent = whyItMatters;

    container.appendChild(whyLabel);
    container.appendChild(whyText);
  }
}

function showClueModal({ text, connection, whyItMatters }) {
  renderEvidenceText(
    document.getElementById("clue-modal-text"),
    text,
    connection,
    whyItMatters
  );

  document.getElementById("clue-modal").classList.add("open");
}

function showExamineModal({ model, image, text, connection, whyItMatters }) {
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

  renderEvidenceText(
    document.getElementById("examine-modal-text"),
    text,
    connection,
    whyItMatters
  );

  document.getElementById("examine-modal").classList.add("open");
}
function closeExamineModal() {
  document.getElementById("examine-modal").classList.remove("open");

  const viewer = document.getElementById("examine-model-viewer");
  if (viewer) {
    viewer.removeAttribute("src");
  }
}

document.getElementById("examine-modal-close")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeExamineModal();
});

document.getElementById("examine-modal-continue")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeExamineModal();
});

function closeClueModal() {
  document.getElementById("clue-modal").classList.remove("open");
}

document.getElementById("clue-modal-close")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeClueModal();
});
document.getElementById("clue-modal-continue")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeClueModal();
});

function showAccessDeniedModal() {
  const input = document.getElementById("passcode-input");
  const errorMsg = document.getElementById("passcode-error");
  if (input) input.value = "";
  if (errorMsg) errorMsg.style.display = "none";

  document.getElementById("access-denied-modal").classList.add("open");

  if (input) {
    setTimeout(() => input.focus(), 50);
  }
}

function closeAccessDeniedModal() {
  document.getElementById("access-denied-modal").classList.remove("open");
}

document.getElementById("access-denied-close")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAccessDeniedModal();
});

function handlePasscodeSubmit() {
  retryAmbientIfStalled();
  const input = document.getElementById("passcode-input");
  const errorMsg = document.getElementById("passcode-error");

  if (input && input.value === "7319") {
    const lowerDecksRoom = ROOMS.find(r => r.id === "lower-decks");
    if (lowerDecksRoom) lowerDecksRoom.isLocked = false;
    renderRoomNav();
    closeAccessDeniedModal();
    goToRoom("lower-decks");
  } else {
    if (errorMsg) errorMsg.style.display = "block";
  }
}

document.getElementById("access-denied-continue")?.addEventListener("click", handlePasscodeSubmit);

document.getElementById("passcode-input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlePasscodeSubmit();
  }
});

// --- Slide-out panels -------------------------------------------------
function renderCaseLogPanel() {
  const container = document.getElementById("case-log-list");
  container.innerHTML = "";
  if (state.foundHotspotIds.size === 0) {
    container.innerHTML = '<p class="empty-state">No entries in the log yet.</p>';
    return;
  }

  ROOMS.forEach(room => {
    const foundInRoom = room.hotspots.filter(h => state.foundHotspotIds.has(h.id));
    if (foundInRoom.length === 0) return;

    const roomSection = document.createElement("div");
    roomSection.innerHTML = `<h3 style="color: var(--color-cyan); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem; margin-top: 1rem; margin-bottom: 1rem;">${room.name}</h3>`;

    foundInRoom.forEach(h => {
      const entry = document.createElement("div");
      entry.className = "case-log-entry";
      entry.style.marginBottom = "2rem";

      let html = `<div class="evidence-observation" style="margin-bottom: 0.5rem;"><strong>Observation:</strong> ${h.clueText}</div>`;
      if (h.connectionText) {
        html += `<div class="evidence-detail-label" style="margin-top: 0.5rem; color: #d3a84f; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.16em;">CONNECTION</div>
                 <div class="evidence-detail-value" style="color: #d8d8d8; line-height: 1.5; margin-top: 0.25rem;">${h.connectionText}</div>`;
      }
      if (h.whyItMatters) {
        html += `<div class="evidence-detail-label" style="margin-top: 0.5rem; color: #d3a84f; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.16em;">WHY IT MATTERS</div>
                 <div class="evidence-detail-value" style="color: #d8d8d8; line-height: 1.5; margin-top: 0.25rem;">${h.whyItMatters}</div>`;
      }
      entry.innerHTML = html;
      roomSection.appendChild(entry);
    });
    container.appendChild(roomSection);
  });
}

function renderEvidencePanel() {
  const container = document.getElementById("evidence-list");
  container.innerHTML = "";
  if (state.foundHotspotIds.size === 0) {
    container.innerHTML = '<p class="empty-state">No physical evidence collected.</p>';
    return;
  }

  ROOMS.forEach(room => {
    const foundInRoom = room.hotspots.filter(h => state.foundHotspotIds.has(h.id));
    if (foundInRoom.length === 0) return;

    const roomSection = document.createElement("div");
    roomSection.innerHTML = `<h3 style="color: var(--color-cyan); border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem; margin-top: 1rem; margin-bottom: 1rem;">${room.name}</h3>`;

    foundInRoom.forEach(h => {
      const entry = document.createElement("button");
      entry.className = "btn-secondary";
      entry.style.display = "block";
      entry.style.width = "100%";
      entry.style.textAlign = "left";
      entry.style.marginBottom = "0.5rem";
      entry.style.padding = "0.75rem";
      entry.style.lineHeight = "1.4";

      entry.textContent = h.clueText;

      entry.addEventListener("click", () => {
        retryAmbientIfStalled();
        if (h.examineModel || h.examineImage) {
          showExamineModal({
            model: h.examineModel,
            image: h.examineImage,
            text: h.clueText,
            connection: h.connectionText,
            whyItMatters: h.whyItMatters
          });
        } else {
          showClueModal({
            text: h.clueText,
            connection: h.connectionText,
            whyItMatters: h.whyItMatters
          });
        }
      });
      roomSection.appendChild(entry);
    });
    container.appendChild(roomSection);
  });
}

function renderSuspectsPanel() {
  const container = document.getElementById("suspects-list");
  container.innerHTML = "";

  const allSuspects = [...SUSPECTS];

  if (state.revealedUnknownSuspect) {
    allSuspects.push({
      id: "unknown-occupant",
      name: "UNKNOWN OCCUPANT",
      role: "Unidentified person aboard The Halcyon",
      portrait: null,
      motive: "Evidence inside VE-22 indicates that the compartment was repeatedly occupied.",
      alibi: "This person may have moved through restricted service routes without appearing on the official passenger or crew record.",
      statusText: "Identity Unknown"
    });
  }

  allSuspects.forEach(suspect => {
    const card = document.createElement("div");
    card.className = "suspect-card";
    card.style.border = "1px solid var(--color-border)";
    card.style.padding = "1rem";
    card.style.marginBottom = "1rem";
    card.style.background = "rgba(0,0,0,0.3)";

    const initials = suspect.name.split(" ").map(w => w[0]).join("");
    const portraitHtml = suspect.portrait
      ? `<img class="suspect-portrait" src="${suspect.portrait}" alt="${suspect.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; float: right; border: 1px solid var(--color-border); margin-left: 1rem;" />`
      : `<div class="suspect-portrait suspect-portrait-placeholder" style="width: 60px; height: 60px; border-radius: 50%; background: var(--color-border); color: var(--color-text-muted); display: flex; align-items: center; justify-content: center; font-weight: bold; float: right; margin-left: 1rem;">${initials}</div>`;

    let detailsHtml = "";
    if (suspect.id === "unknown-occupant") {
      detailsHtml = `
         <p style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>STATUS:</strong> ${suspect.statusText}</p>
         <p style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>ROLE:</strong> ${suspect.role}</p>
         <p style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>KNOWN:</strong> ${suspect.motive}</p>
         <p style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>SIGNIFICANCE:</strong> ${suspect.alibi}</p>
       `;
    } else {
      detailsHtml = `
         <p class="suspect-role" style="color: var(--color-cyan-dim); margin-bottom: 0.5rem;">${suspect.role}</p>
         <p style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Motive:</strong> ${suspect.motive}</p>
         <p style="font-size: 0.9rem;"><strong>Notes:</strong> ${suspect.alibi}</p>
       `;
    }

    card.innerHTML = `
      ${portraitHtml}
      <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--color-gold-bright);">${suspect.name}</h3>
      ${detailsHtml}
      <div style="clear: both;"></div>
    `;

    container.appendChild(card);
  });
}

function closeAllPanels() {
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("open"));
}

document.querySelectorAll(".panel-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    retryAmbientIfStalled();
    document.getElementById(btn.dataset.close).classList.remove("open");
  });
});

document.getElementById("btn-case-log")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAllPanels();
  renderCaseLogPanel();
  document.getElementById("case-log-panel").classList.add("open");
});

document.getElementById("btn-suspects")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAllPanels();
  renderSuspectsPanel();
  document.getElementById("suspects-panel").classList.add("open");
});

document.getElementById("btn-evidence")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAllPanels();
  renderEvidencePanel();
  document.getElementById("evidence-panel").classList.add("open");
});

// --- Audio Controls ----------------------------------------------------
function initAudioControls() {
  const audioToggleBtn = document.getElementById("audio-toggle");
  const volumeSlider = document.getElementById("audio-volume-slider");
  if (!audioToggleBtn || !volumeSlider) return;

  function setMutedUI(nextMuted) {
    setMuted(nextMuted);
    audioToggleBtn.classList.toggle("muted", nextMuted);
    audioToggleBtn.setAttribute("aria-pressed", String(nextMuted));
    audioToggleBtn.setAttribute("aria-label", nextMuted ? "Unmute audio" : "Mute audio");
  }

  function paintVolumeSlider(percent) {
    volumeSlider.style.background = `linear-gradient(to right, var(--color-cyan-dim) 0%, var(--color-cyan-dim) ${percent}%, var(--color-border) ${percent}%, var(--color-border) 100%)`;
  }

  volumeSlider.value = String(Math.round(getVolume() * 100));
  paintVolumeSlider(Number(volumeSlider.value));

  audioToggleBtn.addEventListener("click", () => {
    setMutedUI(!isMuted());
    retryAmbientIfStalled();
  });

  volumeSlider.addEventListener("input", () => {
    const percent = Number(volumeSlider.value);
    setVolume(percent / 100);
    paintVolumeSlider(percent);
    if (isMuted()) setMutedUI(false);
    retryAmbientIfStalled();
  });
}
function showUnlockToast() {
  const toast = document.createElement("div");
  toast.className = "unlock-notification";
  toast.textContent = "NEW LOCATION UNLOCKED: VE-22";

  document.body.appendChild(toast);

  // Trigger the CSS transition
  void toast.offsetWidth;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 2500);
}

// Boot
initGame();
