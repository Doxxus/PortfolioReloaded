"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import type { Project } from "~/server/github";

import { ProjectCard } from "./project-card";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const languages = useMemo(
    () => [...new Set(projects.map((p) => p.language).filter(Boolean))] as string[],
    [projects],
  );
  const visible = filter
    ? projects.filter((p) => p.language === filter)
    : projects;

  return (
    <>
      {languages.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {[null, ...languages].map((l) => (
            <button
              key={l ?? "all"}
              type="button"
              onClick={() => setFilter(l)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                filter === l
                  ? "border-transparent bg-gradient-to-r from-violet-500 to-cyan-500 text-white"
                  : "border-gray-300 text-gray-600 hover:border-violet-400 dark:border-gray-700 dark:text-gray-400"
              }`}
            >
              {l ?? "All"}
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
