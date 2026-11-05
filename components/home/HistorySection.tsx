"use client";

import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { HISTORY_STYLES, resolveHistoryStyle, type HistoryStyleId } from "@/lib/historyStyle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

type Stage = Dictionary["home"]["stage"];

function HistoryPicker({
  lang,
  stage,
  active,
}: {
  lang: Locale;
  stage: Stage;
  active: HistoryStyleId;
}) {
  const searchParams = useSearchParams();

  return (
    <aside className="history-style-picker" aria-label={stage.historyStylePicker}>
      <div className="history-style-picker-copy">
        <p className="history-style-picker-title">{stage.historyStylePicker}</p>
        <p className="history-style-picker-hint">{stage.historyStyleHint}</p>
      </div>
      <div className="history-style-picker-list" role="list">
        {HISTORY_STYLES.map((id) => {
          const meta = stage.historyStyles[id];
          const params = new URLSearchParams(searchParams.toString());
          params.set("history", id);
          return (
            <Link
              key={id}
              href={`/${lang}?${params.toString()}#history`}
              role="listitem"
              className={active === id ? "history-style-item is-active" : "history-style-item"}
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

function Head({ stage }: { stage: Stage }) {
  return (
    <header className="history-head">
      <p className="history-kicker">{stage.historyKicker}</p>
      <h2>{stage.historyTitle}</h2>
      <p className="history-lead">{stage.historyLead}</p>
    </header>
  );
}

function SpineLayout({
  stage,
  motion,
  rootRef,
}: {
  stage: Stage;
  motion: boolean;
  rootRef: RefObject<HTMLElement | null>;
}) {
  useLayoutEffect(() => {
    if (!motion) return;
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const line = root.querySelector<HTMLElement>(".history-spine-line span");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 55%", scrub: 1.1 },
          },
        );
      }
      root.querySelectorAll<HTMLElement>(".history-spine-item").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top 88%", end: "top 55%", scrub: 0.9 },
          },
        );
      });
    }, root);
    ScrollTrigger.refresh();
    return () => context.revert();
  }, [motion, rootRef, stage.history.length]);

  return (
    <div className="history-spine">
      <Head stage={stage} />
      <div className="history-spine-track">
        <div className="history-spine-line" aria-hidden="true">
          <span />
        </div>
        <ol className="history-spine-list">
          {stage.history.map((item) => (
            <li key={item.year} className="history-spine-item">
              <time dateTime={item.year}>{item.year}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RailLayout({
  stage,
  motion,
  active,
  setActive,
}: {
  stage: Stage;
  motion: boolean;
  active: number;
  setActive: (index: number) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const item = stage.history[active];

  useLayoutEffect(() => {
    if (!motion) return;
    const root = railRef.current;
    if (!root) return;
    const panel = root.querySelector<HTMLElement>(".history-rail-panel");
    const fill = root.querySelector<HTMLElement>(".history-rail-fill");
    if (panel) {
      gsap.fromTo(
        panel.children,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: "power3.out" },
      );
    }
    if (fill) {
      gsap.to(fill, {
        width: `${((active + 1) / stage.history.length) * 100}%`,
        duration: 0.9,
        ease: "power2.out",
      });
    }
  }, [active, motion, stage.history.length]);

  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => {
      setActive((active + 1) % stage.history.length);
    }, 5600);
    return () => window.clearInterval(id);
  }, [motion, active, setActive, stage.history.length]);

  return (
    <div className="history-rail" ref={railRef}>
      <Head stage={stage} />
      <div className="history-rail-years" role="tablist" aria-label={stage.historyKicker}>
        {stage.history.map((entry, index) => (
          <button
            key={entry.year}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? "is-active" : undefined}
            onClick={() => setActive(index)}
          >
            <span>{entry.year}</span>
          </button>
        ))}
        <div className="history-rail-progress" aria-hidden="true">
          <span className="history-rail-fill" />
        </div>
      </div>
      <article className="history-rail-panel" key={item.year}>
        <time dateTime={item.year}>{item.year}</time>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>
    </div>
  );
}

function ChaptersLayout({
  stage,
  motion,
  active,
  setActive,
}: {
  stage: Stage;
  motion: boolean;
  active: number;
  setActive: (index: number) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const current = stage.history[active];

  useLayoutEffect(() => {
    if (!motion) return;
    const root = rootRef.current;
    if (!root) return;
    const body = root.querySelector<HTMLElement>(".history-chapter-body");
    if (!body) return;
    gsap.fromTo(
      body.children,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: "power3.out" },
    );
  }, [active, motion]);

  return (
    <div className="history-chapters" ref={rootRef}>
      <Head stage={stage} />
      <div className="history-chapters-grid">
        <ol className="history-chapter-nav" aria-label={stage.historyKicker}>
          {stage.history.map((entry, index) => (
            <li key={entry.year}>
              <button
                type="button"
                className={index === active ? "is-active" : undefined}
                aria-current={index === active ? "step" : undefined}
                onClick={() => setActive(index)}
              >
                <span className="history-chapter-dot" aria-hidden="true" />
                <time dateTime={entry.year}>{entry.year}</time>
                <em>{entry.title}</em>
              </button>
            </li>
          ))}
        </ol>
        <article className="history-chapter-body" key={current.year}>
          <p className="history-chapter-index">
            {String(active + 1).padStart(2, "0")}
            <em> / {String(stage.history.length).padStart(2, "0")}</em>
          </p>
          <time dateTime={current.year}>{current.year}</time>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <div className="history-chapter-controls">
            <button
              type="button"
              onClick={() => setActive((active - 1 + stage.history.length) % stage.history.length)}
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setActive((active + 1) % stage.history.length)}
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export function HistorySection({
  lang,
  stage,
  motion,
}: {
  lang: Locale;
  stage: Stage;
  motion: boolean;
}) {
  const searchParams = useSearchParams();
  const style = resolveHistoryStyle(searchParams.get("history") ?? undefined);
  const [active, setActive] = useState(0);
  const spineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setActive(0);
  }, [style]);

  return (
    <section
      className={`history-stage history-${style}`}
      id="history"
      ref={style === "spine" ? spineRef : undefined}
    >
      <HistoryPicker lang={lang} stage={stage} active={style} />
      {style === "spine" ? <SpineLayout stage={stage} motion={motion} rootRef={spineRef} /> : null}
      {style === "rail" ? (
        <RailLayout stage={stage} motion={motion} active={active} setActive={setActive} />
      ) : null}
      {style === "chapters" ? (
        <ChaptersLayout stage={stage} motion={motion} active={active} setActive={setActive} />
      ) : null}
    </section>
  );
}
