"use client";

import { motion } from "motion/react";
import { useId } from "react";

import type { Language } from "~/data";

import { MouseHalo, onMouseHaloMove } from "./mouse-halo";
import { TechIcon } from "./tech-icon";

const R = 26;
const C = 2 * Math.PI * R;

export function SkillCard({ language, index }: { language: Language; index: number }) {
  const gradId = useId();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onPointerMove={onMouseHaloMove}
      className="card group relative flex flex-col gap-4 overflow-hidden p-5"
    >
      <MouseHalo />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <TechIcon name={language.name} size={28} />
          <h3 className="flex-1 text-lg font-semibold">{language.name}</h3>
          <div className="relative size-16 shrink-0">
            <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <circle
                cx="32"
                cy="32"
                r={R}
                fill="none"
                strokeWidth="5"
                className="stroke-gray-200 dark:stroke-gray-800"
              />
              <motion.circle
                cx="32"
                cy="32"
                r={R}
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                stroke={`url(#${gradId})`}
                strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                whileInView={{ strokeDashoffset: C * (1 - language.proficiency / 100) }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
              {language.proficiency}%
            </span>
          </div>
        </div>
        {language.frameworks.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {language.frameworks.map((f) => {
              const chip = (
                <>
                  <TechIcon name={f.name} size={14} />
                  {f.name}
                </>
              );
              const cls =
                "flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100/60 py-0.5 pr-2.5 pl-1 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300";
              return (
                <li key={f.id}>
                  {f.url ? (
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cls} transition-colors hover:border-cyan-400`}
                    >
                      {chip}
                    </a>
                  ) : (
                    <span className={cls}>{chip}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
