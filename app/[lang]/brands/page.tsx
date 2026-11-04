import { PageStage } from "@/components/PageStage";
import { brands, featuredBrands } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.brands.title };
}

export default async function BrandsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);
  const featured = new Set<string>(featuredBrands);
  const more = brands.filter((name) => !featured.has(name));

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.brands.kicker}
      title={dict.brands.title}
      lead={dict.brands.lead}
      image="/images/iron-fence.jpg"
    >
      <h2>{dict.brands.featuredTitle}</h2>
      <div className="brands brands-featured">
        {featuredBrands.map((name) => (
          <p key={name} className="brand-name is-featured">
            {name}
          </p>
        ))}
      </div>
      <h2>{dict.brands.moreTitle}</h2>
      <div className="brands">
        {more.map((name) => (
          <p key={name} className="brand-name">
            {name}
          </p>
        ))}
      </div>
    </PageStage>
  );
}
