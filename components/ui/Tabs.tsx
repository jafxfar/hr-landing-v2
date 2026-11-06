"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  className?: string;
  panelClassName?: string;
  defaultTabId?: string;
  /** When false, only the active panel is mounted (lazy screenshots). */
  mountInactive?: boolean;
};

export function Tabs({
  items,
  className,
  panelClassName,
  defaultTabId,
  mountInactive = true,
}: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(
    defaultTabId && items.some((item) => item.id === defaultTabId)
      ? defaultTabId
      : items[0]?.id,
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (!items.length || !activeId) {
    return null;
  }

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(items.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex flex-wrap gap-1 rounded-md border border-line bg-surface-card p-1 shadow-sm"
      >
        {items.map((item, index) => {
          const selected = item.id === activeId;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={cn(
                "min-h-11 rounded-sm px-4 py-2 text-small font-semibold transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                selected
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-muted hover:bg-brand-50 hover:text-ink",
              )}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const selected = item.id === activeId;
        const tabId = `${baseId}-tab-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        const showContent = mountInactive || selected;

        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            tabIndex={selected ? 0 : -1}
            className={cn(
              "mt-4 rounded-lg border border-line bg-surface-card p-5 text-body leading-body text-muted shadow-sm",
              selected &&
                "motion-safe:animate-interfaces-fade motion-reduce:animate-none",
              !selected && "hidden",
              panelClassName,
            )}
          >
            {showContent ? item.content : null}
          </div>
        );
      })}
    </div>
  );
}
