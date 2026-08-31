/**
 * Contextual links out of the Web Accessibility page.
 *
 * Web Design & Development and Ongoing Support are the two relationships that
 * matter here: build it in, or keep it in place. Digital Systems & Integrations
 * is the third only when a page needs one.
 */
import RelatedLinks from "../shared/RelatedLinks";

export default function AccessibilityRelated() {
  return (
    <RelatedLinks
      compactMobile
      links={[
        {
          label: "Build accessibility into a new website",
          href: "/services/web-design-development",
          note: "Structure, components, and content are cheaper to get right the first time.",
        },
        {
          label: "Keep accessibility in place after launch",
          href: "/services/ongoing-support",
          note: "Content, components, and vendor tools change. Review can keep pace with them.",
        },
      ]}
    />
  );
}
