import type { Metadata } from "next";
import { Mail } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";
import WhatsAppContactLink from "@/components/WhatsAppContactLink";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { contactEmail } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const contactDescription =
  "Start a project with CK Works. Send details about your website, system, integration, analytics, or support needs.";

export const metadata: Metadata = createPageMetadata({
  title: "Start a Project",
  description: contactDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="contact-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Start a Project",
          url: absoluteUrl("/contact"),
          description: contactDescription,
        }}
      />
      <PageHero
        label="Start a Project"
        title="Tell me what you are working on."
        description="No perfect brief needed. Share where things stand, what feels unclear, and what you want the site or system to help with."
      />

      <ContentSection
        label="Inquiry"
        title="A simple form with room for attribution later."
        description="This form stays compatible with the current inquiry route while preparing landing page, referrer, and UTM fields for future lead tracking."
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <ContactForm />
          <aside className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <h2 className="font-serif text-2xl font-semibold text-ink">
              Other ways to reach me
            </h2>
            <div className="mt-5 space-y-3">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-ink"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
              <WhatsAppContactLink
                location="contact_page"
                className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-ink"
              >
                WhatsApp
              </WhatsAppContactLink>
            </div>
            <div className="mt-8 border-t border-line pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Response
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Expect a thoughtful reply with any clarifying questions, next
                steps, or a recommendation if there is a better path.
              </p>
            </div>
          </aside>
        </div>
      </ContentSection>
    </SiteLayout>
  );
}
