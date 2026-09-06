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
// Deliberately unreliable, on purpose: every real clue in the game points
// to the same suspect, so a plain tally converges on the right answer
// almost immediately and the assist stops being a tool the player has to
// think about. To keep it a genuine (if biased) "assistant" rather than an
// answer key, one other suspect is picked at random each game as a red
// herring the AI is especially susceptible to — decoys pointing at them
// count for extra until enough real evidence for the true culprit
// outweighs it. Call setAIMisleadSuspect() once per game (main.js does
// this in startGame()) so it varies across playthroughs.
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

const MISLEAD_WEIGHT = 2;
let misleadSuspectId = null;

// Picks this game's red herring — never the real antagonist, since the
// point is to occasionally out-weigh them, not replace them for good.
export function setAIMisleadSuspect(suspects) {
  const candidates = suspects.filter((s) => !s.isAntagonist);
  misleadSuspectId = candidates[Math.floor(Math.random() * candidates.length)].id;
}

// foundClues: the same array tracked in main.js / built by caseLog.js.
// Returns { suspectId, confidence, summary, supportingClues }.
// confidence is "none" | "faint" | "moderate" | "strong" — a description
// of how one-sided the tally is, never a claim of certainty. supportingClues
// is a plain array of { clueText, roomName } — kept separate from `summary`
// (one short sentence) so the UI can render each clue as its own card
// instead of burying them all in one dense paragraph.
export function getAISuggestion(foundClues) {
  const weightedScore = {}; // used only to decide who's "in the lead"
  const rawCount = {}; // actual number of clues — always what's shown

  foundClues.forEach((clue) => {
    if (!clue.pointsToSuspectId) return;
    const id = clue.pointsToSuspectId;
    const weight = id === misleadSuspectId ? MISLEAD_WEIGHT : 1;
    weightedScore[id] = (weightedScore[id] || 0) + weight;
    rawCount[id] = (rawCount[id] || 0) + 1;
  });

  const entries = Object.entries(weightedScore).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return {
      suspectId: null,
      confidence: "none",
      summary: "Nothing found so far points anywhere in particular. Keep exploring the rooms.",
      supportingClues: [],
    };
  }

  const [topSuspectId] = entries[0];
  const topCount = rawCount[topSuspectId];
  const runnerUpId = entries[1] ? entries[1][0] : null;
  const runnerUpCount = runnerUpId ? rawCount[runnerUpId] : 0;
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
