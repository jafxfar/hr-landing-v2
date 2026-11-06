import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cases } from "@/content/landing";
import type { CaseStudy, CasesSection } from "@/content/types";
import { withoutPlaceholders } from "@/content/placeholders";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type CaseCardProps = {
  item: CaseStudy;
  labels: Pick<
    CasesSection,
    "taskLabel" | "solutionLabel" | "metricsLabel" | "readCta"
  >;
};

/** Готовый каркас карточки кейса — используется, когда появятся реальные данные. */
export function CaseCard({ item, labels }: CaseCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-line bg-surface-card p-6 shadow-sm md:p-7">
      <p className="text-small font-semibold text-brand-600">{item.company}</p>

      <div className="mt-4 space-y-3">
        <p className="text-[15px] leading-relaxed text-muted">
          <span className="font-semibold text-ink">{labels.taskLabel}. </span>
          {item.task}
        </p>
        <p className="text-[15px] leading-relaxed text-muted">
          <span className="font-semibold text-ink">{labels.solutionLabel}. </span>
          {item.solution}
        </p>
      </div>

      {item.metrics.length > 0 ? (
        <div className="mt-5">
          <p className="text-small font-semibold uppercase tracking-[0.06em] text-muted">
            {labels.metricsLabel}
          </p>
          <ul className="mt-2 space-y-1.5">
            {item.metrics.map((metric) => (
              <li
                key={metric}
                className="text-[15px] font-semibold leading-snug text-ink"
              >
                {metric}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        href={item.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        {labels.readCta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}

export function Cases() {
  if (cases.placeholder === true) {
    return null;
  }

  const items = withoutPlaceholders(cases.items).filter(
    (item) => item.company.trim().length > 0,
  );
  if (!items.length) return null;

  const labels = {
    taskLabel: cases.taskLabel,
    solutionLabel: cases.solutionLabel,
    metricsLabel: cases.metricsLabel,
    readCta: cases.readCta,
  };

  return (
    <Section id={cases.id} tone="white">
      <SectionHeading
        align="center"
        eyebrow={cases.eyebrow}
        title={cases.title}
        description={cases.text}
      />

      <ul className="mt-10 grid list-none gap-5 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.company}>
            <CaseCard item={item} labels={labels} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
