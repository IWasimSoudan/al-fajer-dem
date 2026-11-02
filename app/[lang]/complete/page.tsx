import { CheckoutStage } from "@/components/CheckoutStage";
import { CompleteView } from "@/components/CompleteView";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.complete.title };
}

export default async function CompletePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <CheckoutStage title={dict.complete.title}>
      <CompleteView lang={lang} dict={dict} />
    </CheckoutStage>
  );
}
