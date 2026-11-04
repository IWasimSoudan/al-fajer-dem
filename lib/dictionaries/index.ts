import { ar } from "@/lib/dictionaries/ar";
import { en, type Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
