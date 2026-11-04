export const PRODUCT_STYLES = ["list", "grid", "split", "editorial", "sheet"] as const;
export type ProductStyleId = (typeof PRODUCT_STYLES)[number];

export function isProductStyle(value: string | undefined): value is ProductStyleId {
  return PRODUCT_STYLES.includes(value as ProductStyleId);
}
