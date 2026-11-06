"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { motionEase } from "./constants";
import { usePrefersReducedMotion } from "./reducedMotion";
import { useIsClient } from "./useIsClient";

type Direction = "up" | "down" | "left" | "right" | "none";

type AppearProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /** @deprecated Ignored — blur is not used (compositor-only motion) */
  blur?: boolean;
  scale?: boolean;
};

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 56 },
  down: { y: -56 },
  left: { x: 56 },
  right: { x: -56 },
  none: {},
};

export function Appear({
  children,
  direction = "up",
  delay = 0,
  duration = 0.95,
  className = "",
  blur: _ignoredBlur = false,
  scale = false,
  ...props
}: AppearProps) {
  void _ignoredBlur;
  const mounted = useIsClient();
  const reduced = usePrefersReducedMotion();
  const offset = offsets[direction];

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: scale ? 0.96 : 1,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{
        duration,
        delay,
        ease: motionEase,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
