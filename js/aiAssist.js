// ---------------------------------------------------------------------------
// AI CONCLUSION ASSIST
// Rule-based only, on purpose: calling a real AI API directly from
// client-side JS means shipping an API key inside the browser, which anyone
// can extract from devtools and abuse. That's not something to wire up
// without a backend proxy holding the key server-side.
//
// getAISuggestion() is the swap-in point. If the team later builds a
// backend proxy, replace the body of this function with a fetch() to that
// proxy and keep the same input/output shape — nothing that calls this
// function needs to change.
// ---------------------------------------------------------------------------

import { SUSPECTS } from "../data/suspects.js";

// foundClues: the same array tracked in main.js / built by caseLog.js.
// Returns { suspectId, reasoning }. suspectId is null if there isn't yet
// enough evidence to suggest anyone.
export function getAISuggestion(foundClues) {
  const tally = {};

  foundClues.forEach((clue) => {
    if (!clue.isReal || !clue.pointsToSuspectId) return;
    tally[clue.pointsToSuspectId] = (tally[clue.pointsToSuspectId] || 0) + 1;
  });

  const entries = Object.entries(tally);
  if (entries.length === 0) {
    return {
      suspectId: null,
      reasoning:
        "Not enough verified evidence has been gathered yet to point to any one suspect. Keep exploring the rooms.",
    };
  }

  entries.sort((a, b) => b[1] - a[1]);
  const [topSuspectId, topCount] = entries[0];
  const suspect = SUSPECTS.find((s) => s.id === topSuspectId);

  const supportingClues = foundClues.filter(
    (c) => c.isReal && c.pointsToSuspectId === topSuspectId
  );
  const clueList = supportingClues
    .map((c) => `"${c.clueText}" (${c.roomName})`)
    .join(" ");

  return {
    suspectId: topSuspectId,
    reasoning: `${topCount} piece(s) of verified evidence point to ${suspect.name}: ${clueList}`,
  };
}
