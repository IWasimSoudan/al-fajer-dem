import { PageStage } from "@/components/PageStage";
import { asset } from "@/lib/asset";
import { clients } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.clients.title };
}

export default async function ClientsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.clients.kicker}
      title={dict.clients.title}
      lead={dict.clients.lead}
      image="/images/canopy.jpg"
    >
      <div className="client-grid">
        {clients.map((client) => (
          <article key={client.id} className="client-card">
            <div className="frame client-mark">
              <Image src={asset(client.image)} alt="" fill sizes="(max-width: 800px) 50vw, 18vw" className="photo" />
            </div>
            <p>{dict.clients.items[client.id]}</p>
          </article>
        ))}
      </div>
    </PageStage>
  );
}
