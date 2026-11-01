import { brands } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.brands.title };
}

export default async function BrandsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dict } = await load(params);

  return (
    <article className="page wrap">
      <p className="kicker">{dict.brands.kicker}</p>
      <h1>{dict.brands.title}</h1>
      <p className="lead">{dict.brands.lead}</p>
      <div className="brands">
        {brands.map((name) => (
          <p key={name} className="brand-name">
            {name}
          </p>
        ))}
      </div>
    </article>
  );
}
