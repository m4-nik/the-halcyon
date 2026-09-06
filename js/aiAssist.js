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
// to the same person.
//
// The output is ALWAYS framed as a hedged "lean," never a flat verdict —
// even with overwhelming evidence, this never says "the answer is X, go
// accuse them." That keeps the final call the player's to make, which is
// the entire point of the accusation screen existing.
//
// getAISuggestion() is the swap-in point. If the team later builds a
// backend proxy, replace the body of this function with a fetch() to that
// proxy and keep the same input/output shape — nothing that calls this
// function needs to change.
// ---------------------------------------------------------------------------

import { SUSPECTS } from "../data/suspects.js";

// foundClues: the same array tracked in main.js / built by caseLog.js.
// Returns { suspectId, confidence, summary, supportingClues }.
// confidence is "none" | "faint" | "moderate" | "strong" — a description
// of how one-sided the tally is, never a claim of certainty. supportingClues
// is a plain array of { clueText, roomName } — kept separate from `summary`
// (one short sentence) so the UI can render each clue as its own card
// instead of burying them all in one dense paragraph.
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
      confidence: "none",
      summary: "Nothing found so far points anywhere in particular. Keep exploring the rooms.",
      supportingClues: [],
    };
  }

  const [topSuspectId, topCount] = entries[0];
  const runnerUpCount = entries[1] ? entries[1][1] : 0;
  const lead = topCount - runnerUpCount;
  const suspect = SUSPECTS.find((s) => s.id === topSuspectId);

  const supportingClues = foundClues
    .filter((c) => c.pointsToSuspectId === topSuspectId)
    .map((c) => ({ clueText: c.clueText, roomName: c.roomName }));

  let confidence = "faint";
  if (topCount >= 2 && lead >= 2) confidence = "moderate";
  if (topCount >= 4 && lead >= 4) confidence = "strong";

  return {
    suspectId: topSuspectId,
    confidence,
    summary: `${topCount} clue${topCount === 1 ? "" : "s"} lean toward ${suspect.name} more than anyone else:`,
    supportingClues,
  };
}
