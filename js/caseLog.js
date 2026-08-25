// ---------------------------------------------------------------------------
// CASE LOG
// Tracks clues the player has found and renders the case log panel.
// The player is only ever shown clue text and which room it came from —
// never whether a given clue was real or a decoy.
// ---------------------------------------------------------------------------

// Returns a NEW foundClues array with this hotspot's clue appended
// (or the same array unchanged if it was already logged).
export function addClueToLog(foundClues, room, hotspot) {
  const alreadyLogged = foundClues.some((c) => c.hotspotId === hotspot.id);
  if (alreadyLogged) return foundClues;

  return [
    ...foundClues,
    {
      hotspotId: hotspot.id,
      roomId: room.id,
      roomName: room.name,
      clueText: hotspot.clueText,
      isReal: hotspot.isReal,
      pointsToSuspectId: hotspot.pointsToSuspectId || null,
    },
  ];
}

// How many logged clues were real evidence. This is the "X" in "X / Y".
export function countValidHints(foundClues) {
  return foundClues.filter((c) => c.isReal).length;
}

// Total real hotspots across every room, computed from the room data itself
// rather than any fixed number — this is the "Y" in "X / Y" before the
// REQUIRED_HINT_RATIO from data/config.js is applied.
export function countTotalRealHotspots(rooms) {
  return rooms.reduce(
    (total, room) => total + room.hotspots.filter((h) => h.isReal).length,
    0
  );
}

export function renderCaseLog(container, foundClues) {
  container.innerHTML = "";

  if (foundClues.length === 0) {
    container.innerHTML =
      '<p class="case-log-empty">No clues logged yet. Explore the rooms to find evidence.</p>';
    return;
  }

  foundClues.forEach((clue) => {
    const entry = document.createElement("div");
    entry.className = "case-log-entry";
    entry.innerHTML = `
      <span class="case-log-room">${clue.roomName}</span>
      <p>${clue.clueText}</p>
    `;
    container.appendChild(entry);
  });
}
