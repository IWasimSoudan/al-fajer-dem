import { CatalogView } from "@/components/CatalogView";
import { PageStage } from "@/components/PageStage";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.catalog.title };
}

export default async function CatalogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.catalog.kicker}
      title={dict.catalog.title}
      lead={dict.catalog.lead}
      image="/images/tanks.jpg"
    >
      <CatalogView lang={lang} dict={dict} />
    </PageStage>
  );
}
