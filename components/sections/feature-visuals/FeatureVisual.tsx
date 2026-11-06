"use client";

import { ArrowRight, Check, Lock, Smartphone } from "lucide-react";
import { features } from "@/content/landing";
import type { FeatureVisualId } from "@/content/types";
import { cn } from "@/lib/cn";

type FeatureVisualProps = {
  id: FeatureVisualId;
  className?: string;
};

export function FeatureVisual({ id, className }: FeatureVisualProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "mt-auto w-full rounded-lg border border-line bg-surface p-3",
        className,
      )}
    >
      {id === "rbac" ? <VisualRbac /> : null}
      {id === "audit" ? <VisualAudit /> : null}
      {id === "import" ? <VisualImport /> : null}
      {id === "api" ? <VisualApi /> : null}
      {id === "kpi" ? <VisualKpi /> : null}
      {id === "mobile" ? <VisualMobile /> : null}
    </div>
  );
}

function VisualRbac() {
  const { network, branch, dept } = features.visualDemo.rbac;
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <div className="flex flex-1 flex-col gap-1.5">
        <Node label={network} wide />
        <div className="ml-3 flex flex-col gap-1.5 border-l border-line pl-3">
          <Node label={branch} />
          <div className="ml-2 flex flex-col gap-1.5 border-l border-line pl-3">
            <Node label={dept} locked />
          </div>
        </div>
      </div>
      <Lock className="h-4 w-4 shrink-0 text-brand-600" />
    </div>
  );
}

function Node({
  label,
  wide,
  locked,
}: {
  label: string;
  wide?: boolean;
  locked?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-line bg-white px-2 py-1 font-medium text-ink shadow-sm",
        wide && "self-start",
      )}
    >
      {label}
      {locked ? <Lock className="h-3 w-3 text-muted" /> : null}
    </span>
  );
}

function VisualAudit() {
  const lines = features.visualDemo.audit.lines;
  return (
    <ul className="space-y-1.5">
      {lines.map((line, index) => (
        <li
          key={line}
          className={cn(
            "rounded-md border border-transparent bg-white px-2 py-1.5 text-[10px] leading-snug text-muted shadow-sm",
            "motion-safe:transition-colors motion-safe:duration-300",
            "group-hover:border-brand-100 group-hover:bg-brand-50 group-hover:text-ink",
          )}
          style={{ transitionDelay: `${index * 90}ms` }}
        >
          {line}
        </li>
      ))}
    </ul>
  );
}

function VisualImport() {
  const { progressLabel } = features.visualDemo.import;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="grid flex-1 grid-cols-3 gap-0.5 rounded border border-line bg-white p-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="h-2 rounded-sm bg-brand-100"
              style={{ opacity: 0.4 + (i % 3) * 0.2 }}
            />
          ))}
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-brand-600" />
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-[10px] font-bold text-brand-700">
          HR
        </span>
      </div>
      <div>
        <p className="mb-1 text-[10px] text-muted">{progressLabel}</p>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-500 to-accent-500 motion-safe:transition-[width] motion-safe:duration-500 group-hover:w-[88%]" />
        </div>
      </div>
    </div>
  );
}

function VisualApi() {
  const [request, auth] = features.visualDemo.api.lines;
  return (
    <div className="space-y-1 rounded-md bg-dark px-2.5 py-2 font-mono text-[10px] leading-relaxed text-white/80">
      <p>
        <span className="text-accent-500">GET</span>{" "}
        <span className="text-brand-100">
          {request?.replace(/^GET\s+/, "") ?? ""}
        </span>
      </p>
      <p>
        <span className="text-brand-100">Authorization:</span>{" "}
        <span className="text-white/55">
          {auth?.replace(/^Authorization:\s*/, "") ?? ""}
        </span>
      </p>
    </div>
  );
}

function VisualKpi() {
  const points = features.visualDemo.kpi.points;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(max - min, 1);
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p - min) / range) * 70 - 15;
    return `${x},${y}`;
  });
  const d = `M ${coords.join(" L ")}`;

  return (
    <svg
      viewBox="0 0 100 56"
      preserveAspectRatio="none"
      className="h-14 w-full overflow-visible"
    >
      <path
        d={d}
        fill="none"
        stroke="var(--brand-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="origin-left motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-x-105"
      />
      {coords.map((c, i) => {
        const [x, y] = c.split(",").map(Number);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            className="fill-accent-500 opacity-70 group-hover:opacity-100"
          />
        );
      })}
    </svg>
  );
}

function VisualMobile() {
  const { checkLabel } = features.visualDemo.mobile;
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <div className="relative h-16 w-9 rounded-[0.65rem] border-2 border-ink/80 bg-white p-0.5 shadow-sm">
        <div className="mx-auto mb-0.5 h-1 w-4 rounded-full bg-line" />
        <div className="flex h-[calc(100%-0.35rem)] items-center justify-center rounded-[0.4rem] bg-brand-50">
          <Check className="h-4 w-4 text-accent-600" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
        <Smartphone className="h-3.5 w-3.5 text-brand-600" />
        {checkLabel}
      </div>
    </div>
  );
}
