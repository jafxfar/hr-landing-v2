"use client";

import dynamic from "next/dynamic";
import { SectionDivider } from "@/components/ui/SectionDivider";

const RoleSwitcher = dynamic(
  () => import("@/components/sections/RoleSwitcher").then((m) => m.RoleSwitcher),
  { ssr: false },
);
const Modules = dynamic(
  () => import("@/components/sections/Modules").then((m) => m.Modules),
  { ssr: false },
);
const Interfaces = dynamic(
  () => import("@/components/sections/Interfaces").then((m) => m.Interfaces),
  { ssr: false },
);
const Features = dynamic(
  () => import("@/components/sections/Features").then((m) => m.Features),
  { ssr: false },
);
const Comparison = dynamic(
  () => import("@/components/sections/Comparison").then((m) => m.Comparison),
  { ssr: false },
);
const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => m.Process),
  { ssr: false },
);
const Cases = dynamic(
  () => import("@/components/sections/Cases").then((m) => m.Cases),
  { ssr: false },
);
const Pricing = dynamic(
  () => import("@/components/sections/Pricing").then((m) => m.Pricing),
  { ssr: false },
);
const Faq = dynamic(
  () => import("@/components/sections/Faq").then((m) => m.Faq),
  { ssr: false },
);
const DemoCta = dynamic(
  () => import("@/components/sections/DemoCta").then((m) => m.DemoCta),
  { ssr: false },
);

/** Client-only below-fold — keeps initial HTML small for mobile LCP. */
export function HomeBelowFold() {
  return (
    <>
      <RoleSwitcher />
      <Modules />
      <SectionDivider from="white" to="dark" variant="wave" />
      <Interfaces />
      <SectionDivider from="dark" to="accent-soft" variant="curve" />
      <Features />
      <Comparison />
      <Process />
      <Cases />
      <Pricing />
      <SectionDivider from="gradient-soft" to="white" variant="slant" />
      <Faq />
      <SectionDivider from="white" to="brand" variant="wave" />
      <DemoCta />
    </>
  );
}
