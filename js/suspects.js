// ---------------------------------------------------------------------------
// SUSPECTS SCREEN
// Static reference view — renders whatever is in data/suspects.js. No
// interaction beyond viewing.
// ---------------------------------------------------------------------------

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
