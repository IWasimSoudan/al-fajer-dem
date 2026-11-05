import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import { PaymentForm } from "@/components/PaymentForm";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.payment.title };
}

export default async function PaymentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <CheckoutFlowShell lang={lang} dict={dict} title={dict.payment.title} current={3}>
        <PaymentForm lang={lang} dict={dict} />
      </CheckoutFlowShell>
    </Suspense>
  );
}
