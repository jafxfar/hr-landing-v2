import type { MetadataRoute } from "next";
import { moduleSlugs } from "@/content/modules";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/modules`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...moduleSlugs.map((slug) => ({
      url: `${base}/modules/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
