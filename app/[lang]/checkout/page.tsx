import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import { CheckoutForm } from "@/components/CheckoutForm";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.checkout.title };
}

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <CheckoutFlowShell lang={lang} dict={dict} title={dict.checkout.title} current={2}>
        <CheckoutForm lang={lang} dict={dict} />
      </CheckoutFlowShell>
    </Suspense>
  );
}
