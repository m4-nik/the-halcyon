// ---------------------------------------------------------------------------
// AI CONCLUSION ASSIST
// Rule-based only, on purpose: calling a real AI API directly from
// client-side JS means shipping an API key inside the browser, which anyone
// can extract from devtools and abuse. That's not something to wire up
// without a backend proxy holding the key server-side.
//
// Tallies EVERY found clue (real evidence and red herrings alike) by who
// it points to — not just the real ones. If only real clues counted, the
// assist would name the actual culprit the instant the player found their
// first piece of real evidence, since every real clue in this game points
// to the same person. Blending in the red herrings means early guesses
// stay genuinely uncertain, the same way the player's own suspicion would.
//
// getAISuggestion() is the swap-in point. If the team later builds a
// backend proxy, replace the body of this function with a fetch() to that
// proxy and keep the same input/output shape — nothing that calls this
// function needs to change.
// ---------------------------------------------------------------------------

import { SUSPECTS } from "../data/suspects.js";

// A suggestion only gets named outright once one suspect has at least this
// many pointing clues AND is clearly ahead of the next-closest suspect by
// at least this margin. Below that, the assist reports a "leaning" instead
// of a verdict — a single early clue should never just hand over the answer.
const MIN_CLUES_TO_NAME = 2;
const MIN_LEAD_TO_NAME = 2;

// foundClues: the same array tracked in main.js / built by caseLog.js.
// Returns { suspectId, reasoning }. suspectId is null if the lead isn't
// clear enough yet to name someone outright.
export function getAISuggestion(foundClues) {
  const tally = {};

  foundClues.forEach((clue) => {
    if (!clue.pointsToSuspectId) return;
    tally[clue.pointsToSuspectId] = (tally[clue.pointsToSuspectId] || 0) + 1;
  });

  const entries = Object.entries(tally).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return {
      suspectId: null,
      reasoning: "Nothing found so far points anywhere in particular. Keep exploring the rooms.",
    };
  }

  const [topSuspectId, topCount] = entries[0];
  const runnerUpCount = entries[1] ? entries[1][1] : 0;
  const suspect = SUSPECTS.find((s) => s.id === topSuspectId);

  const supportingClues = foundClues.filter((c) => c.pointsToSuspectId === topSuspectId);
  const clueList = supportingClues.map((c) => `"${c.clueText}" (${c.roomName})`).join(" ");

  const hasClearLead = topCount >= MIN_CLUES_TO_NAME && topCount - runnerUpCount >= MIN_LEAD_TO_NAME;

  if (!hasClearLead) {
    return {
      suspectId: null,
      reasoning: `The clues so far lean toward ${suspect.name}, but nothing close to conclusive — other leads still point elsewhere. Keep investigating before drawing a conclusion.`,
    };
  }

  return {
    suspectId: topSuspectId,
    reasoning: `${topCount} clue(s) point toward ${suspect.name} more than anyone else, well ahead of any other lead: ${clueList}`,
  };
}
