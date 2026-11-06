"use client";

import { Check } from "lucide-react";
import { mockTasks } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

export function MockTasks({ className }: { className?: string }) {
  return (
    <MockShell className={className}>
      {({ active, reduced }) => {
        const displayDone = reduced || active ? mockTasks.items.length - 1 : 0;

        return (
          <div className="flex h-full flex-col justify-center gap-2 bg-surface p-3">
            {mockTasks.items.map((item, index) => {
              const done = index < displayDone;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-2 rounded-md border border-line bg-surface-card px-2.5 py-2 shadow-sm transition-[opacity] duration-300 ease-out",
                    done ? "opacity-70" : "opacity-100",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-[opacity,transform] duration-300 ease-out",
                      done
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line bg-white",
                    )}
                  >
                    {done ? (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-[11px] font-medium text-ink transition-[opacity] duration-300",
                      done && "text-muted line-through",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[8px] font-semibold text-brand-700">
                    {item.assignee}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }}
    </MockShell>
  );
}
