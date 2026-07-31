import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import ServiceCard from "@/components/page/ServiceCard";
import { createPageMetadata, absoluteUrl } from "@/lib/seo";
import { serviceAreas } from "@/lib/services";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore CK Works services for websites, search visibility, analytics, digital systems, integrations, and ongoing support.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="services-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CK Works Services",
          url: absoluteUrl("/services"),
          hasPart: serviceAreas.map((service) => ({
            "@type": "Service",
            name: service.title,
            url: absoluteUrl(service.href),
            description: service.description,
          })),
        }}
      />
      <PageHero
        label="Services"
        title="Clear websites, useful systems, and the pieces around them."
        description="The CK Works service structure is intentionally simple: make the digital presence clearer, easier to find, easier to measure, and easier to maintain."
      />

      <ContentSection
        label="What Fits"
        title="Five practical ways CK Works can help."
        description="Each page below is a skeleton for the service offer. The structure is ready for stronger examples, visuals, FAQs, and proof as the business grows."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceAreas.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </ContentSection>

      <ContactCTA />
    </SiteLayout>
  );
}
