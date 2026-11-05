"use client";

import { asset } from "@/lib/asset";
import { clients as clientItems } from "@/lib/catalog";
import { CLIENT_STYLES, resolveClientStyle, type ClientStyleId } from "@/lib/clientStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

type ClientId = (typeof clientItems)[number]["id"];

function labelFor(dict: Dictionary, id: ClientId) {
  return dict.clients.items[id];
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: ClientStyleId;
}) {
  return (
    <aside className="cl-picker" aria-label={dict.clients.stylePicker}>
      <div className="cl-picker-copy">
        <p className="cl-picker-title">{dict.clients.stylePicker}</p>
        <p className="cl-picker-hint">{dict.clients.styleHint}</p>
      </div>
      <div className="cl-picker-list" role="list">
        {CLIENT_STYLES.map((id) => {
          const meta = dict.clients.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/clients?style=${id}`}
              role="listitem"
              className={active === id ? "cl-picker-item is-active" : "cl-picker-item"}
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

/** Mosaic grid — play-once bloom so images always settle visible. */
function MosaicLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const tiles = root.querySelectorAll<HTMLElement>(".cl-mosaic-tile");
      tiles.forEach((tile, index) => {
        const media = tile.querySelector<HTMLElement>(".cl-mosaic-media");
        const img = tile.querySelector("img");
        const copy = tile.querySelector<HTMLElement>(".cl-mosaic-copy");
        const delay = (index % 3) * 0.07;
        const trigger = {
          trigger: tile,
          start: "top 90%",
          once: true,
        } as const;

        gsap.fromTo(
          tile,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: "power2.out",
            scrollTrigger: trigger,
          },
        );

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(12% 12% 12% 12% round 16px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              duration: 0.95,
              delay,
              ease: "power2.out",
              scrollTrigger: trigger,
            },
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.05,
              delay,
              ease: "power2.out",
              scrollTrigger: trigger,
            },
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: delay + 0.12,
              ease: "power2.out",
              scrollTrigger: trigger,
            },
          );
        }
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      context.revert();
    };
  }, []);

  return (
    <div className="cl-mosaic" ref={rootRef}>
      {clientItems.map((client, index) => (
        <article key={client.id} className={`cl-mosaic-tile is-span-${(index % 3) + 1}`}>
          <div className="cl-mosaic-media">
            <Image
              src={asset(client.image)}
              alt=""
              fill
              sizes="(max-width: 800px) 50vw, 28vw"
              priority={index < 2}
            />
          </div>
          <p className="cl-mosaic-copy">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {labelFor(dict, client.id)}
          </p>
        </article>
      ))}
    </div>
  );
}

/** Partner deck — left/right swap controlled by buttons. */
function DeckLayout({ dict }: { dict: Dictionary }) {
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const indexRef = useRef(0);
  const total = clientItems.length;
  const active = clientItems[index];

  useLayoutEffect(() => {
    indexRef.current = index;
  }, [index]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>(".cl-deck-card"));
    cards.forEach((card, i) => {
      gsap.set(card, {
        xPercent: i === 0 ? 0 : 110,
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 0.94,
        zIndex: i === 0 ? 2 : 1,
      });
    });
  }, []);

  function go(dir: 1 | -1) {
    if (animating.current || total < 2) return;
    const stage = stageRef.current;
    if (!stage) return;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>(".cl-deck-card"));
    const current = indexRef.current;
    const next = (current + dir + total) % total;
    const from = cards[current];
    const to = cards[next];
    if (!from || !to) return;

    animating.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const outX = dir * -110;
    const inX = dir * 110;

    if (reduce) {
      gsap.set(from, { xPercent: outX, opacity: 0, zIndex: 1 });
      gsap.set(to, { xPercent: 0, opacity: 1, scale: 1, zIndex: 2 });
      setIndex(next);
      animating.current = false;
      return;
    }

    gsap.set(to, { xPercent: inX, opacity: 1, scale: 0.94, zIndex: 2 });
    gsap.set(from, { zIndex: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIndex(next);
        animating.current = false;
      },
    });

    tl.to(
      from,
      {
        xPercent: outX,
        opacity: 0.35,
        scale: 0.94,
        duration: 0.55,
        ease: "power2.inOut",
      },
      0,
    ).to(
      to,
      {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "power2.inOut",
      },
      0,
    );
  }

  return (
    <div className="cl-deck">
      <div className="cl-deck-head">
        <div>
          <p className="cl-deck-kicker">{dict.clients.kicker}</p>
          <p className="cl-deck-active">{labelFor(dict, active.id)}</p>
        </div>
        <p className="cl-deck-count" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      <div className="cl-deck-shell">
        <button type="button" className="cl-deck-nav is-prev" aria-label={dict.clients.prev} onClick={() => go(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="cl-deck-stage" ref={stageRef}>
          {clientItems.map((client, i) => (
            <article key={client.id} className="cl-deck-card" aria-hidden={i !== index}>
              <div className="cl-deck-media">
                <Image
                  src={asset(client.image)}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 90vw, 560px"
                  priority={i === 0}
                />
              </div>
              <div className="cl-deck-copy">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h2>{labelFor(dict, client.id)}</h2>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="cl-deck-nav is-next" aria-label={dict.clients.next} onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="cl-deck-dots" role="tablist" aria-label={dict.clients.kicker}>
        {clientItems.map((client, i) => (
          <button
            key={client.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-active" : undefined}
            aria-label={labelFor(dict, client.id)}
            onClick={() => {
              if (i === indexRef.current || animating.current) return;
              const dir = i > indexRef.current ? 1 : -1;
              // Jump via successive animated steps when far; direct animate for adjacent feel
              const stage = stageRef.current;
              if (!stage) return;
              const cards = Array.from(stage.querySelectorAll<HTMLElement>(".cl-deck-card"));
              const from = cards[indexRef.current];
              const to = cards[i];
              if (!from || !to) return;
              animating.current = true;
              gsap.set(to, { xPercent: dir * 110, opacity: 1, scale: 0.94, zIndex: 2 });
              gsap.set(from, { zIndex: 1 });
              gsap
                .timeline({
                  onComplete: () => {
                    setIndex(i);
                    animating.current = false;
                  },
                })
                .to(from, { xPercent: dir * -110, opacity: 0.35, scale: 0.94, duration: 0.5, ease: "power2.inOut" }, 0)
                .to(to, { xPercent: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut" }, 0);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ClientStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveClientStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page cl-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/canopy.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.clients.kicker}</p>
          <h1>{dict.clients.title}</h1>
          <p>{dict.clients.lead}</p>
        </div>
      </section>

      <div className="page-body cl-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="cl-idea" role="note">
          <p className="cl-idea-kicker">{dict.clients.styleWhy}</p>
          <p>
            <strong>{dict.clients.styles[style].label}</strong>
            <span>{dict.clients.styles[style].idea}</span>
          </p>
        </div>

        {style === "mosaic" ? <MosaicLayout dict={dict} /> : null}
        {style === "deck" ? <DeckLayout dict={dict} /> : null}
      </div>
    </div>
  );
}
