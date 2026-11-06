"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";

export function useMockActive(amount = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  // once: reveal and freeze — no perpetual observation / intervals off-screen
  const inView = useInView(ref, { amount, once: true });
  const reduced = usePrefersReducedMotion();
  const active = reduced || inView;

  return { ref, active, reduced, inView };
}
