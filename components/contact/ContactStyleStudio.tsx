"use client";

import { ContactForm } from "@/components/ContactForm";
import { FOOTER_FACT_ICONS } from "@/components/icons/navIcons";
import { asset } from "@/lib/asset";
import { CONTACT_STYLES, resolveContactStyle, type ContactStyleId } from "@/lib/contactStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: ContactStyleId;
}) {
  return (
    <aside className="cn-picker" aria-label={dict.contact.stylePicker}>
      <div className="cn-picker-copy">
        <p className="cn-picker-title">{dict.contact.stylePicker}</p>
        <p className="cn-picker-hint">{dict.contact.styleHint}</p>
      </div>
      <div className="cn-picker-list" role="list">
        {CONTACT_STYLES.map((id) => {
          const meta = dict.contact.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/contact?style=${id}`}
              role="listitem"
              className={active === id ? "cn-picker-item is-active" : "cn-picker-item"}
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

function VisitFacts({ dict }: { dict: Dictionary }) {
  const { footer } = dict;
  return (
    <ul className="cn-visit-facts">
      <li>
        <span>
          <FOOTER_FACT_ICONS.visit size={14} strokeWidth={1.75} aria-hidden="true" />
          {dict.contact.visitTitle}
        </span>
        <strong>
          {footer.address}
          <br />
          {footer.poBox}
        </strong>
      </li>
      <li>
        <span>
          <FOOTER_FACT_ICONS.hours size={14} strokeWidth={1.75} aria-hidden="true" />
          {footer.hoursLabel}
        </span>
        <strong>{footer.hours}</strong>
      </li>
      <li>
        <span>
          <FOOTER_FACT_ICONS.phone size={14} strokeWidth={1.75} aria-hidden="true" />
          {footer.phoneLabel}
        </span>
        <strong>
          <a href={`tel:${footer.phone.replace(/\s+/g, "")}`}>{footer.phone}</a>
        </strong>
      </li>
      <li>
        <span>
          <FOOTER_FACT_ICONS.mobile size={14} strokeWidth={1.75} aria-hidden="true" />
          {footer.mobileLabel}
        </span>
        <strong>
          <a href={`tel:${footer.mobile.replace(/\s+/g, "")}`}>{footer.mobile}</a>
        </strong>
      </li>
      <li>
        <span>
          <FOOTER_FACT_ICONS.fax size={14} strokeWidth={1.75} aria-hidden="true" />
          {footer.faxLabel}
        </span>
        <strong>{footer.fax}</strong>
      </li>
      <li>
        <span>
          <FOOTER_FACT_ICONS.email size={14} strokeWidth={1.75} aria-hidden="true" />
          {dict.contact.email}
        </span>
        <strong>
          <a href={`mailto:${footer.email}`}>{footer.email}</a>
        </strong>
      </li>
      <li>
        <span>
          <FOOTER_FACT_ICONS.website size={14} strokeWidth={1.75} aria-hidden="true" />
          {footer.websiteLabel}
        </span>
        <strong>
          <a href={footer.websiteHref} target="_blank" rel="noreferrer">
            {footer.website}
          </a>
        </strong>
      </li>
    </ul>
  );
}

function FaqList({ dict, className }: { dict: Dictionary; className?: string }) {
  return (
    <section className={className ? `cn-faq ${className}` : "cn-faq"} aria-labelledby="cn-faq-title">
      <h2 id="cn-faq-title">{dict.contact.faqTitle}</h2>
      <div className="cn-faq-list">
        {dict.contact.faq.map((item) => (
          <details key={item.q} className="cn-faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function useReveal(selector: string) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(selector).forEach((node, index) => {
        gsap.fromTo(
          node,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            delay: (index % 4) * 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => context.revert();
  }, [selector]);

  return rootRef;
}

/** 1 · Workshop desk */
function DeskLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useReveal(".cn-reveal");

  return (
    <div className="cn-desk" ref={rootRef}>
      <div className="cn-desk-grid">
        <div className="cn-panel cn-reveal">
          <p className="cn-panel-kicker">{dict.contact.kicker}</p>
          <h2 className="cn-panel-title">{dict.contact.send}</h2>
          <ContactForm dict={dict} className="cn-form" />
        </div>
        <aside className="cn-visit-card cn-reveal">
          <div className="cn-visit-media">
            <Image src={asset("/images/bronze-doors.jpg")} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" />
            <span className="cn-visit-shimmer" aria-hidden="true" />
            <span className="cn-visit-badge">{dict.contact.visitPlaceholder}</span>
          </div>
          <div className="cn-visit-body">
            <h2>{dict.footer.visit}</h2>
            <VisitFacts dict={dict} />
          </div>
        </aside>
      </div>
      <FaqList dict={dict} className="cn-reveal" />
    </div>
  );
}

/** 2 · Info board */
function BoardLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useReveal(".cn-reveal");

  return (
    <div className="cn-board" ref={rootRef}>
      <div className="cn-board-strip cn-reveal">
        <div className="cn-board-strip-copy">
          <p className="cn-panel-kicker">{dict.contact.visitTitle}</p>
          <h2>{dict.footer.visit}</h2>
        </div>
        <VisitFacts dict={dict} />
      </div>
      <div className="cn-board-grid">
        <div className="cn-panel cn-reveal">
          <p className="cn-panel-kicker">{dict.contact.kicker}</p>
          <h2 className="cn-panel-title">{dict.contact.send}</h2>
          <ContactForm dict={dict} className="cn-form" />
        </div>
        <FaqList dict={dict} className="cn-reveal cn-faq-compact" />
      </div>
    </div>
  );
}

/** 3 · Visit stage */
function StageLayout({ dict }: { dict: Dictionary }) {
  const rootRef = useReveal(".cn-reveal");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const media = root.querySelector<HTMLElement>(".cn-stage-media");
    const img = media?.querySelector("img");
    if (!media || !img) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        media,
        { clipPath: "inset(10% 8% 10% 8% round 18px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 18px)",
          duration: 1.05,
          ease: "power2.out",
          scrollTrigger: { trigger: media, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        img,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: media, start: "top 85%", once: true },
        },
      );
    }, root);

    return () => context.revert();
  }, [rootRef]);

  return (
    <div className="cn-stage" ref={rootRef}>
      <div className="cn-stage-hero">
        <div className="cn-stage-media">
          <Image src={asset("/images/bronze-doors.jpg")} alt="" fill sizes="100vw" priority />
          <span className="cn-visit-shimmer" aria-hidden="true" />
          <div className="cn-stage-shade" />
          <div className="cn-stage-place">
            <p className="cn-panel-kicker">{dict.contact.visitPlaceholder}</p>
            <h2>{dict.footer.address}</h2>
            <p>
              {dict.footer.hoursLabel}: {dict.footer.hours}
            </p>
            <a href={`mailto:${dict.footer.email}`}>{dict.footer.email}</a>
          </div>
        </div>
        <div className="cn-panel cn-stage-card cn-reveal">
          <p className="cn-panel-kicker">{dict.contact.kicker}</p>
          <h2 className="cn-panel-title">{dict.contact.send}</h2>
          <ContactForm dict={dict} className="cn-form" />
        </div>
      </div>
      <FaqList dict={dict} className="cn-reveal" />
    </div>
  );
}

export function ContactStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const style = resolveContactStyle(searchParams.get("style") ?? undefined);

  return (
    <div className="home-page stage-page cn-studio">
      <section className="page-hero">
        <div className="hero-media">
          <Image
            src={asset("/images/bronze-doors.jpg")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-frame on"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="page-kicker">{dict.contact.kicker}</p>
          <h1>{dict.contact.title}</h1>
          <p>{dict.contact.lead}</p>
        </div>
      </section>

      <div className="page-body cn-body">
        <StylePicker lang={lang} dict={dict} active={style} />
        <div className="cn-idea" role="note">
          <p className="cn-idea-kicker">{dict.contact.styleWhy}</p>
          <p>
            <strong>{dict.contact.styles[style].label}</strong>
            <span>{dict.contact.styles[style].idea}</span>
          </p>
        </div>

        {style === "desk" ? <DeskLayout dict={dict} /> : null}
        {style === "board" ? <BoardLayout dict={dict} /> : null}
        {style === "stage" ? <StageLayout dict={dict} /> : null}
      </div>
    </div>
  );
}
