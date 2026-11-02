import { PageStage } from "@/components/PageStage";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.certificates.title };
}

export default async function CertificatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.certificates.kicker}
      title={dict.certificates.title}
      lead={dict.certificates.lead}
      image="/images/stair-rail.jpg"
    >
      <div className="points">
        {dict.certificates.points.map((point) => (
          <p key={point} className="point">
            {point}
          </p>
        ))}
      </div>
      <div className="actions">
        <Link className="btn" href={`/${lang}/contact`}>
          {dict.certificates.cta}
        </Link>
      </div>
    </PageStage>
  );
}
