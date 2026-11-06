"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./reducedMotion";

type FloatProps = {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
};

export function Float({
  children,
  className = "",
  amplitude = 12,
  duration = 5,
  delay = 0,
  rotate = 0,
}: FloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, margin: "80px 0px" });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        inView
          ? {
              y: [0, -amplitude, 0],
              rotate: rotate ? [0, rotate, 0, -rotate * 0.6, 0] : 0,
            }
          : { y: 0, rotate: 0 }
      }
      transition={{
        duration,
        delay,
        repeat: inView ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
