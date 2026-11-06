"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { a11y } from "@/content/landing";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={a11y.backToTop}
      className={cn(
        "fixed z-40 flex h-11 w-11 items-center justify-center rounded-full",
        "border border-line bg-surface-card text-ink shadow-md",
        "motion-safe:transition motion-safe:duration-300 motion-safe:ease-out",
        "motion-reduce:transition-none",
        "hover:border-brand-100 hover:bg-brand-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        "bottom-20 right-4 md:bottom-6 md:right-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0 motion-reduce:translate-y-0",
      )}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: reduced ? "auto" : "smooth",
        });
      }}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
