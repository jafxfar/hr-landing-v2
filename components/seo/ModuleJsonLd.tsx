import type { ProductModule } from "@/content/types";
import { breadcrumbs, brand, site } from "@/content/landing";
import { visibleModulePoints } from "@/content/modules";
import { getSiteUrl } from "@/lib/siteUrl";

type ModuleJsonLdProps = {
  module: ProductModule;
};

export function ModuleJsonLd({ module }: ModuleJsonLdProps) {
  const base = getSiteUrl();
  const pageUrl = `${base}/modules/${module.slug}`;
  const faqItems = visibleModulePoints(module.faq);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbs.home,
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbs.modules,
        item: `${base}${breadcrumbs.modulesHref}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: module.title,
        item: pageUrl,
      },
    ],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${brand.full} — ${module.title}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: module.seo.description,
    url: pageUrl,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      priceCurrency: "UZS",
      url: pageUrl,
    },
    provider: {
      "@type": "Organization",
      name: site.name,
      url: base,
    },
  };

  const graphs: object[] = [breadcrumb, software];

  if (faqItems.length) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    });
  }

  return (
    <>
      {graphs.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
