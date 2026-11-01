import { PageStage } from "@/components/PageStage";
import { brands } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.brands.title };
}

export default async function BrandsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.brands.kicker}
      title={dict.brands.title}
      lead={dict.brands.lead}
      image="/images/warehouse.jpg"
    >
      <div className="brands">
        {brands.map((name) => (
          <p key={name} className="brand-name">
            {name}
          </p>
        ))}
      </div>
    </PageStage>
  );
}
