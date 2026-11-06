"use client";

import { mockKpi } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

export function MockKpi({ className }: { className?: string }) {
  return (
    <MockShell className={className} aspectClassName="h-auto">
      {({ active, reduced }) => (
        <div className="grid grid-cols-3 gap-2 bg-surface p-3">
          {mockKpi.cards.map((card, index) => (
            <div
              key={card.label}
              className="flex flex-col justify-between rounded-md border border-line bg-surface-card p-2 shadow-sm"
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <p className="text-[9px] font-medium text-muted">{card.label}</p>
              <p className="mt-1 text-sm font-semibold text-ink sm:text-base">
                {card.value}
                <span className="text-[10px] font-medium text-muted">
                  {card.suffix}
                </span>
              </p>
              <Sparkline
                points={card.points}
                active={active || reduced}
                className="mt-2 h-8 w-full"
              />
            </div>
          ))}
        </div>
      )}
    </MockShell>
  );
}

function Sparkline({
  points,
  active,
  className,
}: {
  points: readonly number[];
  active: boolean;
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
    >
      <path
        d={d}
        fill="none"
        stroke="var(--brand-500)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={cn(
          "origin-left transition-[opacity,transform] duration-500 ease-out",
          active ? "scale-x-100 opacity-100" : "scale-x-75 opacity-20",
        )}
      />
    </svg>
  );
}
