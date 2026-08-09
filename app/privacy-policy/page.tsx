import type { Metadata } from "next";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import { createPageMetadata } from "@/lib/seo";

const privacySections = [
  "Analytics collection",
  "Contact-form information",
  "Cookies and similar technologies",
  "Third-party services",
  "Data retention",
  "Contact information",
];

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "A placeholder privacy policy page for CK Works covering analytics, contact forms, cookies, third-party services, and data retention.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Privacy Policy"
        title="Privacy policy placeholder."
        description="This page is structured for the policy CK Works needs, but the final language should be reviewed before relying on it as legal terms."
      />

      <ContentSection
        label="Needs Review"
        title="Sections to finalize before publication."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {privacySections.map((section) => (
            <article
              key={section}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <h2 className="font-serif text-2xl font-semibold text-ink">
                {section}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Placeholder only. Add accurate, reviewed language for this
                section before treating the page as complete.
              </p>
            </article>
          ))}
        </div>
      </ContentSection>
    </SiteLayout>
  );
}
