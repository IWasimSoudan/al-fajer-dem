import { CertificateStyleStudio } from "@/components/certificates/CertificateStyleStudio";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.certificates.title };
}

export default async function CertificatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <CertificateStyleStudio lang={lang} dict={dict} />
    </Suspense>
  );
}
