import { CheckoutForm } from "@/components/CheckoutForm";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.checkout.title };
}

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);
  return <CheckoutForm lang={lang} dict={dict} />;
}
