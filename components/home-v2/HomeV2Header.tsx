"use client";

import { useCart } from "@/components/CartProvider";
import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

function withLocale(pathname: string, locale: Locale) {
  if (/^\/(en|ar)(\/|$)/.test(pathname)) return pathname.replace(/^\/(en|ar)/, `/${locale}`);
  return `/${locale}`;
}

const navLinks = ["about", "products", "projects", "brands", "expertise", "catalog", "contact"] as const;

export function HomeV2Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const chrome = dict.homeV2.chrome;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/${lang}/products?q=${encodeURIComponent(q)}` : `/${lang}/products`);
  }

  return (
    <header className="hv2-chrome">
      <div className="hv2-utility">
        <div className="hv2-utility-inner">
          <div className="hv2-utility-links">
            <Link href={`/${lang}/contact`}>{chrome.contactUs}</Link>
            <Link href={`/${lang}/contact`}>{chrome.support}</Link>
            <Link href={`/${lang}/cart`}>{chrome.account}</Link>
          </div>
          <div className="hv2-utility-tools">
            <Link href={`/${lang}`} className="hv2-version-link">
              {dict.homeV2.backToV1}
            </Link>
            <div className="hv2-lang" role="group" aria-label="Language">
              <Link href={withLocale(pathname, "en")} hrefLang="en" aria-current={lang === "en" ? "true" : undefined}>
                EN
              </Link>
              <Link href={withLocale(pathname, "ar")} hrefLang="ar" aria-current={lang === "ar" ? "true" : undefined}>
                عربي
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hv2-mainbar">
        <div className="hv2-mainbar-inner">
          <Link className="hv2-brand" href={`/${lang}/v2`} aria-label={dict.brand}>
            <Image src={asset("/logo.jpg")} alt="" width={140} height={104} priority />
          </Link>

          <nav className="hv2-nav" aria-label={dict.nav.primary}>
            {navLinks.map((key) => {
              const href = `/${lang}/${key}`;
              return (
                <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined}>
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>

          <form className="hv2-search" onSubmit={onSearch} role="search">
            <label className="sr-only" htmlFor="hv2-search-input">
              {chrome.search}
            </label>
            <input
              id="hv2-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={chrome.search}
            />
            <button type="submit" aria-label={chrome.searchCta}>
              <Search size={18} strokeWidth={2} />
            </button>
          </form>

          <Link className="hv2-cart" href={`/${lang}/cart`} aria-label={`${dict.nav.cart} (${count})`}>
            <span className="hv2-cart-mark" aria-hidden="true">
              {count}
            </span>
            {dict.nav.cart}
          </Link>

          <button
            className={open ? "hv2-burger is-open" : "hv2-burger"}
            type="button"
            aria-expanded={open}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={open ? "hv2-drawer is-open" : "hv2-drawer"}>
        <nav aria-label={dict.nav.primary}>
          {navLinks.map((key) => {
            const href = `/${lang}/${key}`;
            return (
              <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
                {dict.nav[key]}
              </Link>
            );
          })}
          <Link href={`/${lang}/cart`} onClick={() => setOpen(false)}>
            {dict.nav.cart} ({count})
          </Link>
          <Link href={`/${lang}`} onClick={() => setOpen(false)}>
            {dict.homeV2.backToV1}
          </Link>
        </nav>
      </div>
    </header>
  );
}
