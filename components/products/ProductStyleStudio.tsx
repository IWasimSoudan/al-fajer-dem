"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import { productTree, products, type CategoryId, type ProductId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { priceSortValue, productPriceLabel } from "@/lib/money";
import {
  initialCatalogView,
  PRODUCT_STYLES,
  resolveProductStyle,
  type ProductStyleId,
} from "@/lib/productStyles";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  Mail,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type MouseEvent } from "react";

export type { ProductStyleId };

type Product = (typeof products)[number];
type SortKey = "nameAsc" | "nameDesc" | "priceAsc" | "priceDesc";

const PAGE_SIZE = 4;

function foundLabel(dict: Dictionary, count: number) {
  return dict.products.count.replaceAll("{count}", String(count));
}

function categoryCount(categoryId: CategoryId) {
  return products.filter((product) => product.category === categoryId).length;
}

/** Deterministic demo stock so list rows feel like an industrial catalog. */
function sampleStock(id: ProductId) {
  const n = (id.charCodeAt(0) * 7 + id.length * 3) % 9;
  return n === 0 ? 1 : n;
}

function stockLabel(dict: Dictionary, count: number) {
  if (count <= 2) {
    const key = count === 1 ? dict.products.lowStock : dict.products.lowStockPlural;
    return key.replaceAll("{count}", String(count));
  }
  return dict.products.stockCount.replaceAll("{count}", String(count));
}

function StylePicker({
  lang,
  dict,
  active,
}: {
  lang: Locale;
  dict: Dictionary;
  active: ProductStyleId;
}) {
  return (
    <aside className="ps-picker" aria-label={dict.products.stylePicker}>
      <div className="ps-picker-copy">
        <p className="ps-picker-title">{dict.products.stylePicker}</p>
        <p className="ps-picker-hint">{dict.products.styleHint}</p>
      </div>
      <div className="ps-picker-list" role="list">
        {PRODUCT_STYLES.map((id) => {
          const meta = dict.products.styles[id];
          return (
            <Link
              key={id}
              href={`/${lang}/products?style=${id}`}
              role="listitem"
              className={active === id ? "ps-picker-item is-active" : "ps-picker-item"}
              aria-current={active === id ? "page" : undefined}
            >
              <strong>{meta.label}</strong>
              <span>{meta.blurb}</span>
              <em className="ps-picker-idea">
                <span className="ps-picker-idea-label">{dict.products.styleWhy}</span>
                {meta.idea}
              </em>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function StyleIdeaBanner({ dict, style }: { dict: Dictionary; style: ProductStyleId }) {
  const meta = dict.products.styles[style];
  return (
    <div className="ps-idea-banner" role="note">
      <p className="ps-idea-kicker">{dict.products.styleWhy}</p>
      <p className="ps-idea-text">
        <strong>{meta.label}</strong>
        <span>{meta.idea}</span>
      </p>
    </div>
  );
}

function CategorySidebar({
  dict,
  filter,
  onFilter,
  open,
  onToggle,
}: {
  dict: Dictionary;
  filter: CategoryId | "all";
  onFilter: (value: CategoryId | "all") => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <aside className={open ? "ps-cats is-open" : "ps-cats"}>
      <button type="button" className="ps-cats-toggle" onClick={onToggle}>
        {open ? dict.products.hideFilters : dict.products.showFilters}
      </button>
      {open ? (
        <div className="ps-cats-panel">
          <p className="ps-cats-title">{dict.products.browseCategories}</p>
          <button
            type="button"
            className={filter === "all" ? "ps-cats-all is-active" : "ps-cats-all"}
            onClick={() => onFilter("all")}
          >
            {dict.products.allProducts}
            <span>{products.length}</span>
          </button>
          <nav className="ps-cats-nav" aria-label={dict.products.browseCategories}>
            {productTree.map((branch) => {
              const count = categoryCount(branch.id);
              const active = filter === branch.id;
              return (
                <div key={branch.id} className={active ? "ps-cats-group is-active" : "ps-cats-group"}>
                  <button type="button" className="ps-cats-parent" aria-pressed={active} onClick={() => onFilter(branch.id)}>
                    <span>{dict.products.categories[branch.id].title}</span>
                    <span className="ps-cats-count">{count}</span>
                  </button>
                  {branch.children.length > 0 ? (
                    <ul className="ps-cats-children">
                      {branch.children.map((child) => (
                        <li key={child.id}>
                          <button type="button" onClick={() => onFilter(branch.id)}>
                            {dict.products.children[child.id]}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      ) : null}
    </aside>
  );
}

function Toolbar({
  dict,
  query,
  onQuery,
  sort,
  onSort,
  view,
  onView,
  count,
}: {
  dict: Dictionary;
  query: string;
  onQuery: (value: string) => void;
  sort: SortKey;
  onSort: (value: SortKey) => void;
  view?: "list" | "grid";
  onView?: (value: "list" | "grid") => void;
  count: number;
}) {
  return (
    <div className="ps-toolbar">
      <label className="ps-filter">
        <span className="ui-ico">
          <Search size={14} strokeWidth={1.75} aria-hidden="true" />
          {dict.products.search}
        </span>
        <input
          type="search"
          value={query}
          placeholder={dict.products.searchPlaceholder}
          onChange={(event) => onQuery(event.target.value)}
        />
      </label>
      <p className="ps-count">{foundLabel(dict, count)}</p>
      {view && onView ? (
        <div className="ps-view-toggle" role="group" aria-label={dict.products.samples}>
          <button type="button" aria-pressed={view === "list"} onClick={() => onView("list")}>
            <LayoutList size={14} strokeWidth={1.75} aria-hidden="true" />
            {dict.products.viewList}
          </button>
          <button type="button" aria-pressed={view === "grid"} onClick={() => onView("grid")}>
            <LayoutGrid size={14} strokeWidth={1.75} aria-hidden="true" />
            {dict.products.viewGrid}
          </button>
        </div>
      ) : null}
      <label className="ps-sort">
        <span>{dict.products.sortLabel}</span>
        <select value={sort} onChange={(event) => onSort(event.target.value as SortKey)}>
          <option value="nameAsc">{dict.products.sortNameAsc}</option>
          <option value="nameDesc">{dict.products.sortNameDesc}</option>
          <option value="priceAsc">{dict.products.sortPriceAsc}</option>
          <option value="priceDesc">{dict.products.sortPriceDesc}</option>
        </select>
      </label>
    </div>
  );
}

function QtyControl({
  qty,
  onChange,
  decreaseLabel,
  increaseLabel,
  min = 1,
}: {
  qty: number;
  onChange: (qty: number) => void;
  decreaseLabel: string;
  increaseLabel: string;
  min?: number;
}) {
  return (
    <div className="ps-qty">
      <button type="button" aria-label={decreaseLabel} disabled={qty <= min} onClick={() => onChange(Math.max(min, qty - 1))}>
        <Minus size={14} strokeWidth={2} aria-hidden="true" />
      </button>
      <span aria-live="polite">{qty}</span>
      <button type="button" aria-label={increaseLabel} onClick={() => onChange(qty + 1)}>
        <Plus size={14} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

function BuyActions({
  lang,
  dict,
  product,
  qty,
  onQty,
  cartQty,
  onAdd,
  onRemove,
  onCartQty,
  compact = false,
}: {
  lang: Locale;
  dict: Dictionary;
  product: Product;
  qty: number;
  onQty: (qty: number) => void;
  cartQty: number;
  onAdd: () => void;
  onRemove: () => void;
  onCartQty: (qty: number) => void;
  compact?: boolean;
}) {
  const inCart = cartQty > 0;
  const quoteOnly = product.price == null;

  return (
    <div className={compact ? "ps-buy is-compact" : "ps-buy"}>
      <p className="ps-price">{productPriceLabel(lang, product.price, dict.products.priceOnRequest)}</p>
      {!compact ? <p className="ps-tax">{dict.products.taxNote}</p> : null}
      {inCart ? <p className="ps-in-cart">{dict.products.inCart}: {cartQty}</p> : null}
      <div className="ps-buy-row">
        {quoteOnly ? (
          <Link className="btn ui-ico-btn" href={`/${lang}/contact`}>
            <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            {dict.products.askQuote}
          </Link>
        ) : (
          <>
            <QtyControl
              qty={inCart ? cartQty : qty}
              min={inCart ? 0 : 1}
              onChange={(value) => {
                if (inCart) {
                  if (value < 1) onRemove();
                  else onCartQty(value);
                  return;
                }
                onQty(value);
              }}
              decreaseLabel={dict.products.qtyDown}
              increaseLabel={dict.products.qtyUp}
            />
            {inCart ? (
              <button className="btn ghost ps-remove ui-ico-btn" type="button" onClick={onRemove}>
                <Trash2 size={16} strokeWidth={1.75} aria-hidden="true" />
                {dict.products.remove}
              </button>
            ) : (
              <button className="btn ui-ico-btn" type="button" onClick={onAdd}>
                <ShoppingCart size={16} strokeWidth={1.75} aria-hidden="true" />
                {dict.products.add}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProductMeta({
  dict,
  product,
  stock,
}: {
  dict: Dictionary;
  product: Product;
  stock: number;
}) {
  return (
    <p className="ps-meta">
      <span>
        {dict.products.skuLabel} {product.id.toUpperCase()}
      </span>
      <span className={stock <= 2 ? "is-low" : "is-ok"}>{stockLabel(dict, stock)}</span>
    </p>
  );
}

function ProductMedia({
  lang,
  dict,
  product,
  className,
  sizes,
}: {
  lang: Locale;
  dict: Dictionary;
  product: Product;
  className: string;
  sizes: string;
}) {
  const photos = product.images.length > 0 ? product.images : [product.image];
  const [index, setIndex] = useState(0);
  const many = photos.length > 1;
  const photo = photos[index] ?? product.image;

  function step(delta: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((current) => (current + delta + photos.length) % photos.length);
  }

  return (
    <div className={`ps-media ${className}`}>
      <Link href={`/${lang}/products/${product.id}`} className="ps-media-frame" tabIndex={-1}>
        <Image
          key={photo}
          src={asset(photo)}
          alt=""
          fill
          sizes={sizes}
          className="photo"
        />
      </Link>
      {many ? (
        <>
          <button type="button" className="ps-media-step is-prev" aria-label={dict.products.photoPrev} onClick={(event) => step(-1, event)}>
            <ChevronLeft size={18} strokeWidth={1.7} aria-hidden="true" />
          </button>
          <button type="button" className="ps-media-step is-next" aria-label={dict.products.photoNext} onClick={(event) => step(1, event)}>
            <ChevronRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </button>
          <div className="ps-media-dots" aria-hidden="true">
            {photos.map((src, dot) => (
              <button
                key={src}
                type="button"
                className={dot === index ? "is-active" : undefined}
                aria-label={`${dict.products.photoView} ${dot + 1}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIndex(dot);
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function useCatalog(dict: Dictionary, lang: Locale, query: string, sort: SortKey, filter: CategoryId | "all") {
  return useMemo(() => {
    const locale = lang === "ar" ? "ar" : "en";
    const needle = query.trim().toLocaleLowerCase(locale);
    const collator = new Intl.Collator(locale, { sensitivity: "base" });
    return products
      .filter((product) => {
        if (filter !== "all" && product.category !== filter) return false;
        if (!needle) return true;
        const copy = dict.products.items[product.id];
        const category = dict.products.categories[product.category].title;
        return `${copy.name} ${copy.detail} ${category} ${product.id}`
          .toLocaleLowerCase(locale)
          .includes(needle);
      })
      .sort((a, b) => {
        const nameA = dict.products.items[a.id].name;
        const nameB = dict.products.items[b.id].name;
        if (sort === "priceAsc") return priceSortValue(a.price) - priceSortValue(b.price) || collator.compare(nameA, nameB);
        if (sort === "priceDesc") return priceSortValue(b.price) - priceSortValue(a.price) || collator.compare(nameA, nameB);
        if (sort === "nameDesc") return collator.compare(nameB, nameA);
        return collator.compare(nameA, nameB);
      });
  }, [dict, filter, lang, query, sort]);
}

type BuyProps = {
  lang: Locale;
  dict: Dictionary;
  items: Product[];
  qtyMap: Record<string, number>;
  setQty: (id: ProductId, qty: number) => void;
  cartQtyOf: (id: ProductId) => number;
  onAdd: (id: ProductId, qty: number) => void;
  onRemove: (id: ProductId) => void;
  onCartQty: (id: ProductId, qty: number) => void;
};

function StyleCatalogList({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-catalog-list">
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const stock = sampleStock(product.id);
        const category = dict.products.categories[product.category].title;
        return (
          <article key={product.id} className="ps-catalog-row">
            <ProductMedia
              lang={lang}
              dict={dict}
              product={product}
              className="ps-catalog-media"
              sizes="(max-width: 800px) 45vw, 260px"
            />
            <div className="ps-catalog-copy">
              <p className="ps-eyebrow">{category}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <ProductMeta dict={dict} product={product} stock={stock} />
              <Link href={`/${lang}/products/${product.id}`} className="ps-specs">
                {dict.products.seeSpecs}
              </Link>
            </div>
            <div className="ps-catalog-actions">
              <BuyActions
                lang={lang}
                dict={dict}
                product={product}
                qty={qty}
                onQty={(value) => setQty(product.id, value)}
                cartQty={cartQtyOf(product.id)}
                onAdd={() => onAdd(product.id, qty)}
                onRemove={() => onRemove(product.id)}
                onCartQty={(value) => onCartQty(product.id, value)}
                compact
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function StyleCatalogGrid({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-catalog-grid">
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const stock = sampleStock(product.id);
        const category = dict.products.categories[product.category].title;
        return (
          <article key={product.id} className="ps-catalog-card">
            <ProductMedia
              lang={lang}
              dict={dict}
              product={product}
              className="ps-catalog-card-media"
              sizes="(max-width: 800px) 100vw, 36vw"
            />
            <div className="ps-catalog-card-body">
              <p className="ps-eyebrow">{category}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <ProductMeta dict={dict} product={product} stock={stock} />
              <Link href={`/${lang}/products/${product.id}`} className="ps-specs">
                {dict.products.seeSpecs}
              </Link>
              <BuyActions
                lang={lang}
                dict={dict}
                product={product}
                qty={qty}
                onQty={(value) => setQty(product.id, value)}
                cartQty={cartQtyOf(product.id)}
                onAdd={() => onAdd(product.id, qty)}
                onRemove={() => onRemove(product.id)}
                onCartQty={(value) => onCartQty(product.id, value)}
                compact
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function StyleSplit({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-split-list">
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const stock = sampleStock(product.id);
        return (
          <article key={product.id} className="ps-split-item">
            <ProductMedia
              lang={lang}
              dict={dict}
              product={product}
              className="ps-split-thumb-lg"
              sizes="(max-width: 700px) 100vw, 220px"
            />
            <div className="ps-split-item-copy">
              <p className="ps-eyebrow">{dict.products.categories[product.category].title}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <ProductMeta dict={dict} product={product} stock={stock} />
              <p className="ps-split-detail">{copy.detail}</p>
              <BuyActions
                lang={lang}
                dict={dict}
                product={product}
                qty={qty}
                onQty={(value) => setQty(product.id, value)}
                cartQty={cartQtyOf(product.id)}
                onAdd={() => onAdd(product.id, qty)}
                onRemove={() => onRemove(product.id)}
                onCartQty={(value) => onCartQty(product.id, value)}
                compact
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function StyleEditorial({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-editorial">
      {items.map((product, index) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const stock = sampleStock(product.id);
        const flip = index % 2 === 1;
        return (
          <article key={product.id} className={flip ? "ps-editorial-row is-flip" : "ps-editorial-row"}>
            <ProductMedia
              lang={lang}
              dict={dict}
              product={product}
              className="ps-editorial-media"
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <div className="ps-editorial-copy">
              <p className="ps-editorial-index">{String(index + 1).padStart(2, "0")}</p>
              <p className="ps-eyebrow">{dict.products.categories[product.category].title}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <ProductMeta dict={dict} product={product} stock={stock} />
              <p>{copy.detail}</p>
              <BuyActions
                lang={lang}
                dict={dict}
                product={product}
                qty={qty}
                onQty={(value) => setQty(product.id, value)}
                cartQty={cartQtyOf(product.id)}
                onAdd={() => onAdd(product.id, qty)}
                onRemove={() => onRemove(product.id)}
                onCartQty={(value) => onCartQty(product.id, value)}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Pagination({
  dict,
  page,
  pages,
  total,
  pageSize,
  onPage,
}: {
  dict: Dictionary;
  page: number;
  pages: number;
  total: number;
  pageSize: number;
  onPage: (page: number) => void;
}) {
  if (total === 0 || pages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const showing = dict.products.showing
    .replaceAll("{from}", String(from))
    .replaceAll("{to}", String(to))
    .replaceAll("{total}", String(total));
  const pageOf = dict.products.pageOf.replaceAll("{page}", String(page)).replaceAll("{pages}", String(pages));

  const numbers = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <nav className="ps-pager" aria-label={dict.products.pageLabel}>
      <p className="ps-pager-status">
        <span>{showing}</span>
        <span className="ps-pager-of">{pageOf}</span>
      </p>
      <div className="ps-pager-controls">
        <button type="button" className="ps-pager-nav ui-ico-btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          <ChevronLeft size={16} strokeWidth={1.75} aria-hidden="true" className="flip-rtl" />
          {dict.products.pagePrev}
        </button>
        <div className="ps-pager-pages" role="list">
          {numbers.map((number) => (
            <button
              key={number}
              type="button"
              role="listitem"
              className={number === page ? "ps-pager-page is-active" : "ps-pager-page"}
              aria-current={number === page ? "page" : undefined}
              onClick={() => onPage(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <button type="button" className="ps-pager-nav ui-ico-btn" disabled={page >= pages} onClick={() => onPage(page + 1)}>
          {dict.products.pageNext}
          <ChevronRight size={16} strokeWidth={1.75} aria-hidden="true" className="flip-rtl" />
        </button>
      </div>
    </nav>
  );
}

function StyleSheet({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-sheet">
      <div className="ps-sheet-head ps-sheet-head-buy" role="row">
        <span aria-hidden="true" />
        <span>{dict.products.kicker}</span>
        <span>{dict.products.sortPrice}</span>
        <span>{dict.products.add}</span>
      </div>
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const cartQty = cartQtyOf(product.id);
        const inCart = cartQty > 0;
        const stock = sampleStock(product.id);
        return (
          <div key={product.id} className="ps-sheet-row">
            <div className="ps-sheet-buy-main">
              <ProductMedia
                lang={lang}
                dict={dict}
                product={product}
                className="ps-sheet-media"
                sizes="160px"
              />
              <span className="ps-sheet-name">
                <Link href={`/${lang}/products/${product.id}`}>
                  <strong>{copy.name}</strong>
                </Link>
                <small>
                  {dict.products.skuLabel} {product.id.toUpperCase()} · {dict.products.categories[product.category].title} ·{" "}
                  {stockLabel(dict, stock)}
                </small>
              </span>
              <span className="ps-price">{productPriceLabel(lang, product.price, dict.products.priceOnRequest)}</span>
              <span className="ps-sheet-actions">
                {product.price == null ? (
                  <Link className="btn ui-ico-btn" href={`/${lang}/contact`}>
                    <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                    {dict.products.askQuote}
                  </Link>
                ) : (
                  <>
                    <QtyControl
                      qty={inCart ? cartQty : qty}
                      min={inCart ? 0 : 1}
                      onChange={(value) => {
                        if (inCart) {
                          if (value < 1) onRemove(product.id);
                          else onCartQty(product.id, value);
                          return;
                        }
                        setQty(product.id, value);
                      }}
                      decreaseLabel={dict.products.qtyDown}
                      increaseLabel={dict.products.qtyUp}
                    />
                    {inCart ? (
                      <button className="btn ghost ps-remove ui-ico-btn" type="button" onClick={() => onRemove(product.id)}>
                        <Trash2 size={16} strokeWidth={1.75} aria-hidden="true" />
                        {dict.products.remove}
                      </button>
                    ) : (
                      <button className="btn ui-ico-btn" type="button" onClick={() => onAdd(product.id, qty)}>
                        <ShoppingCart size={16} strokeWidth={1.75} aria-hidden="true" />
                        {dict.products.add}
                      </button>
                    )}
                  </>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductStyleStudio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get("style") ?? undefined;
  const style = resolveProductStyle(styleParam);
  const catalogView = initialCatalogView(styleParam);

  const { add, setQty: setCartQty, remove, items: cartItems } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("nameAsc");
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [catsOpen, setCatsOpen] = useState(true);
  const [view, setView] = useState<"list" | "grid">(catalogView);
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});
  const [page, setPage] = useState(1);
  const items = useCatalog(dict, lang, query, sort, filter);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  useEffect(() => {
    setView(catalogView);
  }, [catalogView]);

  useEffect(() => {
    setPage(1);
  }, [query, sort, filter, style, view]);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  function goToPage(next: number) {
    setPage(Math.min(pages, Math.max(1, next)));
    if (typeof window !== "undefined") {
      document.getElementById("ps-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function setLocalQty(id: ProductId, qty: number) {
    setQtyMap((current) => ({ ...current, [id]: qty }));
  }

  function cartQtyOf(id: ProductId) {
    return cartItems.find((item) => item.id === id)?.qty ?? 0;
  }

  function handleAdd(id: ProductId, qty: number) {
    const existing = cartItems.find((item) => item.id === id);
    if (!existing) {
      add(id);
      if (qty > 1) setCartQty(id, qty);
    } else {
      setCartQty(id, existing.qty + qty);
    }
  }

  function handleRemove(id: ProductId) {
    remove(id);
  }

  function handleCartQty(id: ProductId, qty: number) {
    if (qty < 1) remove(id);
    else setCartQty(id, qty);
  }

  const buyProps = {
    lang,
    dict,
    items: pageItems,
    qtyMap,
    setQty: setLocalQty,
    cartQtyOf,
    onAdd: handleAdd,
    onRemove: handleRemove,
    onCartQty: handleCartQty,
  };

  return (
    <div className={`ps-studio ps-style-${style}`}>
      <StylePicker lang={lang} dict={dict} active={style} />

      <header className="ps-page-head">
        <p className="page-kicker">{dict.products.kicker}</p>
        <h1>{dict.products.title}</h1>
        <p>{dict.products.lead}</p>
      </header>

      <StyleIdeaBanner dict={dict} style={style} />

      <div className={catsOpen ? "ps-layout" : "ps-layout is-collapsed"}>
        <CategorySidebar
          dict={dict}
          filter={filter}
          onFilter={(value) => {
            setFilter(value);
            setPage(1);
          }}
          open={catsOpen}
          onToggle={() => setCatsOpen((value) => !value)}
        />

        <div className="ps-main" id="ps-results">
          <Toolbar
            dict={dict}
            query={query}
            onQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
            sort={sort}
            onSort={(value) => {
              setSort(value);
              setPage(1);
            }}
            view={style === "list" ? view : undefined}
            onView={
              style === "list"
                ? (value) => {
                    setView(value);
                    setPage(1);
                  }
                : undefined
            }
            count={items.length}
          />

          {items.length === 0 ? (
            <p className="prose ui-ico">
              <Package size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>
                {dict.products.empty}{" "}
                <Link className="ui-ico" href={`/${lang}/contact`}>
                  <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
                  {dict.products.ask}
                </Link>
              </span>
            </p>
          ) : null}

          {style === "list" && view === "list" ? <StyleCatalogList {...buyProps} /> : null}
          {style === "list" && view === "grid" ? <StyleCatalogGrid {...buyProps} /> : null}
          {style === "split" ? <StyleSplit {...buyProps} /> : null}
          {style === "editorial" ? <StyleEditorial {...buyProps} /> : null}
          {style === "sheet" ? <StyleSheet {...buyProps} /> : null}

          <Pagination
            dict={dict}
            page={page}
            pages={pages}
            total={items.length}
            pageSize={PAGE_SIZE}
            onPage={goToPage}
          />
        </div>
      </div>
    </div>
  );
}
