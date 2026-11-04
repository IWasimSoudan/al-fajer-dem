export const home = {
  kicker: "01 — Since 1969",
  title: "Steel structures, rolling shutters, and gate automation.",
  lead: "A trusted supplier to major companies in Jordan and MENA. We design, fabricate, fit, and look after the work.",
  ctaProducts: "View products",
  ctaContact: "Request a quote",
  heroAlt: "Welder at work in a steel workshop",
  stats: [
    { value: "1969", label: "Founded in Amman" },
    { value: "57+", label: "Years of trade" },
    { value: "MENA", label: "Jordan and the region" },
    { value: "On call", label: "Civil Defense, hospitals, factories" },
  ],
  expertiseKicker: "02 — Expertise",
  expertiseTitle: "Areas of expertise",
  expertiseLead: "Eight kinds of work, from the structure to the door that closes it.",
  valuesKicker: "03 — How we work",
  valuesTitle: "Reliability, integrity, and workmanship.",
  values: [
    {
      title: "Reliability",
      text: "We stay with the job from the design of a door system through fitting and commissioning, and we keep the same standard at each step.",
    },
    {
      title: "Integrity",
      text: "More than 57 years of trade go into choosing the right product for the application. After-sales covers nationwide repair, annual maintenance, and extended warranties.",
    },
    {
      title: "Workmanship",
      text: "That consistency is why Jordanian emergency services, including the Civil Defense, as well as hospitals and industrial factories, keep us on their lists.",
    },
  ],
  linesKicker: "04 — What we make",
  linesTitle: "A few lines from the workshop",
  lines: [
    {
      title: "Foam-filled shutters",
      text: "High-density foam slats, including the P80 line. Sheet thickness 0.4–0.7 mm, with international test certificates.",
    },
    {
      title: "Anti-wind doors",
      text: "Class 4 roll-up doors rated for wind up to 120 km/h and widths up to 12 m.",
    },
    {
      title: "Laser cutting",
      text: "Iron, copper, and stainless steel, cut on current machines up to 41 mm.",
    },
    {
      title: "Gate automation",
      text: "Motors and remote panels for residential, industrial, and commercial doors.",
    },
  ],
  catalogueTitle: "Ask for the latest catalogue",
  catalogueText: "Product and service sheets are sent by the team. There is no mailing list on this demo.",
  catalogueCta: "Email the team",
  contactTitle: "Talk to the workshop",
  contactText: "Amman. Sunday to Thursday, 8:00–18:30.",
  stage: {
    heroTitle: "Al Fajer",
    heroLead: "We shape steel, rolling shutters, and gate automation into work that closes and carries a building.",
    scroll: "Scroll down",
    welcome:
      "Welcome to Al Fajer, where the trade is more than fabrication. It is the full job, from the drawing through fitting.",
    welcomeMotionPicker: "Welcome image motion — preview only",
    welcomeMotionHint: "Scroll this section and switch to compare. Pick one later to lock in.",
    welcomeMotions: {
      expand: {
        label: "1 · Inside → out",
        blurb: "Photos start tight on the copy, then push out to their frames.",
      },
      converge: {
        label: "2 · Outside → in",
        blurb: "Photos fly in from the edges and settle around the words.",
      },
      bloom: {
        label: "3 · Bloom & settle",
        blurb: "Photos rise on soft arcs, rotate into place, and ease to rest.",
      },
    },
    worksKicker: "Work",
    worksTitle: "Latest from the workshop",
    prev: "Previous slide",
    next: "Next slide",
    creations: [
      {
        category: "Steel structures",
        title: "Light steel frames",
        text: "Hangars and framed buildings, drawn, fabricated, and fitted by one workshop in Amman.",
        image: "/images/canopy.jpg",
        alt: "Curved steel canopy over a walkway",
        href: "expertise#steel",
      },
      {
        category: "Rolling shutters",
        title: "Foam-filled doors",
        text: "High-density foam slats, including the P80 line. Sheet thickness from 0.4 to 0.7 mm.",
        image: "/images/warehouse-doors.jpg",
        alt: "White roll-up doors on a metal warehouse",
        href: "expertise#shutters",
      },
      {
        category: "Art steel",
        title: "Cut in the spark",
        text: "Iron, copper, and stainless steel, cut on current machines up to 41 mm.",
        image: "/images/hex-panels.jpg",
        alt: "Colored hexagonal metal wall panels",
        href: "expertise#art",
      },
      {
        category: "Warehouse",
        title: "Rooms for storage",
        text: "Doors, frames, and steelwork sized for loading bays and storage buildings.",
        image: "/images/tanks.jpg",
        alt: "Stainless steel storage tanks",
        href: "expertise#warehouse",
      },
    ],
    teamKicker: "The workshop",
    teamTitle: "A team that has stayed with the work since 1969.",
    teamText:
      "Founded in Amman by Khaled al Jariri. The people who fabricate the steel also fit it, for companies across Jordan and the region, and for civil defense, hospitals, and factories.",
    teamCta: "About the workshop",
    quotesKicker: "How we work",
    quotes: [
      {
        quote: "We stay with the job from the design of a door system through fitting and commissioning.",
        name: "Reliability",
        role: "One standard at each step",
      },
      {
        quote: "More than 57 years of trade go into choosing the right product for the application.",
        name: "Integrity",
        role: "The right piece for the opening",
      },
      {
        quote: "Civil defense, hospitals, and factories keep the workshop on their lists.",
        name: "Workmanship",
        role: "Amman, since 1969",
      },
      {
        quote: "Repair covers Jordan. Annual maintenance can include an extended warranty.",
        name: "After the install",
        role: "Service desk",
      },
      {
        quote: "Class 4 roll-up doors are rated for wind up to 120 km/h and widths up to 12 m.",
        name: "Anti-wind doors",
        role: "Exposed sites",
      },
    ],
    emailLabel: "Email",
    visitLabel: "Visit",
    hoursLabel: "Hours",
    closing:
      "What leaves the factory is more than a door or a frame. It is steel made for the opening, the wind, and the years after the install.",
  },
}

export type HomeTranslations = typeof home;
