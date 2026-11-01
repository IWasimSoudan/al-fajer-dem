import { GalleryGrid } from "@/components/GalleryGrid";
import { PageStage } from "@/components/PageStage";
import { load } from "@/lib/page";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.gallery.title };
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.gallery.kicker}
      title={dict.gallery.title}
      lead={dict.gallery.lead}
      image="/images/airport.jpg"
    >
      <GalleryGrid dict={dict} />
    </PageStage>
  );
}
