import type { Metadata } from "next";
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
 * Deliberately short. This is a marketing site with no accounts, no payments,
 * and no user-generated content, so most of what a standard terms template
 * covers does not exist here. The real agreement with a client lives in the
 * written proposal, and section 05 says so rather than pretending this page
 * governs the engagement.
 *
 * The demo-brand clause matters more than it looks: the site shows fictional
 * businesses inside mockups, and `docs/demo-registry.md` requires them to be
 * visibly illustrative. Saying it here backs that up in writing.
 *
 * `lastUpdated` should change whenever the substance does.
 */

const lastUpdated = "August 17, 2026";

/** Kept in step with the brands listed in `docs/demo-registry.md`. */
const demoBrands = [
  "Windermere Wellness",
  "Riverstone Builders",
  "Hearth & Home",
  "Field & Forge",
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description:
    "Terms for using the CK Works website, covering site content, the fictional businesses shown in demonstrations, and how project engagements are actually governed.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Terms"
        title="Using this site."
        description="Short, because there is not much to it. This is a studio website: there are no accounts, no payments, and nothing to sign up for. Real project work is governed by a separate written agreement."
      />

      <LegalUpdatedBar date={lastUpdated} />

      <LegalSection
        number="01"
        label="What this site is"
        title="A studio website, not an offer."
      >
        <p>
          This site describes what CK Works does and shows examples of the work.
          Browsing it, reading a case study, or sending an inquiry does not
          create a contract, and nothing here is a binding offer of services,
          pricing, or availability.
        </p>
        <p>
          You are welcome to use the site to learn about the studio, share a
          link, or get in touch. Please do not scrape it, republish it as your
          own, or use it to send automated or unsolicited messages.
        </p>
      </LegalSection>

      <LegalSection
        number="02"
        label="Content"
        title="Who owns what is on the page."
      >
        <p>
          The writing, design, layout, code, illustrations, and photography on
          this site belong to CK Works unless credited otherwise. Client and
          project names belong to their respective owners and appear here to
          describe work that was done.
        </p>
        <p>
          You may quote or reference the site with attribution. Reproducing
          substantial parts of it, or reusing the design or code, needs
          permission first. Ask at <LegalEmail /> and the answer is usually yes.
        </p>
      </LegalSection>

      <LegalSection
        number="03"
        label="Demonstrations"
        title="Some businesses shown here are invented."
      >
        <p>
          Several mockups on this site show a business that does not exist.
          These are illustrations built to demonstrate design and development
          work, not client projects, and they include:
        </p>
        <ul className="not-prose space-y-2.5 pt-1">
          {demoBrands.map((brand) => (
            <LegalListItem key={brand}>{brand}</LegalListItem>
          ))}
        </ul>
        <LegalCallout>
          Any resemblance to a real business is coincidental. Sample metrics,
          reviews, and search results shown alongside them are illustrative and
          are not results CK Works achieved for a client.
        </LegalCallout>
      </LegalSection>

      <LegalSection
        number="04"
        label="No guarantees"
        title="What the information here does and does not promise."
      >
        <p>
          The site is provided as it is. I keep it accurate and current, but I
          cannot promise it is free of errors, always available, or suitable for
          a particular purpose.
        </p>
        <p>
          Case studies describe work that was designed and built. They are not a
          prediction of results for another project. Search visibility, traffic,
          and inquiries depend on competition, demand, budget, and many things
          outside any one website.
        </p>
        <p>
          Links to other sites are there for convenience. I do not control them
          and I am not responsible for what they contain.
        </p>
      </LegalSection>

      <LegalSection
        number="05"
        label="Working together"
        title="The agreement that actually governs a project."
      >
        <p>
          If we work together, the terms that matter are in the written proposal
          or agreement for that project: scope, schedule, pricing, revisions,
          ownership of the finished work, and support after launch.
        </p>
        <LegalCallout>
          Where that agreement and this page disagree, the signed agreement
          wins. Nothing on this page changes it.
        </LegalCallout>
      </LegalSection>

      <LegalSection
        number="06"
        label="Changes and contact"
        title="Keeping this current."
        last
      >
        <p>
          CK Works is a one-person studio based in the United States, working
          with clients in the United States. These terms are governed by the
          laws of the State of Florida.
        </p>
        <p>
          If this page changes in any meaningful way, the date at the top
          changes with it. Questions are welcome at <LegalEmail />, and there is
          a fuller explanation of what the site collects in the{" "}
          <a
            className="font-medium text-forest underline decoration-forest/35 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
            href="/privacy-policy"
          >
            privacy policy
          </a>
          .
        </p>
      </LegalSection>
    </SiteLayout>
  );
}
