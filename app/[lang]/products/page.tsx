import { ProductStyleStudio } from "@/components/products/ProductStyleStudio";
import { initialCatalogView, resolveProductStyle } from "@/lib/productStyles";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.products.title };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ style?: string }>;
}) {
  const { lang, dict } = await load(params);
  const { style: styleParam } = await searchParams;
  const style = resolveProductStyle(styleParam);
  const catalogView = initialCatalogView(styleParam);

  return <ProductStyleStudio lang={lang} dict={dict} style={style} catalogView={catalogView} />;
}
