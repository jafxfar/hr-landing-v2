import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "brand" | "accent";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClass: Record<BadgeTone, string> = {
  neutral: "bg-surface text-muted border-line",
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  accent: "bg-accent-500/10 text-accent-600 border-accent-500/20",
};

export function Badge({ children, tone = "brand", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-small font-semibold",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
