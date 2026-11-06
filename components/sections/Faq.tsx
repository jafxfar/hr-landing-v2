"use client";

import { faq } from "@/content/landing";
import { withoutPlaceholders } from "@/content/placeholders";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  const items = withoutPlaceholders(faq.items);
  if (!items.length) return null;

  const openCount = Math.min(3, items.length);

  return (
    <Section id={faq.id} tone="white">
      <SectionHeading align="center" eyebrow={faq.eyebrow} title={faq.title} />

      <Accordion
        className="mt-10"
        allowMultiple
        defaultOpenIndexes={Array.from({ length: openCount }, (_, i) => i)}
        items={items.map((item) => ({
          title: item.q,
          content: item.a,
        }))}
      />
    </Section>
  );
}
