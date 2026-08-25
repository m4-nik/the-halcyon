// ---------------------------------------------------------------------------
// FINAL ACCUSATION
// Renders the accusation form, checks the player's pick against the
// suspect flagged isAntagonist: true, and renders the result screen.
// ---------------------------------------------------------------------------

export function renderAccusationForm(container, suspects, onSubmit) {
  container.innerHTML = `
    <p>Who do you believe is behind the plan to divert the Halcyon?</p>
    <select id="accuse-select"></select>
    <textarea id="accuse-reasoning" placeholder="Optional: explain your reasoning..." rows="4"></textarea>
    <button id="accuse-submit">Submit Accusation</button>
  `;

  const select = container.querySelector("#accuse-select");
  suspects.forEach((suspect) => {
    const option = document.createElement("option");
    option.value = suspect.id;
    option.textContent = `${suspect.name} — ${suspect.role}`;
    select.appendChild(option);
  });

  container.querySelector("#accuse-submit").addEventListener("click", () => {
    const suspectId = select.value;
    const reasoning = container.querySelector("#accuse-reasoning").value.trim();
    onSubmit(suspectId, reasoning);
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

  container.innerHTML = `
    <h1>${correct ? "Case Closed — Correct Accusation" : "Case Closed — Wrong Accusation"}</h1>
    <p class="result-accused">You accused <strong>${accused.name}</strong>.</p>
    <p>The real culprit was <strong>${antagonist.name}</strong>, the ${antagonist.role}.</p>
    <p>${antagonist.motive}</p>
    ${playerReasoning ? `<p class="result-player-reasoning"><strong>Your reasoning:</strong> ${playerReasoning}</p>` : ""}
    <h3>Supporting evidence:</h3>
    ${cluesHtml}
  `;
}
