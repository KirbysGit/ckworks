import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://ckworks.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CK Works — Websites. Systems. Clarity.",
    template: "%s · CK Works",
  },
  description:
    "CK Works is a small digital studio by Colin Kirby. Clean websites and practical systems for growing businesses—design, automations, and integrations built to fit the way you work.",
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
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "CK Works — Websites. Systems. Clarity.",
    description:
      "Clean websites and practical systems for growing businesses, built by Colin Kirby.",
    siteName: "CK Works",
  },
  twitter: {
    card: "summary_large_image",
    title: "CK Works — Websites. Systems. Clarity.",
    description:
      "Clean websites and practical systems for growing businesses, built by Colin Kirby.",
  },
  // Icons are auto-generated from the app/ file convention:
  //   app/favicon.ico · app/icon.svg · app/icon.png · app/apple-icon.png
  // Do NOT also declare an `icons` block here — that emits duplicate,
  // conflicting <link> tags and the browser picks one at random.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
