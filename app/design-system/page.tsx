import type { Metadata } from "next";
import { designSystem } from "@/content/designSystem";
import { MocksShowcase } from "@/components/design-system/MocksShowcase";
import { MotionShowcase } from "@/components/design-system/MotionShowcase";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Section, type SectionPattern, type SectionTone } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: designSystem.meta.title,
  description: designSystem.meta.description,
  robots: {
    index: false,
    follow: false,
  },
};

function Swatch({
  name,
  token,
  value,
}: {
  name: string;
  token: string;
  value: string;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface-card shadow-sm">
      <div className={cn("h-16 w-full", token)} />
      <div className="space-y-0.5 p-3">
        <p className="text-small font-semibold text-ink">{name}</p>
        <p className="text-small text-muted">{value}</p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const {
    hero,
    colors,
    typography,
    radiiShadows,
    buttons,
    badges,
    cards,
    headings,
    sectionTones,
    sectionPatterns,
    sectionGlow,
    sectionDividers,
    accordion,
    tabs,
  } = designSystem;

  return (
    <main>
      <Section tone="surface">
        <SectionHeading
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          titleAs="h1"
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow={colors.eyebrow}
          title={colors.title}
          description={colors.description}
        />
        <div className="mt-10 space-y-8">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {colors.brand.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {colors.accent.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {colors.neutrals.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading
          eyebrow={typography.eyebrow}
          title={typography.title}
          description={typography.description}
        />
        <div className="mt-10 space-y-8">
          {typography.samples.map((sample) => (
            <div key={sample.label}>
              <p className="mb-2 text-small font-semibold uppercase tracking-[0.08em] text-muted">
                {sample.label}
              </p>
              <p className={sample.className}>{sample.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={radiiShadows.eyebrow}
          title={radiiShadows.title}
          description={radiiShadows.description}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {radiiShadows.radii.map((item) => (
            <div
              key={item.name}
              className={cn(
                "flex h-24 items-end border border-line bg-brand-50 p-3",
                item.className,
              )}
            >
              <span className="text-small font-semibold text-ink">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {radiiShadows.shadows.map((item) => (
            <div
              key={item.name}
              className={cn(
                "rounded-lg border border-line bg-surface-card p-6",
                item.className,
              )}
            >
              <span className="text-small font-semibold text-ink">{item.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title={buttons.title} description={buttons.description} />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="md">
            {buttons.primary}
          </Button>
          <Button variant="secondary" size="md">
            {buttons.secondary}
          </Button>
          <Button variant="ghost" size="md">
            {buttons.ghost}
          </Button>
          <Button variant="primary" size="lg" href="/#demo">
            {buttons.link}
          </Button>
        </div>

        <h3 className="mt-12 text-h3 font-semibold text-ink">{badges.title}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge tone="brand">{badges.brand}</Badge>
          <Badge tone="accent">{badges.accent}</Badge>
          <Badge tone="neutral">{badges.neutral}</Badge>
        </div>

        <h3 className="mt-12 text-h3 font-semibold text-ink">{cards.title}</h3>
        <Card className="mt-4 max-w-md">
          <p className="text-body leading-body text-muted">{cards.body}</p>
        </Card>

        <h3 className="mt-12 text-h3 font-semibold text-ink">{headings.title}</h3>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <SectionHeading
            eyebrow={headings.eyebrow}
            title={headings.heading}
            description={headings.description}
            align="left"
          />
          <SectionHeading
            eyebrow={headings.eyebrow}
            title={headings.heading}
            description={headings.description}
            align="center"
          />
        </div>
      </Section>

      <Section tone="white" contained={false}>
        <Container>
          <SectionHeading title={sectionTones.title} description={sectionTones.sample} />
        </Container>
        <div className="mt-8 space-y-0">
          {sectionTones.items.map((item) => (
            <Section
              key={item.tone}
              tone={item.tone as SectionTone}
              className="!py-10"
            >
              <p className="text-small font-semibold uppercase tracking-[0.08em] text-ink">
                {item.label}
              </p>
              <p className="mt-2 text-body leading-body text-muted">
                {sectionTones.sample}
              </p>
              <Card className="mt-5 max-w-md">
                <p className="text-body leading-body text-muted">
                  {sectionTones.cardBody}
                </p>
              </Card>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="primary" size="md">
                  {buttons.primary}
                </Button>
                <Button variant="secondary" size="md">
                  {buttons.secondary}
                </Button>
                <Button variant="ghost" size="md">
                  {buttons.ghost}
                </Button>
              </div>
            </Section>
          ))}
        </div>
      </Section>

      <Section tone="surface" contained={false}>
        <Container>
          <SectionHeading
            title={sectionPatterns.title}
            description={sectionPatterns.sample}
          />
        </Container>
        <div className="mt-8 space-y-0">
          {sectionPatterns.items.map((item) => (
            <Section
              key={item.pattern}
              tone={item.tone as SectionTone}
              pattern={item.pattern as SectionPattern}
              className="!py-10"
            >
              <p className="text-small font-semibold uppercase tracking-[0.08em] text-ink">
                {item.label}
              </p>
              <p className="mt-2 text-body leading-body text-muted">
                {sectionPatterns.sample}
              </p>
            </Section>
          ))}
        </div>
      </Section>

      <Section tone="dark" pattern="grid" className="relative">
        <GlowBlob color="brand" position="top-right" opacity={0.3} blur={120} />
        <GlowBlob color="accent" position="bottom-left" opacity={0.2} blur={100} />
        <SectionHeading
          title={sectionGlow.title}
          description={sectionGlow.sample}
        />
      </Section>

      <Section tone="white">
        <SectionHeading
          title={sectionDividers.title}
          description={sectionDividers.sample}
        />
        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-2 text-small font-semibold text-muted">
              {sectionDividers.wave}
            </p>
            <SectionDivider from="white" to="dark" variant="wave" />
          </div>
          <div>
            <p className="mb-2 text-small font-semibold text-muted">
              {sectionDividers.curve}
            </p>
            <SectionDivider from="dark" to="accent-soft" variant="curve" />
          </div>
          <div>
            <p className="mb-2 text-small font-semibold text-muted">
              {sectionDividers.slant}
            </p>
            <SectionDivider from="surface" to="brand" variant="slant" />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title={accordion.title} />
        <Accordion className="mt-8 max-w-2xl" items={[...accordion.items]} />

        <SectionHeading className="mt-14" title={tabs.title} />
        <Tabs
          className="mt-8 max-w-2xl"
          items={tabs.items.map((item) => ({
            id: item.id,
            label: item.label,
            content: item.content,
          }))}
        />
      </Section>

      <Section tone="surface">
        <MotionShowcase />
      </Section>

      <Section>
        <MocksShowcase />
      </Section>
    </main>
  );
}
