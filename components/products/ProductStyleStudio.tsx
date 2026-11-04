"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import { productTree, products, type CategoryId, type ProductId } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { money } from "@/lib/money";
import { PRODUCT_STYLES, type ProductStyleId } from "@/lib/productStyles";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export type { ProductStyleId };

type Product = (typeof products)[number];
type SortKey = "nameAsc" | "nameDesc" | "priceAsc" | "priceDesc";

function foundLabel(dict: Dictionary, count: number) {
  return dict.products.count.replaceAll("{count}", String(count));
}

function categoryCount(categoryId: CategoryId) {
  return products.filter((product) => product.category === categoryId).length;
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
            </Link>
          );
        })}
      </div>
    </aside>
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
        <span>{dict.products.search}</span>
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
            {dict.products.viewList}
          </button>
          <button type="button" aria-pressed={view === "grid"} onClick={() => onView("grid")}>
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
        −
      </button>
      <span aria-live="polite">{qty}</span>
      <button type="button" aria-label={increaseLabel} onClick={() => onChange(qty + 1)}>
        +
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
}) {
  const inCart = cartQty > 0;

  return (
    <div className="ps-buy">
      <p className="ps-price">{money(lang, product.price)}</p>
      <p className="ps-tax">{dict.products.taxNote}</p>
      {inCart ? <p className="ps-in-cart">{dict.products.inCart}: {cartQty}</p> : null}
      <div className="ps-buy-row">
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
          <button className="btn ghost ps-remove" type="button" onClick={onRemove}>
            {dict.products.remove}
          </button>
        ) : (
          <button className="btn" type="button" onClick={onAdd}>
            {dict.products.add}
          </button>
        )}
      </div>
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
        if (sort === "priceAsc") return a.price - b.price || collator.compare(nameA, nameB);
        if (sort === "priceDesc") return b.price - a.price || collator.compare(nameA, nameB);
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

function StyleList({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-list">
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        return (
          <article key={product.id} className="ps-list-card">
            <Link href={`/${lang}/products/${product.id}`} className="ps-list-media">
              <Image src={asset(product.image)} alt="" fill sizes="(max-width: 800px) 100vw, 280px" className="photo" />
            </Link>
            <div className="ps-list-body">
              <p className="ps-sku">{product.id.toUpperCase()}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <p>{copy.detail}</p>
              <div className="ps-badges">
                <span className="ps-badge">{dict.products.categories[product.category].title}</span>
                <span className="ps-badge is-stock">{dict.products.inStock}</span>
              </div>
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

function StyleGrid({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-grid">
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        return (
          <article key={product.id} className="ps-grid-card">
            <Link href={`/${lang}/products/${product.id}`} className="ps-grid-media">
              <Image src={asset(product.image)} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="photo" />
            </Link>
            <div className="ps-grid-body">
              <p className="ps-sku">{product.id.toUpperCase()}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <p>{dict.products.categories[product.category].title}</p>
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

function StyleSplit({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-split-list">
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        return (
          <article key={product.id} className="ps-split-item">
            <Link href={`/${lang}/products/${product.id}`} className="ps-split-thumb-lg">
              <Image src={asset(product.image)} alt="" fill sizes="140px" className="photo" />
            </Link>
            <div className="ps-split-item-copy">
              <p className="ps-sku">{product.id.toUpperCase()}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
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

function StyleEditorial({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-editorial">
      {items.map((product, index) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const flip = index % 2 === 1;
        return (
          <article key={product.id} className={flip ? "ps-editorial-row is-flip" : "ps-editorial-row"}>
            <Link href={`/${lang}/products/${product.id}`} className="ps-editorial-media">
              <Image src={asset(product.image)} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="photo" />
            </Link>
            <div className="ps-editorial-copy">
              <p className="ps-editorial-index">{String(index + 1).padStart(2, "0")}</p>
              <p className="ps-sku">{product.id.toUpperCase()}</p>
              <h3>
                <Link href={`/${lang}/products/${product.id}`}>{copy.name}</Link>
              </h3>
              <p>{copy.detail}</p>
              <p className="ps-badge">{dict.products.categories[product.category].title}</p>
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

function StyleSheet({ lang, dict, items, qtyMap, setQty, cartQtyOf, onAdd, onRemove, onCartQty }: BuyProps) {
  return (
    <div className="ps-sheet">
      <div className="ps-sheet-head ps-sheet-head-buy" role="row">
        <span>{dict.products.kicker}</span>
        <span>{dict.products.sortPrice}</span>
        <span>{dict.products.add}</span>
      </div>
      {items.map((product) => {
        const copy = dict.products.items[product.id];
        const qty = qtyMap[product.id] ?? 1;
        const cartQty = cartQtyOf(product.id);
        const inCart = cartQty > 0;
        return (
          <div key={product.id} className="ps-sheet-row">
            <div className="ps-sheet-buy-main">
              <span className="ps-sheet-name">
                <Link href={`/${lang}/products/${product.id}`}>
                  <strong>{copy.name}</strong>
                </Link>
                <small>
                  {product.id.toUpperCase()} · {dict.products.categories[product.category].title}
                </small>
              </span>
              <span className="ps-price">{money(lang, product.price)}</span>
              <span className="ps-sheet-actions">
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
                  <button className="btn ghost ps-remove" type="button" onClick={() => onRemove(product.id)}>
                    {dict.products.remove}
                  </button>
                ) : (
                  <button className="btn" type="button" onClick={() => onAdd(product.id, qty)}>
                    {dict.products.add}
                  </button>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductStyleStudio({
  lang,
  dict,
  style,
}: {
  lang: Locale;
  dict: Dictionary;
  style: ProductStyleId;
}) {
  const { add, setQty: setCartQty, remove, items: cartItems } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("nameAsc");
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [catsOpen, setCatsOpen] = useState(true);
  const [view, setView] = useState<"list" | "grid">(style === "grid" ? "grid" : "list");
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});
  const items = useCatalog(dict, lang, query, sort, filter);

  const showToggle = style === "list" || style === "grid";
  const effectiveView = style === "grid" ? "grid" : style === "list" ? view : null;

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
    items,
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

      <div className={catsOpen ? "ps-layout" : "ps-layout is-collapsed"}>
        <CategorySidebar
          dict={dict}
          filter={filter}
          onFilter={setFilter}
          open={catsOpen}
          onToggle={() => setCatsOpen((value) => !value)}
        />

        <div className="ps-main">
          <Toolbar
            dict={dict}
            query={query}
            onQuery={setQuery}
            sort={sort}
            onSort={setSort}
            view={showToggle ? view : undefined}
            onView={showToggle ? setView : undefined}
            count={items.length}
          />

          {items.length === 0 ? (
            <p className="prose">
              {dict.products.empty} <Link href={`/${lang}/contact`}>{dict.products.ask}</Link>
            </p>
          ) : null}

          {style === "list" && effectiveView === "list" ? <StyleList {...buyProps} /> : null}
          {(style === "grid" || (style === "list" && effectiveView === "grid")) && <StyleGrid {...buyProps} />}
          {style === "split" ? <StyleSplit {...buyProps} /> : null}
          {style === "editorial" ? <StyleEditorial {...buyProps} /> : null}
          {style === "sheet" ? <StyleSheet {...buyProps} /> : null}
        </div>
      </div>
    </div>
  );
}
