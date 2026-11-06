import Link from "next/link";
import {
  Check,
  Clock,
  FileStack,
  GraduationCap,
  HeartHandshake,
  Network,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import { modules } from "@/content/landing";
import {
  getModuleCardFeatures,
  getModulePrimaryWhy,
  modulesCatalog,
} from "@/content/modules";
import type { LucideIconName } from "@/content/types";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { moduleMockById } from "@/components/mocks";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons: Partial<Record<LucideIconName, LucideIcon>> = {
  Network,
  UserSearch,
  Clock,
  HeartHandshake,
  GraduationCap,
  FileStack,
};

function ModulesSchema() {
  const names = modulesCatalog.map((item) => item.title);

  return (
    <div
      aria-hidden
      className="relative mx-auto mt-10 hidden max-w-3xl md:block"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-brand-100"
        viewBox="0 0 600 220"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <line x1="120" y1="40" x2="300" y2="110" stroke="currentColor" strokeWidth="1" />
        <line x1="300" y1="28" x2="300" y2="110" stroke="currentColor" strokeWidth="1" />
        <line x1="480" y1="40" x2="300" y2="110" stroke="currentColor" strokeWidth="1" />
        <line x1="120" y1="180" x2="300" y2="110" stroke="currentColor" strokeWidth="1" />
        <line x1="300" y1="192" x2="300" y2="110" stroke="currentColor" strokeWidth="1" />
        <line x1="480" y1="180" x2="300" y2="110" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="110" r="36" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="300"
          cy="110"
          r="24"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.55"
        />
      </svg>

      <div className="relative grid grid-cols-3 gap-3 lg:gap-4">
        <div className="flex items-end justify-end pb-2">
          <span className="rounded-md border border-line bg-surface-card px-3 py-2 text-center text-small font-medium text-ink shadow-sm">
            {names[0]}
          </span>
        </div>
        <div className="flex items-start justify-center">
          <span className="rounded-md border border-line bg-surface-card px-3 py-2 text-center text-small font-medium text-ink shadow-sm">
            {names[1]}
          </span>
        </div>
        <div className="flex items-end justify-start pb-2">
          <span className="rounded-md border border-line bg-surface-card px-3 py-2 text-center text-small font-medium text-ink shadow-sm">
            {names[2]}
          </span>
        </div>

        <div className="col-span-3 flex items-center justify-center py-2">
          <div className="relative z-10 flex min-h-[4.5rem] w-full max-w-sm items-center justify-center rounded-lg border border-brand-100 bg-white px-4 py-3 text-center text-small font-semibold text-brand-700 shadow-md">
            {modules.schemaCenter}
          </div>
        </div>

        <div className="flex items-start justify-end pt-2">
          <span className="rounded-md border border-line bg-surface-card px-3 py-2 text-center text-small font-medium text-ink shadow-sm">
            {names[3]}
          </span>
        </div>
        <div className="flex items-end justify-center">
          <span className="rounded-md border border-line bg-surface-card px-3 py-2 text-center text-small font-medium text-ink shadow-sm">
            {names[4]}
          </span>
        </div>
        <div className="flex items-start justify-start pt-2">
          <span className="rounded-md border border-line bg-surface-card px-3 py-2 text-center text-small font-medium text-ink shadow-sm">
            {names[5]}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Modules() {
  return (
    <Section id={modules.id} tone="white" pattern={["grid-mask", "glow-top"]}>
      <SectionHeading
        className="relative"
        eyebrow={modules.eyebrow}
        title={modules.title}
        description={modules.text}
      />

      <ModulesSchema />

      <Stagger className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modulesCatalog.map((item) => {
          const Icon = icons[item.icon];
          const Mock = moduleMockById[item.slug];
          const features = getModuleCardFeatures(item);
          const why = getModulePrimaryWhy(item);
          const href = `/modules/${item.slug}`;

          return (
            <StaggerItem key={item.slug} className="h-full">
              <article
                id={`module-${item.slug}`}
                className="h-full scroll-mt-28"
              >
                <Link
                  href={href}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm hover:shadow-md",
                    "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-0.5",
                    "motion-reduce:transition-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-50",
                  )}
                >
                  {Mock ? (
                    <div className="pointer-events-none border-b border-line bg-surface p-3">
                      <Mock />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                      {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {item.tagline}
                    </p>
                    {features.length ? (
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-[14px] text-ink"
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                              aria-hidden
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex-1" />
                    )}
                    {why ? (
                      <p className="mt-5 text-[13px] leading-snug text-muted">
                        <span className="font-semibold text-ink">
                          {modules.whyConnectLabel}:{" "}
                        </span>
                        {why.title}
                      </p>
                    ) : null}
                    <span className="mt-5 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                      {modules.cardCtaLabel}
                    </span>
                  </div>
                </Link>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-lg border border-line bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-body font-medium text-ink">{modules.demoPrompt}</p>
        <TrackedButton
          event="demo_click"
          href={modules.demoHref}
          variant="secondary"
          size="md"
        >
          {modules.demoCta}
        </TrackedButton>
      </div>
    </Section>
  );
}
