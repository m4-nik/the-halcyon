export const ROOMS = [
  {
    id: "bridge",
    name: "Bridge",
    image: "assets/images/rooms/bridge.jpg",
    hotspots: []
  },
  {
    id: "engine-room",
    name: "Engine Room",
    image: "assets/images/rooms/engine-room.jpg",
    hotspots: []
  },
  {
    id: "guest-cabins",
    name: "Guest Cabins",
    image: "assets/images/rooms/guest-cabins.jpg",
    hotspots: []
  },
  {
    id: "galley",
    name: "Galley",
    image: "assets/images/rooms/galley.jpg",
    hotspots: []
  },
  {
    id: "upper-deck",
    name: "Upper Deck",
    image: "assets/images/rooms/upper-deck.jpg",
    hotspots: []
  },
  {
    id: "cargo-hold",
    name: "Cargo Hold",
    image: "assets/images/rooms/cargo-hold.jpg",
    hotspots: []
  },
  {
    id: "lower-decks",
    name: "Lower Decks",
    image: "./assets/images/rooms/lower-decks.jpg",
    isLocked: true,
    hotspots: [
      {
        id: "lower-01-captain-body",
        x: 30,
        y: 45,
        isReal: true,
        clueText: "The Captain lies motionless beside the locked-down engineering controls. Examination confirms a firearm wound. The single gunshot heard during the emergency transmission appears to have struck him here, placing Marcus at the scene of the Captain's death.",
        pointsToSuspectId: null
      },

      {
        id: "lower-02-blueprint",
        x: 66,
        y: 72,
        isReal: true,
        clueText: "A vessel service blueprint has been left among the disturbed papers. Unlike the passenger-facing deck plans, this schematic shows restricted maintenance spaces and an alternate internal service route through the lower structure.",
        pointsToSuspectId: null,
        examineImage: "assets/images/examine/lower-decks-blueprint.jpg"
      },


      {
        id: "lower-03-marcus-axe-wound",
        x: 83,
        y: 60,
        isReal: true,
        clueText: "Marcus Reyes is also dead, but his fatal injury is completely different: a severe sharp-force wound consistent with a heavy bladed weapon such as a fire axe. The single gunshot heard in the Captain's transmission cannot account for Marcus's death. Someone else reached him afterward.",
        pointsToSuspectId: null
      },
      {
        id: "lower-04-empty-fire-axe-station",
        x: 73,
        y: 25,
        isReal: true,
        clueText: "The emergency fire-axe cabinet is open and empty. A weapon has been removed from the station recently. Combined with Marcus's fatal wound, this strongly suggests the killer used shipboard emergency equipment already available on the lower deck.",
        pointsToSuspectId: null
      },
      {
        id: "lower-05-shell-casing",
        x: 31,
        y: 55,
        isReal: true,
        clueText: "A single spent casing lies near the captain's side of the room. Only one shot appears to have been fired here. That supports the idea that the captain was shot once, while Marcus was killed separately by another method.",
        pointsToSuspectId: null
      },
      {
        id: "lower-06-sealed-bulkhead",
        x: 28,
        y: 26,
        isReal: true,
        clueText: "The main lower-deck bulkhead remains officially locked down and sealed. If a third person entered or left after the confrontation, they likely did not use the obvious door. There must be another access route into this section.",
        pointsToSuspectId: null
      },
      {
        id: "lower-07-service-panel-exit",
        x: 91,
        y: 34,
        isReal: true,
        clueText: "Behind the maintenance-side service access, there are signs of recent use: exposed wiring, open interior space, and a route that does not belong to normal guest movement. Someone familiar with restricted ship infrastructure could have entered or escaped through here unseen.",
        pointsToSuspectId: null
      },
      {

        id: "lower-08-captain-terminal",
        x: 50,
        y: 24,
        isReal: true,
        clueText: "The captain's lower-deck terminal is still powered under emergency mode. The display references internal deck layers and engineering zones, reinforcing that this section connects to hidden service infrastructure rather than standard guest-access corridors.",
        pointsToSuspectId: null
      },
      {
        id: "lower-09-disturbed-search-site",
        x: 64,
        y: 65,
        isReal: true,
        clueText: "The storage cases and papers near Marcus have been disturbed in a hurry. Several containers were opened and documents pulled aside as though he was searching for something specific. Marcus did not leave immediately after the Captain was shot — he stayed behind looking for something.",
        pointsToSuspectId: null
      }
    ]
  }
];


