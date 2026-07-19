import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  siteDescription,
  siteName,
  siteTagline,
  siteUrl,
} from "@/lib/site";
import { contactEmail } from "@/lib/data";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "web design",
    "digital systems",
    "automations",
    "integrations",
    "small business websites",
    "Colin Kirby",
    "CK Works",
  ],
  authors: [{ name: "Colin Kirby" }],
  creator: "Colin Kirby",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${siteName} — ${siteTagline}`,
    description:
      "Clean websites and practical systems for growing businesses, built by Colin Kirby.",
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${siteTagline}`,
    description:
      "Clean websites and practical systems for growing businesses, built by Colin Kirby.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Icons: app/icon.svg · app/apple-icon.tsx · app/opengraph-image.tsx
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteName,
  url: siteUrl,
  email: contactEmail,
  description: siteDescription,
  slogan: siteTagline,
  founder: {
    "@type": "Person",
    name: "Colin Kirby",
  },
  areaServed: "US",
  sameAs: [] as string[],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
