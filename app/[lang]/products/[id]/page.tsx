import { PageStage } from "@/components/PageStage";
import { ProductPurchase } from "@/components/ProductPurchase";
import { productById, products, type ProductId } from "@/lib/catalog";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const product = productById(id);
  if (!product) return {};
  const dict = getDictionary(lang);
  return { title: dict.products.items[product.id].name };
}

export default async function ProductPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const product = productById(id);
  if (!product) notFound();
  const dict = getDictionary(lang);
  const copy = dict.products.items[product.id];

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.products.categories[product.category].title}
      title={copy.name}
      image={product.image}
      imageAlt={copy.name}
    >
      <ProductPurchase lang={lang} dict={dict} id={product.id as ProductId} />
    </PageStage>
  );
}
