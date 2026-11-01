import { PageStage } from "@/components/PageStage";
import { expertise } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.expertise.title };
}

export default async function ExpertisePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.expertise.kicker}
      title={dict.expertise.title}
      lead={dict.expertise.lead}
      image="/images/laser.jpg"
    >
      <div className="index">
        {expertise.map((id, index) => (
          <article key={id} id={id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{dict.expertise.items[id].title}</h2>
              <p>{dict.expertise.items[id].text}</p>
            </div>
          </article>
        ))}
      </div>
    </PageStage>
  );
}
