import { ExpertiseStyleStudio } from "@/components/expertise/ExpertiseStyleStudio";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.expertise.title };
}

export default async function ExpertisePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <ExpertiseStyleStudio lang={lang} dict={dict} />
    </Suspense>
  );
}
