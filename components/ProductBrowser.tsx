"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import { categories, products, type CategoryId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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
    <div>
      <p className="note">{dict.products.demo}</p>
      <p className="catalog-jump">
        <Link href={`/${lang}/catalog`}>{dict.products.catalogLink}</Link>
      </p>
      <div className="browse-tools">
        <label className="field">
          <span>{dict.products.search}</span>
          <input
            type="search"
            value={query}
            placeholder={dict.products.searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="field">
          <span>{dict.products.sort}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as "name" | "price")}>
            <option value="name">{dict.products.sortName}</option>
            <option value="price">{dict.products.sortPrice}</option>
          </select>
        </label>
      </div>
      <div className="cat-grid" role="group" aria-label={dict.products.samples}>
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
        <div className="card-grid">
          {visible.map((product) => {
            const copy = dict.products.items[product.id];
            return (
              <article key={product.id} className="card">
                <Link className="frame" href={`/${lang}/products/${product.id}`}>
                  <Image src={asset(product.image)} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" className="photo" />
                </Link>
                <div className="body">
                  <h3>
                    <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
                  </h3>
                  <p>{copy.detail}</p>
                  <p className="price">{money(lang, product.price)}</p>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      add(product.id);
                      setAdded(product.id);
                    }}
                  >
                    {added === product.id ? dict.products.added : dict.products.add}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
