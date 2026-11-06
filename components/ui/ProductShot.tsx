"use client";

import type { ReactNode } from "react";
import { ScreenImage } from "@/components/ui/ScreenImage";

type ProductShotProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  maxWidthClass?: string;
  phone?: ReactNode;
  aspect?: string;
};

export function ProductShot({
  src,
  alt,
  caption,
  priority = false,
  className = "",
  maxWidthClass = "max-w-[960px] lg:max-w-[1040px]",
  phone,
  aspect = "aspect-[16/10]",
}: ProductShotProps) {
  return (
    <div className={`relative mx-auto w-full ${maxWidthClass} ${className}`}>
      <div className="overflow-hidden rounded-[18px] border border-border bg-white shadow-[0_24px_60px_rgba(26,35,50,0.12)]">
        <div className="flex h-9 items-center gap-1.5 border-b border-border bg-surface-soft px-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-window-dot-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-window-dot-yellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-window-dot-green" />
          <span className="ml-3 truncate text-[11px] font-medium text-muted-2">
            {caption || alt}
          </span>
        </div>
        <ScreenImage
          src={src}
          alt={alt}
          caption={caption}
          aspect={aspect}
          className="rounded-none border-0"
          priority={priority}
        />
      </div>
      {phone ? (
        <div className="pointer-events-none absolute -bottom-4 -right-2 w-[28%] max-w-[150px] sm:-right-3 sm:bottom-[-1.25rem] sm:max-w-[168px] md:-right-4">
          {phone}
        </div>
      ) : null}
    </div>
  );
}
