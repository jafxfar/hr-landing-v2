import Link from "next/link";
import {
  Clock,
  FileStack,
  GraduationCap,
  HeartHandshake,
  Network,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import { modulesHub } from "@/content/landing";
import { getModuleBySlug } from "@/content/modules";
import type { LucideIconName } from "@/content/types";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { Reveal } from "@/components/motion/Reveal";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/cn";

const icons: Partial<Record<LucideIconName, LucideIcon>> = {
  Network,
  UserSearch,
  Clock,
  HeartHandshake,
  GraduationCap,
  FileStack,
};

function ModuleMiniCard({
  slug,
  openLabel,
}: {
  slug: string;
  openLabel: string;
}) {
  const mod = getModuleBySlug(slug);
  if (!mod) return null;
  const Icon = icons[mod.icon];

  return (
    <Link
      href={`/modules/${mod.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-line bg-surface-card p-5 shadow-sm",
        "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-0.5",
        "hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
        {Icon ? <Icon className="h-5 w-5" aria-hidden /> : null}
      </span>
      <h3 className="mt-3 text-base font-semibold text-ink">{mod.title}</h3>
      <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-muted">
        {mod.tagline}
      </p>
      <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:text-brand-700">
        {openLabel}
      </span>
    </Link>
  );
}

export function ModulesHub() {
  const roleTabs = modulesHub.roles.map((role) => ({
    id: role.id,
    label: role.label,
    content: (
      <div>
        <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-muted">
          {role.text}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {role.moduleSlugs.map((slug) => (
            <ModuleMiniCard
              key={slug}
              slug={slug}
              openLabel={modulesHub.openModuleLabel}
            />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <article>
      <Section id="hub-hero" tone="surface" pattern="glow-top" className="pt-10 md:pt-14">
        <GlowBlob color="brand" position="top-right" opacity={0.16} blur={120} />
        <div className="relative max-w-3xl">
          <Reveal>
            <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
              {modulesHub.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-semibold tracking-tight text-ink">
              {modulesHub.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-body leading-relaxed text-muted">
              {modulesHub.text}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <TrackedButton
                event="demo_click"
                href={modulesHub.demoHref}
                size="lg"
                variant="primary"
              >
                {modulesHub.demoCta}
              </TrackedButton>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="hub-tasks" tone="white">
        <Reveal>
          <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
            {modulesHub.tasksEyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-tight text-ink">
            {modulesHub.tasksTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl text-body text-muted">
            {modulesHub.tasksText}
          </p>
        </Reveal>

        <div className="mt-8 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[14px]">
            <thead className="bg-surface">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-ink sm:px-5"
                >
                  {modulesHub.tasksWantLabel}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-ink sm:px-5"
                >
                  {modulesHub.tasksModuleLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {modulesHub.tasks.map((task) => {
                const mod = getModuleBySlug(task.moduleSlug);
                if (!mod) return null;
                return (
                  <tr
                    key={task.moduleSlug}
                    className="border-t border-line odd:bg-white even:bg-surface/40"
                  >
                    <td className="px-4 py-3.5 text-ink sm:px-5">{task.want}</td>
                    <td className="px-4 py-3.5 sm:px-5">
                      <Link
                        href={`/modules/${mod.slug}`}
                        className="font-semibold text-brand-600 transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        {mod.title} →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="hub-roles" tone="accent-soft">
        <Reveal>
          <p className="text-small font-semibold uppercase tracking-[0.08em] text-brand-600">
            {modulesHub.rolesEyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-tight text-ink">
            {modulesHub.rolesTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl text-body text-muted">
            {modulesHub.rolesText}
          </p>
        </Reveal>
        <div className="mt-8">
          <Tabs items={roleTabs} mountInactive={false} />
        </div>
      </Section>

      <SectionDivider from="accent-soft" to="brand" variant="slant" />
      <Section id="hub-demo" tone="brand">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-tight text-ink">
              {modulesHub.bottomDemoTitle}
            </h2>
            <p className="mt-2 text-body text-muted">{modulesHub.bottomDemoText}</p>
          </div>
          <TrackedButton
            event="demo_click"
            href={modulesHub.demoHref}
            size="lg"
            variant="primary"
          >
            {modulesHub.bottomDemoCta}
          </TrackedButton>
        </div>
      </Section>
    </article>
  );
}
