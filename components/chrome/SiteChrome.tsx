"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Header } from "@/components/sections/Header";

const ScrollProgress = dynamic(
  () =>
    import("@/components/motion/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false },
);

export function SiteChrome() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [offsetPx, setOffsetPx] = useState(64);

  const measure = useCallback(() => {
    const h = stackRef.current?.getBoundingClientRect().height ?? 64;
    const rounded = Math.round(h);
    setOffsetPx(rounded);
    document.documentElement.style.setProperty("--header-offset", `${rounded}px`);
  }, []);

  useEffect(() => {
    measure();
    const el = stackRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true, once: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [measure]);

  return (
    <>
      <div ref={stackRef} className="sticky top-0 z-50">
        <AnnouncementBar onVisibilityChange={() => measure()} />
        <Header />
      </div>
      <ScrollProgress topClassName="" style={{ top: offsetPx }} />
    </>
  );
}
