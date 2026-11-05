"use client";

import { asset } from "@/lib/asset";
import { certificates as certificateItems } from "@/lib/catalog";
import {
  CERTIFICATE_STYLES,
  resolveCertificateStyle,
  type CertificateStyleId,
} from "@/lib/certificateStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

type CertId = (typeof certificateItems)[number]["id"];

function copyFor(dict: Dictionary, id: CertId) {
  return dict.certificates.items[id];
}

function SealMark() {
  return (
    <svg className="ct-seal" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M32 16v32M20 28h24M22 38c4 6 16 6 20 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: CertificateStyleId;
}) {
  return (
    <aside className="ct-picker" aria-label={dict.certificates.stylePicker}>
      <div className="ct-picker-copy">
        <p className="ct-picker-title">{dict.certificates.stylePicker}</p>
        <p className="ct-picker-hint">{dict.certificates.styleHint}</p>
      </div>
      <div className="ct-picker-list" role="list">
        {CERTIFICATE_STYLES.map((id) => {
          const meta = dict.certificates.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/certificates?style=${id}`}
              role="listitem"
              className={active === id ? "ct-picker-item is-active" : "ct-picker-item"}
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

function PointsAndCta({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="ct-footer">
      <div className="points">
        {dict.certificates.points.map((point) => (
          <p key={point} className="point">
            {point}
          </p>
        ))}
      </div>
      <div className="actions">
        <Link className="btn" href={`/${lang}/contact`}>
          {dict.certificates.cta}
        </Link>
      </div>
    </div>
  );
}

function LedgerLayout({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const spine = root.querySelector<HTMLElement>(".ct-ledger-spine span");
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
              end: "bottom 40%",
              scrub: 1.1,
            },
          },
        );
      }

      const counter = root.querySelector<HTMLElement>(".ct-ledger-count");
      root.querySelectorAll<HTMLElement>(".ct-ledger-row").forEach((row, index) => {
        const fromX = index % 2 === 0 ? -48 : 48;
        gsap.fromTo(
          row,
          { x: fromX, opacity: 0, y: 40 },
          {
            x: 0,
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "top 50%",
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

        const seal = row.querySelector<HTMLElement>(".ct-ledger-seal");
        if (seal) {
          gsap.fromTo(
            seal,
            { scale: 1.6, rotate: -28, opacity: 0 },
            {
              scale: 1,
              rotate: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                end: "top 42%",
                scrub: 1,
              },
            },
          );
        }

        const media = row.querySelector(".ct-ledger-media");
        const img = row.querySelector("img");
        if (media) {
          gsap.fromTo(
            media,
            { clipPath: "inset(14% 10% 14% 10% round 12px)", opacity: 0.45 },
            {
              clipPath: "inset(0% 0% 0% 0% round 12px)",
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
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.15,
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
    <div className="ct-ledger" ref={rootRef}>
      <div className="ct-ledger-sticky" aria-hidden="true">
        <span className="ct-ledger-count">01</span>
        <span className="ct-ledger-total">/ {String(certificateItems.length).padStart(2, "0")}</span>
      </div>
      <div className="ct-ledger-track">
        <div className="ct-ledger-spine" aria-hidden="true">
          <span />
        </div>
        <ol className="ct-ledger-list">
          {certificateItems.map((item, index) => {
            const copy = copyFor(dict, item.id);
            return (
              <li key={item.id} className="ct-ledger-row">
                <span className="ct-ledger-num">{String(index + 1).padStart(2, "0")}</span>
                <div className="ct-ledger-media">
                  <Image src={asset(item.image)} alt="" fill sizes="(max-width: 900px) 100vw, 36vw" />
                  <span className="ct-ledger-seal">
                    <SealMark />
                  </span>
                </div>
                <div className="ct-ledger-copy">
                  <h2>{copy.title}</h2>
                  <p>{copy.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <PointsAndCta lang={lang} dict={dict} />
    </div>
  );
}

function ImprintLayout({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".ct-imprint").forEach((panel) => {
        const door = panel.querySelector<HTMLElement>(".ct-imprint-door");
        const img = panel.querySelector("img");
        const copy = panel.querySelectorAll(".ct-imprint-copy > *");
        const seal = panel.querySelector<HTMLElement>(".ct-imprint-seal");

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
            { yPercent: 12, scale: 1.14 },
            {
              yPercent: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        gsap.fromTo(
          copy,
          { y: 52, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 62%",
              end: "top 30%",
              scrub: 0.9,
            },
          },
        );

        if (seal) {
          gsap.fromTo(
            seal,
            { scale: 2.2, rotate: -18, opacity: 0 },
            {
              scale: 1,
              rotate: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 55%",
                end: "top 28%",
                scrub: 0.85,
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
    <div className="ct-imprints" ref={rootRef}>
      {certificateItems.map((item, index) => {
        const copy = copyFor(dict, item.id);
        return (
          <article key={item.id} className="ct-imprint">
            <div className="ct-imprint-door">
              <Image src={asset(item.image)} alt="" fill sizes="100vw" priority={index === 0} />
              <div className="ct-imprint-shade" />
            </div>
            <div className="ct-imprint-seal" aria-hidden="true">
              <SealMark />
            </div>
            <div className="ct-imprint-copy">
              <p className="ct-imprint-kicker">{dict.certificates.kicker}</p>
              <h2>{copy.title}</h2>
              <p>{copy.text}</p>
            </div>
          </article>
        );
      })}
      <PointsAndCta lang={lang} dict={dict} />
    </div>
  );
}

function VaultLayout({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = root.querySelector<HTMLElement>(".ct-vault-track");
    const fill = root.querySelector<HTMLElement>(".ct-vault-fill");
    const label = root.querySelector<HTMLElement>(".ct-vault-active");
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
          end: () => `+=${Math.max(total() * 1.35, window.innerHeight * 2)}`,
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill) fill.style.width = `${self.progress * 100}%`;
            const cards = root.querySelectorAll<HTMLElement>(".ct-vault-card");
            const local = self.progress * (certificateItems.length - 1);
            let nearest = 0;
            cards.forEach((card, index) => {
              const dist = Math.abs(local - index);
              if (dist < Math.abs(local - nearest)) nearest = index;
              const focus = Math.max(0, 1 - dist);
              gsap.set(card, {
                opacity: 0.4 + focus * 0.6,
                y: (1 - focus) * 32,
                rotateY: (index - local) * -8,
                scale: 0.88 + focus * 0.12,
                z: focus * 48,
              });
            });
            if (label) {
              const id = certificateItems[nearest]?.id;
              if (id) label.textContent = copyFor(dict, id).title;
            }
          },
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [dict]);

  return (
    <div className="ct-vault-wrap">
      <div className="ct-vault" ref={rootRef}>
        <div className="ct-vault-head">
          <div>
            <p className="ct-vault-kicker">{dict.certificates.kicker}</p>
            <p className="ct-vault-active">{copyFor(dict, certificateItems[0].id).title}</p>
          </div>
          <div className="ct-vault-progress" aria-hidden="true">
            <span className="ct-vault-fill" />
          </div>
        </div>
        <div className="ct-vault-viewport">
          <div className="ct-vault-track">
            {certificateItems.map((item, index) => {
              const copy = copyFor(dict, item.id);
              return (
                <article key={item.id} className="ct-vault-card">
                  <div className="ct-vault-media">
                    <Image src={asset(item.image)} alt="" fill sizes="420px" />
                    <span className="ct-vault-seal" aria-hidden="true">
                      <SealMark />
                    </span>
                  </div>
                  <div className="ct-vault-copy">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h2>{copy.title}</h2>
                    <p>{copy.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <PointsAndCta lang={lang} dict={dict} />
    </div>
  );
}

export function CertificateStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveCertificateStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page ct-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/stair-rail.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.certificates.kicker}</p>
          <h1>{dict.certificates.title}</h1>
          <p>{dict.certificates.lead}</p>
        </div>
      </section>

      <div className="page-body ct-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="ct-idea" role="note">
          <p className="ct-idea-kicker">{dict.certificates.styleWhy}</p>
          <p>
            <strong>{dict.certificates.styles[style].label}</strong>
            <span>{dict.certificates.styles[style].idea}</span>
          </p>
        </div>

        {style === "ledger" ? <LedgerLayout lang={lang} dict={dict} /> : null}
        {style === "imprint" ? <ImprintLayout lang={lang} dict={dict} /> : null}
        {style === "vault" ? <VaultLayout lang={lang} dict={dict} /> : null}
      </div>
    </div>
  );
}
