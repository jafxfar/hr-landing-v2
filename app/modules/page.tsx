import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/chrome/SiteChrome";
import { ModulesHub } from "@/components/modules/ModulesHub";
import { Footer } from "@/components/sections/Footer";
import { breadcrumbs, modulesHub } from "@/content/landing";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: modulesHub.seo.title,
  description: modulesHub.seo.description,
  alternates: {
    canonical: "/modules",
  },
  openGraph: {
    title: modulesHub.seo.title,
    description: modulesHub.seo.description,
    url: `${getSiteUrl()}/modules`,
  },
};

export default function ModulesHubPage() {
  return (
    <>
      <SiteChrome />
      <main>
        <nav
          aria-label={breadcrumbs.ariaLabel}
          className="section-pad mx-auto max-w-[1100px] pt-6 text-sm text-muted"
        >
          <Link href={breadcrumbs.homeHref} className="transition hover:text-ink">
            {breadcrumbs.home}
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-ink">{breadcrumbs.modules}</span>
        </nav>
        <ModulesHub />
      </main>
      <Footer />
    </>
  );
}
