import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import {
  SectionBackground,
  type SectionPattern,
} from "@/components/ui/SectionBackground";

export type { SectionPattern };

export type SectionTone =
  | "white"
  | "surface"
  | "brand-soft"
  | "accent-soft"
  | "gradient-soft"
  | "dark"
  | "brand";

export type SectionWash = "brand-white" | "surface-brand";

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  wash?: SectionWash;
  pattern?: SectionPattern | SectionPattern[];
  className?: string;
  containerClassName?: string;
  contained?: boolean;
};

export function Section({
  children,
  id,
  tone = "white",
  wash,
  pattern = "none",
  className,
  containerClassName,
  contained = true,
}: SectionProps) {
  const inner = contained ? (
    <Container className={cn("relative z-10", containerClassName)}>
      {children}
    </Container>
  ) : (
    <div className={cn("relative z-10", containerClassName)}>{children}</div>
  );

  return (
    <section
      id={id}
      data-tone={tone}
      data-wash={wash}
      className={cn(
        "section-tone relative overflow-hidden overflow-x-hidden scroll-mt-28 py-12 md:py-14 lg:py-[3.75rem]",
        className,
      )}
    >
      <SectionBackground pattern={pattern} />
      {inner}
    </section>
  );
}
