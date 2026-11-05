"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import { productById, products, type ProductId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { productPriceLabel } from "@/lib/money";
import { ChevronLeft, ChevronRight, Mail, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

function relatedFor(id: ProductId) {
  const product = productById(id);
  if (!product) return [];
  const others = products.filter((item) => item.id !== id);
  const sameCategory = others.filter((item) => item.category === product.category);
  const sameFamily = others.filter((item) => item.family === product.family && item.category !== product.category);
  const rest = others.filter((item) => item.category !== product.category && item.family !== product.family);
  return [...sameCategory, ...sameFamily, ...rest].slice(0, 4);
}

export function ProductDetail({ lang, dict, id }: { lang: Locale; dict: Dictionary; id: ProductId }) {
  const { add, remove, items, setQty } = useCart();
  const product = productById(id);
  const [index, setIndex] = useState(0);
  const viewRef = useRef<HTMLDialogElement>(null);
  const related = useMemo(() => relatedFor(id), [id]);

  if (!product) return null;

  const photos = product.images;
  const photo = photos[index] ?? product.image;
  const copy = dict.products.items[product.id];
  const category = dict.products.categories[product.category].title;
  const family = dict.catalog.families[product.family];
  const dimensions = product.dimensions ? dict.catalog.measures[product.dimensions] : null;
  const rating = product.rating ? dict.catalog.measures[product.rating] : null;
  const many = photos.length > 1;
  const cartQty = items.find((item) => item.id === product.id)?.qty ?? 0;
  const inCart = cartQty > 0;

  function openView() {
    viewRef.current?.showModal();
  }

  function closeView() {
    viewRef.current?.close();
  }

  return (
    <div className="product-detail">
      <div className="pdp pdp-gallery">
        <nav className="pdp-crumbs" aria-label="Breadcrumb">
          <Link href={`/${lang}/products`}>{dict.products.kicker}</Link>
          <span aria-hidden="true">/</span>
          <span>{category}</span>
          <span aria-hidden="true">/</span>
          <span>{copy.name}</span>
        </nav>

        <div className="pdp-grid">
          <div className="pdp-media">
            <button type="button" className="frame pdp-main" aria-label={dict.products.photoView} onClick={openView}>
              <Image src={asset(photo)} alt={copy.name} fill priority sizes="(max-width: 900px) 100vw, 58vw" className="photo" />
            </button>
            {many ? (
              <div className="pdp-thumbs" role="list">
                {photos.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    role="listitem"
                    className={i === index ? "on" : undefined}
                    aria-label={`${dict.products.photoView} ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => setIndex(i)}
                  >
                    <Image src={asset(src)} alt="" fill sizes="72px" className="photo" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="pdp-info pdp-sticky">
            <p className="pdp-kicker">{category}</p>
            <h2>{copy.name}</h2>
            <p className="pdp-detail">{copy.detail}</p>
            <p className="price">{productPriceLabel(lang, product.price, dict.products.priceOnRequest)}</p>
            {inCart ? <p className="ps-in-cart">{dict.products.inCart}: {cartQty}</p> : null}
            <div className="pdp-buy">
              {product.price == null ? (
                <Link className="btn ui-ico-btn" href={`/${lang}/contact`}>
                  <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                  {dict.products.askQuote}
                </Link>
              ) : inCart ? (
                <>
                  <div className="qty" aria-label={dict.cart.qty}>
                    <button type="button" onClick={() => (cartQty <= 1 ? remove(product.id) : setQty(product.id, cartQty - 1))} aria-label={dict.products.qtyDown}>
                      <Minus size={14} strokeWidth={2} aria-hidden="true" />
                    </button>
                    <span>{cartQty}</span>
                    <button type="button" onClick={() => setQty(product.id, cartQty + 1)} aria-label={dict.products.qtyUp}>
                      <Plus size={14} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                  <button className="btn ghost ui-ico-btn" type="button" onClick={() => remove(product.id)}>
                    <Trash2 size={16} strokeWidth={1.75} aria-hidden="true" />
                    {dict.products.remove}
                  </button>
                </>
              ) : (
                <button className="btn ui-ico-btn" type="button" onClick={() => add(product.id)}>
                  <ShoppingCart size={16} strokeWidth={1.75} aria-hidden="true" />
                  {dict.products.add}
                </button>
              )}
              {product.price != null ? (
                <Link className="btn ghost ui-ico-btn" href={`/${lang}/cart`}>
                  <ShoppingCart size={16} strokeWidth={1.75} aria-hidden="true" />
                  {dict.nav.cart}
                </Link>
              ) : null}
              <Link className="btn ghost ui-ico-btn" href={`/${lang}/products`}>
                <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" className="flip-rtl" />
                {dict.products.back}
              </Link>
            </div>
            <dl className="pdp-specs">
              <div>
                <dt>{dict.catalog.category}</dt>
                <dd>{category}</dd>
              </div>
              <div>
                <dt>{dict.catalog.family}</dt>
                <dd>{family}</dd>
              </div>
              {dimensions ? (
                <div>
                  <dt>{dict.catalog.dimensions}</dt>
                  <dd>{dimensions}</dd>
                </div>
              ) : null}
              {rating ? (
                <div>
                  <dt>{dict.catalog.rating}</dt>
                  <dd>{rating}</dd>
                </div>
              ) : null}
            </dl>
          </div>
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
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
          {many ? (
            <>
              <button
                type="button"
                className="thumb-step prev photo-view-step"
                aria-label={dict.products.photoPrev}
                onClick={() => setIndex((current) => (current - 1 + photos.length) % photos.length)}
              >
                <ChevronLeft size={22} strokeWidth={1.6} aria-hidden="true" className="chev-start" />
              </button>
              <button
                type="button"
                className="thumb-step next photo-view-step"
                aria-label={dict.products.photoNext}
                onClick={() => setIndex((current) => (current + 1) % photos.length)}
              >
                <ChevronRight size={22} strokeWidth={1.6} aria-hidden="true" className="chev-end" />
              </button>
            </>
          ) : null}
        </dialog>
      </div>

      {related.length > 0 ? (
        <section className="related" aria-labelledby="related-heading">
          <h2 id="related-heading">{dict.products.related}</h2>
          <div className="related-grid">
            {related.map((item) => {
              const itemCopy = dict.products.items[item.id];
              return (
                <article key={item.id} className="related-card">
                  <Link className="frame related-shot" href={`/${lang}/products/${item.id}`}>
                    <Image src={asset(item.image)} alt="" fill sizes="(max-width: 700px) 45vw, 220px" className="photo" />
                  </Link>
                  <div className="related-copy">
                    <h3>
                      <Link href={`/${lang}/products/${item.id}`}>{itemCopy.name}</Link>
                    </h3>
                    <p className="price">{productPriceLabel(lang, item.price, dict.products.priceOnRequest)}</p>
                    <Link className="btn ghost related-link" href={`/${lang}/products/${item.id}`}>
                      {dict.products.view}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
