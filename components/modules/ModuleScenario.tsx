"use client";

import { motion } from "motion/react";
import { modulePageCopy } from "@/content/landing";
import type { ModuleScenario as ModuleScenarioData } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

type ModuleScenarioProps = {
  scenario: ModuleScenarioData;
};

export function ModuleScenario({ scenario }: ModuleScenarioProps) {
  const reduced = usePrefersReducedMotion();
  const title = scenario.title ?? modulePageCopy.scenarioTitleFallback;

  return (
    <Section id="scenario" tone="dark" pattern="grid">
      <GlowBlob color="brand" position="top-right" opacity={0.25} blur={100} />
      <Reveal>
        <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-100">
          {modulePageCopy.scenarioEyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
          {title}
        </h2>
      </Reveal>

      <div className="relative mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[0.85rem] top-4 bottom-4 w-0.5 overflow-hidden bg-white/15 md:left-[12.5%] md:top-5 md:h-0.5 md:w-[75%] md:bottom-auto"
        >
          {reduced ? (
            <div className="h-full w-full origin-top scale-y-100 bg-brand-100 md:origin-left md:scale-x-100 md:scale-y-100" />
          ) : (
            <>
              <motion.div
                className="hidden h-full origin-left bg-brand-100 md:block"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.div
                className="h-full w-full origin-top bg-brand-100 md:hidden"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </>
          )}
        </div>

        <ol className="relative grid list-none gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {scenario.steps.map((step, index) => (
            <Reveal key={step} delay={index * 0.06}>
              <li
                className={cn(
                  "relative rounded-lg pl-10 md:pl-0 md:pt-2",
                  index === 0 && "md:-translate-y-0.5",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 block font-semibold tabular-nums tracking-tight",
                    "text-3xl leading-none text-brand-100 md:text-4xl",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {step}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
