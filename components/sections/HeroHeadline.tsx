"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { hero } from "@/content/landing";
import { MOTION_DURATION, motionEase } from "@/components/motion/constants";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { cn } from "@/lib/cn";

const displayClass = cn(
  "font-[family-name:var(--font-display-face),sans-serif] font-bold italic uppercase",
  "tracking-tight leading-[0.95]",
  "text-[clamp(2.25rem,8vw,3.75rem)]",
  "hero-display-scan",
);

export function HeroHeadline() {
  const reduced = usePrefersReducedMotion();
  const phrases = hero.rotating;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || phrases.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, hero.rotateMs);
    return () => window.clearInterval(id);
  }, [phrases.length, reduced]);

  const current = phrases[index] ?? phrases[0] ?? "";

  return (
    <h1 className={cn(displayClass, "text-ink")}>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {hero.headlinePrefix} {current} {hero.headlineSuffix}
      </span>
      <span aria-hidden className="block">
        {hero.headlinePrefix}
      </span>
      <span
        aria-hidden
        className="relative mt-1 block min-h-[2.1em] text-brand-600"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="absolute inset-x-0 top-0 block"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{
              duration: MOTION_DURATION.base,
              ease: motionEase,
            }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden className="mt-1 block">
        {hero.headlineSuffix}
      </span>
    </h1>
  );
}
