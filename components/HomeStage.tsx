"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { QuotesSection } from "@/components/home/QuotesSection";
import { TeamSection } from "@/components/home/TeamSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { WorksSection } from "@/components/home/WorksSection";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

export function HomeStage({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const stage = dict.home.stage;
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!motion) return;
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const hero = root.querySelector(".hero-stage");
      const media = root.querySelector(".hero-media");
      const copy = root.querySelector(".hero-copy");
      if (hero && media) {
        gsap.fromTo(
          media,
          { scale: 1.28 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          },
        );
      }
      if (hero && copy) {
        gsap.to(copy, {
          y: -120,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".reveal")).forEach((element) => {
        gsap.fromTo(
          element,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 92%", end: "top 58%", scrub: true },
          },
        );
      });

      const teamImage = root.querySelector(".team-photo img");
      if (teamImage) {
        gsap.fromTo(
          teamImage,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".team-photo", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    }, root);

    const menu = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    menu.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      menu.disconnect();
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [motion]);

  return (
    <div className="home-page" ref={rootRef}>
      <HeroSection
        stage={stage}
        heroAlt={dict.home.heroAlt}
        motion={motion}
        onScrollDown={(event) => {
          if (!lenisRef.current) return;
          event.preventDefault();
          lenisRef.current.scrollTo("#welcome");
        }}
      />
      <WelcomeSection lang={lang} text={stage.welcome} stage={stage} motion={motion} />
      <WorksSection lang={lang} stage={stage} motion={motion} />
      <TeamSection lang={lang} stage={stage} />
      <QuotesSection stage={stage} motion={motion} />
    </div>
  );
}
