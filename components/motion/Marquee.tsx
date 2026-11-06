"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./reducedMotion";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop */
  duration?: number;
  gap?: string;
};

export function Marquee({
  children,
  className,
  duration = 28,
  gap = "2rem",
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, margin: "80px 0px" });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div
        className={cn("flex flex-wrap items-center justify-center", className)}
        style={{ gap }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("group relative overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          gap,
          animationPlayState: inView ? undefined : "paused",
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div
          className="flex shrink-0 items-center"
          style={{ gap }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
