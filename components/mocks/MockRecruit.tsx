"use client";

import { mockRecruit } from "@/content/mocks";
import { cn } from "@/lib/cn";
import { MockShell } from "./MockShell";

export function MockRecruit({ className }: { className?: string }) {
  return (
    <MockShell className={className} aspectClassName="h-auto">
      {({ active, reduced }) => {
        const path = mockRecruit.movingPath;
        const movingCol =
          reduced || active ? path[path.length - 1] : path[0];
        const staticCards = mockRecruit.cards.filter((c) => c.id !== "moving");
        const moving = mockRecruit.cards.find((c) => c.id === "moving");

        return (
          <div className="grid grid-cols-4 gap-1.5 overflow-hidden bg-surface p-2 sm:gap-2 sm:p-3">
            {mockRecruit.columns.map((col) => {
              const cards = staticCards.filter((c) => c.column === col.id);
              const showMoving = movingCol === col.id;

              return (
                <div
                  key={col.id}
                  className="flex min-w-0 flex-col rounded-md border border-line bg-surface-card p-1.5"
                >
                  <div className="mb-1.5 flex items-center justify-between gap-1 px-0.5">
                    <span className="truncate text-[9px] font-semibold text-ink">
                      {col.title}
                    </span>
                    <span className="rounded bg-brand-50 px-1 text-[8px] font-semibold text-brand-700">
                      {col.count}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {cards.map((card) => (
                      <RecruitCard key={card.id} card={card} />
                    ))}
                    {showMoving && moving ? (
                      <div
                        className={cn(
                          "transition-[opacity,transform] duration-500 ease-out",
                          active
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-70",
                        )}
                      >
                        <RecruitCard card={moving} highlighted />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }}
    </MockShell>
  );
}

function RecruitCard({
  card,
  highlighted,
}: {
  card: (typeof mockRecruit.cards)[number];
  highlighted?: boolean;
}) {
  const lines = "lines" in card ? card.lines : 1;
  const initials = "initials" in card ? card.initials : null;
  const tag = "tag" in card ? card.tag : null;

  return (
    <div
      className={cn(
        "rounded border px-1.5 py-1 shadow-sm",
        highlighted
          ? "border-brand-100 bg-brand-50"
          : "border-line bg-white",
        lines === 3 && "min-h-[2.75rem]",
        lines === 2 && "min-h-[2.25rem]",
      )}
    >
      <div className="flex items-start gap-1">
        {initials ? (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[7px] font-bold text-brand-700">
            {initials}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[9px] font-medium text-ink">{card.title}</p>
          <p className="truncate text-[8px] text-muted">{card.meta}</p>
          {tag ? (
            <span className="mt-0.5 inline-block rounded bg-surface px-1 text-[7px] font-semibold text-muted">
              {tag}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
