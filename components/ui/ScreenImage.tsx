"use client";

import Image from "next/image";
import { useState } from "react";
import { modulePageCopy } from "@/content/landing";
import { cn } from "@/lib/cn";

type ScreenImageProps = {
  src: string;
  alt: string;
  caption?: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  aspect?: string;
};

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-placeholder-from via-placeholder-via to-placeholder-to px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3 15l4.5-4.5a2 2 0 012.8 0L17 17"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="16" cy="9" r="1.5" fill="currentColor" />
        </svg>
      </div>
      <p className="max-w-[16rem] text-sm font-medium leading-snug text-ink/70">
        {label}
      </p>
      <p className="text-xs text-muted">{modulePageCopy.screenPlaceholderHint}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 motion-safe:animate-pulse motion-reduce:animate-none bg-gradient-to-br from-brand-50 via-surface to-brand-100"
    />
  );
}

export function ScreenImage({
  src,
  alt,
  caption,
  fill = false,
  priority = false,
  className = "",
  imgClassName = "object-cover object-top",
  sizes = "(max-width: 768px) 100vw, 1100px",
  aspect = "aspect-[16/10]",
}: ScreenImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const label = caption || alt;

  const image = failed ? (
    <Placeholder label={label} />
  ) : (
    <>
      {!loaded && !priority ? <Skeleton /> : null}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          imgClassName,
          !priority && "transition-opacity duration-300 ease-out",
          priority || loaded ? "opacity-100" : "opacity-0",
        )}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );

  if (fill) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        {image}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] bg-ink/5 ${aspect} ${className}`}
    >
      {image}
    </div>
  );
}
