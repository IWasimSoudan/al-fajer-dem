"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { Skeleton } from "./Skeleton";

type Stage = Dictionary["home"]["stage"];

export function HistoryBand({
  stage,
  ready,
  motion,
}: {
  stage: Stage;
  ready: boolean;
  motion: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ready || !motion) return;
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const fill = root.querySelector<HTMLElement>(".hv2-hist-fill");
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 55%", scrub: 1 },
          },
        );
      }
      gsap.fromTo(
        root.querySelectorAll(".hv2-hist-item"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [ready, motion, stage.history.length]);

  if (!ready) {
    return (
      <section className="hv2-history is-loading" aria-busy="true">
        <div className="hv2-bleed-inner">
          <Skeleton className="hv2-hist-head-skel" />
          <div className="hv2-hist-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="hv2-hist-skel" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hv2-history" id="history" ref={rootRef}>
      <div className="hv2-bleed-inner">
        <header className="hv2-bleed-head">
          <p className="hv2-kicker hv2-kicker-dark">{stage.historyKicker}</p>
          <h2>{stage.historyTitle}</h2>
          <p className="hv2-bleed-lead">{stage.historyLead}</p>
        </header>
      </div>

      <div className="hv2-hist-track">
        <div className="hv2-hist-line hv2-bleed-inner" aria-hidden="true">
          <span className="hv2-hist-fill" />
        </div>
        <ol className="hv2-hist-row">
          {stage.history.map((item) => (
            <li key={item.year} className="hv2-hist-item">
              <time dateTime={item.year === "Today" ? undefined : item.year}>{item.year}</time>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
