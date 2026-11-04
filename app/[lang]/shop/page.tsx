import { PageStage } from "@/components/PageStage";
import { ProductBrowser } from "@/components/ProductBrowser";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.shop.title };
}

export default async function ShopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.shop.kicker}
      title={dict.shop.title}
      lead={dict.shop.lead}
      image="/images/black-door.jpg"
    >
      <ProductBrowser lang={lang} dict={dict} />
    </PageStage>
  );
}
