export const certificates = {
  kicker: "Certificates",
  title: "Papers for tenders and inspections",
  lead: "UL and ISO documents, wind-class ratings, and manufacturer certificates are available on request.",
  stylePicker: "Certificates layout — preview only",
  styleHint: "Scroll to feel each motion. Pick one later to lock in.",
  styleWhy: "Why this layout",
  styles: {
    ledger: {
      label: "1 · Ledger cascade",
      blurb: "Oversized index numbers scrub in; seals stamp as each paper lands.",
      idea: "Feels like flipping a tender binder — each certificate earns a beat on the way down.",
    },
    imprint: {
      label: "2 · Wax imprint",
      blurb: "Full-bleed chapters wipe open; a seal slams and holds the title.",
      idea: "Cinematic one-document-at-a-time reading — motion that matches official paperwork.",
    },
    vault: {
      label: "3 · Vault rail",
      blurb: "Pin the stage and scrub sideways through the certificate set.",
      idea: "Strong motion piece: vertical scroll drives a horizontal document vault.",
    },
  },
  points: [
    "Compliance sheets for the products on a tender",
    "Wind-class ratings for Class 4 roll-up doors",
    "Manufacturer certificates when the inspection asks for them",
  ],
  items: {
    ul1: {
      title: "UL1",
      text: "UL listing documentation for door and shutter systems used on tenders that require it.",
    },
    ul2: {
      title: "UL2",
      text: "Additional UL paperwork for rated openings and related hardware packages.",
    },
    iso9001: {
      title: "ISO 9001",
      text: "Quality-management certificate covering fabrication and installation processes.",
    },
  },
  cta: "Request documents",
};

export type CertificatesTranslations = typeof certificates;
