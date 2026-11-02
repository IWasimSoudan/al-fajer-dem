import { asset } from "@/lib/asset";
import type { Dictionary } from "@/lib/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

type Stage = Dictionary["home"]["stage"];

export function TeamSection({ lang, stage }: { lang: Locale; stage: Stage }) {
  return (
    <section className="team-stage">
      <div className="team-photo reveal">
        <Image src={asset("/images/tanks.jpg")} alt={stage.teamTitle} fill sizes="(max-width: 800px) 100vw, 90vw" />
      </div>
      <div className="team-copy reveal">
        <p>{stage.teamKicker}</p>
        <h2>{stage.teamTitle}</h2>
        <p className="team-text">{stage.teamText}</p>
        <Link href={`/${lang}/about`}>{stage.teamCta}</Link>
      </div>
    </section>
  );
}
