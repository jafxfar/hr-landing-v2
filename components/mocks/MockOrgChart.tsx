"use client";

import { mockOrgChart } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

export function MockOrgChart({ className }: { className?: string }) {
  return (
    <MockShell className={className}>
      {({ active, reduced }) => {
        const highlightId =
          reduced || active
            ? mockOrgChart.highlightOrder[mockOrgChart.highlightOrder.length - 1]
            : mockOrgChart.highlightOrder[0];

        return (
          <div className="flex h-full flex-col justify-center gap-3 bg-surface px-3 py-4 sm:px-4">
            {mockOrgChart.levels.map((level, levelIndex) => (
              <div
                key={levelIndex}
                className="flex items-center justify-center gap-2 sm:gap-3"
              >
                {level.map((node) => {
                  const selected = node.id === highlightId;
                  return (
                    <div
                      key={node.id}
                      className={cn(
                        "flex min-w-0 flex-col items-center gap-1 rounded-md px-2 py-1.5 transition-[opacity,transform] duration-300 ease-out",
                        selected
                          ? "bg-brand-50 ring-1 ring-brand-500/40"
                          : "bg-transparent",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold",
                          node.tone === "brand"
                            ? "bg-brand-600 text-white"
                            : "bg-brand-100 text-brand-700",
                        )}
                      >
                        {node.initials}
                      </span>
                      <span className="max-w-[4.5rem] truncate text-center text-[10px] font-medium text-ink">
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      }}
    </MockShell>
  );
}
