import { VisitSection } from "@/components/home/VisitSection";
import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import type { ReactNode } from "react";

export function PageStage({
  lang,
  dict,
  title,
  lead,
  kicker,
  image,
  imageAlt = "",
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  title: string;
  lead?: string;
  kicker?: string;
  image?: string;
  imageAlt?: string;
  children: ReactNode;
}) {
  return (
    <div className="home-page stage-page">
      <section className={image ? "page-hero" : "page-hero compact"}>
        {image ? (
          <>
            <div className="hero-media">
              <Image src={asset(image)} alt={imageAlt} fill priority sizes="100vw" className="hero-frame on" />
            </div>
            <div className="hero-shade" />
          </>
        ) : null}
        <div className="hero-copy">
          {kicker ? <p className="page-kicker">{kicker}</p> : null}
          <h1>{title}</h1>
          {lead ? <p>{lead}</p> : null}
        </div>
      </section>
      <div className="page-body">{children}</div>
      <VisitSection lang={lang} stage={dict.home.stage} footer={dict.footer} nav={dict.nav} />
    </div>
  );
}
