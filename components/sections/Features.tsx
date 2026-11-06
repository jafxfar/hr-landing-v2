"use client";

import {
  ChartColumn,
  Code2,
  FileStack,
  Lock,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/content/landing";
import { omitIfPlaceholder } from "@/content/placeholders";
import type { LucideIconName } from "@/content/types";
import { CountUp } from "@/components/motion/CountUp";
import { Spotlight } from "@/components/motion/Spotlight";
import { FeatureVisual } from "@/components/sections/feature-visuals/FeatureVisual";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons: Partial<Record<LucideIconName, LucideIcon>> = {
  Shield,
  Lock,
  FileStack,
  Code2,
  ChartColumn,
  Smartphone,
};

export function Features() {
  if (!features.items.length) return null;

  return (
    <Section id={features.id} tone="accent-soft" pattern="diagonal">
      <SectionHeading
        align="center"
        eyebrow={features.eyebrow}
        title={features.title}
        description={features.text}
      />

      <ul className="mt-10 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        {features.items.map((item) => {
          const Icon = icons[item.icon];
          const badge = item.badge ? omitIfPlaceholder(item.badge) : null;

          return (
            <li key={item.title} className="h-full">
              <Spotlight
                className={cn(
                  "group flex h-full flex-col p-5",
                  "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200 motion-safe:ease-out",
                  "motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-brand-500 motion-safe:hover:shadow-md",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm">
                    {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
                  </span>
                  {badge ? (
                    <Badge tone="neutral" className="shrink-0 px-2.5 py-0.5">
                      {badge.label || features.comingSoonLabel}
                    </Badge>
                  ) : null}
                </div>
                <h3 className="mt-4 text-[1.125rem] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {item.text}
                </p>
                <FeatureVisual id={item.visual} className="mt-5" />
              </Spotlight>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[15px] text-muted">
        {features.facts.map((fact, index) => (
          <span key={fact.label} className="inline-flex items-baseline gap-1.5">
            {index > 0 ? (
              <span className="mr-1.5 text-line" aria-hidden>
                ·
              </span>
            ) : null}
            <CountUp
              value={fact.value}
              className="font-semibold tabular-nums text-ink"
            />
            <span>{fact.label}</span>
          </span>
        ))}
      </div>
    </Section>
  );
}
