"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";

const frames = ["/images/hero.jpg", "/images/laser.jpg", "/images/hall.jpg"];

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
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => setFrame((value) => (value + 1) % frames.length), 7000);
    return () => window.clearInterval(id);
  }, [motion]);

  return (
    <section className="hero-stage">
      <div className="hero-media">
        {frames.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={index === 0 ? heroAlt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={index === frame ? "hero-frame on" : "hero-frame"}
          />
        ))}
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
