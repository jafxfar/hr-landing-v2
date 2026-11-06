"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  MOTION_DURATION,
  REVEAL_OFFSET,
  STAGGER_STEP,
  motionEase,
} from "./constants";
import { usePrefersReducedMotion } from "./reducedMotion";
import { useIsClient } from "./useIsClient";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function Stagger({
  children,
  className = "",
  delay = 0,
  stagger = STAGGER_STEP,
}: StaggerProps) {
  const mounted = useIsClient();
  const reduced = usePrefersReducedMotion();

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: REVEAL_OFFSET,
        },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: MOTION_DURATION.base, ease: motionEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
