"use client";

import { useCart } from "@/components/CartProvider";
import { productById, type ProductId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Link from "next/link";
import { useState } from "react";

export function ProductPurchase({ lang, dict, id }: { lang: Locale; dict: Dictionary; id: ProductId }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const product = productById(id);
  if (!product) return null;
  const copy = dict.products.items[product.id];

  return (
    <div className="product-buy">
      <p className="prose">{copy.detail}</p>
      <p className="price">{money(lang, product.price)}</p>
      <p className="note">{dict.products.demo}</p>
      <div className="actions">
        <button
          className="btn"
          type="button"
          onClick={() => {
            add(product.id);
            setAdded(true);
          }}
        >
          {added ? dict.products.added : dict.products.add}
        </button>
        <Link className="btn ghost" href={`/${lang}/cart`}>
          {dict.nav.cart}
        </Link>
        <Link className="btn ghost" href={`/${lang}/products`}>
          {dict.products.back}
        </Link>
      </div>
    </div>
  );
}
