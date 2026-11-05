"use client";

import { asset } from "@/lib/asset";
import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import { homeV2HeroSlides } from "@/lib/homeV2Media";
import type { Locale } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconArrow } from "./icons";
import { Skeleton } from "./Skeleton";

const hrefFor = {
  coils: "products",
  structure: "projects",
  workshop: "expertise",
} as const;

export function HeroSlider({
  lang,
  copy,
  ready,
}: {
  lang: Locale;
  copy: HomeV2Translations["hero"];
  ready: boolean;
}) {
  const [index, setIndex] = useState(0);
  const slide = copy.slides[index];

  useEffect(() => {
    if (!ready) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % copy.slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [ready, copy.slides.length]);

  if (!ready) {
    return (
      <section className="hv2-hero is-loading" aria-busy="true" aria-label="Hero">
        <Skeleton className="hv2-hero-skel" />
      </section>
    );
  }

  return (
    <section className="hv2-hero" aria-roledescription="carousel">
      <div className="hv2-hero-media">
        {homeV2HeroSlides.map((item, i) => (
          <div key={item.id} className={i === index ? "hv2-hero-frame is-on" : "hv2-hero-frame"}>
            <Image
              src={item.src.startsWith("http") ? item.src : asset(item.src)}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="hv2-hero-shade" />
        <div className="hv2-hero-slash" aria-hidden="true" />
      </div>

      <div className="hv2-hero-copy" key={slide.id}>
        <h1>{slide.title}</h1>
        <p>{slide.lead}</p>
        <Link className="hv2-btn hv2-btn-light" href={`/${lang}/${hrefFor[slide.id as keyof typeof hrefFor]}`}>
          <span>{slide.cta}</span>
          <IconArrow />
        </Link>
      </div>

      <div className="hv2-hero-nav">
        <button
          type="button"
          className="hv2-hero-arrow"
          aria-label={copy.prev}
          onClick={() => setIndex((current) => (current - 1 + copy.slides.length) % copy.slides.length)}
        >
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="hv2-hero-arrow"
          aria-label={copy.next}
          onClick={() => setIndex((current) => (current + 1) % copy.slides.length)}
        >
          <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div className="hv2-hero-dots" role="tablist" aria-label="Slides">
        {copy.slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-on" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

    </section>
  );
}
