"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/lib/i18n";

export function DocumentLocale({ lang }: { lang: Locale }) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(lang)};document.documentElement.dir=${JSON.stringify(dir)};`,
      }}
    />
  );
}
