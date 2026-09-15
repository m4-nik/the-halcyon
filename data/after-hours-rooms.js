export const ROOMS = [
  {
    id: "bridge",
    name: "Bridge",
    image: "assets/images/rooms/bridge-after-hours.jpg",
    hotspots: [
      {
        id: "bridge-01",
        x: 44,
        y: 48,
        isReal: true,

        clueText:
          "The radio panel behind the helm still shows several wires deliberately disconnected rather than damaged accidentally.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus disabling communications is already established. What matters now is that the blackout was deliberate enough to isolate the yacht while a larger operation continued elsewhere aboard."
      },

      {
        id: "bridge-02",
        x: 51,
        y: 80,
        isReal: true,

        clueText:
          "A page is missing from the Captain's log. The remaining edge was cut unusually cleanly.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The missing page may contain something the Captain discovered before his emergency transmission. Someone had reason to remove part of his written record before the investigation reached this stage."
      },

      {
        id: "bridge-03",
        x: 70,
        y: 76,
        isReal: true,

        clueText:
          "The navigation chart still bears pencil marks showing the deliberate diversion plotted before the sabotage.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The diverted course explains Marcus's original role, but not the Captain's warning that the course change was only part of the operation. The chart now marks the beginning of the conspiracy rather than its end."
      },

      {
        id: "bridge-04",
        x: 87,
        y: 68,
        isReal: false,

        clueText:
          "A weathered life ring remains secured near the bridge windows.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Nothing suggests the life ring was used or disturbed tonight. It offers no meaningful connection to either murder or the hidden movement aboard."
      },

      {
        id: "bridge-05",
        x: 38,
        y: 50,
        isReal: false,

        clueText:
          "The bridge compass drifts slightly whenever the yacht rolls.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The imperfect reading could look like another navigation anomaly, but it does not explain the deliberate course change or anything that happened after Marcus was exposed."
      },

      {
        id: "bridge-06",
        x: 72,
        y: 87,
        isReal: false,

        clueText:
          "A cold cup remains abandoned beside the chart table.",

        pointsToSuspectId: "priya-kapoor",

        connectionText:
          "Priya Kapoor",

        whyItMatters:
          "Priya was known to spend time around the bridge, making the abandoned cup a plausible trace of her presence. But presence alone does not connect her to the Captain's shooting or Marcus's later death."
      },

      {
        id: "bridge-07",
        x: 78,
        y: 93,
        isReal: false,

        clueText:
          "A folded note covered in columns of numbers remains tucked among the chart-table papers.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The figures look important at first glance, but there is no reliable connection between them and the Lower Deck lockdown, either murder, or the hidden service route."
      },

      {
        id: "bridge-08-authorization-code",
        x: 73,
        y: 81,
        isReal: true,

        clueText:
          "A Captain's restricted-access card lies among the emergency papers. The authorization code printed on it is 7319.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The Lower Deck lockdown requires two separate overrides: a physical emergency key and a Captain-level authorization code. Code 7319 provides the authorization half of that procedure."
      },

      {
        id: "bridge-09-lockdown-terminal",
        x: 56,
        y: 39,
        isReal: true,

        clueText:
          "The bridge emergency console records a Captain-level manual lockdown of the Lower Deck shortly before the transmission ended.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The Captain personally sealed the Lower Deck after discovering the deeper operation. Anyone moving through that section afterward either entered before the lockdown completed or used an alternate service route."
      }
    ]
  },
  {
    id: "engine-room",
    name: "Engine Room",
    image: "assets/images/rooms/engine-room-after-hours.jpg",
    hotspots: [
      {
        id: "engine-01",
        x: 42,
        y: 76,
        isReal: true,

        clueText:
          "A wrench rests on the workbench, still faintly warm even though the main engine has been powered down for hours.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus working in the Engine Room is already established. The lingering warmth matters because it suggests mechanical activity continued later than expected. Someone may have returned to this area after the original sabotage.",

        examineModel: "assets/models/wrench.glb"
      },

      {
        id: "engine-02",
        x: 57,
        y: 87,
        isReal: true,

        clueText:
          "A trail of boot prints cuts through spilled oil, running from the main machinery toward the ladder and access corridor.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The prints establish a purposeful route through the Engine Room. Instead of merely proving Marcus was here, they draw attention to where movement continued after the machinery was tampered with."
      },

      {
        id: "engine-03",
        x: 48,
        y: 64,
        isReal: true,

        clueText:
          "The toolbox sits open mid-use, with several tools still scattered instead of returned to their fitted spaces.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The work appears to have been interrupted rather than completed normally. Combined with the recent activity elsewhere in the room, the Engine Room may have been used for more than the sabotage already attributed to Marcus."
      },

      {
        id: "engine-04",
        x: 7,
        y: 27,
        isReal: false,

        clueText:
          "The fuel gauge above the main console reads a steady, unremarkable normal.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The reading confirms that the fuel supply itself is not responsible for tonight's emergency. It offers no meaningful lead toward either murder or the hidden movement aboard."
      },

      {
        id: "engine-05",
        x: 73,
        y: 44,
        isReal: false,

        clueText:
          "A spare set of engineer's coveralls hangs nearby, cut and sized for Tomas Bell.",

        pointsToSuspectId: "tomas-bell",

        connectionText:
          "Tomas Bell",

        whyItMatters:
          "Tomas has legitimate access and deep familiarity with this machinery, making him an obvious person to question. But finding his work clothing in his own Engine Room proves very little."
      },

      {
        id: "engine-06",
        x: 17,
        y: 85,
        isReal: false,

        clueText:
          "A maintenance-log entry has been scratched through and rewritten in handwriting unlike Tomas's usual mechanical shorthand.",

        pointsToSuspectId: "priya-kapoor",

        connectionText:
          "Priya Kapoor",

        whyItMatters:
          "The handwriting creates a possible link to Priya and suggests someone outside engineering handled the records. But the alteration does not explain the sealed Lower Deck or how Marcus was killed."
      },

      {
        id: "engine-07",
        x: 83,
        y: 38,
        isReal: false,

        clueText:
          "A coil of rope has been tied off with an unusually neat, methodical wrap.",

        pointsToSuspectId: "ingrid-sorensen",

        connectionText:
          "Ingrid Sorensen",

        whyItMatters:
          "The precise organization resembles Ingrid's habits and briefly places her under suspicion. Yet a neatly stored rope offers no convincing connection to the murders or the concealed route."
      },

      {
        id: "engine-08",
        x: 84,
        y: 80,
        isReal: false,

        clueText:
          "An untouched thermos sits near the work area, still capped and cold to the touch.",

        pointsToSuspectId: "elena-voss",

        connectionText:
          "Elena Voss",

        whyItMatters:
          "The thermos could place Elena near this section of the ship at some point, but nothing about it establishes when she was here or connects her to what happened on the Lower Deck."
      },


      {
        id: "engine-10-bypassed-monitor",
        x: 82,
        y: 35,
        isReal: true,

        clueText:
          "One monitoring panel has been manually bypassed, leaving part of the ship's internal service network without normal tracking.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The bypass would allow movement through restricted service areas without appearing normally on the monitoring system. Someone deliberately created a blind spot around the same infrastructure now emerging in the investigation."
      }
    ]
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
    image: "assets/images/rooms/galley-after-hours.jpg",

    access: {
      suspects: ["marcus-reyes", "tomas-bell", "ingrid-sorensen"],
      note: "Crew and staff pass through freely. Guests aren't normally expected in the working galley."
    },

    hotspots: [
      {
        id: "galley-01",
        x: 27,
        y: 57,
        isReal: true,

        clueText:
          "Two used wine glasses remain near the knife block. A private meeting took place here before the situation escalated.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus attending a secret meeting is already established. The unresolved question is who he was meeting and whether that person was part of the larger operation behind the sabotage.",

        examineImage: "assets/images/examine/wine-glasses.png"
      },

      {
        id: "galley-02",
        x: 7,
        y: 17,
        isReal: true,

        clueText:
          "The torn note still reads: '...after the crew turns in.' No signature.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The message confirms deliberate activity after most of the yacht had settled for the night. What first looked like a single covert meeting may instead have been part of a repeated after-hours routine.",

        examineImage: "assets/images/examine/torn-note-galley.png"
      },

      {
        id: "galley-03",
        x: 47,
        y: 68,
        isReal: true,

        clueText:
          "A food container is marked 'VE22'. The marking still does not resemble an ordinary recipe code.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "VE22 was previously easy to dismiss as a cabin or kitchen reference. With restricted service spaces now emerging elsewhere on the ship, the marking may identify somewhere food was being deliberately sent.",

        examineImage: "assets/images/examine/rice-box.png"
      },

      {
        id: "galley-05",
        x: 57,
        y: 35,
        isReal: false,

        clueText:
          "A row of jars sits slightly disturbed on the shelf, with one lid left loose.",

        pointsToSuspectId: "ingrid-sorensen",

        connectionText:
          "Ingrid Sorensen",

        whyItMatters:
          "Galley inventory and household supplies passed through Ingrid's oversight, making the disturbance look suspicious. But ordinary inventory handling could explain it just as easily.",

        examineImage: "assets/images/examine/jars.png"
      },

      {
        id: "galley-07",
        x: 8,
        y: 35,
        isReal: false,

        clueText:
          "The first-aid kit sits open on the counter.",

        pointsToSuspectId: "priya-kapoor",

        connectionText:
          "Priya Kapoor",

        whyItMatters:
          "The open kit briefly raises questions about whether Priya needed or supplied medical materials during the night. But nothing here proves that she treated an injury or connects her to either death.",

        examineModel: "assets/models/first-aid-kit.glb"
      },

      {
        id: "galley-08",
        x: 17,
        y: 22,
        isReal: false,

        clueText:
          "A date remains circled in red on the galley calendar.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The marking looks deliberate enough to attract attention, but there is currently nothing tying the circled date to the murders, the hidden route, or the larger operation.",

        examineImage: "assets/images/examine/calendar.png"
      },

      {
        id: "galley-09-provisioning-ledger",
        x: 50,
        y: 50,
        isReal: true,

        clueText:
          "A provisioning record shows more food being used than the official passenger and crew count can explain.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The discrepancy is repeated rather than accidental. Someone outside the official headcount may have been receiving food from the galley, supporting the possibility that another person was living or hiding aboard."
      }
    ]
  },


  {
    id: "upper-deck",
    name: "Upper Deck",
    image: "assets/images/rooms/upper-deck-after-hours.jpg",

    hotspots: [
      {
        id: "deck-01",
        x: 8,
        y: 80,
        isReal: true,

        clueText:
          "A coil of rope has been freshly re-tied in a clean sailor's hitch.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The knot confirms that someone with shipboard familiarity handled equipment here. Marcus already had that knowledge, so the rope does not identify his killer or explain how someone reached the sealed Lower Deck."
      },

      {
        id: "deck-02",
        x: 50,
        y: 53,
        isReal: true,

        clueText:
          "The life ring hangs slightly crooked against the rail, as though someone leaned against or handled it recently.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "There was movement on the Upper Deck during the night, but nothing here establishes that the person involved travelled to the Lower Deck afterward. It remains an uncertain trace rather than a route."
      },

      {
        id: "deck-03",
        x: 65,
        y: 78,
        isReal: true,

        clueText:
          "Scattered papers contain shipping routes matching the diversion charts previously found on the Bridge.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The papers reinforce that the yacht's diversion was planned in advance. But they reveal no clear external rendezvous or simple explanation for another person appearing after Marcus was exposed, keeping attention on someone already hidden aboard."
      },

      {
        id: "deck-04",
        x: 52,
        y: 62,
        isReal: false,

        clueText:
          "A glass of wine sits on the table, barely touched.",

        pointsToSuspectId: "elena-voss",

        connectionText:
          "Elena Voss",

        whyItMatters:
          "The glass can make Elena's presence here look suspicious, but even if it belonged to her, it establishes neither when she was on deck nor any connection to Marcus's death.",

        examineImage:
          "assets/images/examine/wine-glass-deck.png"
      },

      {
        id: "deck-05",
        x: 60,
        y: 50,
        isReal: false,

        clueText:
          "A robe remains draped over one of the deck chairs.",

        pointsToSuspectId: "ingrid-sorensen",

        connectionText:
          "Ingrid Sorensen",

        whyItMatters:
          "The robe may place Ingrid on the Upper Deck at some stage during the night. It does not establish that she entered the restricted service areas or reached Marcus after the Captain was shot."
      },

      {
        id: "deck-06",
        x: 73,
        y: 90,
        isReal: false,

        clueText:
          "A pair of sandals has been kicked off beside the seating area.",

        pointsToSuspectId: "priya-kapoor",

        connectionText:
          "Priya Kapoor",

        whyItMatters:
          "The sandals create another plausible trace of Priya's movements, but casual presence on the exposed deck gives no route into the locked Lower Deck and no explanation for the second killing."
      },

      {
        id: "deck-07",
        x: 89,
        y: 17,
        isReal: false,

        clueText:
          "One of the deck lights has been carefully maintained, its wick freshly trimmed.",

        pointsToSuspectId: "tomas-bell",

        connectionText:
          "Tomas Bell",

        whyItMatters:
          "The neat maintenance could fit Tomas's habits, but ordinary technical upkeep is not evidence that he crossed the ship during the murder window."
      },

      {
        id: "deck-08",
        x: 68,
        y: 72,
        isReal: false,

        clueText:
          "A tablet lies face-down on the deck with its screen dark.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Someone appears to have left it behind in a hurry, but without a reliable timestamp or usable record it cannot identify who was here or connect them to the Lower Deck.",

        examineImage:
          "assets/images/examine/tablet.png"
      }
    ]
  },

  {
    id: "cargo-hold",
    name: "Cargo Hold",
    image: "assets/images/rooms/cargo-hold-after-hours.jpg",
    hotspots: [
      {
        id: "cargo-01",
        x: 60,
        y: 85,
        isReal: true,

        clueText:
          "Boot prints cut through the settled dust on the cargo floor, forming a deliberate path through the hold.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus using the cargo hold is already established. What remains unexplained is the route itself: he repeatedly moved through this area for a purpose the original sabotage does not fully explain.",

        examineModel: "assets/models/footprints.glb"
      },

      {
        id: "cargo-02",
        x: 30,
        y: 76,
        isReal: true,

        clueText:
          "The cargo manifest's final line was deliberately rewritten before the sabotage.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus altering the manifest is already known. The unresolved question is what he needed removed from the official record. Something connected to the larger operation may have entered the ship without being properly documented.",

        examineImage: "assets/images/examine/clipboard-log.png"
      },

      {
        id: "cargo-03",
        x: 48,
        y: 60,
        isReal: true,

        clueText:
          "One crate sits apart from the surrounding stack. Its corner was pried open and then re-nailed in a hurry.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The crate may have carried supplies or equipment that Marcus needed for more than his own sabotage. Its contents could help explain what the altered manifest was hiding.",

        examineModel: "assets/models/pried-crate.glb"
      },

      {
        id: "cargo-04",
        x: 84,
        y: 38,
        isReal: false,

        clueText:
          "Something bulky remains concealed beneath a canvas tarp near the back wall.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The concealed shape looks suspicious, but nothing currently connects it to the Captain's death, Marcus's death, or the unexplained movement through the ship.",

        examineModel: "assets/models/tarp-covered-object.glb"
      },

      {
        id: "cargo-05",
        x: 13,
        y: 38,
        isReal: false,

        clueText:
          "One life jacket is missing from the rack, leaving a clear gap between the others.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Someone may have prepared for an emergency or escape, but a missing life jacket does not explain how another person could have reached Marcus after the Captain was shot.",

        examineModel: "assets/models/life-jacket.glb"
      },

      {
        id: "cargo-06",
        x: 12,
        y: 52,
        isReal: false,

        clueText:
          "A handwritten note is pinned to the side of a crate, filled with rushed business shorthand.",

        pointsToSuspectId: "priya-kapoor",

        connectionText:
          "Priya Kapoor",

        whyItMatters:
          "The notation resembles the kind of business shorthand Priya might use, briefly putting her activity in the cargo hold under suspicion. But the note cannot explain the concealed movement deeper inside the ship.",

        examineImage: "assets/images/examine/torn-note.png"
      },

      {
        id: "cargo-07",
        x: 79,
        y: 76,
        isReal: false,

        clueText:
          "A heavy chain lies looped around the cargo stack but was never properly secured.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The chain suggests rushed handling somewhere in the hold, but it does not connect meaningfully to either murder or the unexplained route through this section.",

        examineModel: "assets/models/chain.glb"
      },

      {
        id: "cargo-08",
        x: 20,
        y: 67,
        isReal: false,

        clueText:
          "A flashlight remains switched on near the foreground crates, its beam noticeably dim.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Someone may have searched the hold in darkness, but the abandoned flashlight cannot identify who used it or whether that person was involved in either killing.",

        examineModel: "assets/models/flashlight.glb"
      },

      {
        id: "cargo-09-service-scratches",
        x: 74,
        y: 48,
        isReal: true,

        clueText:
          "Fresh scrape marks cut through the settled dust beside the rear service wall.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The marks are too recent and too concentrated to be ordinary cargo wear. Something along this wall has been opened or moved repeatedly, suggesting traffic through a space that should not normally be used."
      },

      {
        id: "cargo-10-hidden-service-access",
        x: 78,
        y: 39,
        isReal: true,

        clueText:
          "A narrow seam in the rear wall paneling is almost hidden behind the ladder and stored equipment.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The seam does not appear on the normal cargo layout. Combined with the disturbed dust and Marcus's unexplained activity here, it suggests a concealed service route leading deeper into the ship."
      }
    ]
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

        clueText:
          "The Captain lies motionless beside the locked-down engineering controls. Examination confirms a firearm wound.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The single gunshot heard in the emergency transmission appears to have struck the Captain here. Marcus was present when that shot was fired, establishing what happened to the Captain but not explaining Marcus's own death."
      },

      {
        id: "lower-02-blueprint",
        x: 66,
        y: 72,
        isReal: true,

        clueText:
          "A vessel service blueprint lies among the disturbed papers. It shows restricted maintenance spaces absent from normal passenger deck plans.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The ship contains internal service infrastructure that passengers would never normally see. This supports the possibility that movement between sections of the yacht occurred outside the obvious corridors.",

        examineImage:
          "assets/images/examine/lower-decks-blueprint.jpg"
      },

      {
        id: "lower-03-marcus-axe-wound",
        x: 83,
        y: 60,
        isReal: true,

        clueText:
          "Marcus Reyes is also dead, but his fatal injury is completely different: a severe sharp-force wound consistent with a heavy bladed weapon.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The single gunshot that killed the Captain cannot account for Marcus's death. Someone else reached Marcus after the Captain was shot. The investigation now requires a second person at the scene."
      },

      {
        id: "lower-04-empty-fire-axe-station",
        x: 73,
        y: 25,
        isReal: true,

        clueText:
          "The emergency fire-axe cabinet is open and empty.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus's fatal wound is consistent with a heavy bladed weapon, and a suitable weapon is missing from this very room. Whoever killed him may have used equipment already available on the Lower Deck."
      },

      {
        id: "lower-05-shell-casing",
        x: 31,
        y: 55,
        isReal: true,

        clueText:
          "A single spent casing lies near the Captain's side of the room.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Only one firearm discharge is accounted for here. That shot explains the Captain's death, while Marcus was killed separately. The evidence increasingly supports two distinct acts of violence."
      },

      {
        id: "lower-06-sealed-bulkhead",
        x: 28,
        y: 26,
        isReal: true,

        clueText:
          "The main Lower Deck bulkhead remains sealed under the Captain's manual lockdown.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "If someone reached Marcus after the lockdown took effect, the obvious doorway may not have been their route. The killer needed another way into or out of this section."
      },

      {
        id: "lower-07-service-panel-exit",
        x: 91,
        y: 34,
        isReal: true,

        clueText:
          "The maintenance-side service access shows signs of recent use, with disturbed fittings and exposed interior space.",

        pointsToSuspectId: "tomas-bell",

        connectionText:
          "Tomas Bell",

        whyItMatters:
          "As the engineer, Tomas would understand restricted service infrastructure better than most people aboard, making this a serious lead. But technical familiarity alone does not prove that he used this route during the murders."
      },

      {
        id: "lower-08-captain-terminal",
        x: 50,
        y: 24,
        isReal: true,

        clueText:
          "The Captain's terminal remains powered in emergency mode, displaying internal engineering zones and service layers.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The display confirms that hidden service spaces physically connect sections of the yacht that appear separate on ordinary deck plans. The concealed route is becoming a structural fact, not just a theory."
      },

      {
        id: "lower-09-disturbed-search-site",
        x: 64,
        y: 65,
        isReal: true,

        clueText:
          "Storage cases and papers near Marcus have been disturbed in a hurry, as though someone searched through them for something specific.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "Marcus did not simply shoot the Captain and leave. He remained here searching for something. Whatever he was trying to recover may explain why another person came after him."
      }
    ]
  },
  {
    id: "ve-22",
    name: "VE-22",
    image: "assets/images/rooms/ve-22.jpg",
    isHidden: true,

    hotspots: [
      {
        id: "ve22-01-bedding",
        x: 36,
        y: 55,
        isReal: true,

        clueText:
          "A makeshift bed has been set up inside the service void. The blankets, pillow and personal items show repeated use, not a one-night emergency stop.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "VE-22 was not merely being used as a passage. Someone had been living here while remaining outside the yacht's official passenger and crew count."
      },

      {
        id: "ve22-02-galley-supplies",
        x: 89,
        y: 27,
        isReal: true,

        clueText:
          "Food and stored supplies marked for VE-22 line the shelf, matching the coded galley deliveries found earlier.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "The extra provisioning in the Galley now has a destination. Someone hidden in VE-22 was being deliberately supplied over time."
      },

      {
        id: "ve22-03-service-jacket",
        x: 78,
        y: 30,
        isReal: true,

        clueText:
          "A Halcyon service jacket hangs beside the makeshift living area. Its identification badge has been deliberately removed, but the jacket shows signs of repeated use.",

        pointsToSuspectId: null,

        connectionText:
          "Unknown occupant",

        whyItMatters:
          "VE-22 was not simply an unused service compartment. Someone outside the known passenger and crew record had been living aboard and moving through the ship's restricted service areas."
      },

      {
        id: "ve22-04-marcus-note",
        x: 83,
        y: 61,
        isReal: true,

        clueText:
          "A handwritten instruction on the workbench reads: 'VE-22. 2nd package. After crew turns in.'",

        pointsToSuspectId: null,

        connectionText:
          "Unknown occupant",

        whyItMatters:
          "The wording connects the hidden occupant directly to the same after-hours pattern discovered in the Galley. Marcus was not simply sabotaging the yacht; he was helping sustain someone concealed aboard."
      },

      {
        id: "ve22-05-photos",
        x: 31,
        y: 31,
        isReal: false,

        clueText:
          "Several photographs and old yacht references have been pinned above the bunk.",

        pointsToSuspectId: null,

        connectionText:
          "Points to no one specific",

        whyItMatters:
          "They suggest familiarity with the vessel, but nothing in the photographs reliably identifies the occupant or proves involvement in either killing."
      }
    ]
  },
];


