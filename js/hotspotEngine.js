// ---------------------------------------------------------------------------
// HOTSPOT ENGINE
// Renders one room (background + its hotspots) into a container element.
// Does not know or care how many hotspots a room has — it just loops over
// whatever is in room.hotspots.
// ---------------------------------------------------------------------------

// Renders `room` into `container`.
// options.foundHotspotIds - a Set of hotspot ids already clicked, so they
//                            can be marked as "checked".
// options.onHotspotClick   - callback(room, hotspot) fired on every click,
//                            including re-clicks of an already-checked spot.
// options.planPercent     - the Antagonist's Plan progress (0-100). The
//                            room's atmosphere gets visibly more oppressive
//                            as this climbs, so the danger closing in is
//                            something the player can actually feel, not
//                            just read off a bar in the top corner.
export function renderRoom(room, container, { foundHotspotIds, onHotspotClick, planPercent = 0 }) {
  container.innerHTML = "";

  const stage = document.createElement("div");
  stage.className = "room-stage";

  if (planPercent >= 75) {
    stage.classList.add("urgency-critical");
  } else if (planPercent >= 40) {
    stage.classList.add("urgency-elevated");
  }

  if (room.image) {
    stage.style.backgroundImage = `url('${room.image}')`;
    stage.classList.add("room-stage-image");
  } else {
    stage.style.backgroundColor = room.placeholderColor || "#333";
    stage.classList.add("room-stage-placeholder");

    const label = document.createElement("div");
    label.className = "room-placeholder-label";
    label.textContent = room.name;
    stage.appendChild(label);
  }

  room.hotspots.forEach((hotspot) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hotspot";
    dot.style.left = `${hotspot.x}%`;
    dot.style.top = `${hotspot.y}%`;
    dot.setAttribute("aria-label", "Investigate");

    if (foundHotspotIds.has(hotspot.id)) {
      dot.classList.add("checked");
    }

    dot.addEventListener("click", () => onHotspotClick(room, hotspot));
    stage.appendChild(dot);
  });

  stage.appendChild(buildRoomAtmosphere());
  container.appendChild(stage);
}

// A haze of drifting dust and two slow-moving fog wisps over the scene —
// purely atmospheric, never blocks a click (pointer-events: none), but
// meant to make the room feel uneasy and to make hotspots blend into the
// background a little, the same way a real search would never be
// perfectly clear-eyed.
function buildRoomAtmosphere() {
  const atmosphere = document.createElement("div");
  atmosphere.className = "room-atmosphere";
  atmosphere.setAttribute("aria-hidden", "true");

  const wispA = document.createElement("div");
  wispA.className = "room-fog room-fog-a";
  atmosphere.appendChild(wispA);

  const wispB = document.createElement("div");
  wispB.className = "room-fog room-fog-b";
  atmosphere.appendChild(wispB);

  for (let i = 0; i < 12; i++) {
    const mote = document.createElement("div");
    mote.className = "room-mote";
    mote.style.left = `${Math.random() * 100}%`;
    mote.style.animationDuration = `${(Math.random() * 10 + 14).toFixed(1)}s`;
    mote.style.animationDelay = `${(Math.random() * -20).toFixed(1)}s`;
    atmosphere.appendChild(mote);
  }

  return atmosphere;
}
