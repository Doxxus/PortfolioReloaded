import { getProjects } from "~/server/github";

import { Experience } from "./_components/experience";
import { Hero } from "./_components/hero";
import { Links } from "./_components/links";
import { Nav } from "./_components/nav";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";

// Static page, re-generated hourly so GitHub data stays fresh.
export const revalidate = 3600;

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:paint]"
      >
        <div
          className="glow absolute -top-1/4 -left-1/4 size-[80vmax] opacity-60 dark:opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25), transparent 65%)",
          }}
        />
        <div
          className="glow absolute -right-1/4 -bottom-1/4 size-[80vmax] opacity-60 [animation-delay:-11s] dark:opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.22), transparent 65%)",
          }}
        />
      </div>
      <Nav />
      <main>
        <Hero />
        <Projects projects={projects} />
        <Experience />
        <Skills />
        <Links />
      </main>
    </>
  );
}
