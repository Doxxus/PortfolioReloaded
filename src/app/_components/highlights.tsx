"use client";

import { highlights } from "~/data";

import { MouseHalo, onMouseHaloMove } from "./mouse-halo";
import { Reveal } from "./reveal";

const svg = {
  className: "size-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons: Record<string, React.ReactNode> = {
  desktop: (
    <svg {...svg}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  fullstack: (
    <svg {...svg}>
      <path d="m12 3 9 5-9 5-9-5 9-5z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  ),
  agentic: (
    <svg {...svg}>
      <path d="M12 3l1.8 4.6L18 9.5l-4.2 1.9L12 16l-1.8-4.6L6 9.5l4.2-1.9L12 3z" />
      <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
    </svg>
  ),
  cicd: (
    <svg {...svg}>
      <path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </svg>
  ),
  data: (
    <svg {...svg}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.700 3.600 3 8 3s8-1.300 8-3V5M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3" />
    </svg>
  ),
};

export function Highlights() {
  return (
    <ul className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {highlights.map((h, i) => (
        <li key={h.id}>
          <Reveal delay={i * 0.07} className="h-full">
            <div
              onPointerMove={onMouseHaloMove}
              className="card group relative h-full overflow-hidden p-4 transition-colors duration-300 hover:border-cyan-400/60"
            >
              <MouseHalo />
              <div className="relative">
                <span className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-violet-600 dark:text-cyan-300">
                  {icons[h.id]}
                </span>
                <h3 className="font-semibold">{h.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {h.description}
                </p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
