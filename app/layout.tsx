import type { Metadata } from "next";
import { Onest, Roboto_Condensed } from "next/font/google";
import { site } from "@/content/landing";
import { Analytics } from "@/components/analytics/Analytics";
import { SkipLink } from "@/components/a11y/SkipLink";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";

const onest = Onest({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-display-face",
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  style: ["italic"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${onest.variable} ${robotoCondensed.variable} h-full antialiased`}
    >
      <body className="plus-grid min-h-full bg-surface font-sans text-ink">
        <SkipLink />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
