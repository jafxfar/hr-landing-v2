"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChartColumn,
  Check,
  ClipboardList,
  Clock,
  FileSpreadsheet,
  FolderX,
  MessageSquareX,
  Network,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import { pains } from "@/content/landing";
import { getModuleBySlug } from "@/content/modules";
import type { LucideIconName, Pain } from "@/content/types";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import {
  MOTION_DURATION,
  motionEase,
} from "@/components/motion/constants";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons: Partial<Record<LucideIconName, LucideIcon>> = {
  FileSpreadsheet,
  FolderX,
  MessageSquareX,
  ClipboardList,
  Clock,
  Network,
  UserSearch,
  ChartColumn,
};

function PainArrow() {
  const reduced = usePrefersReducedMotion();
  const size = 40;
  const stroke = 2;
  const r = (size - stroke) / 2 - 2;

  return (
    <div
      className="relative z-10 flex shrink-0 items-center justify-center self-center justify-self-center py-0 max-md:-my-3 md:-mx-3"
      aria-hidden
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-brand-600 shadow-sm">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="pointer-events-none absolute inset-0"
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--brand-500)"
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0.35 }}
            whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: MOTION_DURATION.base,
              ease: motionEase,
            }}
          />
        </svg>
        <motion.span
          className="relative flex"
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: MOTION_DURATION.fast,
            delay: reduced ? 0 : 0.15,
            ease: motionEase,
          }}
        >
          <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" aria-hidden />
        </motion.span>
      </div>
    </div>
  );
}

function PainCard({ item }: { item: Pain }) {
  const WasIcon = icons[item.wasIcon];
  const BecameIcon = icons[item.becameIcon];
  const mod = getModuleBySlug(item.moduleSlug);
  const showResult =
    !item.placeholder || process.env.NODE_ENV !== "production";
  const moduleLabel = mod
    ? `${pains.moduleLinkPrefix}${mod.title}${pains.moduleLinkSuffix}`
    : null;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm",
        "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200 motion-safe:ease-out",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-brand-500 motion-safe:hover:shadow-md",
        "motion-reduce:transition-none",
      )}
    >
      <div className="relative grid flex-1 grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-3 bg-pain-was p-5 md:p-6">
          {WasIcon ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/70 text-muted">
              <WasIcon className="h-5 w-5" aria-hidden />
            </span>
          ) : null}
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted">
            {pains.wasLabel}
          </p>
          <p className="text-[15px] leading-relaxed text-muted line-through decoration-muted/40">
            {item.was}
          </p>
        </div>

        <PainArrow />

        <div
          className={cn(
            "flex flex-col gap-3 bg-gradient-to-br from-white to-brand-50 p-5 md:p-6",
            "motion-safe:transition-colors motion-safe:duration-200",
            "group-hover:to-brand-100",
          )}
        >
          <div className="flex items-center gap-2">
            {BecameIcon ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                <BecameIcon className="h-5 w-5" aria-hidden />
              </span>
            ) : null}
            <Check className="h-5 w-5 text-accent-600" aria-hidden />
          </div>
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand-600">
            {pains.becameLabel}
          </p>
          <p className="text-[15px] font-semibold leading-relaxed text-ink">
            {item.became}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        {showResult ? (
          <p className="text-[13px] leading-snug text-muted">
            <span className="font-semibold text-ink">{pains.resultLabel}: </span>
            {item.result}
          </p>
        ) : (
          <span className="hidden sm:block" />
        )}
        {moduleLabel && mod ? (
          <Link
            href={`/modules/${mod.slug}`}
            className="shrink-0 text-sm font-semibold text-brand-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {moduleLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function PainSolution() {
  return (
    <Section id={pains.id} tone="surface" pattern="dots">
      <SectionHeading
        align="center"
        eyebrow={pains.eyebrow}
        title={pains.title}
        description={pains.text}
      />

      <Stagger className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.08}>
        {pains.items.map((item) => (
          <StaggerItem key={item.was} className="h-full">
            <PainCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-lg border border-line bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-body font-medium text-ink">{pains.demoPrompt}</p>
        <TrackedButton
          event="demo_click"
          href={pains.demoHref}
          variant="primary"
          size="md"
        >
          {pains.demoCta}
        </TrackedButton>
      </div>
    </Section>
  );
}
