"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  ChartColumn,
  CheckCircle2,
  ClipboardList,
  Clock,
  GraduationCap,
  HeartHandshake,
  Network,
  Shield,
  Smartphone,
  Sparkles,
  User,
  UserSearch,
  Users,
  type LucideIcon,
} from "lucide-react";
import { roleSwitcher } from "@/content/landing";
import type { LucideIconName, RoleSwitcherRoleId } from "@/content/types";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import {
  MOTION_DURATION,
  motionEase,
} from "@/components/motion/constants";
import { usePrefersReducedMotion } from "@/components/motion/reducedMotion";
import { RolePreviewEmployee } from "@/components/sections/role-previews/RolePreviewEmployee";
import { RolePreviewHr } from "@/components/sections/role-previews/RolePreviewHr";
import { RolePreviewManager } from "@/components/sections/role-previews/RolePreviewManager";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons: Partial<Record<LucideIconName, LucideIcon>> = {
  Users,
  Briefcase,
  User,
  Network,
  UserSearch,
  Clock,
  GraduationCap,
  ChartColumn,
  Shield,
  ClipboardList,
  Building2,
  Smartphone,
  Calendar,
  Bell,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
};

const roleOrder = roleSwitcher.roles.map((r) => r.id);

function RolePreview({ roleId }: { roleId: RoleSwitcherRoleId }) {
  if (roleId === "hr") {
    return <RolePreviewHr windowCaption="Воронка найма" />;
  }
  if (roleId === "manager") {
    return <RolePreviewManager windowCaption="Согласования и KPI" />;
  }
  return <RolePreviewEmployee />;
}

export function RoleSwitcher() {
  const baseId = useId();
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<RoleSwitcherRoleId>(
    roleSwitcher.roles[0]?.id ?? "hr",
  );
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const active =
    roleSwitcher.roles.find((role) => role.id === activeId) ??
    roleSwitcher.roles[0];

  const selectRole = useCallback((id: RoleSwitcherRoleId) => {
    setActiveId(id);
    setProgressKey((k) => k + 1);
  }, []);

  const nextRole = useCallback(() => {
    const index = roleOrder.indexOf(activeId);
    const next = roleOrder[(index + 1) % roleOrder.length];
    if (next) selectRole(next);
  }, [activeId, selectRole]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      nextRole();
    }, roleSwitcher.autoIntervalMs);
    return () => window.clearInterval(id);
  }, [reduced, paused, nextRole, progressKey]);

  if (!active) return null;

  const panelId = `${baseId}-panel`;
  const visibleBenefits = active.benefits.filter(
    (b) => !(b.placeholder && process.env.NODE_ENV === "production"),
  );

  const onTablistKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const index = roleOrder.indexOf(activeId);
    if (index < 0) return;

    let nextIndex = index;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        nextIndex = (index + 1) % roleOrder.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        nextIndex = (index - 1 + roleOrder.length) % roleOrder.length;
        break;
      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        event.preventDefault();
        nextIndex = roleOrder.length - 1;
        break;
      default:
        return;
    }
    const next = roleOrder[nextIndex];
    if (next) {
      selectRole(next);
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
    }
  };

  return (
    <Section id={roleSwitcher.id} tone="gradient-soft" wash="brand-white">
      <GlowBlob color="brand" position="top-right" opacity={0.2} blur={120} />
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setPaused(false);
          }
        }}
      >
        <SectionHeading
          eyebrow={roleSwitcher.eyebrow}
          title={roleSwitcher.title}
          description={roleSwitcher.text}
        />

        <div
          role="tablist"
          aria-label={roleSwitcher.title}
          className="mt-10 flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={onTablistKeyDown}
        >
          {roleSwitcher.roles.map((role) => {
            const selected = role.id === activeId;
            const Icon = icons[role.icon];
            return (
              <button
                key={role.id}
                id={`${baseId}-tab-${role.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "relative min-w-[min(100%,17rem)] shrink-0 snap-start rounded-lg p-px text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                  selected
                    ? "bg-gradient-to-br from-brand-500 to-accent-500 shadow-md"
                    : "bg-line",
                )}
                onClick={() => selectRole(role.id)}
              >
                <span
                  className={cn(
                    "relative flex h-full flex-col gap-1 overflow-hidden rounded-[calc(var(--radius-md)-1px)] px-4 py-3.5",
                    selected
                      ? "bg-white"
                      : "bg-surface-card hover:bg-brand-50/60",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-md",
                        selected
                          ? "bg-brand-50 text-brand-600"
                          : "bg-surface text-muted",
                      )}
                    >
                      {Icon ? (
                        <Icon className="h-[18px] w-[18px]" aria-hidden />
                      ) : null}
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {role.label}
                    </span>
                  </span>
                  <span className="pl-[2.875rem] text-[13px] leading-snug text-muted">
                    {role.description}
                  </span>
                  {selected && !reduced ? (
                    <span
                      className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-brand-100"
                      aria-hidden
                    >
                      <span
                        key={progressKey}
                        className={cn(
                          "role-progress-bar block h-full bg-gradient-to-r from-brand-500 to-accent-500",
                          paused && "is-paused",
                        )}
                        style={
                          {
                            "--role-progress-ms": `${roleSwitcher.autoIntervalMs}ms`,
                          } as CSSProperties
                        }
                      />
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <div className="flex min-h-0 flex-col gap-8">
            <div>
              <h3 className="text-h3 font-semibold tracking-tight text-ink">
                {active.headline}
              </h3>
              <ul className="mt-5 space-y-3">
                {visibleBenefits.map((benefit) => {
                  const Icon = icons[benefit.icon];
                  return (
                    <li key={benefit.text} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                        {Icon ? (
                          <Icon className="h-[18px] w-[18px]" aria-hidden />
                        ) : null}
                      </span>
                      <span className="pt-1.5 text-[15px] leading-snug text-ink">
                        {benefit.text}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 rounded-lg border border-line bg-surface p-4">
                <p className="text-small font-semibold uppercase tracking-[0.06em] text-muted">
                  {roleSwitcher.changeLabel}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted line-through decoration-muted/35">
                  {active.change.before}
                </p>
                <p className="mt-1.5 flex items-start gap-2 text-[14px] font-semibold leading-relaxed text-ink">
                  <ArrowRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    aria-hidden
                  />
                  {active.change.after}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <TrackedButton
                event="demo_click"
                href={active.ctaHref}
                variant="primary"
                size="md"
              >
                {active.ctaLabel}
              </TrackedButton>
              <Link
                href={roleSwitcher.modulesHref}
                className="text-sm font-semibold text-brand-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {active.modulesCtaLabel}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{
                  duration: MOTION_DURATION.base,
                  ease: motionEase,
                }}
              >
                <RolePreview roleId={active.id} />
              </motion.div>
            </AnimatePresence>
            <p className="text-center text-[11px] text-muted">
              {roleSwitcher.demoDataCaption}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
