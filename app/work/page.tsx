import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import ProjectCard from "@/components/ProjectCard";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { caseStudies } from "@/lib/projects";

const filters = [
  "All",
  "Client Work",
  "Websites",
  "Products",
  "Business Systems",
  "Data and AI",
  "Brand Identity",
];

export const metadata: Metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "A central portfolio hub for CK Works projects across websites, products, business systems, data, AI, and prototypes.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="work-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CK Works Selected Work",
          url: absoluteUrl("/work"),
          hasPart: caseStudies.map((study) => ({
            "@type": "CreativeWork",
            name: study.name,
            url: absoluteUrl(`/${study.slug}`),
            description: study.oneLiner,
          })),
        }}
      />
      <PageHero
        label="Selected Work"
        title="Projects, prototypes, and systems brought into shape."
        description="This hub gives the portfolio a crawlable home while keeping the existing project URLs exactly where they are."
      />

      <ContentSection
        label="Filter Ready"
        title="Current projects"
        description="The filters are structural for now. They give us the surface to add client-side filtering once the project taxonomy is finalized."
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-medium text-forest"
            >
              {filter}
            </span>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study) => (
            <ProjectCard key={study.slug} study={study} />
          ))}
        </div>
      </ContentSection>

      <ContactCTA />
    </SiteLayout>
  );
}
