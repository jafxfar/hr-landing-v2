"use client";

import type { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedButtonProps = {
  event: AnalyticsEvent;
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function TrackedButton({
  event,
  href,
  onClick,
  children,
  variant,
  size,
  className,
  disabled,
}: TrackedButtonProps) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
}
