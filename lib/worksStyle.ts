export const WORKS_STYLES = ["rail", "deck", "curtain"] as const;
export type WorksStyleId = (typeof WORKS_STYLES)[number];

export function isWorksStyle(value: string | undefined): value is WorksStyleId {
  return WORKS_STYLES.includes(value as WorksStyleId);
}

export function resolveWorksStyle(value: string | undefined): WorksStyleId {
  if (isWorksStyle(value)) return value;
  return "rail";
}
