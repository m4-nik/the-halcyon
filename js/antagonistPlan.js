// ---------------------------------------------------------------------------
// ANTAGONIST'S PLAN BAR
// A hidden 15-minute countdown that fills in the background from the
// moment the investigation starts, independent of anything the player
// clicks. No clock is ever shown to the player — only the bar itself,
// which visibly fills as time runs out. Reaching 100% ends the game.
// ---------------------------------------------------------------------------

import { ANTAGONIST_PLAN_DURATION_MS } from "../data/config.js";

// Percent complete, based on real elapsed time since `startTime` (a
// Date.now() timestamp) rather than a count of ticks — so a throttled
// background tab or a delayed interval never desyncs the bar from the
// actual 15 minutes.
export function calculatePlanPercent(startTime) {
  const elapsed = Date.now() - startTime;
  return Math.min(100, (elapsed / ANTAGONIST_PLAN_DURATION_MS) * 100);
}

export function renderPlanBar(barFillEl, percent) {
  barFillEl.style.width = `${percent}%`;
}
