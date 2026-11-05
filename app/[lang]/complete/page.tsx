import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import { CompleteView } from "@/components/CompleteView";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.complete.title };
}

export default async function CompletePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <CheckoutFlowShell lang={lang} dict={dict} title={dict.complete.title} current={4}>
        <CompleteView lang={lang} dict={dict} />
      </CheckoutFlowShell>
    </Suspense>
  );
}
