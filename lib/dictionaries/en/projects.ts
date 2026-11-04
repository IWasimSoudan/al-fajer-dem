export const projects = {
  kicker: "Projects",
  title: "Kinds of work",
  lead: "These are types of jobs, not a list of named clients.",
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
