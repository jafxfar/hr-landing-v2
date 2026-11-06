"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  ChevronDown,
  Clock,
  FileStack,
  GraduationCap,
  HeartHandshake,
  Menu,
  Network,
  UserSearch,
  X,
  type LucideIcon,
} from "lucide-react";
import { a11y, modulesMega, nav, site } from "@/content/landing";
import { modulesCatalog } from "@/content/modules";
import { omitIfPlaceholder } from "@/content/placeholders";
import type { LucideIconName, NavItem } from "@/content/types";
import { TrackedButton } from "@/components/analytics/TrackedButton";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

function sectionIdFromHref(href: string): string | null {
  const hash = href.includes("#") ? href.split("#")[1] : null;
  return hash || null;
}

const moduleIcons: Partial<Record<LucideIconName, LucideIcon>> = {
  Network,
  UserSearch,
  Clock,
  HeartHandshake,
  GraduationCap,
  FileStack,
};

type HeaderProps = {
  className?: string;
  barClassName?: string;
};

export function Header({ className, barClassName }: HeaderProps) {
  const pathname = usePathname();
  const menuId = useId();
  const megaId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileModulesOpen, setMobileModulesOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [observedId, setObservedId] = useState<string | null>(null);

  const phone = omitIfPlaceholder(site.phone);
  const telegram = omitIfPlaceholder(site.telegram);
  const login = omitIfPlaceholder(nav.login);
  const onModulesPage = Boolean(pathname?.startsWith("/modules"));
  const activeId = onModulesPage ? "modules" : observedId;

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileModulesOpen(false);
  }, []);

  const openMega = useCallback(() => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
    setMegaOpen(true);
  }, []);

  const scheduleCloseMega = useCallback(() => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }, []);

  useEffect(() => {
    return () => {
      if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (onModulesPage) return;

    const ids = nav.items
      .map((item) => sectionIdFromHref(item.href))
      .filter((id): id is string => Boolean(id));

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio ||
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]?.target.id) {
          setObservedId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onModulesPage]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isItemActive = (item: NavItem) => {
    if (item.mega === "modules") return onModulesPage;
    const id = sectionIdFromHref(item.href);
    return id !== null && activeId === id;
  };

  const linkClass = (item: NavItem) => {
    const active = isItemActive(item);
    return cn(
      "rounded-lg px-3 py-2 text-sm font-semibold transition",
      active
        ? "bg-brand-50 text-brand-600 underline decoration-brand-500/40 underline-offset-4"
        : "text-ink/75 hover:bg-brand-50 hover:text-ink",
    );
  };

  const onBurgerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMobileOpen((open) => !open);
    }
  };

  return (
    <>
      <header
        className={cn(
          "border-b",
          scrolled
            ? "border-line bg-white/95 shadow-md backdrop-blur-md"
            : "border-transparent bg-white/80 shadow-none backdrop-blur-sm",
          className,
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
            barClassName,
          )}
        >
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
            {nav.items.map((item) =>
              item.mega === "modules" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <Link
                    href={item.href}
                    className={cn(linkClass(item), "inline-flex items-center gap-1")}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    aria-controls={megaId}
                    onFocus={openMega}
                    onBlur={scheduleCloseMega}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition",
                        megaOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </Link>

                  {megaOpen ? (
                    <div
                      id={megaId}
                      role="region"
                      aria-label={modulesMega.panelLabel}
                      className="absolute left-1/2 top-full z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 pt-2"
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleCloseMega}
                    >
                      <div className="rounded-lg border border-line bg-white p-3 shadow-lg">
                        <ul className="grid gap-1 sm:grid-cols-2">
                          {modulesCatalog.map((mod) => {
                            const Icon = moduleIcons[mod.icon];
                            return (
                              <li key={mod.slug}>
                                <Link
                                  href={`/modules/${mod.slug}`}
                                  className="flex gap-3 rounded-md px-3 py-2.5 transition hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                    {Icon ? (
                                      <Icon className="h-4 w-4" aria-hidden />
                                    ) : null}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-sm font-semibold text-ink">
                                      {mod.title}
                                    </span>
                                    <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                                      {mod.tagline}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="mt-2 border-t border-line pt-2">
                          <Link
                            href={modulesMega.allHref}
                            className="block rounded-md px-3 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                            onClick={() => setMegaOpen(false)}
                          >
                            {modulesMega.allLabel} →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-3 xl:flex">
              {phone?.value ? (
                <a
                  href={`tel:${phone.value.replace(/\s+/g, "")}`}
                  className="text-sm font-semibold text-ink/75 transition hover:text-ink"
                >
                  {phone.value}
                </a>
              ) : null}
              {telegram?.value ? (
                <a
                  href={`https://t.me/${telegram.value.replace(/^@/, "")}`}
                  className="text-sm font-semibold text-ink/75 transition hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("telegram_click")}
                >
                  {telegram.label ?? telegram.value}
                </a>
              ) : null}
              {login?.href ? (
                <Link
                  href={login.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/75 transition hover:bg-brand-50 hover:text-ink"
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

            <button
              ref={burgerRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-brand-50 xl:hidden"
              aria-label={mobileOpen ? a11y.closeMenu : a11y.openMenu}
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              onClick={() => setMobileOpen((open) => !open)}
              onKeyDown={onBurgerKeyDown}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          ref={panelRef}
          id={menuId}
          className="fixed inset-0 z-40 flex flex-col bg-white px-5 pb-10 pt-24 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={a11y.navLabel}
        >
          <nav className="mx-auto flex w-full max-w-md flex-col gap-1">
            {nav.items.map((item) =>
              item.mega === "modules" ? (
                <div key={item.href} className="flex flex-col">
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-lg font-bold",
                      linkClass(item),
                    )}
                    aria-expanded={mobileModulesOpen}
                    onClick={() => setMobileModulesOpen((open) => !open)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 transition",
                        mobileModulesOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {mobileModulesOpen ? (
                    <ul className="mb-2 ml-2 space-y-1 border-l border-line pl-3">
                      {modulesCatalog.map((mod) => (
                        <li key={mod.slug}>
                          <Link
                            href={`/modules/${mod.slug}`}
                            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink/80"
                            onClick={closeMobile}
                          >
                            {mod.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={modulesMega.allHref}
                          className="block rounded-lg px-3 py-2.5 text-base font-semibold text-brand-600"
                          onClick={closeMobile}
                        >
                          {modulesMega.allLabel} →
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-3.5 text-lg font-bold",
                    linkClass(item),
                  )}
                  onClick={closeMobile}
                >
                  {item.label}
                </Link>
              ),
            )}

            {phone?.value ? (
              <a
                href={`tel:${phone.value.replace(/\s+/g, "")}`}
                className="rounded-xl px-3 py-3.5 text-lg font-bold text-ink"
                onClick={closeMobile}
              >
                {phone.value}
              </a>
            ) : null}
            {telegram?.value ? (
              <a
                href={`https://t.me/${telegram.value.replace(/^@/, "")}`}
                className="rounded-xl px-3 py-3.5 text-lg font-bold text-ink"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("telegram_click");
                  closeMobile();
                }}
              >
                {telegram.label ?? telegram.value}
              </a>
            ) : null}
            {login?.href ? (
              <Link
                href={login.href}
                className="rounded-xl px-3 py-3.5 text-lg font-bold text-ink"
                onClick={closeMobile}
              >
                {login.label}
              </Link>
            ) : null}

            <TrackedButton
              event="demo_click"
              href={nav.cta.href}
              className="mt-6 w-full"
              size="lg"
              onClick={closeMobile}
            >
              {nav.cta.label}
            </TrackedButton>
          </nav>
        </div>
      ) : null}
    </>
  );
}
