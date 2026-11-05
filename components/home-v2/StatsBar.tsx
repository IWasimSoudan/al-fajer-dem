"use client";

import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BadgeCheck, Check, Globe, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Skeleton } from "./Skeleton";

const statsIcons: Record<Exclude<HomeV2Translations["stats"][number]["id"], "years">, LucideIcon> = {
  iso: BadgeCheck,
  clients: Handshake,
  markets: Globe,
};

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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 88%", once: true },
        },
      );
    }, root);
    return () => context.revert();
  }, [ready, motion]);

  if (!ready) {
    return (
      <section className="hv2-stats is-loading" aria-busy="true">
        <Skeleton className="hv2-stats-shell-skel" />
      </section>
    );
  }

  return (
    <section className="hv2-stats" ref={rootRef} aria-label="Highlights">
      <div className="hv2-stats-shell">
        {copy.map((item) => {
          if (item.id === "years") {
            return (
              <article key={item.id} className="hv2-stat">
                <span className="hv2-stat-icon is-solid" aria-hidden="true">
                  <Check strokeWidth={2.5} />
                </span>
                <p>{item.label}</p>
              </article>
            );
          }

          const Icon = statsIcons[item.id];
          return (
            <article key={item.id} className="hv2-stat">
              <span className="hv2-stat-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <p>{item.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
