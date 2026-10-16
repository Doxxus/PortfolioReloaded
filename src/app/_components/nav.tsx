"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { sections, siteConfig } from "~/config/site";

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(e.target.id === "top" ? "" : e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ["top", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/60 bg-gray-50/70 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/70">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#top" className="flex shrink-0 items-center gap-2 font-semibold">
          <span className="relative inline-block size-8 shrink-0 overflow-hidden rounded-xl">
            <Image src="/dox_icon.png" alt="" width={36} height={36} className="size-8 object-contain brightness-[2.5] dark:brightness-150 dark:contrast-125" />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-violet-300 to-cyan-200 dark:from-violet-500 dark:to-cyan-400 mix-blend-color [mask-image:url(/dox_icon.png)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
            />
          </span>
          <span className="text-gradient">{siteConfig.name}</span>
        </a>
        <ul className="flex items-center gap-1 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active === s.id
                    ? "bg-violet-500/15 text-violet-600 dark:text-violet-300"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 text-gray-600 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <svg
            className="theme-icon size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <mask id="theme-icon-mask">
              <rect width="24" height="24" fill="white" />
              <circle className="theme-icon-cut" cx="18" cy="6" r="6" fill="black" />
            </mask>
            <circle
              className="theme-icon-body"
              cx="12"
              cy="12"
              r="9"
              mask="url(#theme-icon-mask)"
            />
            <g
              className="theme-icon-rays"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </g>
          </svg>
        </button>
      </nav>
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-violet-500 to-cyan-400"
      />
    </header>
  );
}
