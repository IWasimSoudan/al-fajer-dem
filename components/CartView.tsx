"use client";

import { useCart } from "@/components/CartProvider";
import { CartIcon, MinusIcon, NextIcon, PlusIcon, TrashIcon } from "@/components/checkout/CheckoutIcons";
import { useCheckoutStyle } from "@/components/checkout/CheckoutFlowShell";
import { asset } from "@/lib/asset";
import { productById } from "@/lib/catalog";
import { checkoutStyleHref } from "@/lib/checkoutStyles";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money, productPriceLabel } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";

export function CartView({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, setQty, remove, total } = useCart();
  const style = useCheckoutStyle();

  if (items.length === 0) {
    return (
      <div className="ck-empty">
        <span className="ck-empty-icon">
          <CartIcon />
        </span>
        <p>{dict.cart.empty}</p>
        <Link className="btn" href={`/${lang}/products`}>
          {dict.cart.emptyCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="ck-panel ck-cart">
      <p className="ck-lead">{dict.cart.lead}</p>
      <div className="ck-cart-list">
        {items.map((item) => {
          const product = productById(item.id);
          if (!product) return null;
          const copy = dict.products.items[product.id];
          return (
            <article key={item.id} className="ck-cart-row">
              <Link className="ck-cart-media" href={`/${lang}/products/${product.id}`}>
                <Image src={asset(product.image)} alt="" fill sizes="96px" className="photo" />
              </Link>
              <div className="ck-cart-copy">
                <h2>
                  <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
                </h2>
                <p className="ck-price">
                  {productPriceLabel(lang, product.price, dict.products.priceOnRequest)}
                </p>
                <div className="ck-qty" aria-label={dict.cart.qty}>
                  <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label={dict.products.qtyDown}>
                    <MinusIcon />
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label={dict.products.qtyUp}>
                    <PlusIcon />
                  </button>
                </div>
              </div>
              <div className="ck-cart-side">
                <strong className="ck-line-price">
                  {productPriceLabel(
                    lang,
                    product.price == null ? null : product.price * item.qty,
                    dict.products.priceOnRequest,
                  )}
                </strong>
                <button className="ck-remove" type="button" onClick={() => remove(item.id)}>
                  <TrashIcon />
                  {dict.cart.remove}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className="ck-actions">
        <strong>
          {dict.cart.total}: {money(lang, total)}
        </strong>
        <Link className="btn ck-next" href={checkoutStyleHref(lang, "checkout", style)}>
          {dict.cart.checkout}
          <NextIcon />
        </Link>
      </div>
    </div>
  );
}
