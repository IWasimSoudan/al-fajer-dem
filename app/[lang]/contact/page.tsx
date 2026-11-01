import { ContactForm } from "@/components/ContactForm";
import { PageStage } from "@/components/PageStage";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.contact.title };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.contact.kicker}
      title={dict.contact.title}
      lead={dict.contact.lead}
      image="/images/shutter.jpg"
    >
      <div className="split">
        <ContactForm dict={dict} />
        <aside className="summary">
          <h2 style={{ fontSize: "1.1rem" }}>{dict.footer.visit}</h2>
          <p>{dict.footer.address}</p>
          <p>
            {dict.footer.hoursLabel}: {dict.footer.hours}
          </p>
          <p>
            <a href={`mailto:${dict.footer.email}`}>{dict.footer.email}</a>
          </p>
        </aside>
      </div>
      <section className="faq">
        <h2>{dict.contact.faqTitle}</h2>
        {dict.contact.faq.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
    </PageStage>
  );
}
