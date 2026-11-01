"use client";

import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Stage = Dictionary["home"]["stage"];

function Arrow() {
  return (
    <svg className="works-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Gear() {
  return (
    <svg className="works-gear" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="78" />
      <circle cx="100" cy="100" r="52" />
      <circle cx="100" cy="100" r="22" />
      <path d="M100 18v16M100 166v16M18 100h16M166 100h16M42 42l11 11M147 147l11 11M158 42l-11 11M53 147l-11 11" />
      <path d="M100 62l8 16h18l-14 12 5 18-17-10-17 10 5-18-14-12h18z" />
    </svg>
  );
}

export function WorksSection({ lang, stage, motion }: { lang: Locale; stage: Stage; motion: boolean }) {
  const [work, setWork] = useState(0);
  const creation = stage.creations[work];

  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => {
      setWork((value) => (value + 1) % stage.creations.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [motion, stage.creations.length, work]);

  function shift(step: number) {
    setWork((value) => (value + step + stage.creations.length) % stage.creations.length);
  }

  return (
    <section className="works" id="works">
      <div className="works-split">
        <div className="works-copy">
          <h2>{stage.worksTitle}</h2>
          <div className="works-stage">
            <Gear />
            <div className="works-lines" key={creation.title}>
              <p className="creation-cat">{creation.category}</p>
              <h3>
                <Link href={`/${lang}/${creation.href}`}>{creation.title}</Link>
              </h3>
              <p className="creation-text">{creation.text}</p>
            </div>
          </div>
          <div className="works-controls">
            <span className="works-dot" aria-hidden="true" />
            <button type="button" className="prev" aria-label={stage.prev} onClick={() => shift(-1)}>
              <Arrow />
            </button>
            <button type="button" className="next" aria-label={stage.next} onClick={() => shift(1)}>
              <Arrow />
            </button>
          </div>
        </div>
        <div className="works-viewport">
          <div
            className="works-track"
            style={{
              ["--count" as string]: stage.creations.length,
              transform: `translate3d(${(-work * 100) / stage.creations.length}%, 0, 0)`,
            }}
          >
            {stage.creations.map((item) => (
              <Link key={item.title} href={`/${lang}/${item.href}`} className="works-shot" aria-label={item.title}>
                <Image src={asset(item.image)} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
