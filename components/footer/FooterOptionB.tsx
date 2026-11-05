import { FOOTER_FACT_ICONS, NAV_ICONS } from "@/components/icons/navIcons";
import { SOCIAL_PATHS, SocialIcons } from "@/components/footer/SocialIcons";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { Send } from "lucide-react";
import Link from "next/link";

function telHref(value: string) {
  return `tel:${value.replace(/\s+/g, "")}`;
}

export function FooterOptionB({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { footer, nav } = dict;
  const year = new Date().getFullYear();

  const explore = [
    { href: `/${lang}/about`, label: nav.about, key: "about" as const },
    { href: `/${lang}/products`, label: nav.products, key: "products" as const },
    { href: `/${lang}/projects`, label: nav.projects, key: "projects" as const },
    { href: `/${lang}/expertise`, label: nav.expertise, key: "expertise" as const },
    { href: `/${lang}/catalog`, label: nav.catalog, key: "catalog" as const },
    { href: `/${lang}/brands`, label: nav.brands, key: "brands" as const },
    { href: `/${lang}/certificates`, label: nav.certificates, key: "certificates" as const },
    { href: `/${lang}/clients`, label: nav.clients, key: "clients" as const },
    { href: `/${lang}/gallery`, label: nav.gallery, key: "gallery" as const },
    { href: `/${lang}/contact`, label: nav.contact, key: "contact" as const },
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
                <Send size={16} strokeWidth={1.75} aria-hidden="true" />
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
                  <span>
                    <FOOTER_FACT_ICONS.email size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.talk}
                  </span>
                  <strong>
                    <a href={`mailto:${footer.email}`}>{footer.email}</a>
                  </strong>
                </li>
                <li>
                  <span>
                    <FOOTER_FACT_ICONS.phone size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.phoneLabel}
                  </span>
                  <strong>
                    <a href={telHref(footer.phone)}>{footer.phone}</a>
                  </strong>
                </li>
                <li>
                  <span>
                    <FOOTER_FACT_ICONS.mobile size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.mobileLabel}
                  </span>
                  <strong>
                    <a href={telHref(footer.mobile)}>{footer.mobile}</a>
                  </strong>
                </li>
                <li>
                  <span>
                    <FOOTER_FACT_ICONS.website size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.websiteLabel}
                  </span>
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
                  <span>
                    <FOOTER_FACT_ICONS.visit size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.visit}
                  </span>
                  <strong>
                    {footer.address}
                    <br />
                    {footer.poBox}
                  </strong>
                </li>
                <li>
                  <span>
                    <FOOTER_FACT_ICONS.hours size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.hoursLabel}
                  </span>
                  <strong>{footer.hours}</strong>
                </li>
                <li>
                  <span>
                    <FOOTER_FACT_ICONS.fax size={14} strokeWidth={1.75} aria-hidden="true" />
                    {footer.faxLabel}
                  </span>
                  <strong>{footer.fax}</strong>
                </li>
              </ul>
            </section>

            <section className="foot-b-panel foot-b-explore" aria-labelledby="foot-explore">
              <h2 id="foot-explore" className="foot-b-panel-title">
                {footer.explore}
              </h2>
              <nav className="foot-b-nav" aria-label={nav.primary}>
                {explore.map((item) => {
                  const Icon = NAV_ICONS[item.key];
                  return (
                    <Link key={item.href} href={item.href}>
                      <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                      {item.label}
                    </Link>
                  );
                })}
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
