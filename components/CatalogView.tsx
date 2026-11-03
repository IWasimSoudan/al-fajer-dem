"use client";

import { asset } from "@/lib/asset";
import { categories, families, founded, products, type FamilyId, type ProductId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const stripIds = ["foam", "twisted", "accordion", "sap"] as const satisfies readonly ProductId[];

export function CatalogView({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [family, setFamily] = useState<FamilyId | "all">("all");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<ProductId[]>(["antiwind", "levante"]);
  const copy = dict.catalog;
  const locale = lang === "ar" ? "ar" : "en";

  const matches = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    return (product: (typeof products)[number]) => {
      if (!needle) return true;
      const item = dict.products.items[product.id];
      const category = dict.products.categories[product.category].title;
      const dimensions = product.dimensions ? copy.measures[product.dimensions] : "";
      const rating = product.rating ? copy.measures[product.rating] : "";
      return `${item.name} ${item.detail} ${category} ${copy.families[product.family]} ${dimensions} ${rating} ${product.price}`
        .toLocaleLowerCase(locale)
        .includes(needle);
    };
  }, [copy, dict, locale, query]);

  const listed = useMemo(
    () => products.filter((product) => (family === "all" || product.family === family) && matches(product)),
    [family, matches],
  );
  const choices = products.filter((product) => picked.includes(product.id) || matches(product));
  const compared = products.filter((product) => picked.includes(product.id));
  const strip = stripIds.map((id) => products.find((product) => product.id === id)).filter((item) => item !== undefined);

  function toggle(id: ProductId) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function published(key: (typeof products)[number]["dimensions"] | (typeof products)[number]["rating"]) {
    return key ? copy.measures[key] : copy.unpublished;
  }

  return (
    <div>
      <div className="catalog-figs">
        <div>
          <strong>{founded}</strong>
          <span>{copy.since}</span>
        </div>
        <div>
          <strong>{categories.length}</strong>
          <span>{copy.categories}</span>
        </div>
        <div>
          <strong>{products.length}</strong>
          <span>{copy.samples}</span>
        </div>
      </div>

      <div className="catalog-strip">
        {strip.map((product) => (
          <div key={product.id} className="frame">
            <Image
              src={asset(product.image)}
              alt={dict.products.items[product.id].name}
              fill
              sizes="(max-width: 800px) 50vw, 25vw"
              className="photo"
            />
          </div>
        ))}
      </div>

      <h2>{copy.specsTitle}</h2>
      <p className="lead">{copy.specsLead}</p>
      <label className="field catalog-search">
        <span>{dict.products.search}</span>
        <input
          type="search"
          value={query}
          placeholder={dict.products.searchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="filters" role="group" aria-label={copy.specsTitle}>
        <button type="button" aria-pressed={family === "all"} onClick={() => setFamily("all")}>
          {copy.families.all}
        </button>
        {families.map((id) => (
          <button key={id} type="button" aria-pressed={family === id} onClick={() => setFamily(id)}>
            {copy.families[id]}
          </button>
        ))}
      </div>
      {listed.length === 0 ? (
        <p className="note">{dict.products.empty}</p>
      ) : (
      <div className="spec-list">
        {listed.map((product) => {
          const item = dict.products.items[product.id];
          return (
            <article key={product.id}>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{item.name}</Link>
              </h3>
              <dl>
                <div>
                  <dt>{copy.category}</dt>
                  <dd>{dict.products.categories[product.category].title}</dd>
                </div>
                <div>
                  <dt>{copy.dimensions}</dt>
                  <dd>{published(product.dimensions)}</dd>
                </div>
                <div>
                  <dt>{copy.rating}</dt>
                  <dd>{published(product.rating)}</dd>
                </div>
                <div>
                  <dt>{copy.grade}</dt>
                  <dd>{copy.unpublished}</dd>
                </div>
                <div>
                  <dt>{copy.price}</dt>
                  <dd>{money(lang, product.price)}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
      )}

      <h2>{copy.compareTitle}</h2>
      <p className="lead">{copy.compareLead}</p>
      <div className="filters" role="group" aria-label={copy.compareTitle}>
        {choices.map((product) => {
          const on = picked.includes(product.id);
          return (
            <button key={product.id} type="button" aria-pressed={on} onClick={() => toggle(product.id)}>
              {dict.products.items[product.id].name}
            </button>
          );
        })}
      </div>
      {compared.length < 2 ? (
        <p className="note">{copy.compareNeed}</p>
      ) : (
        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">{copy.name}</th>
                {compared.map((product) => (
                  <th key={product.id} scope="col">
                    <Link href={`/${lang}/products/${product.id}`}>{dict.products.items[product.id].name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{copy.category}</th>
                {compared.map((product) => (
                  <td key={product.id}>{dict.products.categories[product.category].title}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{copy.dimensions}</th>
                {compared.map((product) => (
                  <td key={product.id}>{published(product.dimensions)}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{copy.rating}</th>
                {compared.map((product) => (
                  <td key={product.id}>{published(product.rating)}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{copy.grade}</th>
                {compared.map((product) => (
                  <td key={product.id}>{copy.unpublished}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">{copy.price}</th>
                {compared.map((product) => (
                  <td key={product.id}>{money(lang, product.price)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <h2>{copy.termsTitle}</h2>
      <p className="lead">{copy.termsLead}</p>
      <div className="points">
        {copy.terms.map((term) => (
          <article key={term.title} className="point">
            <h3>{term.title}</h3>
            <p>{term.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
