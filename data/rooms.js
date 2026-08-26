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
          "The radio panel behind the helm has had three of its wires deliberately loosened, not frayed — the kind of clean, precise disconnection you'd only manage if you already knew this exact panel by heart. Marcus Reyes has spent years as first mate running comms drills on this very panel; anyone else aboard would have needed a manual and a flashlight just to find the right screws, let alone do it fast enough not to be noticed.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-02",
        x: 62,
        y: 38,
        isReal: true,
        clueText:
          "A page has been torn from the captain's log, and the remaining stub has been trimmed unnervingly straight, as if someone wanted the missing entry to look like it was never written at all. The log is normally only handled by the captain and the first mate — and Marcus Reyes is the only one of the two still walking around the ship tonight.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-03",
        x: 45,
        y: 72,
        isReal: true,
        clueText:
          "The course chart shows faint pencil marks tracing an entirely different heading than the one logged for tonight — a diversion route, carefully plotted and then just as carefully erased, though the impression still shows if you tilt the paper to the light. Reading a chart like this, and knowing exactly how to fake a course correction back onto the real heading, takes someone with real navigation experience — someone like the first mate.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "bridge-04",
        x: 15,
        y: 30,
        isReal: false,
        clueText:
          "A cork-and-canvas life ring hangs by the window, salt-stained from years of spray, its rope frayed at the loop but the ring itself intact. It's standard safety equipment, inspected and logged every month by whichever crew member is on deck-safety duty that week — tonight, nothing about its condition suggests it's been touched at all.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-05",
        x: 80,
        y: 60,
        isReal: false,
        clueText:
          "A brass compass sits in its housing, the needle drifting a few degrees off true whenever the ship rolls. It could easily have been nudged out of calibration by someone leaning on the housing — or it could simply be worn out, like most of the original fittings on a yacht this age that nobody's gotten around to replacing.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-06",
        x: 55,
        y: 20,
        isReal: false,
        clueText:
          "A porcelain cup sits abandoned near the chart table, the coffee inside gone cold, a faint lipstick mark on the rim. Priya Kapoor was seen coming up to the bridge earlier in the evening to ask about the ship's arrival time — an unusual errand for a business partner who normally keeps to the lower decks, though hardly proof of anything beyond restlessness.",
        pointsToSuspectId: null,
      },
      {
        id: "bridge-07",
        x: 70,
        y: 82,
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
          "The toolbox sits open on the deck, mid-use, tools still scattered rather than racked back into their foam cutouts the way engineer Tomas Bell insists on leaving them. Whoever was working here clearly didn't plan on being interrupted — and left in enough of a hurry that this wasn't a routine repair.",
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
          "A coil of rope has been looped and tied off with the same tight, methodical wrap Ingrid Sorensen uses when she organizes the owner's luggage and supply crates — not the looser coil crew usually leave lying around down here. It suggests someone unfamiliar with engine-room habits was recently in this exact spot.",
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
          "A boarding chit tucked into the nightstand drawer is stamped for crew quarters, not this guest cabin — meaning whoever's been sleeping in here isn't supposed to be. The only crew member with any reason to quietly relocate into an empty guest cabin, away from the crew corridor where his comings and goings would be noticed, is the first mate.",
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
          "Wine and a spread of paperwork cover the desk, an open ledger showing figures well past what Priya Kapoor's business normally turns over in a season. Apparently even on a private cruise, with the owner's yacht drifting under a dark sky, her financial troubles don't take the night off.",
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
    image: null,
    placeholderColor: "#1b4a3a",
    hotspots: [
      {
        id: "galley-01",
        x: 30,
        y: 35,
        isReal: true,
        clueText:
          "A handwritten crew schedule is pinned to the corkboard by the pass-through window, and one line has been altered in ink darker than the rest: Marcus Reyes swapped himself onto the graveyard watch — the exact overnight shift when the diversion appears to have been set in motion. Nobody else on the schedule made any changes at all.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "galley-02",
        x: 68,
        y: 55,
        isReal: true,
        clueText:
          "A half-burnt page sits in the cold stove ash, most of it curled to black but one surviving corner still legible — a hand-drawn line that, held up beside the bridge chart, lines up exactly with the diversion route marked and erased up there. Someone tried to burn the evidence and didn't quite finish the job.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "galley-03",
        x: 45,
        y: 75,
        isReal: false,
        clueText:
          "Dr. Elena Voss's medication list for the yacht's owner sits on the counter, mostly routine sedatives and heart medication, refilled on a normal schedule. Nothing on the list looks altered or out of place — it reads exactly like what a careful physician would prescribe for a longtime patient.",
        pointsToSuspectId: null,
      },
      {
        id: "galley-04",
        x: 20,
        y: 60,
        isReal: false,
        clueText:
          "A single galley knife is missing from the magnetic rack above the counter, its outline still visible in the dust where it usually hangs. Knives go missing in a working kitchen more often than anyone likes to admit — swept overboard in rough weather, or simply misplaced during the last resupply.",
        pointsToSuspectId: null,
      },
      {
        id: "galley-05",
        x: 80,
        y: 30,
        isReal: false,
        clueText:
          "Ingrid Sorensen's dinner tray sits untouched by the door, the food gone cold under its cover. She's barely eaten since the yacht left harbor, by the cook's account — nerves, most likely, though nobody's pressed her on exactly what she's nervous about.",
        pointsToSuspectId: "ingrid-sorensen",
      },
      {
        id: "galley-06",
        x: 55,
        y: 20,
        isReal: false,
        clueText:
          "A supplier receipt sits tucked under the spice rack, itemizing a shipment neither the owner nor the cook remembers placing an order for. The company name on the letterhead matches one Priya Kapoor has done business with before — though a coincidence like that could just as easily mean nothing.",
        pointsToSuspectId: "priya-kapoor",
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
          "The satellite antenna's feed cable has been severed with a single clean cut from a proper cutting tool — not the ragged, frayed tear you'd expect from wind or storm damage. Whoever did this knew exactly which cable fed the comms array and exactly how to disable it without leaving the antenna looking obviously tampered with from a casual glance.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "upper-deck-02",
        x: 70,
        y: 60,
        isReal: true,
        clueText:
          "One of the lifeboats has been quietly prepped: supplies loaded for a single passenger, and the winch mechanism rigged to lower fast and near-silently, well outside the normal drill schedule. Nobody logged this in the deck book, and rigging a winch this precisely takes someone who knows the release mechanism cold — the kind of knowledge that comes standard for a first mate.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "upper-deck-03",
        x: 20,
        y: 70,
        isReal: false,
        clueText:
          "A cluster of deck chairs lies knocked over and scattered near the railing, cushions dragged loose from their straps. It's the kind of mess a strong gust off the open water leaves behind overnight, and nothing about the scattering pattern suggests it happened any other way.",
        pointsToSuspectId: null,
      },
      {
        id: "upper-deck-04",
        x: 55,
        y: 30,
        isReal: false,
        clueText:
          "A dropped earring glints where it caught between two deck planks near the railing — a distinctive gold piece several of the crew recognize as Priya Kapoor's. She was seen pacing out here late last night, by more than one account, though pacing the deck alone isn't exactly a confession.",
        pointsToSuspectId: "priya-kapoor",
      },
      {
        id: "upper-deck-05",
        x: 82,
        y: 45,
        isReal: false,
        clueText:
          "A cigarette stub lies stubbed out against the railing, the brand unfamiliar to anyone who's checked — not one any of the crew smoke, and not one that matches what's stocked in the guest lounge either. Someone aboard has a habit nobody's accounted for yet.",
        pointsToSuspectId: null,
      },
      {
        id: "upper-deck-06",
        x: 45,
        y: 80,
        isReal: false,
        clueText:
          "A pair of binoculars sits abandoned on the deck rail, still aimed out at a single faint light on the distant horizon. Waiting for a signal, tracking another vessel, or just someone passing a quiet watch stargazing — the binoculars themselves can't say which.",
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
          "Boot prints track through the settled dust on the floor, leading in a straight, purposeful line to this crate and back again — recent enough that the dust hasn't had time to resettle over them. Whoever came down here knew exactly which crate they wanted and didn't waste time looking around at the others.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cargo-02",
        x: 30,
        y: 76,
        isReal: true,
        clueText:
          "The cargo manifest's final line has clearly been rewritten, the ink a shade darker and the handwriting slightly tighter than the entries above it — someone went back after the fact and altered what's supposedly stored in this hold, using a different pen than whoever filled out the rest of the page.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cargo-03",
        x: 48,
        y: 60,
        isReal: true,
        clueText:
          "This crate sits pulled slightly apart from the stack around it, its corner visibly pried and re-nailed in a hurry, nails driven at a rushed angle rather than flush and square. Someone opened this, checked what was inside, and closed it back up fast enough to leave the seams uneven.",
        pointsToSuspectId: "marcus-reyes",
      },
      {
        id: "cargo-04",
        x: 84,
        y: 38,
        isReal: false,
        clueText:
          "Something bulky sits under a canvas tarp near the back wall, roughly crate-sized but unmarked. It could easily be spare medical supplies Dr. Elena Voss had moved down here to free up space in the guest cabin she's using as an examination room — though nobody's confirmed that's actually what's under there.",
        pointsToSuspectId: "elena-voss",
      },
      {
        id: "cargo-05",
        x: 13,
        y: 38,
        isReal: false,
        clueText:
          "One life jacket is missing from its usual row on the rack, leaving a gap between its neighbors. Standard enough, if Tomas Bell borrowed it while working near the hull tonight — engineers pull safety gear for hull inspections often enough that it barely raises an eyebrow.",
        pointsToSuspectId: "tomas-bell",
      },
      {
        id: "cargo-06",
        x: 12,
        y: 52,
        isReal: false,
        clueText:
          "A note is pinned to the side of a crate, business shorthand scrawled hastily in the margin — the kind of quick notation Priya Kapoor uses on her own paperwork. It reads like an inventory note dashed off between other tasks, not anything more sinister on its face.",
        pointsToSuspectId: "priya-kapoor",
      },
      {
        id: "cargo-07",
        x: 79,
        y: 76,
        isReal: false,
        clueText:
          "A heavy chain lies looped around a stack of crates but never actually secured, the end left hanging loose instead of clipped. Ingrid Sorensen handles inventory sign-offs for cargo like this — an easy mistake to make while rushing through a checklist alone, late at night, with nobody double-checking her work.",
        pointsToSuspectId: "ingrid-sorensen",
      },
      {
        id: "cargo-08",
        x: 20,
        y: 67,
        isReal: false,
        clueText:
          "A flashlight lies on a low shelf, still switched on, its beam noticeably dimmer than it should be — the battery's been draining for a while now, quietly, in the dark, with nobody around to notice or turn it off.",
        pointsToSuspectId: null,
      },
    ],
  },
];
