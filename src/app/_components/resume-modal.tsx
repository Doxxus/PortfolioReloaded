"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { siteConfig } from "~/config/site";
import { resume } from "~/data/resume";

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Bar({ className = "bg-black" }: { className?: string }) {
  return <div className={`mb-3 h-1.5 w-28 ${className}`} />;
}

function Diamond({
  cx,
  cy,
  s,
  fill,
}: {
  cx: number;
  cy: number;
  s: number;
  fill: string;
}) {
  return (
    <rect
      x={-s / 2}
      y={-s / 2}
      width={s}
      height={s}
      fill={fill}
      transform={`translate(${cx} ${cy}) rotate(45)`}
    />
  );
}

function Shapes() {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 420 230"
        className="pointer-events-none absolute top-0 right-0 w-[55%] max-w-md"
      >
        <Diamond cx={330} cy={110} s={130} fill="#e2e2e2" />
        <Diamond cx={210} cy={95} s={100} fill="#e2e2e2" />
        <Diamond cx={165} cy={20} s={110} fill="#808080" />
        <Diamond cx={240} cy={95} s={95} fill="#000" />
        <Diamond cx={295} cy={150} s={70} fill="#808080" />
        <Diamond cx={330} cy={-10} s={50} fill="#808080" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 160 120"
        className="pointer-events-none absolute bottom-0 left-0 hidden w-32 md:block"
      >
        <Diamond cx={30} cy={90} s={80} fill="#808080" />
        <Diamond cx={105} cy={125} s={90} fill="#e2e2e2" />
        <Diamond cx={-5} cy={135} s={60} fill="#000" />
      </svg>
    </>
  );
}

const iconCls = "size-6";

export function ResumeLink({
  className,
  children,
  onPointerMove,
}: {
  className: string;
  children: React.ReactNode;
  onPointerMove?: React.PointerEventHandler<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        onPointerMove={onPointerMove}
        aria-haspopup="dialog"
        className={`${className} w-full cursor-pointer text-left`}
      >
        {children}
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="resume"
                className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Resume"
                  className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white text-neutral-800 shadow-2xl shadow-violet-500/20"
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 26, stiffness: 260 }}
                >
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    {siteConfig.links.resume && (
                      <a
                        href={siteConfig.links.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
                      >
                        Download PDF
                      </a>
                    )}
                    <button
                      ref={closeRef}
                      type="button"
                      aria-label="Close resume"
                      onClick={() => setOpen(false)}
                      className="flex size-9 items-center justify-center rounded-full bg-black text-white hover:bg-neutral-700"
                    >
                      <svg
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </div>

                  <div
                    data-lenis-prevent
                    className="resume-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain"
                  >
                    <motion.div
                      variants={list}
                      initial="hidden"
                      animate="show"
                      className="relative overflow-hidden px-6 pt-10 pb-12 sm:px-12 sm:pt-12"
                    >
                      <Shapes />
                      <motion.div
                        variants={item}
                        className="space-y-1 text-sm text-neutral-500"
                      >
                        <p>{resume.email}</p>
                        <a
                          href={resume.site.href}
                          className="text-teal-600 underline"
                        >
                          {resume.site.label}
                        </a>
                        <div className="flex gap-1.5 pt-2 text-black">
                          <a
                            href={siteConfig.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                          >
                            <svg
                              className={iconCls}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM8.3 18.2H5.6V9.6h2.7v8.6zM7 8.4a1.6 1.6 0 1 1 0-3.100 1.600 1.600 0 0 1 0 3.100zm11.200 9.800h-2.700V14c0-1 0-2.300-1.400-2.300s-1.600 1.100-1.600 2.200v4.300h-2.700V9.600h2.600v1.200c.4-.7 1.200-1.400 2.500-1.400 2.700 0 3.200 1.800 3.200 4.100v4.700z" />
                            </svg>
                          </a>
                          <a
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                          >
                            <svg
                              className={iconCls}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 .5a11.500 11.500 0 0 0-3.600 22.400c.6.100.8-.3.8-.6v-2c-3.200.7-3.900-1.500-3.900-1.500-.5-1.300-1.300-1.700-1.300-1.700-1-.7.1-.7.1-.7 1.200.1 1.800 1.200 1.800 1.200 1 1.800 2.700 1.300 3.400 1 .1-.8.4-1.300.7-1.600-2.600-.3-5.300-1.300-5.300-5.700 0-1.300.5-2.300 1.200-3.100-.1-.3-.5-1.500.1-3.100 0 0 1-.3 3.200 1.200a11 11 0 0 1 5.800 0c2.200-1.500 3.200-1.200 3.200-1.200.6 1.600.2 2.800.1 3.100.7.800 1.200 1.800 1.200 3.100 0 4.400-2.700 5.400-5.300 5.700.4.400.8 1.100.8 2.200v3.200c0 .3.2.7.8.6A11.500 11.500 0 0 0 12 .5z" />
                            </svg>
                          </a>
                        </div>
                      </motion.div>

                      <motion.h2
                        variants={item}
                        className="mt-8 text-5xl leading-none font-extrabold tracking-tight text-neutral-950 sm:mt-12 sm:text-7xl"
                      >
                        {resume.name}
                      </motion.h2>

                      <div className="mt-8 grid gap-10 md:grid-cols-[5fr_6fr] md:gap-12">
                        <div className="space-y-10">
                          <motion.div variants={item}>
                            <Bar className="bg-neutral-500" />
                            <div className="space-y-4 text-sm leading-relaxed text-neutral-500">
                              {resume.summary.map((p) => (
                                <p key={p}>{p}</p>
                              ))}
                            </div>
                          </motion.div>

                          <div className="grid gap-8 sm:grid-cols-2">
                            <motion.div variants={item}>
                              <Bar />
                              <h3 className="font-semibold text-black">
                                Education
                              </h3>
                              <p className="mt-3 text-xs text-neutral-500">
                                {resume.education.dates}
                              </p>
                              <p className="font-bold text-neutral-500">
                                {resume.education.title}
                              </p>
                              <p className="text-sm text-black">
                                {resume.education.org}
                              </p>
                            </motion.div>
                            <motion.div variants={item}>
                              <Bar />
                              <h3 className="font-semibold text-black">
                                Skills
                              </h3>
                              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm marker:text-black">
                                {resume.skills.map((s) => (
                                  <li key={s}>{s}</li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>

                          <motion.div variants={item}>
                            <Bar />
                            <h3 className="font-semibold text-black">
                              References
                            </h3>
                            <p className="mt-3 text-sm">
                              Please contact me through{" "}
                              <a
                                href={siteConfig.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 underline"
                              >
                                LinkedIn
                              </a>{" "}
                              for references.
                            </p>
                          </motion.div>
                        </div>

                        <div className="space-y-10">
                          {resume.experience.map((e, i) => (
                            <motion.div variants={item} key={e.title + e.dates}>
                              {i === 0 && <Bar />}
                              <p className="text-xs text-neutral-700">
                                {e.dates}
                              </p>
                              <p className="mt-1 font-bold text-neutral-500">
                                {e.title}
                              </p>
                              <p className="font-bold text-black">{e.org}</p>
                              <p className="mt-2 text-sm leading-relaxed">
                                {e.about}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
