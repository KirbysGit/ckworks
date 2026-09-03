/**
 * Public-entity FAQ for the ADA Title II page.
 *
 * Answers stay inside what has been verified against DOJ primary sources and
 * what the parent service page already commits to. Four things are deliberately
 * bounded and should not be loosened:
 *   - the deadlines repeat the tiers stated in `WhoIsAffected`, and send the
 *     reader to the DOJ rather than presenting this page as the authority;
 *   - vendor-managed systems are covered when they are in the agreed scope,
 *     never wholesale;
 *   - the exceptions are described as conditional, because whether one applies
 *     turns on facts this page cannot know; and
 *   - CK Works provides technical support, not compliance certification or
 *     legal advice.
 *
 * Every answer starts collapsed. With four questions there is no default worth
 * pre-opening, and an open first answer reads as the important one.
 */
import FAQSection from "@/components/page/FAQSection";
import { serviceContainer } from "@/components/services/shared/styles";

const titleIiFaqs = [
  {
    question: "Does the Title II web rule apply to our organization?",
    answer:
      "It applies to state and local government entities, including cities, counties, school districts, and special district governments. It covers the web content and mobile applications you offer the public, whether your own team built them or a vendor did. If residents reach a public service through it, the rule generally reaches it too.",
  },
  {
    question: "How is the applicable deadline determined?",
    answer:
      "By the population your entity serves. Entities serving 50,000 or more people have until April 26, 2027. Entities serving fewer than 50,000, and special district governments of any size, have until April 26, 2028. Both tiers point at the same technical standard, WCAG 2.1 Level AA. Confirm your tier against the DOJ's own materials before planning around a date.",
  },
  {
    question: "Are older PDFs and archived documents automatically excluded?",
    answer:
      "No. The rule includes limited exceptions, but whether one applies depends on specifics: how the content is used now, where it sits, and its relationship to a current public service. A document being old is not the same as a document being exempt. Archived material that still supports an active service is worth checking rather than assuming.",
  },
  {
    question: "What can CK Works review?",
    answer:
      "An agreed scope of your public experience: representative pages and templates, documents, forms and public workflows, and vendor touchpoints. Findings are written against WCAG 2.1 Level AA so your teams and vendors can act on them. This is technical accessibility support, not legal advice or compliance certification, and no consultant can certify compliance on your behalf.",
  },
] as const;

export default function AdaTitleIiFaq() {
  return (
    <section
      id="ada-title-ii-faq"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div className={serviceContainer}>
        <FAQSection
          faqs={[...titleIiFaqs]}
          defaultOpenIndex={null}
          title="Questions from public entities."
          description="Common questions about who the rule covers, what a review includes, and where the boundaries are."
        />
      </div>
    </section>
  );
}
