export const CATALOG_STYLES = ["sheets", "split", "stack"] as const;
export type CatalogStyleId = (typeof CATALOG_STYLES)[number];

export function isCatalogStyle(value: string | undefined): value is CatalogStyleId {
  return CATALOG_STYLES.includes(value as CatalogStyleId);
}

export function resolveCatalogStyle(value: string | undefined): CatalogStyleId {
  if (isCatalogStyle(value)) return value;
  return "sheets";
}

export const catalogDownloads = [
  {
    id: "profile",
    href: "/catalog/al-fajer-company-profile.pdf",
    fileName: "Al-Fajer-Company-Profile.pdf",
  },
  {
    id: "general",
    href: "/catalog/al-fajer-catalog.pdf",
    fileName: "Al-Fajer-Catalog.pdf",
  },
  {
    id: "metal",
    href: "/catalog/al-fajer-metal-works.pdf",
    fileName: "Al-Fajer-Metal-Works.pdf",
  },
] as const;

export type CatalogDownloadId = (typeof catalogDownloads)[number]["id"];
