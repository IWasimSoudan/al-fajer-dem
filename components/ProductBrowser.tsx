"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import { categories, products, type CategoryId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Product = (typeof products)[number];

function Chevron({ dir }: { dir: "start" | "end" }) {
  return (
    <svg className={dir === "start" ? "chev-start" : "chev-end"} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProductRow({
  lang,
  dict,
  product,
  added,
  onAdd,
}: {
  lang: Locale;
  dict: Dictionary;
  product: Product;
  added: boolean;
  onAdd: () => void;
}) {
  const photos = product.images;
  const [index, setIndex] = useState(0);
  const viewRef = useRef<HTMLDialogElement>(null);
  const photo = photos[index] ?? product.image;
  const copy = dict.products.items[product.id];
  const many = photos.length > 1;

  function step(delta: number) {
    setIndex((current) => (current + delta + photos.length) % photos.length);
  }

  function openView() {
    viewRef.current?.showModal();
  }

  function closeView() {
    viewRef.current?.close();
  }

  return (
    <article className="product-row">
      <div className="product-thumb">
        <button type="button" className="frame product-shot" aria-label={dict.products.photoView} onClick={openView}>
          <Image src={asset(photo)} alt="" fill sizes="112px" className="photo" />
        </button>
        {many ? (
          <>
            <button type="button" className="thumb-step prev" aria-label={dict.products.photoPrev} onClick={() => step(-1)}>
              <Chevron dir="start" />
            </button>
            <button type="button" className="thumb-step next" aria-label={dict.products.photoNext} onClick={() => step(1)}>
              <Chevron dir="end" />
            </button>
            <span className="thumb-dots" aria-hidden="true">
              {photos.map((_, dot) => (
                <span key={dot} className={dot === index ? "on" : undefined} />
              ))}
            </span>
          </>
        ) : null}
      </div>
      <dialog
        className="photo-view"
        ref={viewRef}
        aria-label={copy.name}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeView();
        }}
      >
        <div className="photo-view-frame">
          <Image src={asset(photo)} alt={copy.name} fill sizes="92vw" className="photo" />
        </div>
        <button type="button" className="photo-view-close" aria-label={dict.products.photoClose} onClick={closeView}>
          ×
        </button>
        {many ? (
          <>
            <button type="button" className="thumb-step prev photo-view-step" aria-label={dict.products.photoPrev} onClick={() => step(-1)}>
              <Chevron dir="start" />
            </button>
            <button type="button" className="thumb-step next photo-view-step" aria-label={dict.products.photoNext} onClick={() => step(1)}>
              <Chevron dir="end" />
            </button>
          </>
        ) : null}
      </dialog>
      <div className="product-copy">
        <h3>
          <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
        </h3>
        <p>{copy.detail}</p>
        <p className="price">{money(lang, product.price)}</p>
      </div>
      <button className="btn product-add" type="button" onClick={onAdd}>
        {added ? dict.products.added : dict.products.add}
      </button>
    </article>
  );
}

export function ProductBrowser({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { add } = useCart();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"name" | "price">("name");
  const [added, setAdded] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "ar" ? "ar" : "en");
    const collator = new Intl.Collator(lang === "ar" ? "ar" : "en", { sensitivity: "base" });
    return products
      .filter((product) => {
        if (filter !== "all" && product.category !== filter) return false;
        if (!needle) return true;
        const copy = dict.products.items[product.id];
        const category = dict.products.categories[product.category].title;
        const dimensions = product.dimensions ? dict.catalog.measures[product.dimensions] : "";
        const rating = product.rating ? dict.catalog.measures[product.rating] : "";
        return `${copy.name} ${copy.detail} ${category} ${dimensions} ${rating}`
          .toLocaleLowerCase(lang === "ar" ? "ar" : "en")
          .includes(needle);
      })
      .sort((a, b) => {
        if (sort === "price" && a.price !== b.price) return a.price - b.price;
        return collator.compare(dict.products.items[a.id].name, dict.products.items[b.id].name);
      });
  }, [dict, filter, lang, query, sort]);

  return (
    <div className="product-browser">
      <div className="browse-tools">
        <label className="browse-search">
          <span>{dict.products.search}</span>
          <input
            type="search"
            value={query}
            placeholder={dict.products.searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="browse-sort">
          <span>{dict.products.sort}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as "name" | "price")}>
            <option value="name">{dict.products.sortName}</option>
            <option value="price">{dict.products.sortPrice}</option>
          </select>
        </label>
      </div>
      <div className="browse-pills" role="group" aria-label={dict.products.samples}>
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          {dict.products.all}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {dict.products.categories[category.id].title}
          </button>
        ))}
      </div>
      {filter !== "all" ? <p className="lead">{dict.products.categories[filter].text}</p> : null}
      <p className="browse-count" aria-live="polite">
        {dict.products.count.replaceAll("{count}", String(visible.length))}
      </p>
      {visible.length === 0 ? (
        <p className="prose">
          {dict.products.empty} <Link href={`/${lang}/contact`}>{dict.products.ask}</Link>
        </p>
      ) : (
        <div className="product-list">
          {visible.map((product) => (
            <ProductRow
              key={product.id}
              lang={lang}
              dict={dict}
              product={product}
              added={added === product.id}
              onAdd={() => {
                add(product.id);
                setAdded(product.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
