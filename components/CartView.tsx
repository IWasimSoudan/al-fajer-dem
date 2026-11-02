"use client";

import { useCart } from "@/components/CartProvider";
import { Steps } from "@/components/Steps";
import { asset } from "@/lib/asset";
import { productById } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";

export function CartView({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { items, setQty, remove, total } = useCart();

  return (
    <div>
      <Steps lang={lang} dict={dict} current={1} />
      {items.length === 0 ? (
        <div className="prose">
          <p>{dict.cart.empty}</p>
          <Link className="btn" href={`/${lang}/products`}>
            {dict.cart.emptyCta}
          </Link>
        </div>
      ) : (
        <>
          <p className="lead">{dict.cart.lead}</p>
          <div className="cart-list" style={{ marginTop: "1.2rem" }}>
            {items.map((item) => {
              const product = productById(item.id);
              if (!product) return null;
              const copy = dict.products.items[product.id];
              return (
                <article key={item.id} className="cart-row">
                  <Link className="frame" href={`/${lang}/products/${product.id}`}>
                    <Image src={asset(product.image)} alt="" fill sizes="92px" className="photo" />
                  </Link>
                  <div>
                    <h2 style={{ fontSize: "1.15rem" }}>
                      <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
                    </h2>
                    <p className="price">{money(lang, product.price)}</p>
                    <div className="qty" aria-label={dict.cart.qty}>
                      <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="-">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="+">
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <strong className="line-price">{money(lang, product.price * item.qty)}</strong>
                    <div>
                      <button className="linkish" type="button" onClick={() => remove(item.id)}>
                        {dict.cart.remove}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="actions">
            <strong>
              {dict.cart.total}: {money(lang, total)}
            </strong>
            <Link className="btn" href={`/${lang}/checkout`}>
              {dict.cart.checkout}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
