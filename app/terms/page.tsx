import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import { createPageMetadata } from "@/lib/seo";

const termSections = [
  "Website use",
  "Project inquiries",
  "Intellectual property",
  "Third-party links",
  "No guarantees",
  "Contact information",
];

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description:
    "A structured placeholder terms page for CK Works, prepared for future legal review.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Terms"
        title="Terms placeholder."
        description="This is a structured placeholder for future website terms and should be reviewed before publication as complete terms."
      />

      <ContentSection label="Needs Review" title="Terms sections to complete.">
        <div className="grid gap-4 md:grid-cols-2">
          {termSections.map((section) => (
            <article
              key={section}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <h2 className="font-serif text-2xl font-semibold text-ink">
                {section}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Placeholder only. Replace with reviewed language before relying
                on this section.
              </p>
            </article>
          ))}
        </div>
      </ContentSection>
    </SiteLayout>
  );
}
