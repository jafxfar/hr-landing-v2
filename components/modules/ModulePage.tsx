"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  getModuleBySlug,
  getNextModule,
  visibleModulePoints,
  type ProductModule,
} from "@/content/modules";
import { modulePageCopy } from "@/content/landing";
import { moduleMockById } from "@/components/mocks";
import { ModuleFeatures } from "@/components/modules/ModuleFeatures";
import { ModuleScenario } from "@/components/modules/ModuleScenario";
import { ModuleStickyNav } from "@/components/modules/ModuleStickyNav";
import { DemoCta } from "@/components/sections/DemoCta";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Accordion } from "@/components/ui/Accordion";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { cn } from "@/lib/cn";

const advantageIcons: LucideIcon[] = [Sparkles, Shield, Zap, Check, ArrowRight];

type ModulePageProps = {
  module: ProductModule;
};

export function ModulePage({ module }: ModulePageProps) {
  const audience = visibleModulePoints(module.audience);
  const problems = visibleModulePoints(module.problems);
  const advantages = visibleModulePoints(module.advantages);
  const whyConnect = visibleModulePoints(module.whyConnect);
  const faq = visibleModulePoints(module.faq);
  const floatCards = advantages.slice(0, 3);
  const mockKey = module.visuals.mocks[0];
  const Mock = mockKey ? moduleMockById[mockKey] : undefined;
  const next = getNextModule(module.slug);
  const featureGroupsVisible = module.featureGroups.some(
    (g) => visibleModulePoints(g.items).length > 0,
  );

  const sectionIds = [
    "purpose",
    problems.length ? "problems" : null,
    advantages.length ? "advantages" : null,
    whyConnect.length ? "why" : null,
    featureGroupsVisible ? "features" : null,
    module.scenario.steps.length ? "scenario" : null,
    module.integrations.length ? "integrations" : null,
    faq.length ? "faq" : null,
    "demo",
  ].filter((id): id is string => Boolean(id));

  return (
    <article>
      <ModuleStickyNav sectionIds={sectionIds} />

      {/* Hero */}
      <Section id="hero" tone="white" pattern="glow-top" className="pt-10 md:pt-14">
        <GlowBlob color="brand" position="top-left" opacity={0.18} blur={120} />
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
                {module.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold tracking-tight text-ink">
                {module.title}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-lg font-medium text-brand-700">
                {module.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
                {module.purpose}
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-3">
              <Link href={modulePageCopy.demoHref} className="btn-accent">
                {modulePageCopy.demoCta}
              </Link>
              <Link href={modulePageCopy.allModulesHref} className="btn-soft">
                {modulePageCopy.allModulesCta}
              </Link>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] pb-16 lg:pb-10">
            {Mock ? (
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-lg border border-line bg-surface-card p-3 shadow-lg">
                  <Mock />
                </div>
              </Reveal>
            ) : null}

            {floatCards.map((card, index) => (
              <Float
                key={card.title}
                className={cn(
                  "absolute z-10 hidden w-[min(12.5rem,42%)] rounded-md border border-line bg-white/95 p-3 shadow-md backdrop-blur-sm md:block",
                  index === 0 && "-left-2 top-6 lg:-left-6",
                  index === 1 && "-right-1 bottom-20 lg:-right-4",
                  index === 2 && "bottom-2 left-1/4 lg:left-8",
                )}
                amplitude={8 + index * 2}
                duration={4.5 + index * 0.4}
                delay={index * 0.2}
              >
                <p className="text-[11px] font-semibold leading-snug text-ink">
                  {card.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-muted">
                  {card.text}
                </p>
              </Float>
            ))}
          </div>
        </div>
      </Section>

      {/* Purpose + audience */}
      <Section id="purpose" tone="surface" pattern="dots">
        <Reveal>
          <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
            {modulePageCopy.purposeEyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
            {modulePageCopy.purposeTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-3xl text-[1.05rem] leading-relaxed text-muted">
            {module.purpose}
          </p>
        </Reveal>
        {audience.length > 0 ? (
          <>
            <Reveal delay={0.1}>
              <h3 className="mt-12 text-h3 font-semibold tracking-tight text-ink">
                {modulePageCopy.rolesTitle}
              </h3>
            </Reveal>
            <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {audience.map((person) => (
                <StaggerItem key={person.role}>
                  <article className="h-full rounded-lg border border-line bg-surface-card p-6 shadow-sm">
                    <h4 className="font-semibold text-ink">{person.role}</h4>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {person.benefit}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        ) : null}
      </Section>

      {/* Problems was → became */}
      {problems.length > 0 ? (
        <Section id="problems" tone="white">
          <Reveal>
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
              {modulePageCopy.problemEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
              {modulePageCopy.problemTitle}
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.07}>
            {problems.map((item) => (
              <StaggerItem key={item.was}>
                <article className="h-full overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm">
                  <div className="border-b border-line bg-surface px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      {modulePageCopy.wasLabel}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                      {item.was}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-600">
                      {modulePageCopy.becameLabel}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink">
                      {item.became}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      {/* Advantages bento */}
      {advantages.length > 0 ? (
        <Section id="advantages" tone="brand-soft">
          <Reveal>
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
              {modulePageCopy.advantagesEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
              {modulePageCopy.advantagesTitle}
            </h2>
          </Reveal>
          <Stagger
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {advantages.map((item, index) => {
              const Icon = advantageIcons[index % advantageIcons.length];
              const wide = index === 0 || index === 3;
              return (
                <StaggerItem
                  key={item.title}
                  className={cn(wide && "sm:col-span-2 lg:col-span-2")}
                >
                  <article className="flex h-full flex-col rounded-lg border border-brand-100 bg-white p-6 shadow-sm">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Section>
      ) : null}

      {/* Why connect */}
      {whyConnect.length > 0 ? (
        <Section id="why" tone="surface">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Reveal>
                <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
                  {modulePageCopy.whyEyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
                  {modulePageCopy.whyTitle}
                </h2>
              </Reveal>
              <ol className="mt-10 space-y-8">
                {whyConnect.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <li className="flex gap-5">
                      <span className="text-4xl font-semibold tabular-nums leading-none text-brand-600 md:text-5xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-muted">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
            <Reveal delay={0.1}>
              <aside className="rounded-lg border border-line bg-surface-card p-6 shadow-sm lg:sticky lg:top-[calc(var(--header-offset,4rem)+3.5rem)]">
                <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
                  {modulePageCopy.whyResultTitle}
                </p>
                <ul className="mt-5 space-y-4">
                  {whyConnect.map((item) => (
                    <li key={`result-${item.title}`} className="flex gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                        aria-hidden
                      />
                      <span className="text-[14px] leading-relaxed text-ink">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {featureGroupsVisible ? <ModuleFeatures module={module} /> : null}

      {module.scenario.steps.length > 0 ? (
        <>
          <SectionDivider from="white" to="dark" variant="wave" />
          <ModuleScenario scenario={module.scenario} />
        </>
      ) : null}

      {/* Integrations */}
      {module.integrations.length > 0 ? (
        <Section id="integrations" tone="accent-soft">
          <Reveal>
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
              {modulePageCopy.integrationsEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
              {modulePageCopy.integrationsTitle}
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {module.integrations.map((item) => {
              const linked = getModuleBySlug(item.moduleSlug);
              return (
                <StaggerItem key={item.moduleSlug}>
                  <Link
                    href={`/modules/${item.moduleSlug}`}
                    className={cn(
                      "flex h-full flex-col rounded-lg border border-line bg-surface-card p-6 shadow-sm",
                      "transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    )}
                  >
                    <p className="font-semibold text-ink">
                      {linked?.title ?? item.moduleSlug}
                    </p>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                    <span className="mt-4 text-small font-semibold text-brand-600">
                      {modulePageCopy.relatedOpen}
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Section>
      ) : null}

      {/* FAQ */}
      {faq.length > 0 ? (
        <Section id="faq" tone="surface">
          <Reveal>
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
              {modulePageCopy.faqEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
              {modulePageCopy.faqTitlePrefix}
              {module.shortTitle}
              {modulePageCopy.faqTitleSuffix}
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-[800px]">
            <Accordion
              items={faq.map((item) => ({
                title: item.q,
                content: (
                  <p className="text-[15px] leading-relaxed text-muted">{item.a}</p>
                ),
              }))}
              defaultOpen={0}
            />
          </div>
        </Section>
      ) : null}

      {/* Demo CTA + next module */}
      <SectionDivider from="surface" to="brand" variant="slant" />
      <div id="demo-wrap" className="scroll-mt-28">
        <DemoCta />
      </div>

      {next ? (
        <div className="border-t border-line bg-white py-8">
          <div className="mx-auto flex max-w-[1100px] justify-end px-4 sm:px-6 lg:px-8">
            <Link
              href={`/modules/${next.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {modulePageCopy.nextModuleLabel.replace("→", "").trim()}{" "}
              {next.shortTitle}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
