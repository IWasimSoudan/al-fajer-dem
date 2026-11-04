"use client";

import { asset } from "@/lib/asset";
import { projects as projectList } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { PROJECT_STYLES, resolveProjectStyle, type ProjectStyleId } from "@/lib/projectStyles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

type ProjectId = (typeof projectList)[number]["id"];

function copyFor(dict: Dictionary, id: ProjectId) {
  return dict.projects.items[id];
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: ProjectStyleId;
}) {
  return (
    <aside className="pj-picker" aria-label={dict.projects.stylePicker}>
      <div className="pj-picker-copy">
        <p className="pj-picker-title">{dict.projects.stylePicker}</p>
        <p className="pj-picker-hint">{dict.projects.styleHint}</p>
      </div>
      <div className="pj-picker-list" role="list">
        {PROJECT_STYLES.map((id) => {
          const meta = dict.projects.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/projects?style=${id}`}
              role="listitem"
              className={active === id ? "pj-picker-item is-active" : "pj-picker-item"}
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

function RiseLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".pj-rise-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 72, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 58%",
              scrub: 0.85,
            },
          },
        );
        const img = card.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.1,
              },
            },
          );
        }
        gsap.fromTo(
          card.querySelectorAll(".pj-rise-copy > *"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              scrub: 0.7,
            },
          },
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="pj-rise" ref={rootRef}>
      <div className="pj-rise-grid">
        {projectList.map((project) => {
          const item = copyFor(dict, project.id);
          return (
            <article key={project.id} className="pj-rise-card">
              <div className="pj-rise-media">
                <Image src={asset(project.image)} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
              </div>
              <div className="pj-rise-copy">
                <p className="project-code">{project.code}</p>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ChaptersLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const chapters = root.querySelectorAll<HTMLElement>(".pj-chapter");
      chapters.forEach((chapter) => {
        const media = chapter.querySelector(".pj-chapter-media");
        const copy = chapter.querySelectorAll(".pj-chapter-copy > *");
        const img = chapter.querySelector("img");

        gsap.fromTo(
          media,
          { clipPath: "inset(12% 8% 12% 8% round 18px)", opacity: 0.35 },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 80%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2, yPercent: 8 },
            {
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: chapter,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        gsap.fromTo(
          copy,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 70%",
              end: "top 40%",
              scrub: 0.9,
            },
          },
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="pj-chapters" ref={rootRef}>
      {projectList.map((project, index) => {
        const item = copyFor(dict, project.id);
        return (
          <article key={project.id} className="pj-chapter">
            <div className="pj-chapter-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="pj-chapter-media">
              <Image src={asset(project.image)} alt="" fill sizes="(max-width: 800px) 100vw, 55vw" />
            </div>
            <div className="pj-chapter-copy">
              <p className="project-code">{project.code}</p>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function RailLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = root.querySelector<HTMLElement>(".pj-rail-track");
    const progress = root.querySelector<HTMLElement>(".pj-rail-fill");
    if (!track) return;

    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const total = Math.max(track.scrollWidth - root.clientWidth, 0);

      gsap.to(track, {
        x: () => -total,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.max(total * 1.15, window.innerHeight * 1.6)}`,
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) progress.style.width = `${self.progress * 100}%`;
            root.querySelectorAll<HTMLElement>(".pj-rail-card").forEach((card, index) => {
              const local = self.progress * (projectList.length - 1);
              const dist = Math.abs(local - index);
              gsap.set(card, {
                opacity: dist < 0.85 ? 1 : Math.max(0.4, 1 - dist * 0.28),
                y: dist < 0.4 ? 0 : Math.min(18, dist * 8),
              });
            });
          },
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="pj-rail" ref={rootRef}>
      <div className="pj-rail-head">
        <p className="pj-rail-kicker">{dict.projects.kicker}</p>
        <div className="pj-rail-progress" aria-hidden="true">
          <span className="pj-rail-fill" />
        </div>
      </div>
      <div className="pj-rail-viewport">
        <div className="pj-rail-track">
          {projectList.map((project) => {
            const item = copyFor(dict, project.id);
            return (
              <article key={project.id} className="pj-rail-card">
                <div className="pj-rail-media">
                  <Image src={asset(project.image)} alt="" fill sizes="420px" />
                </div>
                <div className="pj-rail-copy">
                  <p className="project-code">{project.code}</p>
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

export function ProjectStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveProjectStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page pj-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/warehouse-doors.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.projects.kicker}</p>
          <h1>{dict.projects.title}</h1>
          <p>{dict.projects.lead}</p>
        </div>
      </section>

      <div className="page-body pj-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="pj-idea" role="note">
          <p className="pj-idea-kicker">{dict.projects.styleWhy}</p>
          <p>
            <strong>{dict.projects.styles[style].label}</strong>
            <span>{dict.projects.styles[style].idea}</span>
          </p>
        </div>

        {style === "rise" ? <RiseLayout dict={dict} /> : null}
        {style === "chapters" ? <ChaptersLayout dict={dict} /> : null}
        {style === "rail" ? <RailLayout dict={dict} /> : null}
      </div>
    </div>
  );
}
