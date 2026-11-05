import { asset } from "@/lib/asset";
import type { HomeV2Translations } from "@/lib/dictionaries/en/homeV2";
import { homeV2Split } from "@/lib/homeV2Media";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "./icons";
import { Skeleton } from "./Skeleton";

export function AboutProjects({
  lang,
  about,
  projects,
  ready,
}: {
  lang: Locale;
  about: HomeV2Translations["about"];
  projects: HomeV2Translations["projects"];
  ready: boolean;
}) {
  if (!ready) {
    return (
      <section className="hv2-split is-loading" aria-busy="true">
        <Skeleton className="hv2-split-skel" />
        <Skeleton className="hv2-split-skel" />
      </section>
    );
  }

  return (
    <section className="hv2-split">
      <article className="hv2-about">
        <div className="hv2-about-copy">
          <p className="hv2-kicker">{about.kicker}</p>
          <h2>{about.title}</h2>
          <p>{about.text}</p>
          <Link className="hv2-btn hv2-btn-light" href={`/${lang}/about`}>
            <span>{about.cta}</span>
            <IconArrow />
          </Link>
        </div>
        <div className="hv2-about-media">
          <Image src={homeV2Split.aboutImage} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
      </article>

      <article className="hv2-projects">
        <div className="hv2-projects-copy">
          <p className="hv2-kicker">{projects.kicker}</p>
          <h2>{projects.title}</h2>
          <p>{projects.text}</p>
          <Link className="hv2-btn hv2-btn-blue" href={`/${lang}/projects`}>
            <span>{projects.cta}</span>
            <IconArrow />
          </Link>
        </div>
        <div className="hv2-projects-media">
          <Image
            src={homeV2Split.projectsImage.startsWith("http") ? homeV2Split.projectsImage : asset(homeV2Split.projectsImage)}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </article>
    </section>
  );
}
