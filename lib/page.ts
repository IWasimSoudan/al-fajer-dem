import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/en";

export async function load(params: Promise<{ lang: string }>): Promise<{ lang: Locale; dict: Dictionary }> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return { lang, dict: getDictionary(lang) };
}
