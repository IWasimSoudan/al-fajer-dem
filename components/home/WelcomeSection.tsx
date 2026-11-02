"use client";

import { Mark } from "@/components/Mark";
import { asset } from "@/lib/asset";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
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

export function WelcomeSection({ text, motion }: { text: string; motion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!motion) return;
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const direction = document.documentElement.dir === "rtl" ? -1 : 1;
    const context = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".float-photo").forEach((node) => {
        const x = Number(node.dataset.x);
        const y = Number(node.dataset.y);
        gsap.fromTo(
          node,
          { x: x * direction, y, scale: 0.72 },
          {
            x: 0,
            y: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.65 },
          },
        );
      });
    }, section);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [motion]);

  return (
    <section className="welcome" id="welcome" ref={sectionRef}>
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
      </div>
    </section>
  );
}
