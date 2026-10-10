import type { Project } from "~/server/github";

import { ProjectsGrid } from "./projects-grid";
import { SectionHeading } from "./section-heading";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl px-4 py-24"
    >
      <SectionHeading
        id="projects"
        title="Projects"
        subtitle="Things I've built, from work tools to weekend experiments. Click a card to see it on GitHub."
      />
      <ProjectsGrid projects={projects} />
    </section>
  );
}
