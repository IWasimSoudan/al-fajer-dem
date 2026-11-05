import type { Locale } from "@/lib/i18n";

export function money(locale: Locale, amount: number) {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-JO" : "en-JO", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return locale === "ar" ? `${formatted} د.أ` : `${formatted} JOD`;
}

export function productPriceLabel(locale: Locale, amount: number | null | undefined, onRequest: string) {
  if (amount == null) return onRequest;
  return money(locale, amount);
}

export function priceSortValue(amount: number | null | undefined) {
  return amount ?? Number.POSITIVE_INFINITY;
}
