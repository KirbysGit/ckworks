import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import ContactCTA from "@/components/page/ContactCTA";
import FAQSection from "@/components/page/FAQSection";
import RelatedProjects from "@/components/page/RelatedProjects";
import RelatedServices from "@/components/page/RelatedServices";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import ServiceViewed from "@/components/ServiceViewed";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { getServiceArea, serviceAreas } from "@/lib/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceAreas.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceArea(slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.description,
    path: service.href,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceArea(slug);
  if (!service) notFound();

  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <SchemaMarkup
        id={`${service.slug}-schema`}
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: service.title,
              url: absoluteUrl(service.href),
              description: service.description,
              provider: {
                "@type": "ProfessionalService",
                name: "CK Works",
                url: absoluteUrl("/"),
              },
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
                  name: service.title,
                  item: absoluteUrl(service.href),
                },
              ],
            },
          ],
        }}
      />
      <PageHero
        label={service.eyebrow}
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <ContentSection
        label="Who It Is For"
        title="This is a fit when the business needs practical clarity."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {service.whoFor.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border border-line bg-card p-5 shadow-soft"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft">
                <Check className="h-3 w-3 text-forest" />
              </span>
              <p className="text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        label="Scope Skeleton"
        title="What this service can include."
        description="These are the content blocks to refine as the service pages become more designed and specific."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {service.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <h2 className="font-serif text-2xl font-semibold leading-tight text-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection label="Relevant Work" title="Related examples from CK Works.">
        <RelatedProjects slugs={service.relevantProjectSlugs} />
      </ContentSection>

      <ContentSection label="Related Services" title="Other pieces that may connect.">
        <RelatedServices slugs={service.relatedServiceSlugs} />
      </ContentSection>

      <ContentSection label="FAQ" title="Questions this page should answer.">
        <FAQSection faqs={service.faqs} />
      </ContentSection>

      <ContactCTA
        title={`Need help with ${service.shortTitle.toLowerCase()}?`}
        description="Share where things stand now, and I will help you sort the practical next step."
      />
    </SiteLayout>
  );
}
