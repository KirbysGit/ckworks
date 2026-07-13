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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
