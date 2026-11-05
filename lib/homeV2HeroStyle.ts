export const HOME_V2_HERO_STYLES = ["slider", "video"] as const;
export type HomeV2HeroStyleId = (typeof HOME_V2_HERO_STYLES)[number];

export function isHomeV2HeroStyle(value: string | undefined): value is HomeV2HeroStyleId {
  return HOME_V2_HERO_STYLES.includes(value as HomeV2HeroStyleId);
}

export function resolveHomeV2HeroStyle(value: string | undefined): HomeV2HeroStyleId {
  if (isHomeV2HeroStyle(value)) return value;
  return "slider";
}
