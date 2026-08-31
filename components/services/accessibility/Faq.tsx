/**
 * FAQ band on the Web Accessibility page.
 *
 * Answers must not invent methodology, tooling, pricing, timing, or scope that
 * CK Works has not settled (`docs/web-accessibility-service.md`). Three answers
 * here are deliberately bounded and should not be loosened:
 *   - remediation is limited to what CK Works can reach directly;
 *   - documents are scoped per engagement, never promised wholesale;
 *   - CK Works provides technical services, not compliance certification or
 *     legal advice.
 */
import FAQSection from "@/components/page/FAQSection";
import Reveal from "@/components/ui/Reveal";

const accessibilityFaqs = [
  {
    question: "What is included in an accessibility review?",
    answer:
      "Scope is agreed before the work starts. A review covers a set of representative pages, templates, and important user journeys, checked with a combination of automated tools and hands-on testing. Documents, portals, and third-party systems are included when they are part of that agreed scope.",
  },
  {
    question: "What standards do you work toward?",
    answer:
      "WCAG 2.1 Level AA. It is the standard most commonly referenced for web content, including by public sector requirements in the United States. Findings are written against it so they are recognizable to anyone else you bring in later.",
  },
  {
    question: "Do you fix the issues you find?",
    answer:
      "Where I can reach the problem in the code, yes. For anything owned by a vendor, a content editor, or another team, you get written guidance specific enough for them to act on. Which of those applies is clear before the work starts, not after.",
  },
  {
    question: "Does an accessibility widget or overlay make a website accessible?",
    answer:
      "No. Overlays layer on top of a website. They do not change the underlying pages, documents, or workflows, so the barriers people actually run into are still there. Evaluation and source-level changes are what move a site forward.",
  },
  {
    question: "Do you review PDFs and downloadable documents?",
    answer:
      "Documents can be included, and which ones are is decided during scoping. Remediating a large historical archive is a different kind of project from reviewing a website, so it is scoped separately rather than assumed.",
  },
  {
    question: "Can you work with our existing developer or vendor?",
    answer:
      "Yes. A review is often most useful when someone else maintains the site. Findings are written so another developer or vendor can act on them without needing me in the middle of every change.",
  },
  {
    question: "Do you certify compliance or provide legal advice?",
    answer:
      "No. CK Works provides technical accessibility reviews and improvements. No agency, tool, or consultant can certify legal compliance on your behalf, and questions about your legal obligations belong with your own counsel.",
  },
] as const;

export default function AccessibilityFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal>
        <FAQSection
          faqs={[...accessibilityFaqs]}
          description="Common questions about accessibility reviews, what gets fixed, and how scope is decided."
        />
      </Reveal>
    </section>
  );
}
