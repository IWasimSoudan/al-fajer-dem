import { FooterOptionB } from "@/components/footer/FooterOptionB";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return <FooterOptionB lang={lang} dict={dict} />;
}
