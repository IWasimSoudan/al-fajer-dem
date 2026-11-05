"use client";

import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { Skeleton } from "./Skeleton";

export function StatsBar({
  copy,
  ready,
  motion,
}: {
  copy: HomeV2Translations["stats"];
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
      gsap.fromTo(
        root.querySelectorAll(".hv2-stat"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [ready, motion]);

  if (!ready) {
    return (
      <section className="hv2-stats is-loading" aria-busy="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="hv2-stat-skel" />
        ))}
      </section>
    );
  }

  return (
    <section className="hv2-stats" ref={rootRef}>
      {copy.map((item) => (
        <article key={item.label} className="hv2-stat">
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </article>
      ))}
    </section>
  );
}
