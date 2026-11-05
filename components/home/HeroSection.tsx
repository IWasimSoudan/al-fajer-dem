"use client";

import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { HERO_STYLES, resolveHeroStyle, type HeroStyleId } from "@/lib/heroStyle";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";

type Stage = Dictionary["home"]["stage"];

function HeroVideo({ motion, heroAlt }: { motion: boolean; heroAlt: string }) {
  if (!motion) {
    return <Image src={asset("/images/canopy.jpg")} alt={heroAlt} fill priority sizes="100vw" className="hero-frame on" />;
  }

  return (
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      poster={asset("/images/canopy.jpg")}
      aria-hidden="true"
      suppressHydrationWarning
    >
      <source src={asset("/videos/1101.mp4")} type="video/mp4" />
    </video>
  );
}

function HeroPicker({ lang, stage, active }: { lang: Locale; stage: Stage; active: HeroStyleId }) {
  const searchParams = useSearchParams();

  return (
    <aside className="hero-style-picker" aria-label={stage.heroStylePicker}>
      <div className="hero-style-picker-copy">
        <p className="hero-style-picker-title">{stage.heroStylePicker}</p>
        <p className="hero-style-picker-hint">{stage.heroStyleHint}</p>
      </div>
      <div className="hero-style-picker-list" role="list">
        {HERO_STYLES.map((id) => {
          const meta = stage.heroStyles[id];
          const params = new URLSearchParams(searchParams.toString());
          params.set("hero", id);
          return (
            <Link
              key={id}
              href={`/${lang}?${params.toString()}`}
              role="listitem"
              className={active === id ? "hero-style-item is-active" : "hero-style-item"}
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

function HeroActions({
  lang,
  home,
  stage,
  onScrollDown,
}: {
  lang: Locale;
  home: Dictionary["home"];
  stage: Stage;
  onScrollDown: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <div className="hero-actions">
      <Link className="hero-cta hero-cta-primary" href={`/${lang}/products`}>
        <span>{home.ctaProducts}</span>
        <span className="hero-cta-arrow" aria-hidden="true">
          ←
        </span>
      </Link>
      <Link className="hero-cta hero-cta-secondary" href={`/${lang}/contact`}>
        <span>{home.ctaContact}</span>
        <span className="hero-cta-arrow" aria-hidden="true">
          ←
        </span>
      </Link>
      <a className="scroll-cue" href="#welcome" onClick={onScrollDown}>
        {stage.scroll}
      </a>
    </div>
  );
}

export function HeroSection({
  lang,
  stage,
  home,
  heroAlt,
  motion,
  onScrollDown,
}: {
  lang: Locale;
  stage: Stage;
  home: Dictionary["home"];
  heroAlt: string;
  motion: boolean;
  onScrollDown: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const searchParams = useSearchParams();
  const style = resolveHeroStyle(searchParams.get("hero") ?? undefined);

  return (
    <section className={`hero-stage hero-${style}`}>
      <div className="hero-media">
        <HeroVideo motion={motion} heroAlt={heroAlt} />
      </div>
      <div className="hero-shade" />

      {style === "split" ? (
        <div className="hero-split-panel">
          <div className="hero-copy">
            <h1>{stage.heroTitle}</h1>
            <p>{stage.heroLead}</p>
            <HeroActions lang={lang} home={home} stage={stage} onScrollDown={onScrollDown} />
          </div>
        </div>
      ) : (
        <div className="hero-copy">
          <h1>{stage.heroTitle}</h1>
          <p>{stage.heroLead}</p>
          <HeroActions lang={lang} home={home} stage={stage} onScrollDown={onScrollDown} />
        </div>
      )}

      <HeroPicker lang={lang} stage={stage} active={style} />
    </section>
  );
}
