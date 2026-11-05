export const gallery = {
  kicker: "Gallery",
  title: "Metal work",
  lead: "Events, exhibitions, and workshop gallery shots. Filter by set.",
  stylePicker: "Gallery layout — preview only",
  styleHint: "Filter the set, then feel the motion. Pick one later to lock in.",
  styleWhy: "Why this layout",
  empty: "No shots in this set yet.",
  prev: "Previous shot",
  next: "Next shot",
  styles: {
    lattice: {
      label: "1 · Lattice grid",
      blurb: "Filterable tiles stagger in; swaps fade when you change the set.",
      idea: "Closest to a classic workshop gallery — keep filters, add entrance and filter transitions.",
    },
    reel: {
      label: "2 · Film reel",
      blurb: "Wide horizontal frames you scroll sideways through the set.",
      idea: "Feels like a contact sheet on a rail — strong motion without pinning the page.",
    },
    stage: {
      label: "3 · Spotlight stage",
      blurb: "One large shot with thumbnails; arrows and clicks crossfade the feature.",
      idea: "Presentation mode for walkthroughs — focus one piece, keep the set in reach.",
    },
  },
  filters: {
    all: "All",
    events: "Events",
    exhibitions: "Exhibitions",
    nfw: "NFW gallery",
  },
  items: {
    g1: "Stainless storage tanks",
    g2: "Curved steel canopy",
    g3: "Roll-up doors on an industrial front",
    g4: "Black pivot door",
    g5: "Hexagonal metal wall panels",
    g6: "Carved entrance doors",
    g7: "Wrought-iron fence",
    g8: "Bronze entrance doors",
    g9: "Steel stair railing",
    g10: "Metal-frame bar stools",
  },
};

export type GalleryTranslations = typeof gallery;
