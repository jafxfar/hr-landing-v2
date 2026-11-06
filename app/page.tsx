import type { Metadata } from "next";
import { HomeChrome } from "@/components/chrome/HomeChrome";
import { LazyHomeChromeExtras } from "@/components/chrome/LazyHomeChromeExtras";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { LazyHomeBelowFold } from "@/components/sections/LazyHomeBelowFold";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PainSolution } from "@/components/sections/PainSolution";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { SoftwareApplicationJsonLd } from "@/components/seo/SoftwareApplicationJsonLd";
import { site } from "@/content/landing";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: siteUrl,
  },
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      <FaqJsonLd />
      <HomeChrome />
      <main id="content">
        <Hero />
        <TrustStrip />
        <PainSolution />
        <LazyHomeBelowFold />
      </main>
      <LazyHomeChromeExtras />
      <Footer />
    </>
  );
}
