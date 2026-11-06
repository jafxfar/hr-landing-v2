"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Defer below-fold chunk until idle so LCP/main-thread aren't competing
 * with Modules/Interfaces/Pricing JS on first paint.
 */
export function LazyHomeBelowFold() {
  const [Node, setNode] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      void import("@/components/sections/HomeBelowFold").then((mod) => {
        if (!cancelled) setNode(() => mod.HomeBelowFold);
      });
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(load, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(load, 150);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!Node) return null;
  return <Node />;
}
