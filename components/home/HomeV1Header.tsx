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

export function HomeV1Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const chrome = dict.home.chrome;

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
    <header className="hv1-chrome">
      <div className="hv1-utility">
        <div className="hv1-utility-inner">
          <div className="hv1-utility-links">
            <Link href={`/${lang}/contact`}>{chrome.contactUs}</Link>
            <Link href={`/${lang}/contact`}>{chrome.support}</Link>
            <Link href={`/${lang}/cart`}>{chrome.account}</Link>
          </div>
          <div className="hv1-utility-tools">
            <div className="hv1-version" role="group" aria-label={dict.nav.homeVersion}>
              <Link
                href={`/${lang}`}
                aria-label={`${dict.nav.home} ${dict.nav.homeV1}`}
                aria-current="page"
              >
                {dict.nav.homeV1}
              </Link>
              <Link
                href={`/${lang}/v2`}
                aria-label={`${dict.nav.home} ${dict.nav.homeV2}`}
              >
                {dict.nav.homeV2}
              </Link>
            </div>
            <div className="hv1-lang" role="group" aria-label="Language">
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

      <div className="hv1-mainbar">
        <div className="hv1-mainbar-inner">
          <Link className="hv1-brand" href={`/${lang}`} aria-label={dict.brand}>
            <Image src={asset("/logo.jpg")} alt="" width={140} height={104} priority />
          </Link>

          <nav className="hv1-nav" aria-label={dict.nav.primary}>
            {navLinks.map((key) => {
              const href = `/${lang}/${key}`;
              return (
                <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined}>
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>

          <form className="hv1-search" onSubmit={onSearch} role="search">
            <label className="sr-only" htmlFor="hv1-search-input">
              {chrome.search}
            </label>
            <input
              id="hv1-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={chrome.search}
            />
            <button type="submit" aria-label={chrome.searchCta}>
              <Search size={18} strokeWidth={2} />
            </button>
          </form>

          <Link className="hv1-cart" href={`/${lang}/cart`} aria-label={`${dict.nav.cart} (${count})`}>
            <span className="hv1-cart-mark" aria-hidden="true">
              {count}
            </span>
            {dict.nav.cart}
          </Link>

          <button
            className={open ? "hv1-burger is-open" : "hv1-burger"}
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

      <div className={open ? "hv1-drawer is-open" : "hv1-drawer"}>
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
          <Link href={`/${lang}`} aria-current="page" onClick={() => setOpen(false)}>
            {dict.nav.home} {dict.nav.homeV1}
          </Link>
          <Link href={`/${lang}/v2`} onClick={() => setOpen(false)}>
            {dict.nav.home} {dict.nav.homeV2}
          </Link>
        </nav>
      </div>
    </header>
  );
}
