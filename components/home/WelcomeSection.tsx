"use client";

import { Mark } from "@/components/Mark";
import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import {
  resolveWelcomeMotion,
  WELCOME_MOTIONS,
  type WelcomeMotionId,
} from "@/lib/welcomeMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const collage = [
  { src: "/images/canopy.jpg", className: "p1", x: 170, y: 130 },
  { src: "/images/tanks.jpg", className: "p2", x: -180, y: 140 },
  { src: "/images/hex-panels.jpg", className: "p3", x: 210, y: 20 },
  { src: "/images/iron-fence.jpg", className: "p4", x: -210, y: 10 },
  { src: "/images/warehouse-doors.jpg", className: "p5", x: 150, y: -160 },
  { src: "/images/black-door.jpg", className: "p6", x: 10, y: -180 },
  { src: "/images/ornate-doors.jpg", className: "p7", x: -160, y: -160 },
];

function restState() {
  return { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 };
}

function motionFrom(
  mode: WelcomeMotionId,
  x: number,
  y: number,
  direction: number,
  index: number,
) {
  const side = x === 0 ? (index % 2 === 0 ? 1 : -1) : Math.sign(x);

  if (mode === "expand") {
    return {
      x: -x * 0.92 * direction,
      y: -y * 0.92,
      scale: 0.42,
      rotation: side * -10,
      opacity: 0.35,
    };
  }

  if (mode === "converge") {
    return {
      x: x * 1.45 * direction,
      y: y * 1.45,
      scale: 0.58,
      rotation: side * 14,
      opacity: 0,
    };
  }

  // bloom — rise on soft arcs with a slight twist
  return {
    x: x * 0.22 * direction,
    y: Math.abs(y) * 0.15 + 240 + index * 18,
    scale: 0.62,
    rotation: side * (16 + index * 2),
    opacity: 0,
  };
}

export function WelcomeSection({
  lang,
  text,
  stage,
  motion,
}: {
  lang: Locale;
  text: string;
  stage: Dictionary["home"]["stage"];
  motion: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const mode = resolveWelcomeMotion(searchParams.get("welcome") ?? undefined);

  useEffect(() => {
    if (!motion) return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const direction = document.documentElement.dir === "rtl" ? -1 : 1;
    const context = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".float-photo").forEach((node, index) => {
        const x = Number(node.dataset.x);
        const y = Number(node.dataset.y);
        const from = motionFrom(mode, x, y, direction, index);
        const to = restState();

        gsap.fromTo(node, from, {
          ...to,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: mode === "bloom" ? 1.6 : 1.4,
          },
        });
      });
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [motion, mode]);

  return (
    <section className={`welcome welcome-motion-${mode}`} id="welcome" ref={sectionRef}>
      <div className="welcome-sticky">
        {collage.map((photo) => (
          <div key={photo.className} className={`float-photo ${photo.className}`} data-x={photo.x} data-y={photo.y}>
            <Image src={asset(photo.src)} alt="" fill sizes="240px" />
          </div>
        ))}
        <div className="welcome-copy reveal">
          <Mark />
          <h2>{text}</h2>
        </div>

        <aside className="welcome-motion-picker" aria-label={stage.welcomeMotionPicker}>
          <div className="welcome-motion-picker-copy">
            <p className="welcome-motion-picker-title">{stage.welcomeMotionPicker}</p>
            <p className="welcome-motion-picker-hint">{stage.welcomeMotionHint}</p>
          </div>
          <div className="welcome-motion-picker-list" role="list">
            {WELCOME_MOTIONS.map((id) => {
              const meta = stage.welcomeMotions[id];
              const active = mode === id;
              const params = new URLSearchParams();
              params.set("welcome", id);
              const works = searchParams.get("works");
              if (works) params.set("works", works);
              return (
                <Link
                  key={id}
                  href={`/${lang}?${params.toString()}#welcome`}
                  role="listitem"
                  className={active ? "welcome-motion-item is-active" : "welcome-motion-item"}
                  aria-current={active ? "page" : undefined}
                  scroll={false}
                >
                  <strong>{meta.label}</strong>
                  <span>{meta.blurb}</span>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
