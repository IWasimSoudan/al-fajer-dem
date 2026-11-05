import { asset } from "@/lib/asset";
import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import { homeV2Categories } from "@/lib/homeV2Media";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./Skeleton";

export function CategoryGrid({
  lang,
  copy,
  ready,
}: {
  lang: Locale;
  copy: HomeV2Translations["categories"];
  ready: boolean;
}) {
  if (!ready) {
    return (
      <section className="hv2-cats is-loading" aria-busy="true">
        <div className="hv2-section-head">
          <Skeleton className="hv2-line-skel" />
          <Skeleton className="hv2-chip-skel" />
        </div>
        <div className="hv2-cat-row">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="hv2-cat-skel" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="hv2-cats">
      <div className="hv2-section-head">
        <h2>{copy.title}</h2>
        <Link href={`/${lang}/products`}>{copy.viewAll}</Link>
      </div>
      <div className="hv2-cat-row">
        {homeV2Categories.map((item) => {
          const label = copy.items[item.id];
          return (
            <Link
              key={item.id}
              href={`/${lang}/${item.href}`}
              className="hv2-cat-card"
              aria-label={label}
            >
              <Image
                src={asset(item.image)}
                alt={label}
                fill
                sizes="(max-width: 900px) 85vw, 28vw"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
