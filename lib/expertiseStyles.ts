export const EXPERTISE_STYLES = ["cascade", "shutters", "orbit"] as const;
export type ExpertiseStyleId = (typeof EXPERTISE_STYLES)[number];

export function isExpertiseStyle(value: string | undefined): value is ExpertiseStyleId {
  return EXPERTISE_STYLES.includes(value as ExpertiseStyleId);
}

export function resolveExpertiseStyle(value: string | undefined): ExpertiseStyleId {
  if (isExpertiseStyle(value)) return value;
  return "cascade";
}

/** Workshop images paired to each expertise id for motion layouts. */
export const expertiseMedia = {
  steel: "/images/canopy.jpg",
  shutters: "/images/warehouse-doors.jpg",
  art: "/images/hex-panels.jpg",
  warehouse: "/images/tanks.jpg",
  gates: "/images/iron-fence.jpg",
  military: "/images/bronze-doors.jpg",
  airport: "/images/canopy.jpg",
  antiwind: "/images/warehouse-doors.jpg",
} as const;
