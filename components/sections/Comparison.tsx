"use client";

import { motion } from "motion/react";
import { comparison } from "@/content/landing";
import { AnimatedCheck } from "@/components/motion/AnimatedCheck";
import { MOTION_DURATION, motionEase } from "@/components/motion/constants";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Comparison() {
  const rows = comparison.rows;
  const reduced = usePrefersReducedMotion();
  if (!rows.length) return null;

  return (
    <Section id={comparison.id} tone="white">
      <SectionHeading
        align="center"
        eyebrow={comparison.eyebrow}
        title={comparison.title}
        description={comparison.text}
      />

      <div className="mt-10 hidden md:block">
        <div className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="px-5 py-4 text-small font-semibold text-muted"
                >
                  {comparison.criterionTitle}
                </th>
                <th
                  scope="col"
                  className="px-5 py-4 text-small font-semibold text-ink"
                >
                  {comparison.leftTitle}
                </th>
                <th
                  scope="col"
                  className={cn(
                    "relative -translate-y-1 bg-brand-50 px-5 py-4 text-small font-semibold text-brand-700",
                    "shadow-md ring-1 ring-brand-500/20",
                  )}
                >
                  {comparison.rightTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <motion.tr
                  key={row.criterion}
                  className="border-b border-line last:border-b-0"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: MOTION_DURATION.base,
                    delay: index * 0.08,
                    ease: motionEase,
                  }}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 text-[15px] font-semibold text-ink"
                  >
                    {row.criterion}
                  </th>
                  <td className="px-5 py-4 text-[15px] text-muted">{row.left}</td>
                  <td
                    className={cn(
                      "relative -translate-y-0.5 bg-brand-50 px-5 py-4 text-[15px] font-medium text-ink",
                      "shadow-sm ring-1 ring-inset ring-brand-500/15",
                    )}
                  >
                    <span className="flex items-start gap-2">
                      <AnimatedCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                      <span>{row.right}</span>
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Stagger className="mt-10 grid list-none gap-4 md:hidden">
        {rows.map((row) => (
          <StaggerItem key={row.criterion}>
            <article className="rounded-lg border border-line bg-surface-card p-5 shadow-sm">
              <h3 className="text-[15px] font-semibold text-ink">
                {row.criterion}
              </h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-small font-semibold text-muted">
                    {comparison.leftTitle}
                  </p>
                  <p className="mt-1 text-[15px] text-muted">{row.left}</p>
                </div>
                <div className="-translate-y-0.5 rounded-md bg-brand-50 p-3 shadow-md ring-1 ring-brand-500/20">
                  <p className="text-small font-semibold text-brand-700">
                    {comparison.rightTitle}
                  </p>
                  <p className="mt-1.5 flex items-start gap-2 text-[15px] font-medium text-ink">
                    <AnimatedCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    <span>{row.right}</span>
                  </p>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
