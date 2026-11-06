"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { announcement } from "@/content/landing";
import { omitIfPlaceholder } from "@/content/placeholders";

const STORAGE_KEY = "jupiter-announcement-dismissed";

type AnnouncementBarProps = {
  onVisibilityChange?: (visible: boolean) => void;
};

export function AnnouncementBar({ onVisibilityChange }: AnnouncementBarProps) {
  const data = omitIfPlaceholder(announcement);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!data) {
      onVisibilityChange?.(false);
      return;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY) === "1";
    const show = !stored;
    queueMicrotask(() => {
      setVisible(show);
      onVisibilityChange?.(show);
    });
  }, [data, onVisibilityChange]);

  if (!data || !visible) {
    return null;
  }

  return (
    <div className="relative z-[51] bg-brand-600 text-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <p className="text-center text-small font-medium leading-snug">
          {data.text}
        </p>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/90 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={data.dismissLabel}
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
            onVisibilityChange?.(false);
          }}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
