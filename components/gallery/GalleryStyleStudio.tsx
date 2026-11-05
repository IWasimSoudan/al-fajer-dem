"use client";

import { asset } from "@/lib/asset";
import { gallery as galleryItems, galleryFilters, type GalleryFilter } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import { GALLERY_STYLES, resolveGalleryStyle, type GalleryStyleId } from "@/lib/galleryStyles";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type GalleryItem = (typeof galleryItems)[number];

function captionFor(dict: Dictionary, id: GalleryItem["id"]) {
  return dict.gallery.items[id];
}

function useFiltered(filter: GalleryFilter) {
  return useMemo(
    () => galleryItems.filter((item) => filter === "all" || item.filter === filter),
    [filter],
  );
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: GalleryStyleId;
}) {
  return (
    <aside className="gl-picker" aria-label={dict.gallery.stylePicker}>
      <div className="gl-picker-copy">
        <p className="gl-picker-title">{dict.gallery.stylePicker}</p>
        <p className="gl-picker-hint">{dict.gallery.styleHint}</p>
      </div>
      <div className="gl-picker-list" role="list">
        {GALLERY_STYLES.map((id) => {
          const meta = dict.gallery.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/gallery?style=${id}`}
              role="listitem"
              className={active === id ? "gl-picker-item is-active" : "gl-picker-item"}
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

function FilterBar({
  dict,
  filter,
  onFilter,
}: {
  dict: Dictionary;
  filter: GalleryFilter;
  onFilter: (value: GalleryFilter) => void;
}) {
  return (
    <div className="gl-filters" role="group" aria-label={dict.gallery.kicker}>
      {galleryFilters.map((key) => (
        <button
          key={key}
          type="button"
          className={filter === key ? "is-active" : undefined}
          aria-pressed={filter === key}
          onClick={() => onFilter(key)}
        >
          {dict.gallery.filters[key]}
        </button>
      ))}
    </div>
  );
}

/** 1 · Lattice — staggered grid with filter crossfade transitions. */
function LatticeLayout({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const items = useFiltered(filter);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const figures = grid.querySelectorAll<HTMLElement>(".gl-lattice-item");

    if (reduce) {
      gsap.set(figures, { clearProps: "all" });
      return;
    }

    gsap.fromTo(
      figures,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [filter, items]);

  return (
    <div className="gl-lattice">
      <FilterBar dict={dict} filter={filter} onFilter={setFilter} />
      {items.length === 0 ? (
        <p className="gl-empty">{dict.gallery.empty}</p>
      ) : (
        <div className="gl-lattice-grid" ref={gridRef}>
          {items.map((item, index) => (
            <figure key={`${filter}-${item.id}`} className="gl-lattice-item">
              <div className="gl-lattice-media">
                <Image
                  src={asset(item.image)}
                  alt={captionFor(dict, item.id)}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  priority={index < 3}
                />
                <span className="gl-lattice-shade" aria-hidden="true" />
              </div>
              <figcaption>
                <span>{dict.gallery.filters[item.filter]}</span>
                {captionFor(dict, item.id)}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

/** 2 · Reel — horizontal film strip, soft scroll-linked motion. */
function ReelLayout({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const items = useFiltered(filter);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = track.querySelectorAll<HTMLElement>(".gl-reel-card");

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: true,
        },
      );

      if (reduce) return;

      cards.forEach((card) => {
        const img = card.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              scroller: track,
              horizontal: true,
              start: "left 90%",
              end: "left 30%",
              scrub: 0.8,
            },
          },
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [filter, items]);

  return (
    <div className="gl-reel" ref={rootRef}>
      <FilterBar dict={dict} filter={filter} onFilter={setFilter} />
      {items.length === 0 ? (
        <p className="gl-empty">{dict.gallery.empty}</p>
      ) : (
        <div className="gl-reel-viewport">
          <div className="gl-reel-track" ref={trackRef}>
            {items.map((item, index) => (
              <figure key={`${filter}-${item.id}`} className="gl-reel-card">
                <div className="gl-reel-media">
                  <Image
                    src={asset(item.image)}
                    alt={captionFor(dict, item.id)}
                    fill
                    sizes="(max-width: 800px) 85vw, 520px"
                    priority={index < 2}
                  />
                </div>
                <figcaption>
                  <span>{dict.gallery.filters[item.filter]}</span>
                  <strong>{captionFor(dict, item.id)}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** 3 · Stage — featured shot + thumbs, crossfade transitions. */
function StageLayout({ dict }: { dict: Dictionary }) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const items = useFiltered(filter);
  const [index, setIndex] = useState(0);
  const featureRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setIndex(0);
    indexRef.current = 0;
  }, [filter]);

  useLayoutEffect(() => {
    indexRef.current = index;
  }, [index]);

  useLayoutEffect(() => {
    const feature = featureRef.current;
    if (!feature || items.length === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.fromTo(
      feature,
      { opacity: 0.55, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
    );
  }, [index, filter, items.length]);

  const active = items[index] ?? items[0];

  function go(dir: 1 | -1) {
    if (!items.length || animating.current) return;
    const next = (indexRef.current + dir + items.length) % items.length;
    swapTo(next, dir);
  }

  function swapTo(next: number, dir: 1 | -1 = 1) {
    if (next === indexRef.current || animating.current) return;
    const feature = featureRef.current;
    if (!feature) {
      setIndex(next);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIndex(next);
      return;
    }

    animating.current = true;
    gsap.to(feature, {
      opacity: 0,
      x: dir * -28,
      duration: 0.22,
      ease: "power1.in",
      onComplete: () => {
        setIndex(next);
        gsap.fromTo(
          feature,
          { opacity: 0, x: dir * 28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => {
              animating.current = false;
            },
          },
        );
      },
    });
  }

  return (
    <div className="gl-stage">
      <FilterBar dict={dict} filter={filter} onFilter={setFilter} />
      {items.length === 0 || !active ? (
        <p className="gl-empty">{dict.gallery.empty}</p>
      ) : (
        <>
          <div className="gl-stage-feature-wrap">
            <button type="button" className="gl-stage-nav is-prev" aria-label={dict.gallery.prev} onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="gl-stage-feature" ref={featureRef}>
              <div className="gl-stage-media">
                <Image
                  key={active.id}
                  src={asset(active.image)}
                  alt={captionFor(dict, active.id)}
                  fill
                  sizes="(max-width: 900px) 100vw, 70vw"
                  priority
                />
                <div className="gl-stage-placeholder" aria-hidden="true" />
              </div>
              <div className="gl-stage-copy">
                <p className="gl-stage-tag">{dict.gallery.filters[active.filter]}</p>
                <h2>{captionFor(dict, active.id)}</h2>
                <p className="gl-stage-count">
                  {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
              </div>
            </div>

            <button type="button" className="gl-stage-nav is-next" aria-label={dict.gallery.next} onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="gl-stage-thumbs" role="list">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="listitem"
                className={i === index ? "gl-stage-thumb is-active" : "gl-stage-thumb"}
                aria-current={i === index ? "true" : undefined}
                aria-label={captionFor(dict, item.id)}
                onClick={() => swapTo(i, i > indexRef.current ? 1 : -1)}
              >
                <Image src={asset(item.image)} alt="" fill sizes="120px" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function GalleryStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveGalleryStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page gl-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/ornate-doors.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.gallery.kicker}</p>
          <h1>{dict.gallery.title}</h1>
          <p>{dict.gallery.lead}</p>
        </div>
      </section>

      <div className="page-body gl-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="gl-idea" role="note">
          <p className="gl-idea-kicker">{dict.gallery.styleWhy}</p>
          <p>
            <strong>{dict.gallery.styles[style].label}</strong>
            <span>{dict.gallery.styles[style].idea}</span>
          </p>
        </div>

        {style === "lattice" ? <LatticeLayout dict={dict} /> : null}
        {style === "reel" ? <ReelLayout dict={dict} /> : null}
        {style === "stage" ? <StageLayout dict={dict} /> : null}
      </div>
    </div>
  );
}
