"use client";

import { useEffect, useState } from "react";
import { modulePageCopy } from "@/content/landing";
import { cn } from "@/lib/cn";

type ModuleStickyNavProps = {
  /** Section ids that are actually rendered on the page */
  sectionIds: string[];
};

export function ModuleStickyNav({ sectionIds }: ModuleStickyNavProps) {
  const items = modulePageCopy.stickyNav.filter((item) =>
    sectionIds.includes(item.id),
  );
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) setActiveId(top.target.id);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  if (!items.length) return null;

  return (
    <nav
      aria-label={modulePageCopy.stickyNavLabel}
      className="sticky z-40 border-b border-line bg-white/95 backdrop-blur-md"
      style={{ top: "var(--header-offset, 4rem)" }}
    >
      <div className="mx-auto flex max-w-[1100px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 text-small font-semibold transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              activeId === item.id
                ? "bg-brand-50 text-brand-700"
                : "text-muted hover:bg-surface hover:text-ink",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
