export const projects = {
  kicker: "Projects",
  title: "Kinds of work",
  lead: "Six project lines from the site map (P1–P6). These are types of jobs, not a list of named clients.",
  stylePicker: "Projects layout — preview only",
  styleHint: "Scroll to feel each motion. Pick one later to lock in.",
  styleWhy: "Why this layout",
  styles: {
    rise: {
      label: "1 · Rise grid",
      blurb: "Cards lift into place as you scroll — classic workshop catalogue.",
      idea: "Best everyday browse: six lines visible, each one animates in as it enters the frame.",
    },
    chapters: {
      label: "2 · Scroll chapters",
      blurb: "Large image chapters with clipped reveal and rising copy.",
      idea: "Use when each project line deserves a full beat — slower, more cinematic reading.",
    },
    rail: {
      label: "3 · Horizontal rail",
      blurb: "Pin the section and scrub sideways through the six jobs.",
      idea: "Strong motion piece: vertical scroll drives a horizontal project track.",
    },
  },
  items: {
    hangar: { title: "Industrial hangars", text: "Framed halls and light steel buildings, fabricated and erected by the same team." },
    warehouse: { title: "Warehouse packages", text: "Doors, frames, and steelwork for storage and loading buildings." },
    civil: { title: "Hospitals and civil defense", text: "Shutters and doors for emergency services and hospitals that need a reliable closer." },
    airport: { title: "Airport openings", text: "Wide doors and steelwork for airport buildings and service zones." },
    art: { title: "Art steel", text: "Laser-cut screens, panels, and decorative steel in iron, copper, and stainless." },
    gates: { title: "Automated gates", text: "Motors and remote panels on residential, industrial, and commercial doors." },
  },
}

export type ProjectsTranslations = typeof projects;
