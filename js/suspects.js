// ---------------------------------------------------------------------------
// SUSPECTS SCREEN
// Static reference view — renders whatever is in data/suspects.js. No
// interaction beyond viewing.
// ---------------------------------------------------------------------------

// Renders one suspect as a game-style "character select" showcase — used
// by the pre-game "Know the Suspects" screen in main.js: portrait filling
// one side, the full briefing beside it. Falls back to a big initials
// badge until real portraits exist; swap in `suspect.portrait` later and
// this needs no changes.
export function renderSuspectCard(container, suspect) {
  const portraitHtml = suspect.portrait
    ? `<img class="suspect-showcase-portrait" src="${suspect.portrait}" alt="${suspect.name}" />`
    : `<div class="suspect-showcase-portrait suspect-portrait-placeholder">${initials(suspect.name)}</div>`;

  container.innerHTML = `
    <div class="suspect-showcase-media">${portraitHtml}</div>
    <div class="suspect-showcase-info">
      <p class="suspect-showcase-role">${suspect.role}</p>
      <h3 class="suspect-showcase-name">${suspect.name}</h3>
      <div class="suspect-showcase-divider"></div>
      <p><strong>Motive:</strong> ${suspect.motive}</p>
      <p><strong>Notes:</strong> ${suspect.alibi}</p>
    </div>
  `;
}

export function renderSuspects(container, suspects) {
  container.innerHTML = "";

  suspects.forEach((suspect) => {
    const card = document.createElement("div");
    card.className = "suspect-card";

    const portraitHtml = suspect.portrait
      ? `<img class="suspect-portrait" src="${suspect.portrait}" alt="${suspect.name}" />`
      : `<div class="suspect-portrait suspect-portrait-placeholder">${initials(
          suspect.name
        )}</div>`;

    card.innerHTML = `
      ${portraitHtml}
      <h3>${suspect.name}</h3>
      <p class="suspect-role">${suspect.role}</p>
      <p><strong>Motive:</strong> ${suspect.motive}</p>
      <p><strong>Notes:</strong> ${suspect.alibi}</p>
    `;

    container.appendChild(card);
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}
