import type { Metadata } from "next";
import { Mail } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppContactLink from "@/components/contact/WhatsAppContactLink";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { contactEmail } from "@/lib/data";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

/**
 * The whole point of this page is the form, so it gets one compact band rather
 * than the shared `PageHero` plus a `ContentSection` heading. Those stacked two
 * titles on top of each other and pushed the form 653px down the document, far
 * enough that the submit button needed 404px of scroll on a 900px viewport.
 *
 * Keep the intro to three short blocks. Anything added above the card comes
 * straight out of how much of the form is visible on arrival.
 */

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

      <section className="bg-ivory pb-12 pt-6 sm:pt-7 lg:pb-16 lg:pt-8">
        <div className="container-ck">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Contact
            </p>
            <h1 className="mt-3 font-serif text-[2.4rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink sm:text-[2.9rem] lg:text-[2.95rem]">
              Tell me what you&apos;re working on.
            </h1>
            <p className="mx-auto mt-3.5 max-w-xl text-base leading-7 text-ink/76 sm:text-[1.05rem]">
              No perfect brief needed. Share where things stand, what feels
              unclear, and what you&apos;d like the site or system to help with.
            </p>

            {/* Keep the service area and response time as two compact facts so
                the location line never wraps into an accidental third item. */}
            <ul className="mt-4 flex flex-col items-center gap-1 text-sm text-muted">
              <li className="flex items-center justify-center gap-2.5">
                <span>Orlando, Florida</span>
                <span className="text-line" aria-hidden>
                  ·
                </span>
                <span>Working nationwide</span>
              </li>
              <li>Replies within one business day</li>
            </ul>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-card shadow-soft lg:mt-6">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
              <ContactForm />
              <ContactAside />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactAside() {
  return (
    <aside className="rounded-b-2xl border-t border-line bg-card px-6 py-7 text-center sm:px-7 lg:rounded-b-none lg:rounded-r-2xl lg:border-l lg:border-t-0 lg:px-7 lg:py-8">
      <AsideHeading>Other ways to reach me</AsideHeading>

      <div className="mt-5 flex flex-col items-center gap-3.5">
        <a
          href={`mailto:${contactEmail}`}
          className="group flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-forest"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
            <Mail className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-forest/50">
            {contactEmail}
          </span>
        </a>

        <WhatsAppContactLink
          location="contact_page"
          iconBadge
          className="group flex items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-forest"
          iconClassName="h-4 w-4"
        >
          <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-forest/50">
            WhatsApp
          </span>
        </WhatsAppContactLink>
      </div>

      <div className="mt-8 border-t border-line pt-7">
        <AsideHeading>What happens next</AsideHeading>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted">
          I&apos;ll read through what you send and reply with any questions, a
          recommended next step, or a better path if one makes more sense.
        </p>
      </div>
    </aside>
  );
}

function AsideHeading({ children }: { children: string }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
        {children}
      </p>
      <span
        className="mx-auto mt-2.5 block h-px w-8 bg-forest/50"
        aria-hidden
      />
    </>
  );
}
