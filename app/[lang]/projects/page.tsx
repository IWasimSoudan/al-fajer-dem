import { ProjectStyleStudio } from "@/components/projects/ProjectStyleStudio";
import { load } from "@/lib/page";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { dict } = await load(params);
  return { title: dict.projects.title };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang, dict } = await load(params);

  return (
    <Suspense fallback={null}>
      <ProjectStyleStudio lang={lang} dict={dict} />
    </Suspense>
  );
}
