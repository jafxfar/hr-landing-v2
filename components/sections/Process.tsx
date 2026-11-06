"use client";

import { motion } from "motion/react";
import { steps } from "@/content/landing";
import { MOTION_DURATION, motionEase } from "@/components/motion/constants";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Process() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id={steps.id} tone="surface">
      <GlowBlob color="accent" position="top-right" opacity={0.22} blur={120} />
      <SectionHeading
        align="center"
        eyebrow={steps.eyebrow}
        title={steps.title}
        description={steps.text}
      />

      <div className="relative mt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[12.5%] top-5 hidden h-0 w-[75%] border-t border-dashed border-brand-500/35 md:block"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 left-[0.85rem] top-4 w-0 border-l border-dashed border-brand-500/35 md:hidden"
        />

        <ol className="relative grid list-none gap-10 md:grid-cols-4 md:gap-6">
          {steps.items.map((item, index) => (
            <motion.li
              key={item.title}
              className={cn(
                "relative rounded-lg pl-10 md:p-3 md:pl-0",
                index === 0 && "bg-surface-card shadow-sm md:-translate-y-1",
              )}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: MOTION_DURATION.base,
                delay: reduced ? 0 : index * 0.08,
                ease: motionEase,
              }}
            >
              <span
                className={cn(
                  "relative z-10 block font-semibold tabular-nums tracking-tight",
                  "text-4xl leading-none md:text-5xl",
                  index === 0 ? "text-brand-600" : "text-brand-600/70",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-h3 font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {item.text}
              </p>
              {item.timing ? (
                <p className="mt-3 text-small font-medium text-brand-600">
                  {item.timing}
                </p>
              ) : null}
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
