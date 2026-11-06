import { site } from "@/content/landing";
import { getSiteUrl } from "@/lib/siteUrl";

export function OrganizationJsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url,
    logo: `${url}/logo-mark.svg`,
    description: site.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
