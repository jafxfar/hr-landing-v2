"use client";

import { mockKpi, mockManagerApprovals } from "@/content/mocks";
import { RolePreviewChrome } from "@/components/sections/role-previews/RolePreviewChrome";
import { cn } from "@/lib/cn";

export function RolePreviewManager({
  windowCaption,
}: {
  windowCaption: string;
}) {
  return (
    <RolePreviewChrome caption={windowCaption}>
      <div className="flex flex-col gap-3 p-3 sm:p-4">
        <div>
          <p className="text-[11px] font-semibold text-ink">
            {mockManagerApprovals.title}
          </p>
          <ul className="mt-2 space-y-2">
            {mockManagerApprovals.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-md border border-line bg-white px-2.5 py-2 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="truncate text-[10px] text-muted">{item.meta}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded px-1.5 py-0.5 text-[9px] font-semibold",
                    item.statusTone === "ok"
                      ? "bg-accent-500/15 text-accent-600"
                      : "bg-brand-50 text-brand-700",
                  )}
                >
                  {item.status}
                </span>
                {item.statusTone === "warn" ? (
                  <span className="shrink-0 rounded-md bg-brand-600 px-2 py-1 text-[9px] font-semibold text-white">
                    {mockManagerApprovals.approveLabel}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {mockKpi.cards.map((card) => (
            <div
              key={card.label}
              className="rounded-md border border-line bg-white p-2 shadow-sm"
            >
              <p className="text-[9px] font-medium text-muted">{card.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-ink">
                {card.value}
                <span className="text-[10px] font-medium text-muted">
                  {card.suffix}
                </span>
              </p>
              <Sparkline points={card.points} className="mt-1.5 h-7 w-full" />
            </div>
          ))}
        </div>
      </div>
    </RolePreviewChrome>
  );
}

function Sparkline({
  points,
  className,
}: {
  points: readonly number[];
  className?: string;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(max - min, 1);
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p - min) / range) * 80 - 10;
    return `${x},${y}`;
  });
  const d = `M ${coords.join(" L ")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(className, "overflow-visible")}
      aria-hidden
    >
      <path
        d={d}
        fill="none"
        stroke="var(--brand-500)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
