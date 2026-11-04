import { PageStage } from "@/components/PageStage";
import { asset } from "@/lib/asset";
import { projects } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.projects.title };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <PageStage
      lang={lang}
      dict={dict}
      kicker={dict.projects.kicker}
      title={dict.projects.title}
      lead={dict.projects.lead}
      image="/images/warehouse-doors.jpg"
    >
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.id}>
            <div className="frame">
              <Image src={asset(project.image)} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="photo" />
            </div>
            <div>
              <p className="project-code">{project.code}</p>
              <h2 style={{ fontSize: "1.25rem" }}>{dict.projects.items[project.id].title}</h2>
              <p>{dict.projects.items[project.id].text}</p>
            </div>
          </article>
        ))}
      </div>
    </PageStage>
  );
}
