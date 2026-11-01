import { expertise } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.expertise.title };
}

export default async function ExpertisePage({ params }: { params: Promise<{ lang: string }> }) {
  const { dict } = await load(params);

  return (
    <article className="page wrap">
      <p className="kicker">{dict.expertise.kicker}</p>
      <h1>{dict.expertise.title}</h1>
      <p className="lead">{dict.expertise.lead}</p>
      <div className="index" style={{ marginTop: "2rem" }}>
        {expertise.map((id, index) => (
          <article key={id} id={id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2 style={{ fontSize: "1.35rem" }}>{dict.expertise.items[id].title}</h2>
              <p>{dict.expertise.items[id].text}</p>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
