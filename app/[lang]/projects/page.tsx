import { projects } from "@/lib/catalog";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.projects.title };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { dict } = await load(params);

  return (
    <article className="page wrap">
      <p className="kicker">{dict.projects.kicker}</p>
      <h1>{dict.projects.title}</h1>
      <p className="lead">{dict.projects.lead}</p>
      <div className="project-grid" style={{ marginTop: "1.8rem" }}>
        {projects.map((project) => (
          <article key={project.id}>
            <div className="frame">
              <Image src={project.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="photo" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.25rem" }}>{dict.projects.items[project.id].title}</h2>
              <p>{dict.projects.items[project.id].text}</p>
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
