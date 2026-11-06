"use client";

import { useEffect, useState } from "react";
import { mockRecruit } from "@/content/mocks";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { RolePreviewChrome } from "@/components/sections/role-previews/RolePreviewChrome";
import { cn } from "@/lib/cn";

export function RolePreviewHr({ windowCaption }: { windowCaption: string }) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % mockRecruit.movingPath.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const movingCol = reduced
    ? mockRecruit.movingPath[mockRecruit.movingPath.length - 1]
    : mockRecruit.movingPath[step];
  const staticCards = mockRecruit.cards.filter((c) => c.id !== "moving");
  const moving = mockRecruit.cards.find((c) => c.id === "moving");

  return (
    <RolePreviewChrome caption={windowCaption}>
      <div className="grid grid-cols-4 gap-1.5 p-2.5 sm:gap-2 sm:p-3">
        {mockRecruit.columns.map((col) => {
          const cards = staticCards.filter((c) => c.column === col.id);
          const showMoving = movingCol === col.id;

          return (
            <div
              key={col.id}
              className="flex min-w-0 flex-col rounded-md border border-line bg-surface-card p-1.5"
            >
              <div className="mb-1.5 flex items-center justify-between gap-1 px-0.5">
                <span className="truncate text-[10px] font-semibold text-ink">
                  {col.title}
                </span>
                <span className="rounded bg-brand-50 px-1 text-[9px] font-semibold text-brand-700">
                  {col.count}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {cards.map((card) => (
                  <KanbanCard key={card.id} card={card} />
                ))}
                {showMoving && moving ? (
                  <div
                    className={cn(
                      "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out",
                      "translate-y-0 opacity-100",
                    )}
                  >
                    <KanbanCard card={moving} highlighted />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </RolePreviewChrome>
  );
}

function KanbanCard({
  card,
  highlighted,
}: {
  card: (typeof mockRecruit.cards)[number];
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-1.5 py-1.5 shadow-sm",
        highlighted
          ? "border-brand-200 bg-brand-50 ring-1 ring-brand-500/30"
          : "border-line bg-white",
        card.lines === 3 && "pb-2.5",
        card.lines === 2 && "pb-2",
      )}
    >
      <div className="flex items-start gap-1.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[8px] font-bold text-brand-700">
          {card.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold text-ink">
            {card.title}
          </p>
          <p className="truncate text-[9px] text-muted">{card.meta}</p>
          <span className="mt-1 inline-block rounded bg-surface px-1 py-px text-[8px] font-semibold text-muted">
            {card.tag}
          </span>
        </div>
      </div>
    </div>
  );
}
