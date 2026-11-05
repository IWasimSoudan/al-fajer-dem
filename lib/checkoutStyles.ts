export const CHECKOUT_STYLES = ["desk", "board"] as const;
export type CheckoutStyleId = (typeof CHECKOUT_STYLES)[number];

export function isCheckoutStyle(value: string | undefined): value is CheckoutStyleId {
  return CHECKOUT_STYLES.includes(value as CheckoutStyleId);
}

export function resolveCheckoutStyle(value: string | undefined): CheckoutStyleId {
  if (isCheckoutStyle(value)) return value;
  return "desk";
}

export function checkoutStyleHref(lang: string, path: string, style: CheckoutStyleId) {
  return `/${lang}/${path}?style=${style}`;
}
