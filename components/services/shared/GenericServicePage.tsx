/** Fallback structure for a future service before it earns a bespoke experience. */
import { Check } from "lucide-react";
import ContactCTA from "@/components/page/ContactCTA";
import ContentSection from "@/components/page/ContentSection";
import FAQSection from "@/components/page/FAQSection";
import PageHero from "@/components/page/PageHero";
import RelatedProjects from "@/components/page/RelatedProjects";
import RelatedServices from "@/components/page/RelatedServices";
import type { ServiceArea } from "@/lib/services";
import ServiceFrame from "./ServiceFrame";

export default function GenericServicePage({
  service,
}: {
  service: ServiceArea;
}) {
  return (
    <ServiceFrame service={service}>
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

      <section className="border-t border-line/70 py-12">
        <div className="container-ck">
          <FAQSection
            faqs={service.faqs}
            description="Common questions about working with CK Works and this service."
          />
        </div>
      </section>

      <ContactCTA
        title={`Need help with ${service.shortTitle.toLowerCase()}?`}
        description="Share where things stand now, and I will help you sort the practical next step."
        source={`${service.slug.replace(/-/g, "_")}_bottom_cta`}
      />
    </ServiceFrame>
  );
}
