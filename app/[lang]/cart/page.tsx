import { CartView } from "@/components/CartView";
import { CheckoutFlowShell } from "@/components/checkout/CheckoutFlowShell";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.cart.title };
}

export default async function CartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <CheckoutFlowShell lang={lang} dict={dict} title={dict.cart.title} current={1}>
        <CartView lang={lang} dict={dict} />
      </CheckoutFlowShell>
    </Suspense>
  );
}
