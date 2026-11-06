"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GradientBorderProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Static brand gradient frame (no infinite spin — compositor-friendly). */
export function GradientBorder({
  children,
  className,
  contentClassName,
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-gradient-to-br from-brand-500 via-accent-500 to-brand-600 p-px",
        className,
      )}
    >
      <div
        className={cn(
          "relative z-[1] rounded-[calc(var(--radius-lg)-1px)] bg-surface-card p-6",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
