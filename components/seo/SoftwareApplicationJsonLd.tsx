import { site } from "@/content/landing";
import { getSiteUrl } from "@/lib/siteUrl";

export function SoftwareApplicationJsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url,
    description: site.description,
    offers: {
      "@type": "Offer",
      url: `${url}/#pricing`,
      availability: "https://schema.org/InStock",
      description: "Тарифы уточняются на демо",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
