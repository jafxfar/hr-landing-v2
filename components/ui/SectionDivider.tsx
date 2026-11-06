import { cn } from "@/lib/cn";
import type { SectionTone } from "@/components/ui/Section";

const fillClass: Record<SectionTone, string> = {
  white: "fill-white",
  surface: "fill-surface",
  "brand-soft": "fill-brand-50",
  "accent-soft": "fill-accent-50",
  "gradient-soft": "fill-surface",
  dark: "fill-dark",
  brand: "fill-brand-700",
};

const bgClass: Record<SectionTone, string> = {
  white: "bg-white",
  surface: "bg-surface",
  "brand-soft": "bg-brand-50",
  "accent-soft": "bg-accent-50",
  "gradient-soft": "bg-surface",
  dark: "bg-dark",
  brand: "bg-brand-700",
};

type SectionDividerProps = {
  from: SectionTone;
  to: SectionTone;
  className?: string;
  variant?: "wave" | "curve" | "slant";
};

export function SectionDivider({
  from,
  to,
  className,
  variant = "wave",
}: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative -mb-px w-full overflow-hidden leading-none",
        bgClass[from],
        className,
      )}
    >
      <svg
        className={cn("block h-6 w-full md:h-8", fillClass[to])}
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {variant === "wave" ? (
          <path d="M0 24C240 48 480 0 720 16C960 32 1200 48 1440 24V48H0V24Z" />
        ) : variant === "curve" ? (
          <path d="M0 48C360 8 1080 8 1440 48H0Z" />
        ) : (
          <path d="M0 32L1440 0V48H0V32Z" />
        )}
      </svg>
    </div>
  );
}
