"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMockActive } from "./useMockActive";

type MockShellProps = {
  children: (state: { active: boolean; reduced: boolean }) => ReactNode;
  className?: string;
  aspectClassName?: string;
};

export function MockShell({
  children,
  className,
  aspectClassName = "aspect-[16/10]",
}: MockShellProps) {
  const { ref, active, reduced } = useMockActive();

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm",
        aspectClassName,
        className,
      )}
    >
      {children({ active, reduced })}
    </div>
  );
}
