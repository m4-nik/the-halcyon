// ---------------------------------------------------------------------------
// ROOM ACCESS
// Static reference panel — who's normally allowed in each room, read
// straight from each room's `access` field in data/rooms.js. Purely
// informational; doesn't affect hint counting or the accusation logic.
// ---------------------------------------------------------------------------

export function renderRoomAccess(container, rooms, suspects) {
  container.innerHTML = "";

  rooms.forEach((room) => {
    const entry = document.createElement("div");
    entry.className = "access-entry";

    const access = room.access;
    const isOpenToAll = access && access.suspects.length === suspects.length;

    const chipsHtml = isOpenToAll
      ? '<span class="access-open-badge">Open to everyone aboard</span>'
      : (access ? access.suspects : [])
          .map((id) => suspects.find((s) => s.id === id))
          .filter(Boolean)
          .map((suspect) => {
            const portraitHtml = suspect.portrait
              ? `<img class="access-chip-portrait" src="${suspect.portrait}" alt="${suspect.name}" />`
              : `<span class="access-chip-portrait access-chip-portrait-placeholder">${initials(suspect.name)}</span>`;
            return `<span class="access-chip">${portraitHtml}${suspect.name}</span>`;
          })
          .join("");

    entry.innerHTML = `
      <span class="access-room-name">${room.name}</span>
      <div class="access-chip-row">${chipsHtml}</div>
      ${access && access.note && !isOpenToAll ? `<p class="access-note">${access.note}</p>` : ""}
    `;

    container.appendChild(entry);
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}
