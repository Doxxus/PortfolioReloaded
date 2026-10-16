"use client";

import { siteConfig } from "~/config/site";

import { MouseHalo, onMouseHaloMove } from "./mouse-halo";
import { Reveal } from "./reveal";
import { ResumeLink } from "./resume-modal";
import { SectionHeading } from "./section-heading";

const iconCls = "size-7";

const items = [
  {
    label: "GitHub",
    hint: "Code & projects",
    href: siteConfig.links.github,
    icon: (
      <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.300.7-1.600-2.600-.3-5.300-1.300-5.300-5.700 0-1.300.5-2.300 1.200-3.100-.1-.3-.5-1.500.1-3.100 0 0 1-.3 3.200 1.200a11 11 0 0 1 5.800 0c2.200-1.500 3.200-1.200 3.200-1.200.6 1.600.2 2.800.1 3.100.7.800 1.200 1.800 1.200 3.100 0 4.400-2.700 5.400-5.300 5.700.4.400.8 1.100.8 2.200v3.200c0 .3.2.7.8.6A11.500 11.500 0 0 0 12 .5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    hint: "Professional profile",
    href: siteConfig.links.linkedin,
    icon: (
      <svg className={iconCls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.400 20.400h-3.600v-5.600c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900v5.700H9.400V9h3.400v1.600h.1c.5-.9 1.600-1.800 3.400-1.800 3.600 0 4.300 2.400 4.300 5.500v6.100zM5.300 7.400a2.100 2.100 0 1 1 0-4.200 2.100 2.100 0 0 1 0 4.200zM7.100 20.400H3.600V9h3.500v11.400zM22.200 0H1.800C.8 0 0 .8 0 1.700v20.600c0 .9.8 1.700 1.800 1.700h20.400c1 0 1.800-.8 1.800-1.700V1.700C24 .8 23.200 0 22.200 0z" />
      </svg>
    ),
  },
  {
    label: "Resume",
    hint: "View my resume",
    href: undefined as string | undefined,
    modal: true,
    icon: (
      <svg
        className={iconCls}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
];

export function Links() {
  return (
    <section
      id="links"
      aria-labelledby="links-heading"
      className="mx-auto max-w-5xl px-4 py-24"
    >
      <SectionHeading
        id="links"
        title="Links"
        subtitle="Want to connect or see more? Find me here."
      />
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((it, i) => {
          const cls =
            "card group relative flex flex-col items-start gap-3 overflow-hidden p-6 transition-all duration-300";
          const body = (
            <>
              <MouseHalo />
              <span className="relative text-violet-600 transition-transform duration-300 group-hover:scale-110 dark:text-violet-300">
                {it.icon}
              </span>
              <span className="relative text-lg font-semibold">{it.label}</span>
              <span className="relative text-sm text-gray-500 dark:text-gray-400">
                {it.hint}
              </span>
            </>
          );
          return (
            <Reveal key={it.label} delay={i * 0.1}>
              {"modal" in it ? (
                <ResumeLink
                  className={`${cls} hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10`}
                  onPointerMove={onMouseHaloMove}
                >
                  {body}
                </ResumeLink>
              ) : it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerMove={onMouseHaloMove}
                  className={`${cls} hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10`}
                >
                  {body}
                </a>
              ) : (
                <div
                  onPointerMove={onMouseHaloMove}
                  className={`${cls} opacity-60`}
                  aria-disabled
                >
                  {body}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
      <p className="mt-24 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
    </section>
  );
}
