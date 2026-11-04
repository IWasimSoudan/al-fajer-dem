import { PageStage } from "@/components/PageStage";
import { ProductTree } from "@/components/ProductTree";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.products.title };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.products.kicker}
      title={dict.products.title}
      lead={dict.products.lead}
      image="/images/black-door.jpg"
    >
      <ProductTree lang={lang} dict={dict} />
    </PageStage>
  );
}
