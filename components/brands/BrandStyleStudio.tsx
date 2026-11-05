"use client";

import { asset } from "@/lib/asset";
import { brandMonogram, BRAND_STYLES, resolveBrandStyle, type BrandStyleId } from "@/lib/brandStyles";
import { brands as brandNames, featuredBrands } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useMemo, useRef } from "react";

const featuredSet = new Set<string>(featuredBrands);

function moreBrands() {
  return brandNames.filter((name) => !featuredSet.has(name));
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: BrandStyleId;
}) {
  return (
    <aside className="br-picker" aria-label={dict.brands.stylePicker}>
      <div className="br-picker-copy">
        <p className="br-picker-title">{dict.brands.stylePicker}</p>
        <p className="br-picker-hint">{dict.brands.styleHint}</p>
      </div>
      <div className="br-picker-list" role="list">
        {BRAND_STYLES.map((id) => {
          const meta = dict.brands.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/brands?style=${id}`}
              role="listitem"
              className={active === id ? "br-picker-item is-active" : "br-picker-item"}
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

function Monogram({ name, hint }: { name: string; hint: string }) {
  return (
    <span className="br-mono" aria-hidden="true" title={hint}>
      <span className="br-mono-shimmer" />
      <em>{brandMonogram(name)}</em>
    </span>
  );
}

/** 1 · Name plates */
function PlatesLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const more = useMemo(() => moreBrands(), []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".br-plate, .br-chip").forEach((node, index) => {
        gsap.fromTo(
          node,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: (index % 5) * 0.05,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 92%", once: true },
          },
        );
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => context.revert();
  }, []);

  return (
    <div className="br-plates" ref={rootRef}>
      <section aria-labelledby="br-featured-title">
        <h2 id="br-featured-title">{dict.brands.featuredTitle}</h2>
        <div className="br-plate-grid">
          {featuredBrands.map((name) => (
            <article key={name} className="br-plate">
              <Monogram name={name} hint={dict.brands.monogramHint} />
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="br-more-title">
        <h2 id="br-more-title">{dict.brands.moreTitle}</h2>
        <div className="br-chip-grid">
          {more.map((name) => (
            <p key={name} className="br-chip">
              <Monogram name={name} hint={dict.brands.monogramHint} />
              <span>{name}</span>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

/** 2 · Partner marquee */
function MarqueeLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const loop = useMemo(() => [...brandNames, ...brandNames], []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".br-feature-card").forEach((node, index) => {
        gsap.fromTo(
          node,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
          },
        );
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => context.revert();
  }, []);

  return (
    <div className="br-marquee" ref={rootRef}>
      <section aria-labelledby="br-featured-marquee">
        <h2 id="br-featured-marquee">{dict.brands.featuredTitle}</h2>
        <div className="br-feature-row">
          {featuredBrands.map((name) => (
            <article key={name} className="br-feature-card">
              <Monogram name={name} hint={dict.brands.monogramHint} />
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="br-more-marquee">
        <h2 id="br-more-marquee">{dict.brands.moreTitle}</h2>
        <div className="br-marquee-viewport">
          <div className="br-marquee-track">
            {loop.map((name, index) => (
              <p key={`${name}-${index}`} className="br-marquee-item" aria-hidden={index >= brandNames.length}>
                <Monogram name={name} hint={dict.brands.monogramHint} />
                <span>{name}</span>
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** 3 · Supply index */
function IndexLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const spine = root.querySelector<HTMLElement>(".br-index-spine span");
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              end: "bottom 45%",
              scrub: 1.05,
            },
          },
        );
      }

      root.querySelectorAll<HTMLElement>(".br-index-row").forEach((row, index) => {
        gsap.fromTo(
          row,
          { x: index % 2 === 0 ? -36 : 36, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.9,
            },
          },
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="br-index" ref={rootRef}>
      <div className="br-index-track">
        <div className="br-index-spine" aria-hidden="true">
          <span />
        </div>
        <ol className="br-index-list">
          {brandNames.map((name, index) => {
            const featured = featuredSet.has(name);
            return (
              <li key={name} className={featured ? "br-index-row is-featured" : "br-index-row"}>
                <span className="br-index-num">{String(index + 1).padStart(2, "0")}</span>
                <Monogram name={name} hint={dict.brands.monogramHint} />
                <div className="br-index-copy">
                  <h3>{name}</h3>
                  <p>{featured ? dict.brands.featuredTitle : dict.brands.moreTitle}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function BrandStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveBrandStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page br-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/iron-fence.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.brands.kicker}</p>
          <h1>{dict.brands.title}</h1>
          <p>{dict.brands.lead}</p>
        </div>
      </section>

      <div className="page-body br-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="br-idea" role="note">
          <p className="br-idea-kicker">{dict.brands.styleWhy}</p>
          <p>
            <strong>{dict.brands.styles[style].label}</strong>
            <span>{dict.brands.styles[style].idea}</span>
          </p>
        </div>

        {style === "plates" ? <PlatesLayout dict={dict} /> : null}
        {style === "marquee" ? <MarqueeLayout dict={dict} /> : null}
        {style === "index" ? <IndexLayout dict={dict} /> : null}
      </div>
    </div>
  );
}
