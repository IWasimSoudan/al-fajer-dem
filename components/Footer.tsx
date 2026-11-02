import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <strong>{dict.brand}</strong>
          <p>{dict.footer.blurb}</p>
        </div>
        <div>
          <h2>{dict.footer.visit}</h2>
          <p>
            <strong>{dict.footer.address}</strong>
            <br />
            {dict.footer.hoursLabel}: {dict.footer.hours}
          </p>
        </div>
        <div>
          <h2>{dict.footer.talk}</h2>
          <p>
            <a href={`mailto:${dict.footer.email}`}>{dict.footer.email}</a>
          </p>
        </div>
      </div>
      <div className="wrap foot-links">
        <Link href={`/${lang}/products`}>{dict.nav.products}</Link>
        <Link href={`/${lang}/brands`}>{dict.nav.brands}</Link>
        <Link href={`/${lang}/certificates`}>{dict.nav.certificates}</Link>
        <Link href={`/${lang}/contact`}>{dict.nav.contact}</Link>
      </div>
    </footer>
  );
}
