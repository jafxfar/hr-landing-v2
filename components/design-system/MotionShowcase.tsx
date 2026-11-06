"use client";

import { designSystem } from "@/content/designSystem";
import { CountUp } from "@/components/motion/CountUp";
import { GradientBorder } from "@/components/motion/GradientBorder";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Spotlight } from "@/components/motion/Spotlight";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const { motion: copy } = designSystem;

export function MotionShowcase() {
  return (
    <div className="space-y-14">
      <ScrollProgress topClassName="top-0" />

      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
      />

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.revealTitle}</h3>
        <Reveal>
          <Card>
            <p className="text-body leading-body text-muted">{copy.revealBody}</p>
          </Card>
        </Reveal>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.staggerTitle}</h3>
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {copy.staggerItems.map((item) => (
            <StaggerItem key={item}>
              <Card className="text-center">
                <p className="text-small font-semibold text-ink">{item}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.countTitle}</h3>
        <Card className="max-w-xs">
          <p className="text-small text-muted">{copy.countLabel}</p>
          <p className="mt-2 text-h2 font-semibold text-ink">
            <CountUp value={128} suffix="+" />
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.marqueeTitle}</h3>
        <div className="rounded-lg border border-line bg-surface-card py-4">
          <Marquee>
            {copy.marqueeItems.map((item) => (
              <span
                key={item}
                className="rounded-md border border-line bg-brand-50 px-4 py-2 text-small font-semibold text-brand-700"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.spotlightTitle}</h3>
        <Spotlight className="max-w-lg">
          <p className="text-body leading-body text-muted">{copy.spotlightBody}</p>
        </Spotlight>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.gradientTitle}</h3>
        <GradientBorder className="max-w-lg">
          <p className="text-body leading-body text-muted">{copy.gradientBody}</p>
        </GradientBorder>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.scrollTitle}</h3>
        <p className="text-body leading-body text-muted">{copy.scrollBody}</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.buttonTitle}</h3>
        <Button variant="primary">{copy.buttonLabel}</Button>
      </div>

      <div className="space-y-3">
        <h3 className="text-h3 font-semibold text-ink">{copy.cardTitle}</h3>
        <Card className="max-w-md">
          <p className="text-body leading-body text-muted">{copy.cardBody}</p>
        </Card>
      </div>
    </div>
  );
}
