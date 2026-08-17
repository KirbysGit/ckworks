import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import { contactEmail } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

/**
 * The policy describes what the site actually does and nothing more.
 *
 * Every claim here is checkable in the repository:
 * - the inquiry form's fields are in `components/contact/ContactForm.tsx`
 * - it is emailed through Resend by `app/api/inquiry/route.ts`; nothing is
 *   written to a database
 * - the tracked interaction events are the union in `lib/analytics.ts`
 * - no application code sets a cookie, or reads localStorage/sessionStorage
 *
 * Anything added to the GTM container (`GTM-MD9GZV33`) is invisible to this
 * repository, so "What is collected automatically" has to be kept in sync by
 * hand when a tag is added or removed.
 *
 * `lastUpdated` should change whenever the substance does.
 */

const lastUpdated = "August 16, 2026";

/** Mirrors the AnalyticsEventName union in `lib/analytics.ts`. */
const trackedInteractions = [
  "starting and submitting the inquiry form",
  "opening the project inquiry window",
  "clicking the email, WhatsApp, or LinkedIn links",
  "viewing a service page or a case study",
] as const;

const providers = [
  {
    name: "Google (Analytics 4, Tag Manager)",
    role: "Measures page views and the interactions listed above.",
  },
  {
    name: "Microsoft Clarity",
    role: "Records how pages are used — mouse movement, clicks, and scrolling — as session replays and heatmaps.",
  },
  {
    name: "Vercel",
    role: "Hosts the site and provides aggregate traffic and performance data.",
  },
  {
    name: "Resend",
    role: "Delivers inquiry form submissions to the CK Works inbox.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How CK Works handles information from the inquiry form and website analytics, including Google Analytics, Microsoft Clarity, and the providers involved.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Privacy Policy"
        title="What this site collects, and why."
        description={`CK Works is a one-person studio. The site collects very little: what you choose to send through the inquiry form, and analytics about how pages are used. Last updated ${lastUpdated}.`}
      />

      <ContentSection
        label="What You Send"
        title="Information you provide directly."
      >
        <Prose>
          <p>
            The inquiry form asks for your name, email address, and a message.
            You can also add a phone number, company, timeline, and budget
            range, all of which are optional.
          </p>
          <p>
            That submission is emailed to the CK Works inbox so I can reply. It
            is not saved to a database, and it is not used for advertising,
            profiling, or any automated decision-making. If you email, message,
            or call directly, I keep that correspondence for the same reason.
          </p>
        </Prose>
      </ContentSection>

      <ContentSection
        label="What Is Collected Automatically"
        title="Analytics and session recording."
      >
        <Prose>
          <p>
            Like most websites, this one measures how it is used. Google
            Analytics records page views and a small set of named interactions:
          </p>
          <ul className="ml-5 list-disc space-y-1.5">
            {trackedInteractions.map((interaction) => (
              <li key={interaction}>{interaction}</li>
            ))}
          </ul>
          <p>
            Microsoft Clarity goes further than counting. It records{" "}
            <strong className="font-semibold text-ink">
              session replays and heatmaps
            </strong>{" "}
            — a reconstruction of mouse movement, clicks, and scrolling on the
            pages you visit — so I can see where the site is confusing. Clarity
            is configured to mask text you type, and I use it to understand
            layout problems, not to identify individual visitors.
          </p>
          <p>
            None of this is sold, and none of it is shared with anyone beyond
            the providers listed below.
          </p>
        </Prose>
      </ContentSection>

      <ContentSection label="Cookies" title="What gets stored in your browser.">
        <Prose>
          <p>
            CK Works&apos; own code sets no cookies and stores nothing in your
            browser. The analytics tools above set their own cookies and
            identifiers to recognize a returning visit and to stitch a session
            together.
          </p>
          <p>
            You can block or clear those through your browser settings, through
            Google&apos;s Analytics opt-out browser add-on, or through
            Clarity&apos;s opt-out. The site works normally either way.
          </p>
        </Prose>
      </ContentSection>

      <ContentSection
        label="Providers"
        title="Who else handles this information."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {providers.map((provider) => (
            <article
              key={provider.name}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <h3 className="font-serif text-xl font-medium text-ink">
                {provider.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                {provider.role}
              </p>
            </article>
          ))}
        </div>
        <Prose className="mt-8">
          <p>
            Each of these handles the data under its own terms and privacy
            policy. CK Works does not share your information with anyone else.
          </p>
        </Prose>
      </ContentSection>

      <ContentSection
        label="Retention And Your Choices"
        title="How long it is kept, and how to have it removed."
      >
        <Prose>
          <p>
            Inquiry emails and related correspondence are kept while we are in
            contact and for up to 24 months afterward, so I can pick a
            conversation back up. Analytics data is retained on the schedule
            each provider sets.
          </p>
          <p>
            You can ask what I hold about you, ask for it to be corrected, or
            ask for it to be deleted, by emailing{" "}
            <a
              className="font-medium text-forest underline underline-offset-4 transition-colors hover:text-ink"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            . There is no form to fill out and no account to close — I will
            handle it directly.
          </p>
        </Prose>
      </ContentSection>

      <ContentSection label="Scope" title="A few practical notes.">
        <Prose>
          <p>
            CK Works is based in the United States and works with clients in the
            United States. The site is not directed at children under 13, and I
            do not knowingly collect information from them.
          </p>
          <p>
            If this policy changes in any meaningful way, the date at the top of
            the page changes with it. Questions about any of this are welcome at{" "}
            <a
              className="font-medium text-forest underline underline-offset-4 transition-colors hover:text-ink"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            .
          </p>
        </Prose>
      </ContentSection>
    </SiteLayout>
  );
}

function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-2xl space-y-4 text-base leading-8 text-ink/80 ${className}`}
    >
      {children}
    </div>
  );
}
