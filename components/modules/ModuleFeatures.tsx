"use client";

import {
  resolveModuleScreen,
  visibleModulePoints,
  type ProductModule,
} from "@/content/modules";
import { modulePageCopy } from "@/content/landing";
import { moduleMockById } from "@/components/mocks";
import { Reveal } from "@/components/motion/Reveal";
import { ProductShot } from "@/components/ui/ProductShot";
import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";

type ModuleFeaturesProps = {
  module: ProductModule;
};

export function ModuleFeatures({ module }: ModuleFeaturesProps) {
  const groups = module.featureGroups
    .map((group) => ({
      ...group,
      items: visibleModulePoints(group.items),
    }))
    .filter((group) => group.items.length > 0);

  if (!groups.length) return null;

  const items = groups.map((group, index) => {
    const screenId =
      group.screenId ?? module.visuals.screens[index]?.screenId;
    const mockKey = group.mockId ?? module.visuals.mocks[0];
    const Mock = mockKey ? moduleMockById[mockKey] : undefined;
    const screen = screenId ? resolveModuleScreen(screenId) : null;

    return {
      id: `fg-${index}`,
      label: group.title,
      content: (
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <ul className="space-y-5">
            {group.items.map((feature, i) => (
              <li key={feature.title} className="border-t border-line pt-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
          <div>
            {screen ? (
              <ProductShot
                src={screen.src}
                alt={screen.alt}
                caption={
                  module.visuals.screens.find((s) => s.screenId === screenId)
                    ?.caption ?? screen.alt
                }
                maxWidthClass="max-w-full"
                aspect={
                  screen.kind === "mobile" ? "aspect-[9/16]" : "aspect-[16/10]"
                }
              />
            ) : Mock ? (
              <div className="overflow-hidden rounded-lg border border-line bg-surface-card p-3 shadow-md">
                <Mock />
              </div>
            ) : null}
          </div>
        </div>
      ),
    };
  });

  return (
    <Section id="features" tone="white" pattern="grid">
      <Reveal>
        <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
          {modulePageCopy.featuresEyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight text-ink">
          {modulePageCopy.featuresTitle}
        </h2>
      </Reveal>
      <div className="mt-10">
        <Tabs items={items} mountInactive={false} />
      </div>
    </Section>
  );
}
