"use client";

import { useEffect, useState, type ComponentType } from "react";

export function LazyHomeChromeExtras() {
  const [Node, setNode] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      void import("@/components/chrome/HomeChromeExtras").then((mod) => {
        if (!cancelled) setNode(() => mod.HomeChromeExtras);
      });
    };

    const idleId = window.requestIdleCallback?.(load, { timeout: 3000 });
    const timeoutId =
      idleId === undefined ? window.setTimeout(load, 200) : undefined;

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!Node) return null;
  return <Node />;
}
