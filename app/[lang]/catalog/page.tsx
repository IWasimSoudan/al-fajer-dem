import { CatalogStyleStudio } from "@/components/catalog/CatalogStyleStudio";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.catalog.title };
}

export default async function CatalogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <CatalogStyleStudio lang={lang} dict={dict} />
    </Suspense>
  );
}
