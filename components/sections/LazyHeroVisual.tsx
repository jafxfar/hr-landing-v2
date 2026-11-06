"use client";

import { useEffect, useState, type ComponentType } from "react";

/** Load product shot only on md+ after paint — keeps mobile LCP on headline. */
export function LazyHeroVisual() {
  const [Node, setNode] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let cancelled = false;
    const load = () => {
      void import("@/components/sections/HeroVisual").then((mod) => {
        if (!cancelled) setNode(() => mod.HeroVisual);
      });
    };

    const idleId = window.requestIdleCallback?.(load, { timeout: 2000 });
    const timeoutId =
      idleId === undefined ? window.setTimeout(load, 100) : undefined;

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!Node) return null;
  return <Node />;
}
