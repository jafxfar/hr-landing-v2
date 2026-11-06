"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/landing";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { cn } from "@/lib/cn";

export function FloatingDemoCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("main > section");
    const demo = document.getElementById("demo");
    if (!hero) return;

    let heroGone = false;
    let demoVisible = false;

    const sync = () => setVisible(heroGone && !demoVisible);

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        heroGone = !entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    heroObs.observe(hero);

    let demoObs: IntersectionObserver | null = null;
    if (demo) {
      demoObs = new IntersectionObserver(
        ([entry]) => {
          demoVisible = entry.isIntersecting;
          sync();
        },
        { threshold: 0.15 },
      );
      demoObs.observe(demo);
    }

    return () => {
      heroObs.disconnect();
      demoObs?.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 md:hidden",
        "motion-safe:transition motion-safe:duration-300 motion-safe:ease-out",
        "motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0",
      )}
    >
      <TrackedButton
        event="demo_click"
        href={nav.cta.href}
        variant="primary"
        size="lg"
        className="w-full shadow-lg"
      >
        {nav.cta.label}
      </TrackedButton>
    </div>
  );
}
