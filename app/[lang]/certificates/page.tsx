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
    <article className="page wrap">
      <p className="kicker">{dict.certificates.kicker}</p>
      <h1>{dict.certificates.title}</h1>
      <p className="lead">{dict.certificates.lead}</p>
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
    </article>
  );
}
