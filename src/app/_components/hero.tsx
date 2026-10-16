import { about } from "~/data";
import { siteConfig } from "~/config/site";

import { HeroName } from "./hero-name";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-svh items-center px-4 pt-14"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal y={16}>
          <p className="mb-3 font-mono text-sm text-cyan-600 dark:text-cyan-300">
            Hi, I&apos;m
          </p>
        </Reveal>
        <HeroName name={siteConfig.name} />
        <Reveal delay={1.3}>
          <p className="mt-4 text-xl text-gray-600 sm:text-2xl dark:text-gray-400">
            {siteConfig.tagline}
          </p>
        </Reveal>
        <Reveal delay={1.4}>
          <p className="mt-8 max-w-2xl leading-relaxed text-gray-700 dark:text-gray-300">
            {about.text}
          </p>
        </Reveal>
        <Reveal delay={1.5}>
          <p className="mt-4 max-w-2xl rounded-xl border-l-2 border-violet-500 bg-violet-500/5 px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-violet-600 dark:text-violet-300">
              Currently exploring:{" "}
            </span>
            {about.interest.replace(/^I'm currently interested in /, "")}
          </p>
        </Reveal>
        <Reveal delay={1.6}>
          <a
            href="#projects"
            className="mt-10 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-500 dark:text-gray-400"
          >
            Scroll to explore
            <span className="animate-bounce">↓</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
