import type { Metadata } from "next";
import Script from "next/script";
import { Bodoni_Moda, Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  siteDescription,
  siteName,
  siteTagline,
  siteUrl,
} from "@/lib/site";
import { ProjectInquiryProvider } from "@/components/ProjectInquiryProvider";
import { gtmId } from "@/lib/analytics";
import {
  contactEmail,
  contactLinkedInUrl,
  contactPhoneE164,
  contactWhatsAppUrl,
  services,
} from "@/lib/data";
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

/** High-contrast Didone for display numerals (mobile process chapters, etc.). */
const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | ${siteTagline}`,
    template: `%s | ${siteName}`,
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
    title: `${siteName} | ${siteTagline}`,
    description:
      "Clean websites and practical systems for growing businesses, built by Colin Kirby.",
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | ${siteTagline}`,
    description:
      "Clean websites and practical systems for growing businesses, built by Colin Kirby.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "color-scheme": "light only",
  },
  // Icons: app/icon.png · app/apple-icon.png · app/opengraph-image.tsx
};

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en-US",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "ProfessionalService",
      "@id": organizationId,
      name: siteName,
      url: siteUrl,
      email: contactEmail,
      description: siteDescription,
      slogan: siteTagline,
      logo: `${siteUrl}/images/brand/ck-icon-logo.png`,
      image: `${siteUrl}/opengraph-image`,
      sameAs: [contactLinkedInUrl],
      founder: {
        "@type": "Person",
        name: "Colin Kirby",
        jobTitle: "Founder",
        url: siteUrl,
        sameAs: [contactLinkedInUrl],
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        telephone: contactPhoneE164,
        url: contactWhatsAppUrl,
        availableLanguage: ["English"],
      },
      knowsAbout: [
        "Web design",
        "Digital systems",
        "Business automations",
        "Software integrations",
        "Website support",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CK Works services",
        itemListElement: services.map((service, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.body,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${display.variable}`}
    >
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectInquiryProvider>{children}</ProjectInquiryProvider>
        <Analytics />
      </body>
    </html>
  );
}
