"use client";

import { asset } from "@/lib/asset";
import { products, type ProductId } from "@/lib/catalog";
import {
  COMPARE_COLUMN_SLOTS,
  COMPARE_STYLES,
  resolveCompareStyle,
  type CompareStyleId,
} from "@/lib/compareStyles";
import type { CatalogStyleId } from "@/lib/catalogStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { productPriceLabel } from "@/lib/money";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Product = (typeof products)[number];
type AttrKey = "category" | "dimensions" | "rating" | "grade" | "price";

const ATTRS: AttrKey[] = ["category", "dimensions", "rating", "grade", "price"];

function published(
  dict: Dictionary,
  key: Product["dimensions"] | Product["rating"],
) {
  return key ? dict.catalog.measures[key] : dict.catalog.unpublished;
}

function attrLabel(dict: Dictionary, key: AttrKey) {
  return dict.catalog[key];
}

function attrValue(lang: Locale, dict: Dictionary, product: Product, key: AttrKey) {
  if (key === "category") return dict.products.categories[product.category].title;
  if (key === "dimensions") return published(dict, product.dimensions);
  if (key === "rating") return published(dict, product.rating);
  if (key === "grade") return dict.catalog.unpublished;
  return productPriceLabel(lang, product.price, dict.products.priceOnRequest);
}

function valuesDiffer(values: string[]) {
  return values.length > 1 && new Set(values).size > 1;
}

function ComparePicker({
  lang,
  dict,
  layoutStyle,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  layoutStyle: CatalogStyleId;
  active: CompareStyleId;
}) {
  return (
    <aside className="cg-picker cg-compare-picker" aria-label={dict.catalog.comparePicker}>
      <div className="cg-picker-copy">
        <p className="cg-picker-title">{dict.catalog.comparePicker}</p>
        <p className="cg-picker-hint">{dict.catalog.compareHint}</p>
      </div>
      <div className="cg-picker-list" role="list">
        {COMPARE_STYLES.map((id) => {
          const meta = dict.catalog.compareStyles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/catalog?style=${layoutStyle}&compare=${id}`}
              role="listitem"
              className={active === id ? "cg-picker-item is-active" : "cg-picker-item"}
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

function ChipBar({
  dict,
  picked,
  onToggle,
  max,
}: {
  dict: Dictionary;
  picked: ProductId[];
  onToggle: (id: ProductId) => void;
  max?: number;
}) {
  return (
    <div className="filters cg-compare-filters" role="group" aria-label={dict.catalog.compareTitle}>
      {products.map((product) => {
        const on = picked.includes(product.id);
        const full = Boolean(max && !on && picked.length >= max);
        return (
          <button
            key={product.id}
            type="button"
            aria-pressed={on}
            disabled={full}
            onClick={() => onToggle(product.id)}
          >
            {dict.products.items[product.id].name}
          </button>
        );
      })}
    </div>
  );
}

function PlaceholderBlock({
  title,
  hint,
  tall = false,
}: {
  title: string;
  hint: string;
  tall?: boolean;
}) {
  return (
    <div className={tall ? "cg-cmp-placeholder is-tall" : "cg-cmp-placeholder"} aria-hidden="true">
      <span className="cg-cmp-placeholder-shimmer" />
      <strong>{title}</strong>
      <em>{hint}</em>
    </div>
  );
}

function usePicked(initial: ProductId[] = ["p80-foam", "antiwind-class4"]) {
  const [picked, setPicked] = useState<ProductId[]>(initial);

  function toggle(id: ProductId, max?: number) {
    setPicked((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (max && current.length >= max) return current;
      return [...current, id];
    });
  }

  const compared = useMemo(
    () => products.filter((product) => picked.includes(product.id)),
    [picked],
  );

  return { picked, toggle, compared };
}

/** 1 · Spec matrix */
function MatrixCompare({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { picked, toggle, compared } = usePicked();
  const wrapRef = useRef<HTMLDivElement>(null);
  const ready = compared.length >= 2;

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const cols = wrap.querySelectorAll<HTMLElement>(".cg-matrix-col");
    const rows = wrap.querySelectorAll<HTMLElement>(".cg-matrix-row");
    gsap.fromTo(
      cols,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power2.out", overwrite: true },
    );
    gsap.fromTo(
      rows,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.12, ease: "power2.out", overwrite: true },
    );

    rows.forEach((row) => {
      if (!row.classList.contains("is-diff")) return;
      row.classList.remove("is-flash");
      void row.offsetWidth;
      row.classList.add("is-flash");
    });
  }, [picked, ready]);

  return (
    <div className="cg-cmp cg-cmp-matrix">
      <ChipBar dict={dict} picked={picked} onToggle={(id) => toggle(id)} />
      {!ready ? (
        <div className="cg-cmp-need">
          <p className="note">{dict.catalog.compareNeed}</p>
          <div className="cg-matrix-skeleton" aria-hidden="true">
            <PlaceholderBlock title={dict.catalog.compareSlot} hint={dict.catalog.compareSlotHint} />
            <PlaceholderBlock title={dict.catalog.compareSlot} hint={dict.catalog.compareSlotHint} />
          </div>
        </div>
      ) : (
        <div className="cg-matrix-wrap" ref={wrapRef}>
          <div className="cg-matrix-head">
            <div className="cg-matrix-label" aria-hidden="true" />
            {compared.map((product) => (
              <div key={product.id} className="cg-matrix-col">
                <Link href={`/${lang}/products/${product.id}`} className="cg-matrix-thumb">
                  <Image src={asset(product.image)} alt="" fill sizes="120px" />
                </Link>
                <Link href={`/${lang}/products/${product.id}`} className="cg-matrix-name">
                  {dict.products.items[product.id].name}
                </Link>
              </div>
            ))}
          </div>
          {ATTRS.map((key) => {
            const values = compared.map((product) => attrValue(lang, dict, product, key));
            const diff = valuesDiffer(values);
            return (
              <div key={key} className={diff ? "cg-matrix-row is-diff" : "cg-matrix-row"}>
                <div className="cg-matrix-label">{attrLabel(dict, key)}</div>
                {compared.map((product, index) => (
                  <div key={product.id} className="cg-matrix-cell">
                    {values[index]}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** 2 · Face-off columns */
function ColumnsCompare({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { picked, toggle, compared } = usePicked();
  const gridRef = useRef<HTMLDivElement>(null);
  const slots = Array.from({ length: COMPARE_COLUMN_SLOTS }, (_, index) => compared[index] ?? null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const cards = grid.querySelectorAll<HTMLElement>(".cg-col-card, .cg-cmp-placeholder");
    gsap.fromTo(
      cards,
      { y: 28, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", overwrite: true },
    );
  }, [picked]);

  return (
    <div className="cg-cmp cg-cmp-columns">
      <ChipBar
        dict={dict}
        picked={picked}
        max={COMPARE_COLUMN_SLOTS}
        onToggle={(id) => toggle(id, COMPARE_COLUMN_SLOTS)}
      />
      {compared.length < 2 ? <p className="note">{dict.catalog.compareNeed}</p> : null}
      <div className="cg-col-grid" ref={gridRef}>
        {slots.map((product, index) =>
          product ? (
            <article key={product.id} className="cg-col-card">
              <Link href={`/${lang}/products/${product.id}`} className="cg-col-media">
                <Image
                  src={asset(product.image)}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 80vw, 280px"
                  priority={index === 0}
                />
              </Link>
              <div className="cg-col-body">
                <h3>
                  <Link href={`/${lang}/products/${product.id}`}>{dict.products.items[product.id].name}</Link>
                </h3>
                <p className="cg-col-price">{productPriceLabel(lang, product.price, dict.products.priceOnRequest)}</p>
                <dl>
                  {ATTRS.filter((key) => key !== "price").map((key) => (
                    <div key={key}>
                      <dt>{attrLabel(dict, key)}</dt>
                      <dd>{attrValue(lang, dict, product, key)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ) : (
            <PlaceholderBlock
              key={`slot-${index}`}
              title={dict.catalog.compareSlot}
              hint={dict.catalog.compareSlotHint}
              tall
            />
          ),
        )}
      </div>
    </div>
  );
}

export function CatalogCompareStudio({
  lang,
  dict,
  layoutStyle,
  compareParam,
}: {
  lang: Locale;
  dict: Dictionary;
  layoutStyle: CatalogStyleId;
  compareParam?: string | null;
}) {
  const compare = resolveCompareStyle(compareParam ?? undefined);
  let body: ReactNode = null;
  if (compare === "matrix") body = <MatrixCompare lang={lang} dict={dict} />;
  if (compare === "columns") body = <ColumnsCompare lang={lang} dict={dict} />;

  return (
    <section className="cg-compare" aria-labelledby="cg-compare-title">
      <div className="cg-samples-head">
        <h2 id="cg-compare-title">{dict.catalog.compareTitle}</h2>
        <p>{dict.catalog.compareLead}</p>
      </div>

      <ComparePicker lang={lang} dict={dict} layoutStyle={layoutStyle} active={compare} />
      <div className="cg-idea cg-compare-idea" role="note">
        <p className="cg-idea-kicker">{dict.catalog.compareWhy}</p>
        <p>
          <strong>{dict.catalog.compareStyles[compare].label}</strong>
          <span>{dict.catalog.compareStyles[compare].idea}</span>
        </p>
      </div>

      {body}
    </section>
  );
}
