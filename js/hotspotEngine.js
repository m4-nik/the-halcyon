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
export function renderRoom(room, container, { foundHotspotIds, onHotspotClick }) {
  container.innerHTML = "";

  const stage = document.createElement("div");
  stage.className = "room-stage";

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

// A thin haze of drifting dust over the scene — purely atmospheric, never
// blocks a click (pointer-events: none), but it's meant to make the room
// feel uneasy and to make hotspots blend into the background a little
// more, the same way a real search would never be perfectly clear-eyed.
function buildRoomAtmosphere() {
  const atmosphere = document.createElement("div");
  atmosphere.className = "room-atmosphere";
  atmosphere.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 10; i++) {
    const mote = document.createElement("div");
    mote.className = "room-mote";
    mote.style.left = `${Math.random() * 100}%`;
    mote.style.animationDuration = `${(Math.random() * 10 + 14).toFixed(1)}s`;
    mote.style.animationDelay = `${(Math.random() * -20).toFixed(1)}s`;
    atmosphere.appendChild(mote);
  }

  return atmosphere;
}
