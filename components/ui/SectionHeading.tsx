import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "dark";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  titleAs: TitleTag = "h2",
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-small font-semibold tracking-[0.04em]",
            dark
              ? "border-white/20 bg-white/10 text-brand-100"
              : "border-line bg-surface-card text-brand-700",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              dark ? "bg-brand-100" : "bg-brand-500",
            )}
          />
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={cn(
          "font-semibold tracking-tight",
          dark ? "text-ink-inverse" : "text-ink",
          TitleTag === "h1" && "text-h1",
          TitleTag === "h2" && "text-h2 leading-[1.15]",
          TitleTag === "h3" && "text-h3",
          eyebrow && "mt-4",
        )}
      >
        {title}
      </TitleTag>
      <span
        aria-hidden
        className={cn(
          "mt-4 block h-1 w-12 rounded-full bg-gradient-to-r from-brand-500 to-accent-500",
          align === "center" && "mx-auto",
          dark && "from-brand-100 to-accent-500",
        )}
      />
      {description ? (
        <p
          className={cn(
            "mt-5 text-body leading-body",
            dark ? "text-muted-inverse" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
