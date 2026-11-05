"use client";

import { useCart } from "@/components/CartProvider";
import { NAV_ICONS } from "@/components/icons/navIcons";
import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { Headset, Languages, LayoutTemplate, Mail, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

function withLocale(pathname: string, locale: Locale) {
  if (/^\/(en|ar)(\/|$)/.test(pathname)) return pathname.replace(/^\/(en|ar)/, `/${locale}`);
  return `/${locale}`;
}

const navLinks = [
  "about",
  "products",
  "projects",
  "brands",
  "certificates",
  "clients",
  "gallery",
  "expertise",
  "catalog",
  "contact",
] as const;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const chrome = dict.home.chrome;

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isHomeV2 = pathname === `/${lang}/v2` || pathname === `/${lang}/v2/`;
  const homeHref = isHomeV2 ? `/${lang}/v2` : `/${lang}`;

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
    <header className="site-chrome">
      <a className="skip" href="#main">
        {dict.nav.home}
      </a>

      <div className="site-utility">
        <div className="site-utility-inner">
          <div className="site-utility-links">
            <Link href={`/${lang}/contact`}>
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
              {chrome.contactUs}
            </Link>
            <Link href={`/${lang}/contact`}>
              <Headset size={14} strokeWidth={1.75} aria-hidden="true" />
              {chrome.support}
            </Link>
            <Link href={`/${lang}/cart`}>
              <User size={14} strokeWidth={1.75} aria-hidden="true" />
              {chrome.account}
            </Link>
          </div>
          <div className="site-utility-tools">
            <div className="site-version" role="group" aria-label={dict.nav.homeVersion}>
              <Link
                href={`/${lang}`}
                aria-label={`${dict.nav.home} ${dict.nav.homeV1}`}
                aria-current={isHome ? "page" : undefined}
                className="ui-ico"
              >
                <LayoutTemplate size={14} strokeWidth={1.75} aria-hidden="true" />
                {dict.nav.homeV1}
              </Link>
              <Link
                href={`/${lang}/v2`}
                aria-label={`${dict.nav.home} ${dict.nav.homeV2}`}
                aria-current={isHomeV2 ? "page" : undefined}
                className="ui-ico"
              >
                <LayoutTemplate size={14} strokeWidth={1.75} aria-hidden="true" />
                {dict.nav.homeV2}
              </Link>
            </div>
            <div className="site-lang" role="group" aria-label="Language">
              <span className="ui-ico" aria-hidden="true">
                <Languages size={14} strokeWidth={1.75} />
              </span>
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

      <div className="site-mainbar">
        <div className="site-mainbar-inner">
          <Link className="site-brand" href={homeHref} aria-label={dict.brand} onClick={() => setOpen(false)}>
            <Image src={asset("/logo.jpg")} alt="" width={140} height={104} priority />
          </Link>

          <nav className="site-nav" aria-label={dict.nav.primary}>
            {navLinks.map((key) => {
              const href = `/${lang}/${key}`;
              const Icon = NAV_ICONS[key];
              return (
                <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined}>
                  <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>

          <form className="site-search" onSubmit={onSearch} role="search">
            <label className="sr-only" htmlFor="site-search-input">
              {chrome.search}
            </label>
            <input
              id="site-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={chrome.search}
            />
            <button type="submit" aria-label={chrome.searchCta}>
              <Search size={18} strokeWidth={2} />
            </button>
          </form>

          <Link
            className="site-cart"
            href={`/${lang}/cart`}
            aria-label={`${dict.nav.cart} (${count})`}
            aria-current={pathname === `/${lang}/cart` ? "page" : undefined}
          >
            <ShoppingCart size={18} strokeWidth={1.75} aria-hidden="true" />
            <span className="site-cart-mark" aria-hidden="true">
              {count}
            </span>
            {dict.nav.cart}
          </Link>

          <button
            className={open ? "site-burger is-open" : "site-burger"}
            type="button"
            aria-expanded={open}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <div className={open ? "site-drawer is-open" : "site-drawer"}>
        <nav aria-label={dict.nav.primary}>
          <Link href={`/${lang}`} aria-current={isHome ? "page" : undefined} onClick={() => setOpen(false)}>
            <LayoutTemplate size={16} strokeWidth={1.75} aria-hidden="true" />
            {dict.nav.home} {dict.nav.homeV1}
          </Link>
          <Link href={`/${lang}/v2`} aria-current={isHomeV2 ? "page" : undefined} onClick={() => setOpen(false)}>
            <LayoutTemplate size={16} strokeWidth={1.75} aria-hidden="true" />
            {dict.nav.home} {dict.nav.homeV2}
          </Link>
          {navLinks.map((key) => {
            const href = `/${lang}/${key}`;
            const Icon = NAV_ICONS[key];
            return (
              <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                {dict.nav[key]}
              </Link>
            );
          })}
          <Link
            href={`/${lang}/cart`}
            aria-current={pathname === `/${lang}/cart` ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <ShoppingCart size={16} strokeWidth={1.75} aria-hidden="true" />
            {dict.nav.cart} ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
