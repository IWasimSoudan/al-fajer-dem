"use client";

import { PackageIcon } from "@/components/checkout/CheckoutIcons";
import { useCart } from "@/components/CartProvider";
import { productById } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money, productPriceLabel } from "@/lib/money";

export function Summary({ lang, dict, title }: { lang: Locale; dict: Dictionary; title: string }) {
  const { items, total } = useCart();

  return (
    <aside className="ck-summary">
      <div className="ck-summary-head">
        <PackageIcon />
        <h2>{title}</h2>
      </div>
      <ul>
        {items.map((item) => {
          const product = productById(item.id);
          if (!product) return null;
          return (
            <li key={item.id}>
              <span>
                {dict.products.items[product.id].name} × {item.qty}
              </span>
              <span>
                {productPriceLabel(
                  lang,
                  product.price == null ? null : product.price * item.qty,
                  dict.products.priceOnRequest,
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <strong>
        {dict.cart.total}: {money(lang, total)}
      </strong>
    </aside>
  );
}
