import { SOCIAL_PATHS, SocialIcons } from "@/components/footer/SocialIcons";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export function FooterOptionB({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const stage = dict.home.stage;
  const { footer, nav } = dict;
  const year = new Date().getFullYear();

  return (
    <footer className="foot foot-b">
      <div className="wrap foot-b-main">
        <div className="foot-b-brand">
          <p className="foot-b-name">{dict.brand}</p>
          <p className="foot-b-closing">{stage.closing}</p>
          <SocialIcons
            label={footer.social}
            items={[
              { id: "facebook", label: footer.facebook, path: SOCIAL_PATHS.facebook },
              { id: "instagram", label: footer.instagram, path: SOCIAL_PATHS.instagram },
              { id: "linkedin", label: footer.linkedin, path: SOCIAL_PATHS.linkedin },
              { id: "youtube", label: footer.youtube, path: SOCIAL_PATHS.youtube },
            ]}
          />
        </div>

        <div className="foot-b-meta">
          <div className="foot-b-row">
            <span>{stage.emailLabel}</span>
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
          </div>
          <div className="foot-b-row">
            <span>{stage.phoneLabel}</span>
            <a href={`tel:${footer.phone.replace(/\s+/g, "")}`}>{footer.phone}</a>
          </div>
          <div className="foot-b-row">
            <span>{footer.mobileLabel}</span>
            <a href={`tel:${footer.mobile.replace(/\s+/g, "")}`}>{footer.mobile}</a>
          </div>
          <div className="foot-b-row">
            <span>{stage.visitLabel}</span>
            <p>
              {footer.address}
              <br />
              {footer.poBox}
            </p>
          </div>
          <div className="foot-b-row">
            <span>{stage.hoursLabel}</span>
            <p>{footer.hours}</p>
          </div>
          <div className="foot-b-row">
            <span>{footer.websiteLabel}</span>
            <a href={footer.websiteHref} target="_blank" rel="noreferrer">
              {footer.website}
            </a>
          </div>
        </div>
      </div>

      <div className="foot-b-bar">
        <div className="wrap foot-b-bar-inner">
          <nav className="foot-b-links" aria-label={nav.primary}>
            <Link href={`/${lang}/about`}>{nav.about}</Link>
            <Link href={`/${lang}/products`}>{nav.products}</Link>
            <Link href={`/${lang}/projects`}>{nav.projects}</Link>
            <Link href={`/${lang}/brands`}>{nav.brands}</Link>
            <Link href={`/${lang}/certificates`}>{nav.certificates}</Link>
            <Link href={`/${lang}/clients`}>{nav.clients}</Link>
            <Link href={`/${lang}/gallery`}>{nav.gallery}</Link>
            <Link href={`/${lang}/expertise`}>{nav.expertise}</Link>
            <Link href={`/${lang}/catalog`}>{nav.catalog}</Link>
            <Link href={`/${lang}/contact`}>{nav.contact}</Link>
          </nav>
          <p className="foot-b-copy">
            © {year} {dict.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
