// ---------------------------------------------------------------------------
// ANTAGONIST'S PLAN BAR
// A separate progress bar from the hint counter. It only ticks forward on
// player clicks (any hotspot, real or decoy) — there is no clock and
// nothing runs in the background. Reaching 100% ends the game early.
// ---------------------------------------------------------------------------

import { ANTAGONIST_PLAN_INCREMENT } from "../data/config.js";

export function advancePlan(currentPercent) {
  return Math.min(100, currentPercent + ANTAGONIST_PLAN_INCREMENT);
}

export function renderPlanBar(barFillEl, percent) {
  barFillEl.style.width = `${percent}%`;
}
