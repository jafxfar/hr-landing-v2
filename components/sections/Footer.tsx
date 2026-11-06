import Image from "next/image";
import Link from "next/link";
import { footer, site } from "@/content/landing";
import { modulesCatalog } from "@/content/modules";
import type { SiteContact } from "@/content/types";
import { omitIfPlaceholder, withoutPlaceholders } from "@/content/placeholders";

function resolveContact(contact: SiteContact): SiteContact | null {
  const resolved = omitIfPlaceholder(contact);
  if (!resolved?.value) return null;
  return resolved;
}

export function Footer() {
  const year = new Date().getFullYear();
  const phone = resolveContact(site.phone);
  const telegram = resolveContact(site.telegram);
  const email = resolveContact(site.email);
  const legal = omitIfPlaceholder(footer.legal);
  const privacy = omitIfPlaceholder(footer.privacy);
  const offer = omitIfPlaceholder(footer.offer);

  return (
    <footer
      data-tone="dark"
      className="relative overflow-hidden overflow-x-hidden bg-dark text-white"
    >
      <div
        aria-hidden
        className="section-pattern-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_2fr] md:py-16 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo-mark.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 brightness-0 invert"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/65">
            {footer.tagline}
          </p>
          <ul className="mt-5 space-y-2 text-[14px] text-white/80">
            {phone ? (
              <li>
                <a
                  href={`tel:${phone.value!.replace(/\s+/g, "")}`}
                  className="transition hover:text-white"
                >
                  {phone.value}
                </a>
              </li>
            ) : null}
            {telegram ? (
              <li>
                <a
                  href={`https://t.me/${telegram.value!.replace(/^@/, "")}`}
                  className="transition hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {telegram.label ?? telegram.value}
                </a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a
                  href={`mailto:${email.value}`}
                  className="transition hover:text-white"
                >
                  {email.value}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footer.columns.map((column) => {
            const links = column.fromModules
              ? modulesCatalog.map((mod) => ({
                  label: mod.title,
                  href: `/modules/${mod.slug}`,
                }))
              : withoutPlaceholders(column.links).filter((link) =>
                  Boolean(link.href),
                );
            if (!links.length) return null;
            return (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href!}
                        className="text-[14px] text-white/75 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="space-y-2">
            {legal?.text ? (
              <p className="text-[13px] text-white/50">{legal.text}</p>
            ) : null}
            <p className="text-sm text-white/55">
              © {year} {site.name}. {footer.rights}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {privacy?.href ? (
              <Link
                href={privacy.href}
                className="text-sm text-white/55 transition hover:text-white"
              >
                {privacy.label}
              </Link>
            ) : null}
            {offer?.href ? (
              <Link
                href={offer.href}
                className="text-sm text-white/55 transition hover:text-white"
              >
                {offer.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
