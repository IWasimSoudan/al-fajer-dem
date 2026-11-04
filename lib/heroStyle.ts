export const HERO_STYLES = ["cinema", "center", "split"] as const;
export type HeroStyleId = (typeof HERO_STYLES)[number];

export function isHeroStyle(value: string | undefined): value is HeroStyleId {
  return HERO_STYLES.includes(value as HeroStyleId);
}

export function resolveHeroStyle(value: string | undefined): HeroStyleId {
  if (isHeroStyle(value)) return value;
  return "cinema";
}
