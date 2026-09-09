// ---------------------------------------------------------------------------
// AFTER HOURS (LEVEL 2) ENTRY POINT
// ---------------------------------------------------------------------------

import { ROOMS } from "../data/after-hours-rooms.js";
import { SUSPECTS } from "../data/after-hours-suspects.js";
import { TIMER_CONFIG } from "../data/after-hours-config.js";
import { renderRoom } from "./hotspotEngine.js";
import { addClueToLog, renderCaseLog } from "./caseLog.js";
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
  foundClues: [],
  timerRemaining: TIMER_CONFIG.durationSeconds,
};

let timerInterval = null;

// Start the game immediately for Level 2 (no intro gates)
function initGame() {
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

  timerInterval = setInterval(() => {
    if (state.timerRemaining > 0) {
      state.timerRemaining -= 1;
      updateTimerDisplay(displayEl, state.timerRemaining);
    } else {
      clearInterval(timerInterval);
      // Stops at 00:00 as requested, no game over logic yet
    }
  }, 1000);
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

  if (hotspot.examineModel || hotspot.examineImage) {
    showExamineModal({ model: hotspot.examineModel, image: hotspot.examineImage, text: hotspot.clueText });
  } else {
    showClueModal(hotspot.clueText);
  }

  const alreadyFound = state.foundHotspotIds.has(hotspot.id);
  if (alreadyFound) return;

  state.foundHotspotIds.add(hotspot.id);
  state.foundClues = addClueToLog(state.foundClues, room, hotspot);
  goToRoom(state.currentRoomId);
}

// --- Modals -----------------------------------------------------------
function showClueModal(text) {
  document.getElementById("clue-modal-text").textContent = text;
  document.getElementById("clue-modal").classList.add("open");
}

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

document.getElementById("examine-modal-close")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeExamineModal();
});
document.getElementById("examine-modal-continue")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeExamineModal();
});

function showAccessDeniedModal() {
  document.getElementById("access-denied-modal").classList.add("open");
}

function closeAccessDeniedModal() {
  document.getElementById("access-denied-modal").classList.remove("open");
}

document.getElementById("access-denied-close")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAccessDeniedModal();
});
document.getElementById("access-denied-continue")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAccessDeniedModal();
});

// --- Slide-out panels -------------------------------------------------
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
  renderCaseLog(document.getElementById("case-log-list"), state.foundClues);
  document.getElementById("case-log-panel").classList.add("open");
});

document.getElementById("btn-suspects")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAllPanels();
  document.getElementById("suspects-panel").classList.add("open");
});

document.getElementById("btn-evidence")?.addEventListener("click", () => {
  retryAmbientIfStalled();
  closeAllPanels();
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

// Boot
initGame();
