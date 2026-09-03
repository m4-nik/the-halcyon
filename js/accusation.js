// ---------------------------------------------------------------------------
// FINAL ACCUSATION
// Renders the accusation form (a clickable grid of portraits, not a
// dropdown), checks the player's pick against the suspect flagged
// isAntagonist: true, and renders the result screen.
// ---------------------------------------------------------------------------

export function renderAccusationForm(container, suspects, onSubmit) {
  let selectedId = null;

  container.innerHTML = `
    <p>Who do you believe is behind the plan to divert the Halcyon? Click their portrait to choose.</p>
    <div class="accuse-grid" id="accuse-grid"></div>
    <textarea id="accuse-reasoning" placeholder="Optional: explain your reasoning..." rows="4"></textarea>
    <button id="accuse-submit" class="btn-primary modal-continue" disabled>Submit Accusation</button>
  `;

  const grid = container.querySelector("#accuse-grid");
  const submitBtn = container.querySelector("#accuse-submit");

  suspects.forEach((suspect) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "accuse-card";

    const portraitHtml = suspect.portrait
      ? `<img class="accuse-portrait" src="${suspect.portrait}" alt="${suspect.name}" />`
      : `<div class="accuse-portrait accuse-portrait-placeholder">${initials(suspect.name)}</div>`;

    card.innerHTML = `
      ${portraitHtml}
      <span class="accuse-name">${suspect.name}</span>
      <span class="accuse-role">${suspect.role}</span>
    `;

    card.addEventListener("click", () => {
      selectedId = suspect.id;
      grid.querySelectorAll(".accuse-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      submitBtn.disabled = false;
    });

    grid.appendChild(card);
  });

  submitBtn.addEventListener("click", () => {
    if (!selectedId) return;
    const reasoning = container.querySelector("#accuse-reasoning").value.trim();
    onSubmit(selectedId, reasoning);
  });
}

// Compares the player's pick to the real antagonist.
export function checkAccusation(suspects, accusedSuspectId) {
  const antagonist = suspects.find((s) => s.isAntagonist);
  const accused = suspects.find((s) => s.id === accusedSuspectId);
  return {
    correct: accusedSuspectId === antagonist.id,
    antagonist,
    accused,
  };
}

export function renderResult(container, result, playerReasoning, supportingRealClues) {
  const { correct, antagonist, accused } = result;

  const cluesHtml = supportingRealClues.length
    ? `<ul>${supportingRealClues
        .map((c) => `<li>${c.clueText} <em>(${c.roomName})</em></li>`)
        .join("")}</ul>`
    : "<p>No supporting clues for the real antagonist were logged this playthrough.</p>";

  const portraitsHtml = `
    <div class="reveal-portraits">
      ${
        !correct
          ? `<div class="reveal-portrait-slot">
               ${portraitOrInitials(accused, "reveal-portrait")}
               <span class="reveal-portrait-label">Your accusation</span>
               <span class="reveal-portrait-name">${accused.name}</span>
             </div>
             <div class="reveal-portrait-arrow">&#8594;</div>`
          : ""
      }
      <div class="reveal-portrait-slot">
        ${portraitOrInitials(antagonist, "reveal-portrait reveal-portrait-antagonist")}
        <span class="reveal-portrait-label">${correct ? "Correct" : "The Real Culprit"}</span>
        <span class="reveal-portrait-name">${antagonist.name}</span>
      </div>
    </div>
  `;

  container.innerHTML = `
    <h1>${correct ? "Case Closed — Correct Accusation" : "Case Closed — Wrong Accusation"}</h1>
    ${portraitsHtml}
    <p class="result-accused">You accused <strong>${accused.name}</strong>.</p>
    <p>The real culprit was <strong>${antagonist.name}</strong>, the ${antagonist.role}.</p>
    <p>${antagonist.motive}</p>
    ${playerReasoning ? `<p class="result-player-reasoning"><strong>Your reasoning:</strong> ${playerReasoning}</p>` : ""}
    <h3>Supporting evidence:</h3>
    ${cluesHtml}
  `;
}

function portraitOrInitials(suspect, className) {
  return suspect.portrait
    ? `<img class="${className}" src="${suspect.portrait}" alt="${suspect.name}" />`
    : `<div class="${className} reveal-portrait-placeholder">${initials(suspect.name)}</div>`;
}

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
}
