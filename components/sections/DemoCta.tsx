"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { cta, footer, site } from "@/content/landing";
import { omitIfPlaceholder } from "@/content/placeholders";
import { track } from "@/lib/analytics";
import { leadFormSchema } from "@/lib/leadSchema";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "loading" | "success" | "error";

function telegramHref(): string | null {
  const contact = omitIfPlaceholder(site.telegram);
  if (!contact?.value) return null;
  const handle = contact.value.replace(/^@/, "");
  return `https://t.me/${handle}`;
}

export function DemoCta() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const privacy = omitIfPlaceholder(footer.privacy);
  const tg = telegramHref();

  const disabled = status === "loading" || status === "success";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const parsed = leadFormSchema.safeParse({
      name: data.get("name"),
      company: data.get("company"),
      contact: data.get("contact"),
      companySize: data.get("companySize"),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    });

    if (!parsed.success) {
      setStatus("error");
      setFeedback(cta.form.validationError);
      return;
    }

    const sizeLabel =
      cta.form.companySizeOptions.find(
        (option) => option.value === parsed.data.companySize,
      )?.label ?? parsed.data.companySize;

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          companySize: sizeLabel,
        }),
      });

      const json = (await res.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (res.status === 429) {
        setStatus("error");
        setFeedback(json?.error || cta.form.rateLimitError);
        return;
      }

      if (!res.ok || !json?.ok) {
        setStatus("error");
        setFeedback(json?.error || cta.form.error);
        return;
      }

      track("lead_submit", { companySize: sizeLabel });
      setStatus("success");
      setFeedback(cta.form.success);
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(cta.form.error);
    }
  };

  const inputClass =
    "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus-visible:border-brand-100 focus-visible:ring-2 focus-visible:ring-brand-500";

  return (
    <Section id={cta.id} tone="brand" pattern="grid">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full border border-white/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full border border-white/15"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-1/3 h-40 w-40 rounded-full border border-white/10"
      />
      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            eyebrow={cta.eyebrow}
            title={cta.title}
            description={cta.text}
          />

          <ul className="mt-8 space-y-3">
            {cta.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-[15px] text-muted"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-brand-100">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={cta.secondaryHref} variant="secondary" size="md">
              {cta.secondaryCta}
            </Button>
            {tg ? (
              <TrackedButton
                event="telegram_click"
                href={tg}
                variant="ghost"
                size="md"
              >
                {cta.telegramCta}
              </TrackedButton>
            ) : null}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-lg border border-line bg-surface-card p-6 md:p-8"
          noValidate
        >
          {/* Honeypot */}
          <div className="sr-only" aria-hidden>
            <label>
              {cta.form.honeypotLabel}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-muted">{cta.form.name}</span>
              <input
                name="name"
                required
                disabled={disabled}
                className={inputClass}
                placeholder={cta.form.namePlaceholder}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-2 block text-muted">{cta.form.company}</span>
              <input
                name="company"
                required
                disabled={disabled}
                className={inputClass}
                placeholder={cta.form.companyPlaceholder}
              />
            </label>
          </div>

          <label className="mt-4 block text-sm">
            <span className="mb-2 block text-muted">{cta.form.contact}</span>
            <input
              name="contact"
              required
              disabled={disabled}
              className={inputClass}
              placeholder={cta.form.contactPlaceholder}
            />
          </label>

          <label className="mt-4 block text-sm">
            <span className="mb-2 block text-muted">
              {cta.form.companySize}
            </span>
            <select
              name="companySize"
              required
              defaultValue=""
              disabled={disabled}
              className={cn(inputClass, "appearance-none")}
            >
              <option value="" disabled className="text-ink">
                {cta.form.companySize}
              </option>
              {cta.form.companySizeOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-ink"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-5 flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              disabled={disabled}
              className="mt-1 h-4 w-4 rounded border-white/30"
            />
            <span>
              {cta.form.consentPrefix}{" "}
              {privacy?.href ? (
                <Link
                  href={privacy.href}
                  className="underline decoration-line underline-offset-2 hover:text-ink"
                >
                  {cta.form.consentLinkLabel}
                </Link>
              ) : (
                <span>{cta.form.consentLinkLabel}</span>
              )}
              .
            </span>
          </label>

          <Button
            type="submit"
            disabled={disabled}
            variant="primary"
            size="md"
            className="mt-6 w-full"
            arrow={false}
          >
            {status === "loading" ? cta.form.submitting : cta.form.submit}
          </Button>

          {feedback ? (
            <p
              className={cn(
                "mt-4 text-sm",
                status === "error" ? "text-red-200" : "text-muted",
              )}
              role={status === "error" ? "alert" : "status"}
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
