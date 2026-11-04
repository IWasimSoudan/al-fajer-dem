"use client";

import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { resolveWorksStyle, WORKS_STYLES, type WorksStyleId } from "@/lib/worksStyle";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Stage = Dictionary["home"]["stage"];
type Creation = Stage["creations"][number];

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

function WorksPicker({
  lang,
  stage,
  active,
  welcomeParam,
}: {
  lang: Locale;
  stage: Stage;
  active: WorksStyleId;
  welcomeParam: string | null;
}) {
  return (
    <aside className="works-style-picker" aria-label={stage.worksStylePicker}>
      <div className="works-style-picker-copy">
        <p className="works-style-picker-title">{stage.worksStylePicker}</p>
        <p className="works-style-picker-hint">{stage.worksStyleHint}</p>
      </div>
      <div className="works-style-picker-list" role="list">
        {WORKS_STYLES.map((id) => {
          const meta = stage.worksStyles[id];
          const on = active === id;
          const params = new URLSearchParams();
          if (welcomeParam) params.set("welcome", welcomeParam);
          params.set("works", id);
          return (
            <Link
              key={id}
              href={`/${lang}?${params.toString()}#works`}
              role="listitem"
              className={on ? "works-style-item is-active" : "works-style-item"}
              aria-current={on ? "page" : undefined}
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

function CopyBlock({
  lang,
  creation,
  title,
  animKey,
}: {
  lang: Locale;
  creation: Creation;
  title: string;
  animKey: string;
}) {
  return (
    <>
      <h2>{title}</h2>
      <div className="works-stage">
        <Gear />
        <div className="works-lines" key={animKey}>
          <p className="creation-cat">{creation.category}</p>
          <h3>
            <Link href={`/${lang}/${creation.href}`}>{creation.title}</Link>
          </h3>
          <p className="creation-text">{creation.text}</p>
        </div>
      </div>
    </>
  );
}

function Controls({
  lang,
  stage,
  index,
  total,
  onShift,
}: {
  lang: Locale;
  stage: Stage;
  index: number;
  total: number;
  onShift: (step: number) => void;
}) {
  return (
    <div className="works-controls">
      <div className="works-progress" aria-hidden="true">
        <span style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <span className="works-index">
        {String(index + 1).padStart(2, "0")}
        <em>/{String(total).padStart(2, "0")}</em>
      </span>
      <button
        type="button"
        className="prev"
        aria-label={lang === "ar" ? stage.next : stage.prev}
        onClick={() => onShift(lang === "ar" ? 1 : -1)}
      >
        <Arrow />
      </button>
      <button
        type="button"
        className="next"
        aria-label={lang === "ar" ? stage.prev : stage.next}
        onClick={() => onShift(lang === "ar" ? -1 : 1)}
      >
        <Arrow />
      </button>
    </div>
  );
}

export function WorksSection({ lang, stage, motion }: { lang: Locale; stage: Stage; motion: boolean }) {
  const searchParams = useSearchParams();
  const style = resolveWorksStyle(searchParams.get("works") ?? undefined);
  const welcomeParam = searchParams.get("welcome");
  const [work, setWork] = useState(0);
  const [dir, setDir] = useState(1);
  const creation = stage.creations[work];
  const total = stage.creations.length;

  const railRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const curtainFrontRef = useRef<HTMLDivElement>(null);
  const gearSpin = useRef(0);

  useEffect(() => {
    if (!motion) return;
    const pause = style === "deck" ? 9800 : 7200;
    const id = window.setInterval(() => {
      setDir(1);
      setWork((value) => (value + 1) % total);
    }, pause);
    return () => window.clearInterval(id);
  }, [motion, total, work, style]);

  function shift(step: number) {
    setDir(step >= 0 ? 1 : -1);
    setWork((value) => (value + step + total) % total);
  }

  /* —— RAIL: ken burns + neighbor scale + gear tick —— */
  useLayoutEffect(() => {
    if (style !== "rail") return;
    const root = railRef.current;
    if (!root) return;

    const shots = root.querySelectorAll<HTMLElement>(".works-shot");
    const track = root.querySelector<HTMLElement>(".works-track");
    const gear = root.querySelector<HTMLElement>(".works-gear");
    const lines = root.querySelectorAll<HTMLElement>(".works-lines > *");
    const dur = motion ? 1.15 : 0;

    if (motion) {
      gearSpin.current += dir * 42;
      if (gear) gsap.to(gear, { rotation: gearSpin.current, duration: 1.1, ease: "power3.out" });
    }

    if (track) {
      gsap.to(track, {
        xPercent: (-work * 100) / total,
        duration: dur,
        ease: "power3.inOut",
      });
    }

    shots.forEach((shot, i) => {
      const img = shot.querySelector("img");
      const active = i === work;
      gsap.to(shot, {
        scale: active ? 1 : 0.92,
        opacity: active ? 1 : 0.55,
        duration: motion ? 1.05 : 0,
        ease: "power2.out",
      });
      if (img && motion && active) {
        gsap.killTweensOf(img);
        gsap.fromTo(
          img,
          { scale: 1.12, xPercent: dir * -3 },
          { scale: 1, xPercent: 0, duration: 6.5, ease: "power1.out" },
        );
      }
    });

    if (motion) {
      gsap.fromTo(
        lines,
        { y: 28, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }
  }, [work, style, motion, dir, total]);

  /* —— DECK: 3D stack rise / fall —— */
  useLayoutEffect(() => {
    if (style !== "deck") return;
    const root = deckRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".works-deck-card"));
    const lines = root.querySelectorAll<HTMLElement>(".works-lines > *");
    const gear = root.querySelector<HTMLElement>(".works-gear");

    if (motion) {
      gearSpin.current += dir * 40;
      if (gear) gsap.to(gear, { rotation: gearSpin.current, duration: 1.7, ease: "power3.out" });
    }

    cards.forEach((card, i) => {
      const offset = (i - work + total) % total;
      const depth = offset === 0 ? 0 : offset;
      const behind = depth > 0;
      // Always nudge stacked cards away from the copy column
      const away = document.documentElement.dir === "rtl" ? -1 : 1;

      gsap.to(card, {
        zIndex: total - depth,
        xPercent: behind ? depth * 1.4 * away : 0,
        yPercent: behind ? depth * 1.8 : 0,
        scale: behind ? 1 - depth * 0.045 : 1,
        rotateY: behind ? depth * -3.5 * away : 0,
        rotateZ: behind ? depth * 0.9 * away : 0,
        opacity: depth > 2 ? 0 : 1,
        filter: behind && motion ? `blur(${Math.min(depth, 2) * 1.2}px)` : "blur(0px)",
        duration: motion ? 1.55 : 0,
        ease: "power2.inOut",
      });

      const img = card.querySelector("img");
      if (img && offset === 0 && motion) {
        gsap.killTweensOf(img);
        gsap.fromTo(img, { scale: 1.12 }, { scale: 1.03, duration: 8.5, ease: "power1.out" });
      }
    });

    if (motion) {
      gsap.fromTo(
        lines,
        { x: dir * 28, opacity: 0, rotate: dir * 1.2 },
        { x: 0, opacity: 1, rotate: 0, duration: 1.25, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [work, style, motion, dir, total]);

  /* —— CURTAIN: wipe reveal between layers —— */
  useLayoutEffect(() => {
    if (style !== "curtain") return;
    const root = curtainRef.current;
    const front = curtainFrontRef.current;
    if (!root || !front) return;

    const lines = root.querySelectorAll<HTMLElement>(".works-curtain-copy > *");
    const counter = root.querySelector<HTMLElement>(".works-curtain-count");

    if (!motion) {
      gsap.set(front, { clipPath: "inset(0 0 0 0%)" });
      return;
    }

    const wipe =
      dir >= 0
        ? { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" }
        : { from: "inset(0 100% 0 0)", to: "inset(0 0 0 0%)" };

    gsap.fromTo(
      front,
      { clipPath: wipe.from },
      { clipPath: wipe.to, duration: 1.25, ease: "power4.inOut" },
    );

    const img = front.querySelector("img");
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.2, xPercent: dir * 8 },
        { scale: 1.05, xPercent: 0, duration: 5.5, ease: "power1.out" },
      );
    }

    gsap.fromTo(
      lines,
      { y: 48, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: "power3.out", delay: 0.2 },
    );

    if (counter) {
      gsap.fromTo(counter, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" });
    }
  }, [work, style, motion, dir]);

  const prevIndex = (work - 1 + total) % total;

  return (
    <section className={`works works-${style}`} id="works">
      {style === "rail" ? (
        <div className="works-split" ref={railRef}>
          <div className="works-copy">
            <CopyBlock lang={lang} creation={creation} title={stage.worksTitle} animKey={creation.title} />
            <Controls lang={lang} stage={stage} index={work} total={total} onShift={shift} />
          </div>
          <div className="works-viewport">
            <div
              className="works-track"
              style={{
                ["--count" as string]: total,
                width: `${total * 100}%`,
                ...(!motion
                  ? { transform: `translate3d(${(-work * 100) / total}%, 0, 0)` }
                  : undefined),
              }}
            >
              {stage.creations.map((item, i) => (
                <Link
                  key={item.title}
                  href={`/${lang}/${item.href}`}
                  className={i === work ? "works-shot is-active" : "works-shot"}
                  aria-label={item.title}
                >
                  <Image src={asset(item.image)} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 58vw" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {style === "deck" ? (
        <div className="works-deck" ref={deckRef}>
          <div className="works-copy works-deck-copy">
            <CopyBlock lang={lang} creation={creation} title={stage.worksTitle} animKey={`${creation.title}-deck`} />
            <Controls lang={lang} stage={stage} index={work} total={total} onShift={shift} />
          </div>
          <div className="works-deck-stage" style={{ perspective: "1400px" }}>
            <div className="works-deck-stack">
              {stage.creations.map((item, i) => (
                <Link
                  key={item.title}
                  href={`/${lang}/${item.href}`}
                  className="works-deck-card"
                  aria-label={item.title}
                  aria-hidden={i !== work}
                  tabIndex={i === work ? 0 : -1}
                >
                  <Image src={asset(item.image)} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 420px" />
                  <span className="works-deck-label">{item.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {style === "curtain" ? (
        <div className="works-curtain" ref={curtainRef}>
          <div className="works-curtain-media">
            <div className="works-curtain-layer works-curtain-back">
              <Image
                src={asset(stage.creations[prevIndex].image)}
                alt=""
                fill
                sizes="100vw"
                aria-hidden
              />
            </div>
            <div className="works-curtain-layer works-curtain-front" ref={curtainFrontRef}>
              <Image src={asset(creation.image)} alt={creation.alt} fill sizes="100vw" priority />
            </div>
            <div className="works-curtain-shade" />
          </div>
          <div className="works-curtain-ui">
            <p className="works-curtain-kicker">{stage.worksKicker}</p>
            <div className="works-curtain-copy" key={creation.title}>
              <p className="creation-cat">{creation.category}</p>
              <h2>
                <Link href={`/${lang}/${creation.href}`}>{creation.title}</Link>
              </h2>
              <p className="creation-text">{creation.text}</p>
            </div>
            <div className="works-curtain-footer">
              <span className="works-curtain-count" key={`c-${work}`}>
                {String(work + 1).padStart(2, "0")}
                <em> / {String(total).padStart(2, "0")}</em>
              </span>
              <Controls lang={lang} stage={stage} index={work} total={total} onShift={shift} />
            </div>
          </div>
        </div>
      ) : null}

      <WorksPicker lang={lang} stage={stage} active={style} welcomeParam={welcomeParam} />
    </section>
  );
}
