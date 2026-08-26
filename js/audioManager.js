// ---------------------------------------------------------------------------
// AUDIO MANAGER
// One continuous ambient track for the whole investigation, plus a
// game-over stinger.
//
// tension-loop.mp3 is a REAL file the team supplies directly — unlike the
// stinger, nothing here generates a placeholder substitute for it. If it's
// missing, startAmbient() just fails to play (caught silently) and the
// game stays silent rather than throwing or faking a tone.
// ---------------------------------------------------------------------------

const AMBIENT_TRACK = "assets/audio/tension-loop.mp3";
const STINGER_TRACK = "assets/audio/stinger-gameover.wav";

const AMBIENT_VOLUME = 0.55;
const STINGER_VOLUME = 0.7;

let ambientAudio = null;
let muted = false;

// Starts the ambient loop. Safe to call more than once — only the first
// call (per stopAmbient()) actually starts anything. Browsers block audio
// without a prior user gesture on the page; play() is caught rather than
// thrown so a blocked autoplay (or a missing file) never breaks the game.
export function startAmbient() {
  if (ambientAudio) return;
  ambientAudio = new Audio(AMBIENT_TRACK);
  ambientAudio.loop = true;
  ambientAudio.volume = muted ? 0 : AMBIENT_VOLUME;
  ambientAudio.play().catch(() => {});
}

export function stopAmbient() {
  if (ambientAudio) {
    ambientAudio.pause();
    ambientAudio = null;
  }
}

// One-shot stinger the instant the Antagonist's Plan hits 100%.
export function playGameOverStinger() {
  const stinger = new Audio(STINGER_TRACK);
  stinger.volume = muted ? 0 : STINGER_VOLUME;
  stinger.play().catch(() => {});
}

export function setMuted(nextMuted) {
  muted = nextMuted;
  if (ambientAudio) {
    ambientAudio.volume = muted ? 0 : AMBIENT_VOLUME;
  }
}

export function isMuted() {
  return muted;
}
