import Image from "next/image";
import Link from "next/link";
import { a11y, nav, site } from "@/content/landing";
import { omitIfPlaceholder } from "@/content/placeholders";
import { TrackedButton } from "@/components/analytics/TrackedButton";

/**
 * Lightweight RSC chrome for `/` — avoids Header client bundle on LCP path.
 * Module pages keep full SiteChrome.
 */
export function HomeChrome() {
  const phone = omitIfPlaceholder(site.phone);
  const telegram = omitIfPlaceholder(site.telegram);
  const login = omitIfPlaceholder(nav.login);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo-mark.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="text-[15px] font-bold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label={a11y.navLabel}
        >
          {nav.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/75 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-3 xl:flex">
            {phone?.value ? (
              <a
                href={`tel:${phone.value.replace(/\s+/g, "")}`}
                className="text-sm font-semibold text-ink/75 hover:text-ink"
              >
                {phone.value}
              </a>
            ) : null}
            {telegram?.value ? (
              <a
                href={`https://t.me/${telegram.value.replace(/^@/, "")}`}
                className="text-sm font-semibold text-ink/75 hover:text-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {telegram.label ?? telegram.value}
              </a>
            ) : null}
            {login?.href ? (
              <Link
                href={login.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/75 hover:bg-brand-50 hover:text-ink"
              >
                {login.label}
              </Link>
            ) : null}
            <TrackedButton
              event="demo_click"
              href={nav.cta.href}
              size="md"
              variant="primary"
            >
              {nav.cta.label}
            </TrackedButton>
          </div>

          <details className="relative xl:hidden">
            <summary
              className="flex h-10 w-10 list-none items-center justify-center rounded-full border border-line text-ink marker:content-none [&::-webkit-details-marker]:hidden"
              aria-label={a11y.openMenu}
            >
              <span className="flex flex-col gap-1" aria-hidden>
                <span className="block h-0.5 w-4 rounded-full bg-ink" />
                <span className="block h-0.5 w-4 rounded-full bg-ink" />
                <span className="block h-0.5 w-4 rounded-full bg-ink" />
              </span>
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-lg border border-line bg-surface-card p-3 shadow-lg">
              <nav className="flex flex-col gap-1" aria-label={a11y.navLabel}>
                {nav.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-sm font-semibold text-ink hover:bg-brand-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-3 border-t border-line pt-3">
                <TrackedButton
                  event="demo_click"
                  href={nav.cta.href}
                  size="md"
                  variant="primary"
                  className="w-full"
                >
                  {nav.cta.label}
                </TrackedButton>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
