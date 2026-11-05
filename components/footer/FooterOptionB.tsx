import { SOCIAL_PATHS, SocialIcons } from "@/components/footer/SocialIcons";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

function telHref(value: string) {
  return `tel:${value.replace(/\s+/g, "")}`;
}

export function FooterOptionB({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { footer, nav } = dict;
  const year = new Date().getFullYear();

  const explore = [
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/products`, label: nav.products },
    { href: `/${lang}/projects`, label: nav.projects },
    { href: `/${lang}/expertise`, label: nav.expertise },
    { href: `/${lang}/catalog`, label: nav.catalog },
    { href: `/${lang}/brands`, label: nav.brands },
    { href: `/${lang}/certificates`, label: nav.certificates },
    { href: `/${lang}/clients`, label: nav.clients },
    { href: `/${lang}/gallery`, label: nav.gallery },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  return (
    <footer className="foot foot-b">
      <div className="foot-b-surface">
        <div className="wrap foot-b-main">
          <div className="foot-b-brand">
            <p className="foot-b-kicker">{footer.kicker}</p>
            <p className="foot-b-name">{dict.brand}</p>
            <p className="foot-b-closing">{footer.blurb}</p>
            <div className="foot-b-actions">
              <Link className="foot-b-cta" href={`/${lang}/contact`}>
                {footer.contactCta}
              </Link>
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
          </div>

          <div className="foot-b-panels">
            <section className="foot-b-panel" aria-labelledby="foot-connect">
              <h2 id="foot-connect" className="foot-b-panel-title">
                {footer.connect}
              </h2>
              <ul className="foot-b-facts">
                <li>
                  <span>{footer.talk}</span>
                  <strong>
                    <a href={`mailto:${footer.email}`}>{footer.email}</a>
                  </strong>
                </li>
                <li>
                  <span>{footer.phoneLabel}</span>
                  <strong>
                    <a href={telHref(footer.phone)}>{footer.phone}</a>
                  </strong>
                </li>
                <li>
                  <span>{footer.mobileLabel}</span>
                  <strong>
                    <a href={telHref(footer.mobile)}>{footer.mobile}</a>
                  </strong>
                </li>
                <li>
                  <span>{footer.websiteLabel}</span>
                  <strong>
                    <a href={footer.websiteHref} target="_blank" rel="noreferrer">
                      {footer.website}
                    </a>
                  </strong>
                </li>
              </ul>
            </section>

            <section className="foot-b-panel" aria-labelledby="foot-visit">
              <h2 id="foot-visit" className="foot-b-panel-title">
                {footer.visit}
              </h2>
              <ul className="foot-b-facts">
                <li>
                  <span>{footer.visit}</span>
                  <strong>
                    {footer.address}
                    <br />
                    {footer.poBox}
                  </strong>
                </li>
                <li>
                  <span>{footer.hoursLabel}</span>
                  <strong>{footer.hours}</strong>
                </li>
                <li>
                  <span>{footer.faxLabel}</span>
                  <strong>{footer.fax}</strong>
                </li>
              </ul>
            </section>

            <section className="foot-b-panel foot-b-explore" aria-labelledby="foot-explore">
              <h2 id="foot-explore" className="foot-b-panel-title">
                {footer.explore}
              </h2>
              <nav className="foot-b-nav" aria-label={nav.primary}>
                {explore.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </section>
          </div>
        </div>
      </div>

      <div className="foot-b-bar">
        <div className="wrap foot-b-bar-inner">
          <p className="foot-b-since">{footer.since}</p>
          <p className="foot-b-copy">
            © {year} {dict.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
