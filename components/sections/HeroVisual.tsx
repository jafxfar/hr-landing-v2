"use client";

import { useEffect, useState } from "react";
import { hero } from "@/content/landing";
import { productScreens } from "@/content/productScreens";
import { HeroPhone } from "@/components/sections/HeroPhone";

const adminShot = productScreens.adminStats;

/**
 * Product shot only from md up — on mobile Lighthouse LCP is the headline,
 * not a late screenshot decode.
 */
export function HeroVisual() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setShow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!show) return null;

  return (
    <div className="relative mx-auto w-full max-w-[560px] pb-12 lg:mx-0 lg:max-w-none lg:pb-4">
      <div className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-lg">
        <div className="flex h-9 items-center gap-1.5 border-b border-line bg-surface px-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-window-dot-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-window-dot-yellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-window-dot-green" />
          <span className="ml-3 truncate text-[11px] font-medium text-muted">
            {hero.desktopCaption}
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={adminShot.src}
            alt={adminShot.alt}
            width={720}
            height={390}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <HeroPhone />
    </div>
  );
}
