"use client";

import { mockTimesheet } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

const cellClass = {
  work: "bg-brand-500",
  vacation: "bg-accent-500",
  sick: "bg-muted/40",
  off: "bg-line/60",
} as const;

export function MockTimesheet({ className }: { className?: string }) {
  return (
    <MockShell className={className} aspectClassName="aspect-[4/3]">
      {({ active, reduced }) => {
        const filled = reduced || active;

        return (
          <div className="flex h-full flex-col gap-2 bg-surface p-3">
            <div className="grid grid-cols-[2rem_repeat(7,minmax(0,1fr))] gap-1">
              <span />
              {mockTimesheet.days.map((day) => (
                <span
                  key={day}
                  className="text-center text-[9px] font-semibold uppercase tracking-wide text-muted"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="flex flex-1 flex-col justify-center gap-1.5">
              {mockTimesheet.rows.map((row) => (
                <div
                  key={row.initials}
                  className="grid grid-cols-[2rem_repeat(7,minmax(0,1fr))] items-center gap-1"
                >
                  <span className="text-[9px] font-semibold text-ink">
                    {row.initials}
                  </span>
                  {row.cells.map((cell, cellIndex) => (
                    <span
                      key={`${row.initials}-${cellIndex}`}
                      className={cn(
                        "h-4 rounded-sm transition-[opacity,transform] duration-300 ease-out sm:h-5",
                        cellClass[cell],
                        filled ? "scale-100 opacity-100" : "scale-95 opacity-45",
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(
                [
                  ["work", mockTimesheet.legend.work],
                  ["vacation", mockTimesheet.legend.vacation],
                  ["sick", mockTimesheet.legend.sick],
                ] as const
              ).map(([key, label]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 text-[9px] text-muted"
                >
                  <span className={cn("h-2 w-2 rounded-sm", cellClass[key])} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        );
      }}
    </MockShell>
  );
}
