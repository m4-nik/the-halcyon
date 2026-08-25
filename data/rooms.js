// ---------------------------------------------------------------------------
// ROOMS DATA
// This is the file non-coders on the team should edit to add/change rooms,
// hotspots, and clue text. Nothing here requires touching any file in /js.
//
// ROOM fields:
//   id              - unique lowercase-with-dashes id, used internally.
//   name            - display name shown in the room nav and on placeholder
//                     boxes.
//   image           - path to a background image (e.g.
//                     "assets/images/rooms/bridge.jpg"). Leave it as null
//                     until real art exists — the room will render as a
//                     colored placeholder box with the room name on it
//                     instead, so the game is fully playable before any art
//                     is ready.
//   placeholderColor - CSS color used for that placeholder box. Ignored
//                     once `image` is set.
//   hotspots        - array of clickable spots in this room. There is no
//                     required or maximum count — add as many as you like,
//                     the engine doesn't assume a number.
//
// HOTSPOT fields:
//   id                 - unique id (must be unique across the WHOLE game,
//                        not just this room — "<room-id>-01" etc. is a safe
//                        pattern).
//   x, y               - position as a PERCENTAGE (0-100) of the image's
//                        width/height, not pixels. This is what keeps
//                        hotspots correctly placed at any screen size.
//   isReal             - true if this is genuine evidence that counts
//                        toward the "valid hints found" total. false if
//                        it's a red herring / decoy — still worth writing
//                        interesting text for, just doesn't count.
//   clueText           - what the player reads when they click this spot.
//                        The player is never told isReal/false directly —
//                        they only ever see this text.
//   pointsToSuspectId  - which suspect (by id, from data/suspects.js) this
//                        evidence implicates. Use null for decoys, or for
//                        real clues that are just atmospheric and don't
//                        implicate anyone specific.
// ---------------------------------------------------------------------------

export const ROOMS = [
  {
    id: "bridge",
    name: "Bridge",
    image: null,
    placeholderColor: "#1b2a4a",
    hotspots: [
      {
        id: "bridge-01",
        x: 28,
        y: 55,
        isReal: true,
        clueText:
          "The radio panel's wires have been loosened — but the cuts are too clean, too deliberate. Not the ragged edges of an accident. Whoever did this knew exactly which wires to pull.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-02",
        x: 62,
        y: 38,
        isReal: true,
        clueText:
          "A page has been torn from the captain's log. The remaining stub is trimmed suspiciously straight, like someone wanted it to look like it had never been there at all.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-03",
        x: 45,
        y: 72,
        isReal: true,
        clueText:
          "The course chart shows faint pencil marks — a diversion route, plotted and then carefully erased. You can still make out the heading if you tilt it to the light.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-04",
        x: 15,
        y: 30,
        isReal: false,
        clueText:
          "A life ring, salt-stained and ordinary, hangs by the window. Nothing about it seems out of place.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-05",
        x: 80,
        y: 60,
        isReal: false,
        clueText:
          "A brass compass sits slightly off true. Could be tampered with — or just old and poorly maintained, like everything else on a yacht this age.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-06",
        x: 55,
        y: 20,
        isReal: false,
        clueText:
          "A half-finished coffee cup with a faint lipstick mark on the rim. Priya was up here recently. That alone doesn't mean anything.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-07",
        x: 70,
        y: 82,
        isReal: false,
        clueText:
          "A folded note in the chart drawer, covered in numbers that could be financial figures — or could just be fuel calculations. Hard to tell without more context.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "engine-room",
    name: "Engine Room",
    image: null,
    placeholderColor: "#3a2f1b",
    hotspots: [
      {
        id: "engine-room-01",
        x: 32,
        y: 58,
        isReal: true,
        clueText:
          "A wrench, still warm. Someone used this recently — and the engine's been shut down for hours.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "engine-room-02",
        x: 60,
        y: 40,
        isReal: true,
        clueText:
          "The comms relay box has had its fuses pulled and reinserted upside down — just enough to fail quietly, in a way that looks like natural wear rather than sabotage. Whoever did this understood exactly how to fake an accident.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "engine-room-03",
        x: 20,
        y: 25,
        isReal: false,
        clueText:
          "Oil-stained overalls hang by the hatch — Tomas's, as always. He practically lives down here.",
        pointsToSuspectId: null,
      },
      {
        id: "engine-room-04",
        x: 75,
        y: 65,
        isReal: false,
        clueText:
          "The toolbox is missing a socket set. Odd, but engineers misplace tools constantly. Probably nothing.",
        pointsToSuspectId: null,
      },
      {
        id: "engine-room-05",
        x: 48,
        y: 80,
        isReal: false,
        clueText:
          "The maintenance logbook is filled with obsessively neat entries in Tomas's handwriting. Unsettling in its precision, but that's just who he is.",
        pointsToSuspectId: null,
      },
      {
        id: "engine-room-06",
        x: 85,
        y: 30,
        isReal: false,
        clueText:
          "A hidden flask tucked behind a pipe. Not exactly a smoking gun — half the crew probably has one somewhere.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "guest-cabins",
    name: "Guest Cabins",
    image: null,
    placeholderColor: "#4a1b3a",
    hotspots: [
      {
        id: "guest-cabins-01",
        x: 25,
        y: 45,
        isReal: true,
        clueText:
          "A spare set of bridge keys, hidden inside a boot in the crew corridor cabin — right next to Marcus's bunk. He was never issued a spare set.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "guest-cabins-02",
        x: 65,
        y: 60,
        isReal: true,
        clueText:
          "A torn ledger fragment tucked under a mattress, listing a payout figure and a set of initials: M.R.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "guest-cabins-03",
        x: 40,
        y: 30,
        isReal: false,
        clueText:
          "In Priya's cabin: a stack of unpaid invoices, the handwriting in the margins increasingly frantic. She needs this deal — whatever it is — to close.",
        pointsToSuspectId: null,
      },
      {
        id: "guest-cabins-04",
        x: 80,
        y: 40,
        isReal: false,
        clueText:
          "In Dr. Voss's cabin: medical files on the yacht's owner, alongside notes that read less like a physician's concern and more like an investigator's questions.",
        pointsToSuspectId: null,
      },
      {
        id: "guest-cabins-05",
        x: 15,
        y: 70,
        isReal: false,
        clueText:
          "In Ingrid's cabin: a torn note reading 'I can't keep covering for them.' No indication of who 'them' is.",
        pointsToSuspectId: null,
      },
      {
        id: "guest-cabins-06",
        x: 55,
        y: 80,
        isReal: false,
        clueText:
          "A locked diary sits on a nightstand. You can't get it open. Someone clearly doesn't want it read.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "galley",
    name: "Galley",
    image: null,
    placeholderColor: "#1b4a3a",
    hotspots: [
      {
        id: "galley-01",
        x: 30,
        y: 35,
        isReal: true,
        clueText:
          "A crew schedule pinned to the corkboard shows Marcus swapped himself onto the graveyard watch — the exact shift the diversion appears to be planned for.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "galley-02",
        x: 68,
        y: 55,
        isReal: true,
        clueText:
          "A half-burnt page in the stove ash. What's left looks like a hand-drawn route — and the surviving edge lines up exactly with the diversion marks on the bridge chart.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "galley-03",
        x: 45,
        y: 75,
        isReal: false,
        clueText:
          "Dr. Voss's medication list for the owner sits on the counter. Sedatives, mostly. Standard prescription — or something more?",
        pointsToSuspectId: null,
      },
      {
        id: "galley-04",
        x: 20,
        y: 60,
        isReal: false,
        clueText:
          "A galley knife is missing from the rack. Probably just misplaced during the last storm.",
        pointsToSuspectId: null,
      },
      {
        id: "galley-05",
        x: 80,
        y: 30,
        isReal: false,
        clueText:
          "Ingrid's dinner tray sits untouched by the door. She's been too nervous to eat since the yacht left harbor.",
        pointsToSuspectId: null,
      },
      {
        id: "galley-06",
        x: 55,
        y: 20,
        isReal: false,
        clueText:
          "A supplier receipt neither the owner nor the cook remembers ordering from. Probably an admin mix-up.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "upper-deck",
    name: "Upper Deck",
    image: null,
    placeholderColor: "#2a3a4a",
    hotspots: [
      {
        id: "upper-deck-01",
        x: 35,
        y: 40,
        isReal: true,
        clueText:
          "The satellite antenna cable has been cut clean with a proper tool — not the frayed, torn edge you'd expect from storm damage.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "upper-deck-02",
        x: 70,
        y: 60,
        isReal: true,
        clueText:
          "One of the lifeboats has been quietly pre-loaded with supplies for a single passenger, and rigged to lower fast and silently. Nobody authorized this.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "upper-deck-03",
        x: 20,
        y: 70,
        isReal: false,
        clueText:
          "Deck chairs are knocked over and scattered. Probably just the wind picking up overnight.",
        pointsToSuspectId: null,
      },
      {
        id: "upper-deck-04",
        x: 55,
        y: 30,
        isReal: false,
        clueText:
          "A dropped earring glints near the railing. Priya's — she was pacing out here late last night, by all accounts.",
        pointsToSuspectId: null,
      },
      {
        id: "upper-deck-05",
        x: 82,
        y: 45,
        isReal: false,
        clueText:
          "A cigarette stub of an unfamiliar brand. Doesn't seem to match anyone officially on the guest list.",
        pointsToSuspectId: null,
      },
      {
        id: "upper-deck-06",
        x: 45,
        y: 80,
        isReal: false,
        clueText:
          "A pair of binoculars left out, still aimed at a faint light on the distant horizon. Waiting for a signal, or just stargazing?",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "cargo-hold",
    name: "Cargo Hold",
    image: null,
    placeholderColor: "#2f2f2f",
    hotspots: [
      {
        id: "cargo-hold-01",
        x: 30,
        y: 50,
        isReal: true,
        clueText:
          "A duffel bag stashed behind the crates: cash, a change of clothes, and a fake manifest. This looks exactly like a payout, packed and ready to disappear with.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cargo-hold-02",
        x: 65,
        y: 35,
        isReal: true,
        clueText:
          "The cargo manifest doesn't match what's actually stored down here — discrepancies careful enough that only someone with real bridge access could have covered them up.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cargo-hold-03",
        x: 15,
        y: 65,
        isReal: false,
        clueText:
          "Tomas's spare engine parts, neatly catalogued in labeled crates. Thoroughly boring, thoroughly explainable.",
        pointsToSuspectId: null,
      },
      {
        id: "cargo-hold-04",
        x: 78,
        y: 60,
        isReal: false,
        clueText:
          "A crate addressed to Priya's company, still unopened. No way to tell what's inside without breaking the seal.",
        pointsToSuspectId: null,
      },
      {
        id: "cargo-hold-05",
        x: 50,
        y: 78,
        isReal: false,
        clueText:
          "A ledger detailing the owner's shipping company finances — the exact kind of numbers Dr. Voss has been quietly asking about.",
        pointsToSuspectId: null,
      },
      {
        id: "cargo-hold-06",
        x: 40,
        y: 25,
        isReal: false,
        clueText:
          "A locked toolbox, and nobody on board seems to know who has the key.",
        pointsToSuspectId: null,
      },
    ],
  },
];
