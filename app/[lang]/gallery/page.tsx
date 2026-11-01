import { GalleryGrid } from "@/components/GalleryGrid";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.gallery.title };
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dict } = await load(params);

  return (
    <article className="page wrap">
      <p className="kicker">{dict.gallery.kicker}</p>
      <h1>{dict.gallery.title}</h1>
      <p className="lead">{dict.gallery.lead}</p>
      <GalleryGrid dict={dict} />
    </article>
  );
}
