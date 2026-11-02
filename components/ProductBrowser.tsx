"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import { categories, products, type CategoryId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductBrowser({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { add } = useCart();
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [added, setAdded] = useState<string | null>(null);
  const visible = products.filter((product) => filter === "all" || product.category === filter);

  return (
    <div>
      <p className="note">{dict.products.demo}</p>
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
      <h2 style={{ marginTop: "1.2rem" }}>{dict.products.samples}</h2>
      {visible.length === 0 ? (
        <p className="prose">
          {dict.products.empty}{" "}
          <Link href={`/${lang}/contact`}>{dict.products.ask}</Link>
        </p>
      ) : (
        <div className="card-grid" style={{ marginTop: "1rem" }}>
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
