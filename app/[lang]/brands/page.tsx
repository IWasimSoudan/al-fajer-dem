import { BrandStyleStudio } from "@/components/brands/BrandStyleStudio";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.brands.title };
}

export default async function BrandsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <BrandStyleStudio lang={lang} dict={dict} />
    </Suspense>
  );
}
