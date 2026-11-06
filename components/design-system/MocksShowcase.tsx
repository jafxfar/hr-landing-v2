"use client";

import { allMocks } from "@/components/mocks";
import { designSystem } from "@/content/designSystem";
import { SectionHeading } from "@/components/ui/SectionHeading";

const { mocks: copy } = designSystem;

export function MocksShowcase() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allMocks.map(({ id, title, Component }) => (
          <div key={id} className="space-y-3">
            <h3 className="text-small font-semibold text-ink">{title}</h3>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}
