"use client";

import { useEffect, useState } from "react";

export function HeroName({ name }: { name: string }) {
  const [ready, setReady] = useState(false);

  // Start the animation only once the web font has loaded, otherwise the
  // text re-measures mid-animation on a cold load.
  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (!cancelled) requestAnimationFrame(() => setReady(true));
    };
    const timeout = setTimeout(start, 1500);
    void document.fonts.ready.then(() => {
      clearTimeout(timeout);
      start();
    });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
      <span className="sr-only">{name}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 760 100"
        className={`hero-name${ready ? " is-ready" : ""} h-auto w-full max-w-[44rem] overflow-visible`}
      >
        <defs>
          <linearGradient id="hero-name-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <text
          x="2"
          y="80"
          fontSize="86"
          fontWeight="800"
          textLength="750"
          lengthAdjust="spacingAndGlyphs"
          fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
          stroke="url(#hero-name-gradient)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          {name}
        </text>
      </svg>
    </h1>
  );
}
