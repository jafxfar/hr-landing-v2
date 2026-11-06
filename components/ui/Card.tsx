import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-line bg-surface-card p-6 shadow-sm",
        "transition duration-300 ease-out",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md",
        "hover:border-[var(--line-hover)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
