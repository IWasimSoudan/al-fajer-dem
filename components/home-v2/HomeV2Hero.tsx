"use client";

import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import {
  HOME_V2_HERO_STYLES,
  resolveHomeV2HeroStyle,
  type HomeV2HeroStyleId,
} from "@/lib/homeV2HeroStyle";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { HeroSlider } from "./HeroSlider";
import { HeroVideo } from "./HeroVideo";

function HeroStylePicker({
  lang,
  copy,
  active,
}: {
  lang: Locale;
  copy: HomeV2Translations["hero"];
  active: HomeV2HeroStyleId;
}) {
  const searchParams = useSearchParams();

  return (
    <aside className="hv2-hero-style-picker" aria-label={copy.stylePicker}>
      <div className="hv2-hero-style-picker-copy">
        <p className="hv2-hero-style-picker-title">{copy.stylePicker}</p>
        <p className="hv2-hero-style-picker-hint">{copy.styleHint}</p>
      </div>
      <div className="hv2-hero-style-picker-list" role="list">
        {HOME_V2_HERO_STYLES.map((id) => {
          const meta = copy.styles[id];
          const params = new URLSearchParams(searchParams.toString());
          params.set("hero", id);
          return (
            <Link
              key={id}
              href={`/${lang}/v2?${params.toString()}`}
              role="listitem"
              className={active === id ? "hv2-hero-style-item is-active" : "hv2-hero-style-item"}
              aria-current={active === id ? "page" : undefined}
              scroll={false}
            >
              <strong>{meta.label}</strong>
              <span>{meta.blurb}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export function HomeV2Hero({
  lang,
  copy,
  ready,
  motion,
}: {
  lang: Locale;
  copy: HomeV2Translations["hero"];
  ready: boolean;
  motion: boolean;
}) {
  const searchParams = useSearchParams();
  const style = resolveHomeV2HeroStyle(searchParams.get("hero") ?? undefined);

  return (
    <div className={`hv2-hero-wrap hv2-hero-wrap-${style}`}>
      {style === "video" ? (
        <HeroVideo lang={lang} copy={copy} ready={ready} motion={motion} />
      ) : (
        <HeroSlider lang={lang} copy={copy} ready={ready} />
      )}
      {ready ? <HeroStylePicker lang={lang} copy={copy} active={style} /> : null}
    </div>
  );
}
