"use client";

import { useCart } from "@/components/CartProvider";
import { Mark } from "@/components/Mark";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function withLocale(pathname: string, locale: Locale) {
  if (/^\/(en|ar)(\/|$)/.test(pathname)) return pathname.replace(/^\/(en|ar)/, `/${locale}`);
  return `/${locale}`;
}

const links = ["about", "expertise", "products", "projects", "gallery", "contact"] as const;

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="home-bar">
      <a className="skip" href="#main">
        {dict.nav.home}
      </a>
      <Link className="home-mark" href={`/${lang}`} aria-label={dict.brand} onClick={() => setOpen(false)}>
        <Mark />
      </Link>
      <div className="home-tools">
        <div className="home-lang">
          <Link href={withLocale(pathname, "en")} hrefLang="en" aria-current={lang === "en" ? "true" : undefined}>
            EN
          </Link>
          <Link href={withLocale(pathname, "ar")} hrefLang="ar" aria-current={lang === "ar" ? "true" : undefined}>
            عربي
          </Link>
        </div>
        <Link className="home-contact" href={`/${lang}/contact`} aria-current={pathname === `/${lang}/contact` ? "page" : undefined}>
          {dict.nav.contact}
          <span aria-hidden="true">›</span>
        </Link>
        <button
          className={open ? "home-burger open" : "home-burger"}
          type="button"
          aria-expanded={open}
          aria-label={open ? dict.nav.close : dict.nav.menu}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className={open ? "home-overlay open" : "home-overlay"}>
        <nav aria-label={dict.nav.primary}>
          {links.map((key) => {
            const href = `/${lang}/${key}`;
            return (
              <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
                {dict.nav[key]}
              </Link>
            );
          })}
          <Link href={`/${lang}/cart`} aria-current={pathname === `/${lang}/cart` ? "page" : undefined} onClick={() => setOpen(false)}>
            {dict.nav.cart} ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
