import { HomeV2Stage } from "@/components/home-v2/HomeV2Stage";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return {
    title: { absolute: `${dict.meta.title} · v2` },
    description: dict.meta.description,
  };
}

export default async function HomeV2Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);
  return (
    <Suspense fallback={null}>
      <HomeV2Stage lang={lang} dict={dict} />
    </Suspense>
  );
}
