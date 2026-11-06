import Image from "next/image";
import {
  Code2,
  Lock,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { trustStrip } from "@/content/landing";
import type { LucideIconName } from "@/content/types";
import { omitIfPlaceholder, withoutPlaceholders } from "@/content/placeholders";
import { cn } from "@/lib/cn";

const icons: Partial<Record<LucideIconName, LucideIcon>> = {
  Shield,
  Smartphone,
  Code2,
  Lock,
};

export function TrustStrip() {
  const section = omitIfPlaceholder(trustStrip);
  if (!section) return null;

  const logos =
    !section.logos.placeholder && section.logos.items.length > 0
      ? section.logos.items
      : [];
  const facts = withoutPlaceholders(section.facts);

  if (!logos.length && !facts.length) return null;

  return (
    <section
      id={section.id}
      className="overflow-x-hidden border-y border-line bg-white py-8 md:py-10"
      aria-label={section.id}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {logos.length > 0 ? (
          <ul className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <li key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={cn(
                    "h-8 w-auto object-contain opacity-70 grayscale",
                    "motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out",
                    "motion-reduce:transition-none",
                    "hover:opacity-100",
                  )}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => {
              const Icon = icons[fact.icon];
              return (
                <li
                  key={fact.title}
                  className="flex items-center gap-3 rounded-md border border-line bg-surface-card px-4 py-3 shadow-sm"
                >
                  {Icon ? (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  ) : null}
                  <span className="text-small font-semibold leading-snug text-ink">
                    {fact.title}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
