"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import Image from "next/image";
import type { MouseEvent } from "react";

type Stage = Dictionary["home"]["stage"];

export function HeroSection({
  stage,
  heroAlt,
  motion,
  onScrollDown,
}: {
  stage: Stage;
  heroAlt: string;
  motion: boolean;
  onScrollDown: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <section className="hero-stage">
      <div className="hero-media">
        {motion ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero.jpg"
            aria-hidden="true"
          >
            <source src="/videos/1101.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image src="/images/hero.jpg" alt={heroAlt} fill priority sizes="100vw" className="hero-frame on" />
        )}
      </div>
      <div className="hero-shade" />
      <div className="hero-copy">
        <h1>{stage.heroTitle}</h1>
        <p>{stage.heroLead}</p>
        <a className="scroll-cue" href="#welcome" onClick={onScrollDown}>
          {stage.scroll}
        </a>
      </div>
    </section>
  );
}
