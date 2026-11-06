import { Check } from "lucide-react";
import { hero } from "@/content/landing";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { HeroHeadline } from "@/components/sections/HeroHeadline";
import { LazyHeroVisual } from "@/components/sections/LazyHeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden overflow-x-hidden bg-white pb-16 pt-10 md:pb-20 md:pt-14 lg:pb-24">
      <GlowBlob color="brand" position="top-left" opacity={0.22} blur={120} size="22rem" />
      <GlowBlob color="accent" position="bottom-right" opacity={0.18} blur={120} size="20rem" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mesh-dots"
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 xl:gap-16">
        <div className="max-w-xl">
          <Badge tone="brand">{hero.eyebrow}</Badge>

          <div className="mt-5">
            <HeroHeadline />
          </div>

          <p className="mt-5 max-w-lg text-body leading-body text-muted">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedButton
              event="demo_click"
              href={hero.primaryHref}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
            >
              {hero.primaryCta}
            </TrackedButton>
            <Button
              href={hero.secondaryHref}
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              {hero.secondaryCta}
            </Button>
          </div>

          <p className="mt-4 text-small text-muted">{hero.note}</p>

          <ul className="mt-8 space-y-3">
            {hero.facts.map((fact) => (
              <li key={fact} className="flex items-start gap-2.5 text-[15px] text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <LazyHeroVisual />
      </div>
    </section>
  );
}
