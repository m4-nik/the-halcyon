// ---------------------------------------------------------------------------
// AUDIO MANAGER
// Background ambience + a game-over stinger. The three ambient tracks and
// the stinger are all silent placeholder WAVs for now (assets/audio/) —
// drop real files in under the SAME filenames and nothing here needs to
// change. If different filenames are wanted, only the AMBIENT_TRACKS /
// STINGER_TRACK paths below need updating.
// ---------------------------------------------------------------------------

const AMBIENT_TRACKS = {
  calm: "assets/audio/ambient-calm.wav",
  tense: "assets/audio/ambient-tense.wav",
  critical: "assets/audio/ambient-critical.wav",
};
const STINGER_TRACK = "assets/audio/stinger-gameover.wav";

const AMBIENT_VOLUME = 0.35;
const STINGER_VOLUME = 0.7;

// Tiers are inclusive floors: 80+ is "critical", 50-79 is "tense", below
// that is "calm". Kept here as named constants so the thresholds are easy
// to find and retune without hunting through logic.
const TENSE_THRESHOLD = 50;
const CRITICAL_THRESHOLD = 80;

let ambientAudio = null;
let currentTrackKey = null;
let muted = false;

function createAmbientElement(src) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = muted ? 0 : AMBIENT_VOLUME;
  return audio;
}

// Starts the base ambient loop. Safe to call more than once — only the
// first call (per stopAmbient()) actually starts anything. Browsers block
// audio without a prior user gesture on the page; play() is caught rather
// than thrown so a blocked autoplay never breaks the game.
export function startAmbient() {
  if (ambientAudio) return;
  currentTrackKey = "calm";
  ambientAudio = createAmbientElement(AMBIENT_TRACKS.calm);
  ambientAudio.play().catch(() => {});
}

// Swaps to a more intense loop as the Antagonist's Plan climbs. Safe to
// call on every plan-bar update — it only actually swaps tracks when the
// target tier differs from what's already playing.
export function setAmbientIntensity(planPercent) {
  if (!ambientAudio) return;

  let targetKey = "calm";
  if (planPercent >= CRITICAL_THRESHOLD) targetKey = "critical";
  else if (planPercent >= TENSE_THRESHOLD) targetKey = "tense";

  if (targetKey === currentTrackKey) return;

  currentTrackKey = targetKey;
  ambientAudio.pause();
  ambientAudio = createAmbientElement(AMBIENT_TRACKS[targetKey]);
  ambientAudio.play().catch(() => {});
}

// One-shot stinger the instant the Antagonist's Plan hits 100%. Fired
// alongside the ambient track stopping, not layered under it.
export function playGameOverStinger() {
  const stinger = new Audio(STINGER_TRACK);
  stinger.volume = muted ? 0 : STINGER_VOLUME;
  stinger.play().catch(() => {});
}

export function stopAmbient() {
  if (ambientAudio) {
    ambientAudio.pause();
    ambientAudio = null;
  }
  currentTrackKey = null;
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
