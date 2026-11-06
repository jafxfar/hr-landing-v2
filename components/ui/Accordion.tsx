"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  id?: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  /** Single mode: one index or null. Multiple mode: ignored if defaultOpenIndexes set. */
  defaultOpen?: number | null;
  /** Open several panels by index (requires allowMultiple). */
  defaultOpenIndexes?: number[];
  allowMultiple?: boolean;
};

function toOpenSet(
  allowMultiple: boolean,
  defaultOpen: number | null | undefined,
  defaultOpenIndexes: number[] | undefined,
): Set<number> {
  if (allowMultiple) {
    if (defaultOpenIndexes?.length) {
      return new Set(defaultOpenIndexes);
    }
    if (typeof defaultOpen === "number") {
      return new Set([defaultOpen]);
    }
    return new Set();
  }
  if (typeof defaultOpen === "number") {
    return new Set([defaultOpen]);
  }
  return new Set();
}

export function Accordion({
  items,
  className,
  defaultOpen = 0,
  defaultOpenIndexes,
  allowMultiple = false,
}: AccordionProps) {
  const baseId = useId();
  const [openSet, setOpenSet] = useState<Set<number>>(() =>
    toOpenSet(allowMultiple, defaultOpen, defaultOpenIndexes),
  );

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        if (allowMultiple) {
          next.delete(index);
        } else {
          return new Set();
        }
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-surface-card shadow-sm",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openSet.has(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.id ?? `${item.title}-${index}`}
            className="border-b border-line last:border-b-0"
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
                  "text-body font-semibold text-ink",
                  "transition-colors hover:bg-brand-50/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500",
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200",
                    isOpen && "rotate-180",
                    "motion-reduce:transition-none",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={cn(!isOpen && "hidden")}
            >
              <div className="px-5 pb-5 text-body leading-body text-muted">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
