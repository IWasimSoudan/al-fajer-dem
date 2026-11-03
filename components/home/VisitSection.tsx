import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

type Stage = Dictionary["home"]["stage"];

export function VisitSection({
  lang,
  stage,
  footer,
  nav,
}: {
  lang: Locale;
  stage: Stage;
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
}) {
  return (
    <section className="visit-band">
      <table className="visit-table">
        <tbody>
          <tr>
            <th scope="row">{stage.emailLabel}</th>
            <td>
              <a href={`mailto:${footer.email}`}>{footer.email}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">{stage.visitLabel}</th>
            <td>{footer.address}</td>
          </tr>
          <tr>
            <th scope="row">{stage.hoursLabel}</th>
            <td>{footer.hours}</td>
          </tr>
        </tbody>
      </table>
      <p className="closing">{stage.closing}</p>
      <div className="home-links">
        <Link href={`/${lang}/products`}>{nav.products}</Link>
        <Link href={`/${lang}/catalog`}>{nav.catalog}</Link>
        <Link href={`/${lang}/projects`}>{nav.projects}</Link>
        <Link href={`/${lang}/gallery`}>{nav.gallery}</Link>
        <Link href={`/${lang}/contact`}>{nav.contact}</Link>
      </div>
    </section>
  );
}
