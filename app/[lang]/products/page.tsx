import { ProductBrowser } from "@/components/ProductBrowser";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.products.title };
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <article className="page wrap">
      <p className="kicker">{dict.products.kicker}</p>
      <h1>{dict.products.title}</h1>
      <p className="lead">{dict.products.lead}</p>
      <ProductBrowser lang={lang} dict={dict} />
    </article>
  );
}
