"use client";

import dynamic from "next/dynamic";

const FloatingDemoCta = dynamic(
  () =>
    import("@/components/chrome/FloatingDemoCta").then((m) => m.FloatingDemoCta),
  { ssr: false },
);
const BackToTop = dynamic(
  () => import("@/components/chrome/BackToTop").then((m) => m.BackToTop),
  { ssr: false },
);

export function HomeChromeExtras() {
  return (
    <>
      <FloatingDemoCta />
      <BackToTop />
    </>
  );
}
