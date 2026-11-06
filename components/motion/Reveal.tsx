"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { MOTION_DURATION, REVEAL_OFFSET, motionEase } from "./constants";
import { usePrefersReducedMotion } from "./reducedMotion";
import { useIsClient } from "./useIsClient";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
};

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: REVEAL_OFFSET },
  down: { y: -REVEAL_OFFSET },
  left: { x: REVEAL_OFFSET },
  right: { x: -REVEAL_OFFSET },
  none: {},
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  ...props
}: RevealProps) {
  const mounted = useIsClient();
  const reduced = usePrefersReducedMotion();
  const offset = offsets[direction];

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: MOTION_DURATION.base,
        delay,
        ease: motionEase,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
