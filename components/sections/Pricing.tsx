"use client";

import { useState } from "react";
import { Check, CircleDot, Minus } from "lucide-react";
import { pricing } from "@/content/landing";
import type {
  PricingMatrixValue,
  PricingPlan,
  PricingPlanId,
} from "@/content/types";
import { GradientBorder } from "@/components/motion/GradientBorder";
import { Accordion } from "@/components/ui/Accordion";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type BillingPeriod = "month" | "year";

const planOrderMobile: Record<PricingPlanId, string> = {
  business: "order-1",
  start: "order-2",
  enterprise: "order-3",
};

const planOrderDesktop: Record<PricingPlanId, string> = {
  start: "md:order-1",
  business: "md:order-2",
  enterprise: "md:order-3",
};

function MatrixIcon({ value }: { value: PricingMatrixValue }) {
  if (value === "yes") {
    return <Check className="h-4 w-4 text-accent-600" aria-hidden />;
  }
  if (value === "partial") {
    return <CircleDot className="h-4 w-4 text-brand-600" aria-hidden />;
  }
  return <Minus className="h-4 w-4 text-muted" aria-hidden />;
}

function matrixLabel(value: PricingMatrixValue): string {
  if (value === "yes") return pricing.matrixYes;
  if (value === "partial") return pricing.matrixPartial;
  return pricing.matrixNo;
}

function parseNumericPrice(price: string): number | null {
  const normalized = price.replace(/\s/g, "").replace(",", ".");
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return Number(match[1]);
}

function displayPrice(plan: PricingPlan, period: BillingPeriod): string {
  if (plan.id === "enterprise") return plan.price;
  const numeric = parseNumericPrice(plan.price);
  if (numeric === null) return plan.price;
  if (period === "month") return plan.price;
  const yearly = numeric * 12 * (1 - pricing.billing.yearDiscountPercent / 100);
  return plan.price.replace(String(numeric), String(Math.round(yearly)));
}

function priceUnit(plan: PricingPlan, period: BillingPeriod): string {
  if (plan.id === "enterprise") return plan.priceUnit;
  return period === "year"
    ? pricing.billing.priceUnitYear
    : pricing.billing.priceUnitMonth;
}

function PlanCardBody({
  plan,
  period,
}: {
  plan: PricingPlan;
  period: BillingPeriod;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {plan.name}
        </h3>
        {plan.badge ? <Badge tone="brand">{plan.badge}</Badge> : null}
        {period === "year" && plan.id !== "enterprise" ? (
          <Badge tone="accent">{pricing.billing.yearDiscountNote}</Badge>
        ) : null}
      </div>
      <p className="mt-2 text-[15px] text-muted">{plan.audience}</p>

      <div className="mt-6">
        <p className="text-2xl font-semibold tracking-tight text-ink md:text-[1.75rem]">
          {displayPrice(plan, period)}
        </p>
        <p className="mt-1 text-small text-muted">{priceUnit(plan, period)}</p>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[15px] text-ink"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href={plan.cta.href}
          variant={plan.featured ? "primary" : "secondary"}
          size="md"
          className="w-full"
        >
          {plan.cta.label}
        </Button>
      </div>
    </>
  );
}

function PlanCard({
  plan,
  period,
}: {
  plan: PricingPlan;
  period: BillingPeriod;
}) {
  const orderClass = cn(planOrderMobile[plan.id], planOrderDesktop[plan.id]);

  if (plan.featured) {
    return (
      <div className={cn("relative h-full", orderClass)}>
        <GlowBlob
          color="brand"
          position="top-right"
          opacity={0.28}
          blur={120}
          className="-right-8 top-8"
        />
        <GradientBorder
          className="relative z-10 h-full shadow-lg shadow-brand-500/25"
          contentClassName="flex h-full flex-col p-6 md:p-7"
        >
          <PlanCardBody plan={plan} period={period} />
        </GradientBorder>
      </div>
    );
  }

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-line bg-surface-card p-6 shadow-sm md:p-7",
        orderClass,
      )}
    >
      <PlanCardBody plan={plan} period={period} />
    </article>
  );
}

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("month");
  const planById = Object.fromEntries(
    pricing.plans.map((plan) => [plan.id, plan]),
  ) as Record<PricingPlanId, PricingPlan>;

  return (
    <Section id={pricing.id} tone="gradient-soft" wash="surface-brand">
      <SectionHeading
        eyebrow={pricing.eyebrow}
        title={pricing.title}
        description={pricing.text}
      />

      <div
        role="radiogroup"
        aria-label={pricing.billing.monthLabel}
        className="mt-10 inline-flex rounded-full border border-line bg-surface-card p-1 shadow-sm"
      >
        {(["month", "year"] as const).map((value) => {
          const selected = period === value;
          const label =
            value === "month"
              ? pricing.billing.monthLabel
              : pricing.billing.yearLabel;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={cn(
                "min-h-10 rounded-full px-4 text-small font-semibold transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                selected
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-muted hover:text-ink",
              )}
              onClick={() => setPeriod(value)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-5 md:grid md:grid-cols-3">
        {pricing.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} period={period} />
        ))}
      </div>

      <p className="mt-8 text-center text-[15px] leading-relaxed text-muted md:mx-auto md:max-w-3xl">
        {pricing.paymentNote}
      </p>

      <div className="mt-14">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {pricing.matrixTitle}
        </h3>

        <div className="mt-6 hidden overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-surface">
                <th
                  scope="col"
                  className="px-5 py-4 text-small font-semibold text-muted"
                >
                  {pricing.matrixTitle}
                </th>
                {pricing.plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "px-5 py-4 text-center text-small font-semibold",
                      plan.featured ? "bg-brand-50 text-brand-700" : "text-ink",
                    )}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.matrix.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-line last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-[15px] font-medium text-ink"
                  >
                    {row.feature}
                  </th>
                  {(["start", "business", "enterprise"] as const).map(
                    (planId) => {
                      const value = row[planId];
                      const featured = planById[planId]?.featured;
                      return (
                        <td
                          key={planId}
                          className={cn(
                            "px-5 py-3.5 text-center",
                            featured && "bg-brand-50",
                          )}
                        >
                          <span className="inline-flex items-center justify-center gap-1.5">
                            <MatrixIcon value={value} />
                            <span className="sr-only">{matrixLabel(value)}</span>
                          </span>
                        </td>
                      );
                    },
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Accordion
          className="mt-6 md:hidden"
          defaultOpen={0}
          items={pricing.matrix.map((row) => ({
            id: row.feature,
            title: row.feature,
            content: (
              <ul className="space-y-3">
                {pricing.plans.map((plan) => {
                  const value = row[plan.id];
                  return (
                    <li
                      key={plan.id}
                      className="flex items-center justify-between gap-3 text-[15px]"
                    >
                      <span
                        className={cn(
                          "font-medium",
                          plan.featured ? "text-brand-700" : "text-ink",
                        )}
                      >
                        {plan.name}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <MatrixIcon value={value} />
                        <span>{matrixLabel(value)}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ),
          }))}
        />
      </div>
    </Section>
  );
}
