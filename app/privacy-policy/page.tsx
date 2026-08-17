import type { Metadata } from "next";

import { BarChart3, Cloud, Mail, MousePointerClick } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHero from "@/components/page/PageHero";
import {
  LegalCallout,
  LegalEmail,
  LegalListItem,
  LegalSection,
  LegalUpdatedBar,
} from "@/components/page/LegalSection";
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
 * Layout follows the house band pattern: the numbered heading introduces on
 * the left and the prose sits on the right, which keeps a readable measure
 * without stranding it in a narrow column inside a wide container.
 *
 * `lastUpdated` should change whenever the substance does.
 */

const lastUpdated = "August 16, 2026";

/** Mirrors the AnalyticsEventName union in `lib/analytics.ts`. */
const trackedInteractions = [
  "Starting and submitting the inquiry form",
  "Opening the project inquiry window",
  "Clicking the email, WhatsApp, or LinkedIn links",
  "Viewing a service page or a case study",
] as const;

const providers: { name: string; role: string; icon: LucideIcon }[] = [
  {
    name: "Google",
    role: "Analytics 4 and Tag Manager. Measures page views and the interactions listed above.",
    icon: BarChart3,
  },
  {
    name: "Microsoft Clarity",
    role: "Records how pages are used, as session replays and heatmaps.",
    icon: MousePointerClick,
  },
  {
    name: "Vercel",
    role: "Hosts the site and provides aggregate traffic and performance data.",
    icon: Cloud,
  },
  {
    name: "Resend",
    role: "Delivers inquiry form submissions to the CK Works inbox.",
    icon: Mail,
  },
];

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
        description="CK Works is a one-person studio. The site collects very little: what you choose to send through the inquiry form, and analytics about how pages are used."
      />

      <LegalUpdatedBar date={lastUpdated} />

      <LegalSection
        number="01"
        label="What you send"
        title="Information you provide directly."
      >
        <p>
          The inquiry form asks for your name, email address, and a message. You
          can also add a phone number, company, timeline, and budget range, all
          of which are optional.
        </p>
        <p>
          That submission is emailed to the CK Works inbox so I can reply. It is
          not saved to a database, and it is not used for advertising,
          profiling, or any automated decision-making. If you email, message, or
          call directly, I keep that correspondence for the same reason.
        </p>
      </LegalSection>

      <LegalSection
        number="02"
        label="Collected automatically"
        title="Analytics and session recording."
      >
        <p>
          Like most websites, this one measures how it is used. Google Analytics
          records page views and a small set of named interactions:
        </p>
        <ul className="not-prose space-y-2.5 pt-1">
          {trackedInteractions.map((interaction) => (
            <LegalListItem key={interaction}>{interaction}</LegalListItem>
          ))}
        </ul>
        <p>
          Microsoft Clarity goes further than counting. It records session
          replays and heatmaps, meaning a reconstruction of mouse movement,
          clicks, and scrolling on the pages you visit, so I can see where the
          site is confusing. Clarity is configured to mask text you type, and I
          use it to understand layout problems rather than to identify
          individual visitors.
        </p>
        <LegalCallout>
          None of this is sold, and none of it is shared with anyone beyond the
          providers listed below.
        </LegalCallout>
      </LegalSection>

      <LegalSection
        number="03"
        label="Cookies"
        title="What gets stored in your browser."
      >
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
      </LegalSection>

      <LegalSection
        number="04"
        label="Providers"
        title="Who else handles this information."
        wide
      >
        <div className="not-prose grid gap-4 sm:grid-cols-2">
          {providers.map(({ name, role, icon: Icon }) => (
            <article
              key={name}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-soft text-forest">
                <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 font-serif text-xl font-medium text-ink">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted">{role}</p>
            </article>
          ))}
        </div>
        <p className="pt-2">
          Each of these handles the data under its own terms and privacy policy.
          CK Works does not share your information with anyone else.
        </p>
      </LegalSection>

      <LegalSection
        number="05"
        label="Retention and choices"
        title="How long it is kept, and how to have it removed."
      >
        <p>
          Inquiry emails and related correspondence are kept while we are in
          contact and for up to 24 months afterward, so I can pick a
          conversation back up. Analytics data is retained on the schedule each
          provider sets.
        </p>
        <p>
          You can ask what I hold about you, ask for it to be corrected, or ask
          for it to be deleted, by emailing <LegalEmail />. There is no form to
          fill out and no account to close, and I will handle it directly.
        </p>
      </LegalSection>

      <LegalSection
        number="06"
        label="Scope"
        title="A few practical notes."
        last
      >
        <p>
          CK Works is based in the United States and works with clients in the
          United States. The site is not directed at children under 13, and I do
          not knowingly collect information from them.
        </p>
        <p>
          If this policy changes in any meaningful way, the date at the top of
          the page changes with it. Questions about any of this are welcome at{" "}
          <LegalEmail />.
        </p>
      </LegalSection>
    </SiteLayout>
  );
}

