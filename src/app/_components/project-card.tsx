"use client";

import { useRef } from "react";

import type { Project } from "~/server/github";

import { TechIcon } from "./tech-icon";

const gradients = [
  "from-violet-500 to-cyan-400",
  "from-cyan-500 to-violet-500",
  "from-violet-600 to-gray-500",
  "from-cyan-400 to-gray-500",
];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

function initials(title: string) {
  return title
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const className =
    "card group relative flex h-full flex-col overflow-hidden p-5 transition-all duration-300 " +
    (project.url
      ? "cursor-pointer hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/10 dark:hover:border-violet-500/50"
      : "");

  const content = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--x,50%) var(--y,50%), rgba(139,92,246,0.14), transparent 70%)",
        }}
      />
      <div className="relative flex items-center gap-3">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white ${
            gradients[hash(project.title) % gradients.length]!
          }`}
        >
          {initials(project.title)}
        </div>
        <h3 className="text-lg leading-tight font-semibold">{project.title}</h3>
      </div>
      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {project.about}
      </p>
      <div className="relative mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-2">
          {project.language && (
            <>
              <TechIcon name={project.language} size={14} />
              {project.language}
            </>
          )}
        </span>
        <span className="flex items-center gap-3">
          {project.stars ? <span>★ {project.stars}</span> : null}
          <span className="text-violet-600 dark:text-violet-300">
            {project.url ? "View on GitHub →" : "Private / work project"}
          </span>
        </span>
      </div>
    </>
  );

  return project.url ? (
    <a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={onMove}
      className={className}
    >
      {content}
    </a>
  ) : (
    <div ref={ref} className={className}>
      {content}
    </div>
  );
}
