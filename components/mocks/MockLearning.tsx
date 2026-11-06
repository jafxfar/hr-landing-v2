"use client";

import { mockLearning } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

export function MockLearning({ className }: { className?: string }) {
  return (
    <MockShell className={className}>
      {({ active, reduced }) => {
        const filled = reduced || active;

        return (
          <div className="flex h-full flex-col bg-surface p-3">
            <div className="flex h-14 items-end rounded-md bg-gradient-to-br from-brand-500 to-accent-500 px-3 pb-2">
              <span className="text-[10px] font-semibold text-white/90">
                {mockLearning.coverLabel}
              </span>
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
              <p className="text-[12px] font-semibold leading-snug text-ink">
                {mockLearning.title}
              </p>
              <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[9px] font-semibold text-brand-700">
                {mockLearning.badge}
              </span>
            </div>

            <p className="mt-3 text-[9px] font-medium text-muted">
              {mockLearning.progressLabel}
            </p>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-line">
              <div
                className={cn(
                  "h-full w-full origin-left rounded-full bg-brand-600 transition-transform duration-500 ease-out",
                  filled ? "scale-x-100" : "scale-x-0",
                )}
                style={{ width: `${mockLearning.progress}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-muted">{mockLearning.modulesDone}</p>
          </div>
        );
      }}
    </MockShell>
  );
}
