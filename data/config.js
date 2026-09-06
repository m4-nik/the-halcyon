// ---------------------------------------------------------------------------
// GAME BALANCE CONSTANTS
// Change values here to rebalance the game. Nothing in the engine files
// (js/*.js) should ever hardcode numbers like these directly — they all
// read from here instead, so tuning the game never means hunting through
// engine code.
// ---------------------------------------------------------------------------

// The code the player must type at the Case File Gate to enter the game.
// Case-insensitive check is done in main.js.
export const CASE_FILE_CODE = "HALCYON7";

// How long the player has, in real time, before the "Antagonist's Plan"
// bar fills completely and the game ends. Runs silently in the background
// from the moment the investigation starts — nothing the player clicks
// speeds it up or slows it down, and no clock is ever shown on screen.
export const ANTAGONIST_PLAN_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// The hint counter shown in the top bar ("Valid hints found: X / Y") sets
// Y to this fraction of ALL real (isReal: true) hotspots that exist across
// every room in data/rooms.js. It's computed at runtime from the room data,
// never a fixed number — so it stays correct no matter how many hotspots
// the team ends up adding per room.
// 1.0 = player is expected to find every real clue in the game.
export const REQUIRED_HINT_RATIO = 1.0;

// The player can't make a formal accusation until they've found at least
// this fraction of the hint target above — stops a blind guess from
// ending the case with zero evidence. Also computed at runtime, same as
// REQUIRED_HINT_RATIO, so it never depends on a hardcoded clue count.
// (0.625 against the current 16 real clues works out to 10.)
export const MIN_HINT_RATIO_TO_ACCUSE = 0.625;
