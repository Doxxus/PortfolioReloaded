"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import type { Experience } from "~/data";

import { StackedBar } from "./stacked-bar";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-10 pl-8 sm:pl-12">
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-gray-200 sm:left-[11px] dark:bg-gray-800"
      >
        <motion.div
          style={{ scaleY }}
          className="h-full origin-top bg-gradient-to-b from-violet-500 to-cyan-400"
        />
      </div>
      {items.map((e) => (
        <motion.li
          key={e.id}
          className="relative"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="absolute top-2 -left-8 flex size-4 items-center justify-center sm:-left-12 sm:size-6">
            {e.end === null && (
              <span className="absolute size-full animate-ping rounded-full bg-cyan-400/60" />
            )}
            <span className="relative size-3 rounded-full border-2 border-violet-500 bg-gray-50 sm:size-4 dark:bg-gray-950" />
          </span>
          <div className="card p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-xl font-semibold">{e.position}</h3>
              <span className="font-mono text-xs text-cyan-600 dark:text-cyan-300">
                {e.start} – {e.end ?? "Present"}
              </span>
            </div>
            <p className="text-violet-600 dark:text-violet-300">{e.company}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {e.about}
            </p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <StackedBar title="Time spent" items={e.duties} />
              <StackedBar title="Technologies" items={e.technologies} />
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
