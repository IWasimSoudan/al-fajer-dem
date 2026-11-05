"use client";

import { asset } from "@/lib/asset";
import { expertise as expertiseIds } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import {
  EXPERTISE_STYLES,
  expertiseMedia,
  resolveExpertiseStyle,
  type ExpertiseStyleId,
} from "@/lib/expertiseStyles";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

type ExpertiseId = (typeof expertiseIds)[number];

function copyFor(dict: Dictionary, id: ExpertiseId) {
  return dict.expertise.items[id];
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: ExpertiseStyleId;
}) {
  return (
    <aside className="ex-picker" aria-label={dict.expertise.stylePicker}>
      <div className="ex-picker-copy">
        <p className="ex-picker-title">{dict.expertise.stylePicker}</p>
        <p className="ex-picker-hint">{dict.expertise.styleHint}</p>
      </div>
      <div className="ex-picker-list" role="list">
        {EXPERTISE_STYLES.map((id) => {
          const meta = dict.expertise.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/expertise?style=${id}`}
              role="listitem"
              className={active === id ? "ex-picker-item is-active" : "ex-picker-item"}
              aria-current={active === id ? "page" : undefined}
              scroll={false}
            >
              <strong>{meta.label}</strong>
              <span>{meta.blurb}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function CascadeLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const spine = root.querySelector<HTMLElement>(".ex-cascade-spine span");
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 65%",
              end: "bottom 45%",
              scrub: 1.15,
            },
          },
        );
      }

      const counter = root.querySelector<HTMLElement>(".ex-cascade-count");
      root.querySelectorAll<HTMLElement>(".ex-cascade-row").forEach((row, index) => {
        const fromX = index % 2 === 0 ? -56 : 56;
        gsap.fromTo(
          row,
          { x: fromX, opacity: 0, y: 36 },
          {
            x: 0,
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 52%",
              scrub: 0.95,
              onEnter: () => {
                if (counter) counter.textContent = String(index + 1).padStart(2, "0");
              },
              onEnterBack: () => {
                if (counter) counter.textContent = String(index + 1).padStart(2, "0");
              },
            },
          },
        );

        const num = row.querySelector<HTMLElement>(".ex-cascade-num");
        if (num) {
          gsap.fromTo(
            num,
            { scale: 1.45, opacity: 0.15, y: 28 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                end: "top 48%",
                scrub: 1.05,
              },
            },
          );
        }

        const media = row.querySelector(".ex-cascade-media");
        const img = row.querySelector("img");
        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(18% 12% 18% 12% round 14px)", opacity: 0.4 },
            {
              clipPath: "inset(0% 0% 0% 0% round 14px)",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
              },
            },
          );
        }
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.22 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="ex-cascade" ref={rootRef}>
      <div className="ex-cascade-sticky" aria-hidden="true">
        <span className="ex-cascade-count">01</span>
        <span className="ex-cascade-total">/ {String(expertiseIds.length).padStart(2, "0")}</span>
      </div>
      <div className="ex-cascade-track">
        <div className="ex-cascade-spine" aria-hidden="true">
          <span />
        </div>
        <ol className="ex-cascade-list">
          {expertiseIds.map((id, index) => {
            const item = copyFor(dict, id);
            return (
              <li key={id} id={id} className="ex-cascade-row">
                <span className="ex-cascade-num">{String(index + 1).padStart(2, "0")}</span>
                <div className="ex-cascade-media">
                  <Image src={asset(expertiseMedia[id])} alt="" fill sizes="(max-width: 900px) 100vw, 38vw" />
                </div>
                <div className="ex-cascade-copy">
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function ShuttersLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".ex-shutter").forEach((panel) => {
        const door = panel.querySelector<HTMLElement>(".ex-shutter-door");
        const img = panel.querySelector("img");
        const copy = panel.querySelectorAll(".ex-shutter-copy > *");
        const num = panel.querySelector(".ex-shutter-num");

        if (door) {
          gsap.fromTo(
            door,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 78%",
                end: "top 28%",
                scrub: 1.05,
              },
            },
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { yPercent: 14, scale: 1.16 },
            {
              yPercent: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.25,
              },
            },
          );
        }

        gsap.fromTo(
          copy,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 62%",
              end: "top 32%",
              scrub: 0.9,
            },
          },
        );

        if (num) {
          gsap.fromTo(
            num,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 0.18,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 70%",
                end: "top 40%",
                scrub: 1,
              },
            },
          );
        }
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="ex-shutters" ref={rootRef}>
      {expertiseIds.map((id, index) => {
        const item = copyFor(dict, id);
        return (
          <article key={id} id={id} className="ex-shutter">
            <div className="ex-shutter-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="ex-shutter-door">
              <Image src={asset(expertiseMedia[id])} alt="" fill sizes="100vw" priority={index === 0} />
              <div className="ex-shutter-shade" />
            </div>
            <div className="ex-shutter-copy">
              <p className="ex-shutter-kicker">{dict.expertise.kicker}</p>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function OrbitLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = root.querySelector<HTMLElement>(".ex-orbit-track");
    const fill = root.querySelector<HTMLElement>(".ex-orbit-fill");
    const label = root.querySelector<HTMLElement>(".ex-orbit-active");
    if (!track) return;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const total = () => Math.max(track.scrollWidth - root.clientWidth, 0);

      gsap.to(track, {
        x: () => -total(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.max(total() * 1.2, window.innerHeight * 2.2)}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill) fill.style.width = `${self.progress * 100}%`;
            const cards = root.querySelectorAll<HTMLElement>(".ex-orbit-card");
            const local = self.progress * (expertiseIds.length - 1);
            let nearest = 0;
            cards.forEach((card, index) => {
              const dist = Math.abs(local - index);
              if (dist < Math.abs(local - nearest)) nearest = index;
              const focus = Math.max(0, 1 - dist);
              gsap.set(card, {
                opacity: 0.42 + focus * 0.58,
                y: (1 - focus) * 28,
                rotateY: (index - local) * -7,
                scale: 0.9 + focus * 0.1,
                z: focus * 40,
              });
            });
            if (label) {
              const id = expertiseIds[nearest];
              label.textContent = copyFor(dict, id).title;
            }
          },
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [dict]);

  return (
    <div className="ex-orbit" ref={rootRef}>
      <div className="ex-orbit-head">
        <div>
          <p className="ex-orbit-kicker">{dict.expertise.kicker}</p>
          <p className="ex-orbit-active">{copyFor(dict, expertiseIds[0]).title}</p>
        </div>
        <div className="ex-orbit-progress" aria-hidden="true">
          <span className="ex-orbit-fill" />
        </div>
      </div>
      <div className="ex-orbit-viewport">
        <div className="ex-orbit-track">
          {expertiseIds.map((id, index) => {
            const item = copyFor(dict, id);
            return (
              <article key={id} id={id} className="ex-orbit-card">
                <div className="ex-orbit-media">
                  <Image src={asset(expertiseMedia[id])} alt="" fill sizes="420px" />
                </div>
                <div className="ex-orbit-copy">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ExpertiseStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveExpertiseStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page ex-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/hex-panels.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.expertise.kicker}</p>
          <h1>{dict.expertise.title}</h1>
          <p>{dict.expertise.lead}</p>
        </div>
      </section>

      <div className="page-body ex-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="ex-idea" role="note">
          <p className="ex-idea-kicker">{dict.expertise.styleWhy}</p>
          <p>
            <strong>{dict.expertise.styles[style].label}</strong>
            <span>{dict.expertise.styles[style].idea}</span>
          </p>
        </div>

        {style === "cascade" ? <CascadeLayout dict={dict} /> : null}
        {style === "shutters" ? <ShuttersLayout dict={dict} /> : null}
        {style === "orbit" ? <OrbitLayout dict={dict} /> : null}
      </div>
    </div>
  );
}
