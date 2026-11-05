export const BRAND_STYLES = ["plates", "marquee", "index"] as const;
export type BrandStyleId = (typeof BRAND_STYLES)[number];

export function isBrandStyle(value: string | undefined): value is BrandStyleId {
  return BRAND_STYLES.includes(value as BrandStyleId);
}

export function resolveBrandStyle(value: string | undefined): BrandStyleId {
  if (isBrandStyle(value)) return value;
  return "plates";
}

export function brandMonogram(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
