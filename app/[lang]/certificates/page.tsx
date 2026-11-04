import { PageStage } from "@/components/PageStage";
import { asset } from "@/lib/asset";
import { certificates } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import Image from "next/image";
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
      <div className="cert-grid">
        {certificates.map((item) => {
          const copy = dict.certificates.items[item.id];
          return (
            <article key={item.id} className="cert-card">
              <div className="frame">
                <Image src={asset(item.image)} alt="" fill sizes="(max-width: 800px) 100vw, 30vw" className="photo" />
              </div>
              <div>
                <h2>{copy.title}</h2>
                <p>{copy.text}</p>
              </div>
            </article>
          );
        })}
      </div>
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
