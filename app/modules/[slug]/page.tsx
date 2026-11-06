import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/chrome/SiteChrome";
import { Footer } from "@/components/sections/Footer";
import { ModulePage } from "@/components/modules/ModulePage";
import { ModuleJsonLd } from "@/components/seo/ModuleJsonLd";
import { brand, breadcrumbs } from "@/content/landing";
import { getModuleBySlug, moduleSlugs } from "@/content/modules";
import { getSiteUrl } from "@/lib/siteUrl";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return moduleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const productModule = getModuleBySlug(slug);
  if (!productModule) {
    return { title: brand.full };
  }

  const canonical = `/modules/${productModule.slug}`;

  return {
    title: productModule.seo.title,
    description: productModule.seo.description,
    keywords: productModule.seo.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: productModule.seo.title,
      description: productModule.seo.description,
      url: `${getSiteUrl()}${canonical}`,
    },
  };
}

export default async function ModuleRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const productModule = getModuleBySlug(slug);
  if (!productModule) {
    notFound();
  }

  return (
    <>
      <ModuleJsonLd module={productModule} />
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
          <Link
            href={breadcrumbs.modulesHref}
            className="transition hover:text-ink"
          >
            {breadcrumbs.modules}
          </Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-ink">{productModule.title}</span>
        </nav>
        <ModulePage module={productModule} />
      </main>
      <Footer />
    </>
  );
}

export const dynamicParams = false;
