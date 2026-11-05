export const clients = {
  kicker: "Clients",
  title: "Companies that keep the workshop on their lists",
  lead: "Placeholder marks stand in for client logos. Named references are available from the team on request.",
  stylePicker: "Clients layout — preview only",
  styleHint: "Scroll to feel each motion. Pick one later to lock in.",
  styleWhy: "Why this layout",
  styles: {
    roster: {
      label: "1 · Roster cascade",
      blurb: "Oversized index numbers scrub in; marks slide from alternate sides.",
      idea: "A living client list — each partner earns a beat as you roll down the roster.",
    },
    spotlight: {
      label: "2 · Spotlight panels",
      blurb: "Full-bleed chapters wipe open on each mark, with rising copy.",
      idea: "One client at a time, cinematic — useful when logos deserve the stage.",
    },
    rail: {
      label: "3 · Partner rail",
      blurb: "Pin the stage and scrub sideways through all five marks.",
      idea: "Strong motion piece: vertical scroll drives a horizontal partner track.",
    },
  },
  items: {
    c1: "Industrial partner",
    c2: "Warehouse operator",
    c3: "Civil works client",
    c4: "Campus and grounds",
    c5: "Entrance and facade work",
  },
};

export type ClientsTranslations = typeof clients;
