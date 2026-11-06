"use client";

import { motion, useScroll, useSpring } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./reducedMotion";

type ScrollProgressProps = {
  className?: string;
  /** Tailwind top offset; default under sticky header (h-16) */
  topClassName?: string;
  style?: CSSProperties;
};

export function ScrollProgress({
  className,
  topClassName = "top-16",
  style,
}: ScrollProgressProps) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 right-0 z-[55] h-0.5 origin-left bg-brand-600",
        topClassName,
        className,
      )}
      style={{ scaleX, ...style }}
    />
  );
}
