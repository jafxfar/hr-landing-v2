"use client";

import { Check } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { MOTION_DURATION, motionEase } from "./constants";
import { usePrefersReducedMotion } from "./reducedMotion";

type AnimatedCheckProps = {
  className?: string;
};

export function AnimatedCheck({ className }: AnimatedCheckProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <Check
        aria-hidden
        className={cn("h-5 w-5 text-brand-600", className)}
        strokeWidth={2.25}
      />
    );
  }

  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={cn("inline-flex", className)}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: MOTION_DURATION.base, ease: motionEase }}
    >
      <Check className="h-full w-full text-brand-600" strokeWidth={2.25} />
    </motion.span>
  );
}
