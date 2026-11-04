"use client";

import { asset } from "@/lib/asset";
import { brands as brandNames } from "@/lib/catalog";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

type Stage = Dictionary["home"]["stage"];

export function BrandsSection({ lang, stage }: { lang: Locale; stage: Stage }) {
  return (
    <section className="brands-stage" id="brands">
      <div className="brands-home-head reveal">
        <h2 className="brands-home-title">{stage.brandsTitle}</h2>
        <p className="brands-home-lead">{stage.brandsLead}</p>
      </div>

      <figure className="brands-home-figure reveal">
        <Image
          src={asset("/images/brands.webp")}
          alt={stage.brandsImageAlt}
          width={1200}
          height={720}
          className="brands-home-collage"
          sizes="(max-width: 900px) 92vw, 880px"
        />
        <figcaption className="sr-only">{stage.brandsImageAlt}</figcaption>
      </figure>

      <ul className="brands-home-names" aria-label={stage.brandsTitle}>
        {brandNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div className="brands-home-cta reveal">
        <Link href={`/${lang}/brands`}>{stage.brandsCta}</Link>
      </div>
    </section>
  );
}
