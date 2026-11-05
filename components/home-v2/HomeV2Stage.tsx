"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AboutProjects } from "./AboutProjects";
import { BrandsBand } from "./BrandsBand";
import { CategoryGrid } from "./CategoryGrid";
import { HeroSlider } from "./HeroSlider";
import { HistoryBand } from "./HistoryBand";
import { StatsBar } from "./StatsBar";
import { TrustStrip } from "./TrustStrip";
import { useHomeV2Ready } from "./useHomeV2Ready";

export function HomeV2Stage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const copy = dict.homeV2;
  const stage = dict.home.stage;
  const ready = useHomeV2Ready();
  const rootRef = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    if (!ready || !motion) return;
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hv2-trust-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hv2-trust", start: "top 88%", once: true },
        },
      );

      gsap.fromTo(
        ".hv2-cat-card",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hv2-cats", start: "top 82%", once: true },
        },
      );

      gsap.fromTo(
        ".hv2-about",
        { xPercent: -6, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hv2-split", start: "top 78%", once: true },
        },
      );

      gsap.fromTo(
        ".hv2-projects",
        { xPercent: 6, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".hv2-split", start: "top 78%", once: true },
        },
      );
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [ready, motion, lang]);

  return (
    <div className="hv2-page" ref={rootRef}>
      <div className="hv2-preview">
        <p>{copy.previewNote}</p>
        <Link href={`/${lang}`}>{copy.backToV1}</Link>
      </div>

      <HeroSlider lang={lang} copy={copy.hero} ready={ready} />
      <TrustStrip copy={copy.trust} ready={ready} />
      <CategoryGrid lang={lang} copy={copy.categories} ready={ready} />
      <AboutProjects lang={lang} about={copy.about} projects={copy.projects} ready={ready} />
      <HistoryBand stage={stage} ready={ready} motion={motion} />
      <BrandsBand lang={lang} stage={stage} ready={ready} motion={motion} />
      <StatsBar copy={copy.stats} ready={ready} motion={motion} />
    </div>
  );
}
