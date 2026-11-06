import { cn } from "@/lib/cn";

export type SectionPattern =
  | "none"
  | "dots"
  | "grid"
  | "grid-mask"
  | "diagonal"
  | "glow-top"
  | "glow-side";

const patternClass: Record<Exclude<SectionPattern, "none">, string> = {
  dots: "section-pattern-dots",
  grid: "section-pattern-grid",
  "grid-mask": "section-pattern-grid-mask",
  diagonal: "section-pattern-diagonal",
  "glow-top": "section-pattern-glow-top",
  "glow-side": "section-pattern-glow-side",
};

export function SectionBackground({
  pattern,
}: {
  pattern: SectionPattern | SectionPattern[];
}) {
  const patterns = (Array.isArray(pattern) ? pattern : [pattern]).filter(
    (item): item is Exclude<SectionPattern, "none"> => item !== "none",
  );

  if (!patterns.length) return null;

  return (
    <>
      {patterns.map((item) => (
        <div
          key={item}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-0 overflow-hidden",
            patternClass[item],
          )}
        />
      ))}
    </>
  );
}
