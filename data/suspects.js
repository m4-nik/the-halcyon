// ---------------------------------------------------------------------------
// SUSPECTS DATA
// One object per suspect. This is the only file you need to touch to change
// suspect bios — the suspects screen (js/suspects.js) just reads this array
// and renders whatever is here.
//
// Fields:
//   id            - unique lowercase-with-dashes id. Must match the
//                   `pointsToSuspectId` values used in data/rooms.js.
//   name          - full display name.
//   role          - their job/relationship to the yacht owner.
//   portrait      - path to a portrait image, or null to show a placeholder
//                   avatar (initials on a colored circle) until real art
//                   exists.
//   motive        - why they might want the yacht diverted. Read as
//                   in-world text, shown directly to the player.
//   alibi         - their story / what's suspicious or reassuring about
//                   them. Also shown directly to the player.
//   isAntagonist  - true for the ONE real culprit, false for everyone else.
//                   Exactly one entry in this array should be true.
// ---------------------------------------------------------------------------

export const SUSPECTS = [
  {
    id: "marcus-reyes",
    name: "Marcus Reyes",
    role: "First Mate",
    portrait: "assets/images/suspects/marcus.jpg",
    motive:
      "Passed over for captaincy last season, and quietly drowning in debt. A yacht that 'disappears' for a while, then resurfaces with no questions asked, would solve both problems at once.",
    alibi:
      "Knows the engine room and the bridge intimately — almost too well for someone who insists he's 'just the first mate.' Always has a clean explanation ready before anyone's finished asking the question.",
    isAntagonist: true,
  },
  {
    id: "priya-kapoor",
    name: "Priya Kapoor",
    role: "Business Partner of the Owner",
    portrait: "assets/images/suspects/priya.jpg",
    motive:
      "Deep in debt from a deal gone bad. If the Halcyon vanished for a while — insurance payout, no awkward conversations about the money she owes — it would suit her enormously.",
    alibi:
      "Says she was in her cabin reviewing paperwork all night. No one can confirm it, but no one can disprove it either. She seems more anxious about money than about the crew's safety.",
    isAntagonist: false,
  },
  {
    id: "elena-voss",
    name: "Dr. Elena Voss",
    role: "Guest, the Owner's Physician",
    portrait: "assets/images/suspects/elena.jpg",
    motive:
      "Has been quietly asking questions about the owner's shipping company — the kind of questions that sound less like medical concern and more like due diligence.",
    alibi:
      "Claims she was reviewing the owner's medication schedule, which checks out. Her curiosity about the company's finances, though, has no medical explanation anyone's heard yet.",
    isAntagonist: false,
  },
  {
    id: "tomas-bell",
    name: "Tomas Bell",
    role: "Ship's Engineer",
    portrait: "assets/images/suspects/tomas.jpg",
    motive:
      "Has the technical skill to disable comms or fake an engine failure without breaking a sweat — but no one has found a convincing reason why he'd want to.",
    alibi:
      "Was in the engine room most of the night according to the maintenance log — a log he also happens to be the one who fills out.",
    isAntagonist: false,
  },
  {
    id: "ingrid-sorensen",
    name: "Ingrid Sorensen",
    role: "Owner's Personal Assistant",
    portrait: "assets/images/suspects/ingrid.jpg",
    motive:
      "No obvious financial motive, but she's been nervous and evasive since the yacht left harbor — flinching at questions that shouldn't be difficult to answer.",
    alibi:
      "Says she was arranging the owner's schedule for tomorrow's port call. Plausible, if she'd say it without checking over her shoulder first.",
    isAntagonist: false,
  },
];
