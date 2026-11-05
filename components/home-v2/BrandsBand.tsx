"use client";

import { asset } from "@/lib/asset";
import { brands as brandNames } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { IconArrow } from "./icons";
import { Skeleton } from "./Skeleton";

type Stage = Dictionary["home"]["stage"];

export function BrandsBand({
  lang,
  stage,
  ready,
  motion,
}: {
  lang: Locale;
  stage: Stage;
  ready: boolean;
  motion: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready || !motion) return;
    const root = rootRef.current;
    if (!root) return;
    const track = root.querySelector<HTMLElement>(".hv2-brands-marquee-track");
    if (!track) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".hv2-brands-marquee-media",
        { clipPath: "inset(8% 6% 8% 6% round 18px)", opacity: 0.5 },
        {
          clipPath: "inset(0% 0% 0% 0% round 18px)",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        },
      );

      const loop = gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          loop.timeScale(0.65 + self.getVelocity() * 0.0004);
        },
      });
    }, root);

    return () => context.revert();
  }, [ready, motion]);

  if (!ready) {
    return (
      <section className="hv2-brands is-loading" aria-busy="true">
        <div className="hv2-bleed-inner">
          <Skeleton className="hv2-brands-head-skel" />
        </div>
        <Skeleton className="hv2-brands-media-skel" />
      </section>
    );
  }

  const doubled = [...brandNames, ...brandNames];

  return (
    <section className="hv2-brands" id="brands" ref={rootRef}>
      <div className="hv2-bleed-inner">
        <header className="hv2-bleed-head hv2-bleed-head-row">
          <div>
            <h2>{stage.brandsTitle}</h2>
            <p className="hv2-bleed-lead">{stage.brandsLead}</p>
          </div>
          <Link className="hv2-btn hv2-btn-blue" href={`/${lang}/brands`}>
            <span>{stage.brandsCta}</span>
            <IconArrow />
          </Link>
        </header>
      </div>

      <div className="hv2-brands-marquee-stage">
        <figure className="hv2-brands-marquee-media">
          <Image
            src={asset("/images/brands.webp")}
            alt={stage.brandsImageAlt}
            width={1400}
            height={840}
            sizes="(max-width: 900px) 92vw, 70vw"
          />
        </figure>
      </div>

      <div className="hv2-brands-marquee-rail" aria-hidden="true">
        <div className="hv2-brands-marquee-track">
          {doubled.map((name, index) => (
            <span key={`${name}-${index}`} className="hv2-brands-marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {brandNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
