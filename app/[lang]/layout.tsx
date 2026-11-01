import { CartProvider } from "@/components/CartProvider";
import { DocumentLocale } from "@/components/DocumentLocale";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { load } from "@/lib/page";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang, dict } = await load(params);

  return (
    <>
      <DocumentLocale lang={lang} />
      <CartProvider>
        <Header lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </CartProvider>
    </>
  );
}
