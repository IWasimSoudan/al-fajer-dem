import { ProductDetail } from "@/components/ProductDetail";
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

  return (
    <div className="home-page stage-page">
      <div className="page-body">
        <ProductDetail lang={lang} dict={dict} id={product.id as ProductId} />
      </div>
    </div>
  );
}
