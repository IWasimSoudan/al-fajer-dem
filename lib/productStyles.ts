export const PRODUCT_STYLES = ["list", "split", "editorial", "sheet"] as const;
export type ProductStyleId = (typeof PRODUCT_STYLES)[number];

export function isProductStyle(value: string | undefined): value is ProductStyleId {
  return PRODUCT_STYLES.includes(value as ProductStyleId);
}

/** Former style `grid` is merged into `list` (catalog with list/grid toggle). */
export function resolveProductStyle(value: string | undefined): ProductStyleId {
  if (value === "grid") return "list";
  if (isProductStyle(value)) return value;
  return "list";
}

export function initialCatalogView(value: string | undefined): "list" | "grid" {
  return value === "grid" ? "grid" : "list";
}
