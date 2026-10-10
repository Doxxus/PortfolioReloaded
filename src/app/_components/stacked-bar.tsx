"use client";

import { motion } from "motion/react";

const palette = [
  "bg-violet-500",
  "bg-cyan-500",
  "bg-violet-300",
  "bg-cyan-300",
  "bg-gray-400",
  "bg-violet-700",
  "bg-cyan-700",
];

export function StackedBar({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: number }[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
        {title}
      </h4>
      <motion.div
        className="flex h-3 gap-0.5 overflow-hidden rounded-full"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        role="img"
        aria-label={items.map((i) => `${i.label} ${i.value}%`).join(", ")}
      >
        {items.map((it, i) => (
          <div
            key={it.label}
            className={palette[i % palette.length]}
            style={{ flexGrow: it.value, flexBasis: 0 }}
          />
        ))}
      </motion.div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            <span
              className={`size-2 rounded-full ${palette[i % palette.length]!}`}
            />
            {it.label} · {it.value}%
          </li>
        ))}
      </ul>
    </div>
  );
}
