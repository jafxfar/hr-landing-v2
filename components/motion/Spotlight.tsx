"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./reducedMotion";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduced || !canHover || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    },
    [canHover, reduced],
  );

  const showSpotlight = !reduced && canHover && active;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-surface-card p-6 shadow-sm",
        className,
      )}
      style={
        showSpotlight
          ? {
              backgroundImage: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, color-mix(in srgb, var(--brand-500) 16%, transparent), transparent 55%)`,
            }
          : undefined
      }
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
