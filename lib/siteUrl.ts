import { site } from "@/content/landing";

/** Canonical origin without trailing slash. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (site.url) return site.url.replace(/\/$/, "");
  return "http://127.0.0.1:3002";
}
