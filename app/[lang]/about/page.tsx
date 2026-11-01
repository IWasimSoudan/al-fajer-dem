import { PageStage } from "@/components/PageStage";
import { asset } from "@/lib/asset";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.about.title };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.about.kicker}
      title={dict.about.title}
      lead={dict.about.lead}
      image="/images/steel.jpg"
    >
      <div className="split">
        <div className="prose">
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
        </div>
        <div className="frame wide">
          <Image src={asset("/images/steel.jpg")} alt="" fill sizes="(max-width: 900px) 100vw, 46vw" className="photo" />
        </div>
      </div>
      <h2>{dict.about.peopleTitle}</h2>
      <div className="people">
        {dict.about.people.map((person) => (
          <article key={person.name} className="person">
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </article>
        ))}
      </div>
      <h2>{dict.about.madeTitle}</h2>
      <ul className="made">
        {dict.about.made.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2>{dict.about.serviceTitle}</h2>
      <p className="prose">{dict.about.serviceText}</p>
    </PageStage>
  );
}
