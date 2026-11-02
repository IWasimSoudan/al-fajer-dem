import { CartView } from "@/components/CartView";
import { CheckoutStage } from "@/components/CheckoutStage";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.cart.title };
}

export default async function CartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <CheckoutStage title={dict.cart.title}>
      <CartView lang={lang} dict={dict} />
    </CheckoutStage>
  );
}
