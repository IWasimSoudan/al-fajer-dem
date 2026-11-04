import { HomeStage } from "@/components/HomeStage";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: { absolute: dict.meta.title }, description: dict.meta.description };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);
  return (
    <Suspense fallback={null}>
      <HomeStage lang={lang} dict={dict} />
    </Suspense>
  );
}
