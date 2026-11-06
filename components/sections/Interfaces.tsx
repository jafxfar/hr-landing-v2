"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import { interfaces } from "@/content/landing";
import { productScreens } from "@/content/productScreens";
import type { InterfaceTab } from "@/content/types";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const AUTO_MS = 6000;

const tabMedia: Record<
  string,
  | { kind: "browser"; screen: (typeof productScreens)[keyof typeof productScreens] }
  | {
      kind: "phones";
      screens: Array<(typeof productScreens)[keyof typeof productScreens]>;
    }
> = {
  admin: { kind: "browser", screen: productScreens.adminStats },
  portal: { kind: "browser", screen: productScreens.platformHome },
  mobile: {
    kind: "phones",
    screens: [productScreens.mobileHome, productScreens.mobileCourses],
  },
};

function BrowserFrame({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface-card shadow-[0_16px_40px_color-mix(in_srgb,var(--brand-500)_25%,transparent)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-line bg-surface px-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-window-dot-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-window-dot-yellow" />
        <span className="h-2.5 w-2.5 rounded-full bg-window-dot-green" />
        <span className="ml-3 truncate text-[11px] font-medium text-muted">
          {caption}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full bg-surface">
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function TabCopy({ item }: { item: InterfaceTab }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-h3 font-semibold tracking-tight text-ink">
          {item.title}
        </h3>
        {item.badge ? <Badge tone="accent">{item.badge}</Badge> : null}
      </div>
      <p className="mt-3 text-body leading-body text-muted">{item.description}</p>
      <ul className="mt-5 space-y-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-[15px] text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Check className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <Button href={interfaces.demoHref} variant="secondary" size="md">
          {interfaces.demoCta}
        </Button>
      </div>
    </div>
  );
}

function TabMedia({ item }: { item: InterfaceTab }) {
  const media = tabMedia[item.id];
  if (!media) return null;

  if (media.kind === "browser") {
    return (
      <BrowserFrame
        src={media.screen.src}
        alt={media.screen.alt}
        caption={item.title}
      />
    );
  }

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      {media.screens.map((screen, index) => (
        <PhoneFrame
          key={screen.id}
          size={index === 0 ? "md" : "sm"}
          className={cn(
            "shadow-[0_16px_40px_color-mix(in_srgb,var(--brand-500)_25%,transparent)]",
            index === 1 && "mb-4 sm:mb-6",
          )}
        >
          <Image
            src={screen.src}
            alt={screen.alt}
            fill
            priority={false}
            sizes="220px"
            className="object-cover object-top"
          />
        </PhoneFrame>
      ))}
    </div>
  );
}

export function Interfaces() {
  const items = interfaces.items;
  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2, margin: "40px 0px" });

  const activeItem = items[activeIndex] ?? items[0];

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + items.length) % items.length);
    setProgressKey((k) => k + 1);
  }, [items.length]);

  useEffect(() => {
    if (reduced || paused || !inView || items.length < 2) return;

    // No autoplay on small viewports — saves main-thread + battery
    const mobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;
    if (mobile) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % items.length);
      setProgressKey((k) => k + 1);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [inView, items.length, paused, progressKey, reduced]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = (index + 1) % items.length;
      goTo(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const next = (index - 1 + items.length) % items.length;
      goTo(next);
      tabRefs.current[next]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
      tabRefs.current[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(items.length - 1);
      tabRefs.current[items.length - 1]?.focus();
    }
  };

  if (!activeItem) return null;

  return (
    <Section id={interfaces.id} tone="dark" pattern="grid">
      <GlowBlob color="brand" position="top-left" opacity={0.28} blur={120} />
      <GlowBlob color="accent" position="bottom-right" opacity={0.22} blur={100} />
      <SectionHeading
        eyebrow={interfaces.eyebrow}
        title={interfaces.title}
        description={interfaces.text}
      />

      <div
        ref={rootRef}
        className="mt-10"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          const next = event.relatedTarget as Node | null;
          if (!rootRef.current?.contains(next)) {
            setPaused(false);
          }
        }}
      >
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex flex-wrap gap-1 rounded-md border border-line bg-surface-card p-1 shadow-sm"
        >
          {items.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`${baseId}-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "relative min-h-11 overflow-hidden rounded-sm px-4 py-2 text-small font-semibold transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  selected
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-muted hover:bg-brand-50 hover:text-ink",
                )}
                onClick={() => goTo(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="relative z-[1]">{item.label}</span>
                {selected && !reduced ? (
                  <span
                    key={progressKey}
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left motion-safe:animate-[interfaces-tab-progress_6s_linear_forwards] motion-reduce:animate-none bg-white/80"
                    style={{
                      animationPlayState:
                        paused || !inView ? "paused" : "running",
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeItem.id}`}
          className="mt-6"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`copy-${activeItem.id}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <TabCopy item={activeItem} />
              </motion.div>
            </AnimatePresence>

            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`media-${activeItem.id}`}
                  initial={
                    reduced ? false : { opacity: 0, scale: 0.98 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <TabMedia item={activeItem} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
