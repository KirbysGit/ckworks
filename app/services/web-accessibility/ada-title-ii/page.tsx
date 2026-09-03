/**
 * Audience-specific ADA Title II page. It remains noindex while its supporting
 * sections are being implemented; remove that launch gate when the page is ready.
 */
import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import AdaTitleIiHero from "@/components/services/accessibility/title-ii/Hero";
import ContentContext from "@/components/services/accessibility/title-ii/ContentContext";
import CoveredSurfaces from "@/components/services/accessibility/title-ii/CoveredSurfaces";
import FirstSteps from "@/components/services/accessibility/title-ii/FirstSteps";
import ReviewProcess from "@/components/services/accessibility/title-ii/ReviewProcess";
import AdaTitleIiFaq from "@/components/services/accessibility/title-ii/Faq";
import AdaTitleIiBottomCta from "@/components/services/accessibility/title-ii/BottomCta";
import WhoIsAffected from "@/components/services/accessibility/title-ii/WhoIsAffected";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const path = "/services/web-accessibility/ada-title-ii";
const description =
  "Technical ADA Title II web accessibility support for state and local government websites, mobile applications, and public digital services.";

const pageMetadata = createPageMetadata({
  title: "ADA Title II Web Accessibility",
  description,
  path,
});

export const metadata: Metadata = {
  ...pageMetadata,
  robots: {
    index: false,
    follow: true,
  },
};

export default function AdaTitleIiPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="ada-title-ii-page-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "ADA Title II Web Accessibility",
              url: absoluteUrl(path),
              description,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Services",
                  item: absoluteUrl("/services"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Web Accessibility",
                  item: absoluteUrl("/services/web-accessibility"),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "ADA Title II",
                  item: absoluteUrl(path),
                },
              ],
            },
          ],
        }}
      />
      <AdaTitleIiHero />
      <WhoIsAffected />
      <CoveredSurfaces />
      <ContentContext />
      <FirstSteps />
      <ReviewProcess />
      <AdaTitleIiFaq />
      <AdaTitleIiBottomCta />
    </SiteLayout>
  );
}
