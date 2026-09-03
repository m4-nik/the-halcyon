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
//                        they only ever see this text. Every clue should
//                        say what the object actually is, what's happened
//                        to it, and — where it makes sense — who aboard it
//                        connects to and why. Keep decoys just as detailed
//                        and plausible-sounding as real evidence.
//   pointsToSuspectId  - which suspect (by id, from data/suspects.js) this
//                        evidence implicates. Use null for decoys, or for
//                        real clues that are just atmospheric and don't
//                        implicate anyone specific.
//   examineModel       - OPTIONAL. Path to a .glb model (assets/models/).
//                        When set, clicking this hotspot opens a 3D
//                        "examine" view of the model instead of the plain
//                        text popup, with clueText shown underneath it.
//                        Leave unset for a normal hotspot — most should be.
//   examineImage       - OPTIONAL. Path to a static image
//                        (assets/images/examine/) for objects a 3D model
//                        isn't practical for (torn paper, documents, etc).
//                        Same examine-modal treatment as examineModel, just
//                        a plain image instead of a 3D viewer. A hotspot
//                        should only ever set ONE of examineModel /
//                        examineImage, never both.
// ---------------------------------------------------------------------------

export const ROOMS = [
  {
    id: "bridge",
    name: "Bridge",
    image: "assets/images/rooms/bridge.jpg",
    hotspots: [
      {
        id: "bridge-01",
        x: 44,
        y: 48,
        isReal: true,
        clueText:
          "The radio panel behind the helm has had three of its wires deliberately loosened, not frayed — the kind of clean, precise disconnection you'd only manage if you already knew this exact panel by heart. Marcus Reyes has spent years as first mate running comms drills on this very panel; anyone else aboard would have needed a manual and a flashlight just to find the right screws, let alone do it fast enough not to be noticed. Bridge access outside working hours is restricted to the captain and first mate alone — no guest, and almost no other crew member, is supposed to be up here unescorted at all.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-02",
        x: 51,
        y: 80,
        isReal: true,
        clueText:
          "A page has been torn from the captain's log, and the remaining stub has been trimmed unnervingly straight, as if someone wanted the missing entry to look like it was never written at all. The log is normally only handled by the captain and the first mate — and Marcus Reyes is the only one of the two still walking around the ship tonight.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-03",
        x: 70,
        y: 76,
        isReal: true,
        clueText:
          "The course chart shows faint pencil marks tracing an entirely different heading than the one logged for tonight — a diversion route, carefully plotted and then just as carefully erased, though the impression still shows if you tilt the paper to the light. Reading a chart like this, and knowing exactly how to fake a course correction back onto the real heading, takes someone with real navigation experience — someone like the first mate.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-04",
        x: 87,
        y: 68,
        isReal: false,
        clueText:
          "A cork-and-canvas life ring hangs by the window, salt-stained from years of spray, its rope frayed at the loop but the ring itself intact. It's standard safety equipment, inspected and logged every month by whichever crew member is on deck-safety duty that week — tonight, nothing about its condition suggests it's been touched at all.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-05",
        x: 38,
        y: 50,
        isReal: false,
        clueText:
          "A brass compass sits in its housing, the needle drifting a few degrees off true whenever the ship rolls. It could easily have been nudged out of calibration by someone leaning on the housing — or it could simply be worn out, like most of the original fittings on a yacht this age that nobody's gotten around to replacing.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-06",
        x: 72,
        y: 87,
        isReal: false,
        clueText:
          "A porcelain cup sits abandoned near the chart table, the coffee inside gone cold, a faint lipstick mark on the rim. Priya Kapoor was seen coming up to the bridge earlier in the evening to ask about the ship's arrival time — an unusual errand for a business partner who normally keeps to the lower decks and, strictly speaking, has no standing reason to be up here at all, though hardly proof of anything beyond restlessness.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-07",
        x: 78,
        y: 93,
        isReal: false,
        clueText:
          "A folded note sits tucked in the chart drawer, covered in columns of numbers that could be currency figures or could just as easily be fuel-consumption calculations — the ship's paperwork is full of both, and without a ledger to compare it against, there's no way to tell which this is or whose handwriting it belongs to.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "engine-room",
    name: "Engine Room",
    image: "assets/images/rooms/engine-room.jpg",
    hotspots: [
      {
        id: "engine-01",
        x: 42,
        y: 76,
        isReal: true,
        clueText:
          "A wrench sits on the workbench, still faintly warm to the touch, though the main engine has been powered down for hours. Whoever picked it up knew exactly which tool they needed and where to find it in the dark — the kind of familiarity that comes from years working alongside the ship's engineer down here, not from a single visit. Marcus Reyes has that familiarity; almost no one else aboard would.",
        pointsToSuspectId: "marcus-reyes",
        examineModel: "assets/models/wrench.glb",
      },
      {
        id: "engine-02",
        x: 57,
        y: 87,
        isReal: true,
        clueText:
          "A trail of boot prints cuts straight through a patch of spilled oil, running from the main engine block directly to the ladder out — recent enough that the oil's sheen hasn't dulled with air exposure yet. The stride length and boot pattern match ship-issue crew boots, not the deck shoes worn by the yacht's guests, narrowing this down to someone who was on duty tonight.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "engine-03",
        x: 48,
        y: 64,
        isReal: true,
        clueText:
          "The toolbox sits open on the deck, mid-use, tools still scattered rather than racked back into their foam cutouts the way engineer Tomas Bell insists on leaving them. Whoever was working here clearly didn't plan on being interrupted — and left in enough of a hurry that this wasn't a routine repair. Engine-room access is limited to Tomas Bell and the first mate; every other name on the crew roster needs a supervised escort just to walk through the hatch.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "engine-04",
        x: 7,
        y: 27,
        isReal: false,
        clueText:
          "The fuel gauge above the main console reads a steady, unremarkable normal — whatever went wrong down here tonight, the fuel supply itself was never the problem, which rules out at least one obvious explanation for the engine trouble.",
        pointsToSuspectId: null,
      },
      {
        id: "engine-05",
        x: 73,
        y: 44,
        isReal: false,
        clueText:
          "A spare set of engineer's coveralls hangs in the locker, cut and sized for Tomas Bell, the ship's engineer. It's standard practice for him to keep a backup uniform down here in case the first gets soaked in oil mid-shift — on its own, this says nothing beyond the fact that he does his job the way he's supposed to.",
        pointsToSuspectId: "tomas-bell",
      },
      {
        id: "engine-06",
        x: 17,
        y: 85,
        isReal: false,
        clueText:
          "The maintenance log has one entry scratched through and rewritten, in handwriting that doesn't match the neat mechanical shorthand Tomas Bell uses everywhere else in the book. The correction looks more like the tidy, deliberate hand Priya Kapoor uses on the business ledgers — old habits from a career spent fixing other people's numbers.",
        pointsToSuspectId: "priya-kapoor",
      },
      {
        id: "engine-07",
        x: 83,
        y: 38,
        isReal: false,
        clueText:
          "A coil of rope has been looped and tied off with the same tight, methodical wrap Ingrid Sorensen uses when she organizes the owner's luggage and supply crates — not the looser coil crew usually leave lying around down here. Ingrid has no standing reason to be down here at all; her duties never bring her below the guest deck, which makes this rope all the more curious.",
        pointsToSuspectId: "ingrid-sorensen",
      },
      {
        id: "engine-08",
        x: 84,
        y: 80,
        isReal: false,
        clueText:
          "An untouched thermos sits on the shelf above the workbench, still capped, the metal cold to the touch. Dr. Elena Voss has mentioned more than once that she avoids eating or drinking anywhere near the machinery — if this is hers, she apparently didn't stay down here long enough to open it.",
        pointsToSuspectId: "elena-voss",
      },
    ],
  },
  {
    id: "guest-cabins",
    name: "Guest Cabins",
    image: "assets/images/rooms/guest-cabins.jpg",
    hotspots: [
      {
        id: "cabin-01",
        x: 97,
        y: 58,
        isReal: true,
        clueText:
          "A boarding chit tucked into the nightstand drawer is stamped for crew quarters, not this guest cabin — meaning whoever's been sleeping in here isn't supposed to be. Crew are strictly forbidden from occupying guest cabins without the owner's sign-off, and the only crew member with any reason to quietly relocate into an empty one, away from the corridor where his comings and goings would be noticed, is the first mate.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cabin-02",
        x: 40,
        y: 52,
        isReal: true,
        clueText:
          "A torn note sits crumpled at the back of the drawer, the visible half reading only '...after the crew turns in.' The torn edge matches, fiber for fiber, a scrap already found in the galley — meaning this note was written, torn, and half-discarded in two different rooms by the same person, someone moving freely between crew spaces and guest cabins alike.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cabin-03",
        x: 63,
        y: 32,
        isReal: true,
        clueText:
          "A jacket is draped over the back of the chair — its cut, buttons, and fabric weight match a first mate's uniform tunic, not the evening wear this cabin's rightful guest would have packed. It doesn't belong to whoever's cabin this technically is, and there's exactly one crew member whose uniform fits that description.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cabin-04",
        x: 71,
        y: 33,
        isReal: false,
        clueText:
          "Wine and a spread of paperwork cover the desk, an open ledger showing figures well past what Priya Kapoor's business normally turns over in a season. This is her own cabin, at least — nothing forbidden about being in it. Apparently even on a private cruise, with the owner's yacht drifting under a dark sky, her financial troubles don't take the night off.",
        pointsToSuspectId: "priya-kapoor",
      },
      {
        id: "cabin-05",
        x: 47,
        y: 68,
        isReal: false,
        clueText:
          "A suitcase sits half-packed on the floor, and beneath a fold of clothing, the corner of a medical supply bag tag is just visible — the kind Dr. Elena Voss would carry for the owner's care, not for a routine overnight stay. Packing to leave in a hurry, or simply an overly cautious physician's habit — hard to say without asking her directly.",
        pointsToSuspectId: "elena-voss",
      },
      {
        id: "cabin-06",
        x: 89,
        y: 43,
        isReal: false,
        clueText:
          "A small jewelry box sits locked on the dresser, the kind of personal item Ingrid Sorensen would be trusted to safeguard as the owner's assistant, but never authorized to open herself. Whatever's inside isn't yours to find out, and it has nothing obvious to do with tonight.",
        pointsToSuspectId: "ingrid-sorensen",
      },
      {
        id: "cabin-07",
        x: 93,
        y: 48,
        isReal: false,
        clueText:
          "A photo in a cheap plastic frame sits on the nightstand — not a family portrait, but a candid shot of the engine room, taken from an angle that suggests someone was proud enough of the machinery to photograph it. Only one person aboard would frame a picture of pipework instead of people: Tomas Bell, whose devotion to that engine borders on sentimental.",
        pointsToSuspectId: "tomas-bell",
      },
      {
        id: "cabin-08",
        x: 15,
        y: 86,
        isReal: false,
        clueText:
          "A room-service tray sits by the door, the food on it barely touched — a few bites taken and abandoned, the cutlery still folded in its napkin. Whoever ordered it clearly didn't plan on staying in the cabin long enough to actually eat, though there's no name on the order slip to say who.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "galley",
    name: "Galley",
    image: "assets/images/rooms/galley.jpg",
    hotspots: [
      {
        id: "galley-01",
        x: 27,
        y: 57,
        isReal: true,
        clueText:
          "Two wine glasses, both used, left out near the knife block. Someone met the first mate here tonight, off the record.",
        pointsToSuspectId: "marcus-reyes",
        examineImage: "assets/images/examine/wine-glasses.png",
      },
      {
        id: "galley-02",
        x: 7,
        y: 17,
        isReal: true,
        clueText: "A note, torn at the corner: '...after the crew turns in.' No signature.",
        pointsToSuspectId: "marcus-reyes",
        examineImage: "assets/images/examine/torn-note-galley.png",
      },
      {
        id: "galley-03",
        x: 47,
        y: 68,
        isReal: true,
        clueText:
          "A food container marked 'VE22' — not a recipe code. Looks more like a cabin number.",
        pointsToSuspectId: "marcus-reyes",
        examineImage: "assets/images/examine/rice-box.png",
      },
      {
        id: "galley-04",
        x: 70,
        y: 27,
        isReal: false,
        clueText:
          "Lobster Bisque, crossed off in a hurry. The owner's allergic — the ship's physician would know that better than most.",
        pointsToSuspectId: "elena-voss",
        examineImage: "assets/images/examine/menu-board.png",
      },
      {
        id: "galley-05",
        x: 57,
        y: 30,
        isReal: false,
        clueText:
          "A row of jars, one lid loose and resting slightly askew — inventory sign-offs again, an easy oversight.",
        pointsToSuspectId: "ingrid-sorensen",
        examineImage: "assets/images/examine/jars.png",
      },
      {
        id: "galley-06",
        x: 80,
        y: 85,
        isReal: false,
        clueText: "Glass and shell scraps swept toward the bin. Someone cleaned up fast and didn't finish.",
        pointsToSuspectId: "tomas-bell",
        examineImage: "assets/images/examine/bin.png",
      },
      {
        id: "galley-07",
        x: 8,
        y: 35,
        isReal: false,
        clueText:
          "The first aid kit sits open. Odd, for someone who spends her nights doing the books, not tending wounds.",
        pointsToSuspectId: "priya-kapoor",
        examineModel: "assets/models/first-aid-kit.glb",
      },
      {
        id: "galley-08",
        x: 17,
        y: 22,
        isReal: false,
        clueText: "A date circled in red on the galley calendar. Whatever's planned, it's soon.",
        pointsToSuspectId: null,
        examineImage: "assets/images/examine/calendar.png",
      },
    ],
  },
  {
    id: "upper-deck",
    name: "Upper Deck",
    image: "assets/images/rooms/upper-deck.jpg",
    hotspots: [
      {
        id: "deck-01",
        x: 8,
        y: 80,
        isReal: true,
        clueText: "A coil of rope, freshly re-tied. The knot isn't a guest's work — it's a sailor's hitch.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "deck-02",
        x: 50,
        y: 53,
        isReal: true,
        clueText:
          "The life ring hangs a little crooked, as if someone leaned here recently, close to the railing, alone.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "deck-03",
        x: 65,
        y: 78,
        isReal: true,
        clueText:
          "A scattering of papers near the table — shipping routes, matching the private charts from the bridge.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "deck-04",
        x: 52,
        y: 70,
        isReal: false,
        clueText: "A glass of wine, barely touched. She never really drinks on duty.",
        pointsToSuspectId: "elena-voss",
        examineImage: "assets/images/examine/wine-glass-deck.png",
      },
      {
        id: "deck-05",
        x: 60,
        y: 50,
        isReal: false,
        clueText: "A robe draped over the chair, still faintly damp. She mentioned she couldn't sleep last night.",
        pointsToSuspectId: "ingrid-sorensen",
      },
      {
        id: "deck-06",
        x: 73,
        y: 90,
        isReal: false,
        clueText: "A pair of sandals, kicked off mid-thought. Hers, by the initials stitched inside.",
        pointsToSuspectId: "priya-kapoor",
      },
      {
        id: "deck-07",
        x: 89,
        y: 17,
        isReal: false,
        clueText: "The wick's been freshly trimmed — an engineer's habit, keeping every flame steady.",
        pointsToSuspectId: "tomas-bell",
      },
      {
        id: "deck-08",
        x: 68,
        y: 72,
        isReal: false,
        clueText: "A tablet, screen dark, left face-down on the deck. Someone left in a hurry.",
        pointsToSuspectId: null,
      },
    ],
  },
  {
    id: "cargo-hold",
    name: "Cargo Hold",
    image: "assets/images/rooms/cargo-hold.jpg",
    hotspots: [
      {
        id: "cargo-01",
        x: 60,
        y: 85,
        isReal: true,
        clueText:
          "Boot prints track through the settled dust on the floor, leading in a straight, purposeful line to this crate and back again — recent enough that the dust hasn't had time to resettle over them. The cargo hold is locked to all but the first mate and a rotating logistics crew member; no guest, and almost no other crew, holds a key. Whoever came down here knew exactly which crate they wanted and didn't waste time looking around at the others.",
        pointsToSuspectId: "marcus-reyes",
        examineModel: "assets/models/footprints.glb",
      },
      {
        id: "cargo-02",
        x: 30,
        y: 76,
        isReal: true,
        clueText:
          "The cargo manifest's final line has clearly been rewritten, the ink a shade darker and the handwriting slightly tighter than the entries above it — someone went back after the fact and altered what's supposedly stored in this hold, using a different pen than whoever filled out the rest of the page.",
        pointsToSuspectId: "marcus-reyes",
        examineImage: "assets/images/examine/clipboard-log.png",
      },
      {
        id: "cargo-03",
        x: 48,
        y: 60,
        isReal: true,
        clueText:
          "This crate sits pulled slightly apart from the stack around it, its corner visibly pried and re-nailed in a hurry, nails driven at a rushed angle rather than flush and square. Someone opened this, checked what was inside, and closed it back up fast enough to leave the seams uneven.",
        pointsToSuspectId: "marcus-reyes",
        examineModel: "assets/models/pried-crate.glb",
      },
      {
        id: "cargo-04",
        x: 84,
        y: 38,
        isReal: false,
        clueText:
          "Something bulky sits under a canvas tarp near the back wall, roughly crate-sized but unmarked. Dr. Elena Voss has no standing reason to store anything down here herself — the guest cabins have more than enough room for medical supplies — but it could easily be something she had a crew member move for her to free up space in the cabin she's using as an examination room, though nobody's confirmed that's actually what's under there.",
        pointsToSuspectId: "elena-voss",
        examineModel: "assets/models/tarp-covered-object.glb",
      },
      {
        id: "cargo-05",
        x: 13,
        y: 38,
        isReal: false,
        clueText:
          "One life jacket is missing from its usual row on the rack, leaving a gap between its neighbors. Standard enough, if Tomas Bell borrowed it while working near the hull tonight — engineers pull safety gear for hull inspections often enough that it barely raises an eyebrow.",
        pointsToSuspectId: "tomas-bell",
        examineModel: "assets/models/life-jacket.glb",
      },
      {
        id: "cargo-06",
        x: 12,
        y: 52,
        isReal: false,
        clueText:
          "A note is pinned to the side of a crate, business shorthand scrawled hastily in the margin — the kind of quick notation Priya Kapoor uses on her own paperwork. It reads like an inventory note dashed off between other tasks, not anything more sinister on its face.",
        pointsToSuspectId: "priya-kapoor",
        examineImage: "assets/images/examine/torn-note.png",
      },
      {
        id: "cargo-07",
        x: 79,
        y: 76,
        isReal: false,
        clueText:
          "A heavy chain lies looped around a stack of crates but never actually secured, the end left hanging loose instead of clipped. Ingrid Sorensen handles inventory sign-offs for cargo like this — an easy mistake to make while rushing through a checklist alone, late at night, with nobody double-checking her work.",
        pointsToSuspectId: "ingrid-sorensen",
        examineModel: "assets/models/chain.glb",
      },
      {
        id: "cargo-08",
        x: 20,
        y: 67,
        isReal: false,
        clueText:
          "A flashlight lies on a low shelf, still switched on, its beam noticeably dimmer than it should be — the battery's been draining for a while now, quietly, in the dark, with nobody around to notice or turn it off.",
        pointsToSuspectId: null,
        examineModel: "assets/models/flashlight.glb",
      },
    ],
  },
];
