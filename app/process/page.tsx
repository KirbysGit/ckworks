import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const processSections = [
  {
    title: "Discovery and clarity",
    body: "We start with goals, audience, current pain points, and what the site or system needs to make easier.",
  },
  {
    title: "Structure and direction",
    body: "The project gets a practical structure: pages, workflows, priorities, content needs, and a visual direction.",
  },
  {
    title: "Design and development",
    body: "The direction turns into clean layouts, working code, responsive behavior, and the technical pieces behind it.",
  },
  {
    title: "Launch, measurement, and improvement",
    body: "After launch, we check the important paths, connect measurement where needed, and keep improving what deserves attention.",
  },
  {
    title: "What the client provides",
    body: "Access, business context, content inputs, feedback, and decisions when the project needs direction.",
  },
  {
    title: "What CK Works handles",
    body: "Structure, design, build, implementation details, testing, launch support, and practical recommendations.",
  },
  {
    title: "Communication and revisions",
    body: "The skeleton should later define review rounds, update rhythm, decision points, and how feedback gets handled.",
  },
  {
    title: "What happens after launch",
    body: "Support can include updates, fixes, analytics checks, search visibility improvements, or new feature phases.",
  },
];

const processDescription =
  "How CK Works approaches projects, from discovery and structure to design, development, launch, measurement, and support.";

export const metadata: Metadata = createPageMetadata({
  title: "Process",
  description: processDescription,
  path: "/process",
});

export default function ProcessPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="process-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "CK Works Process",
          url: absoluteUrl("/process"),
          description: processDescription,
        }}
      />
      <PageHero
        label="Process"
        title="A calm way projects take shape."
        description="This page gives the process its own clear home so prospects can understand how a project moves from idea to launch."
      />

      <ContentSection
        label="The Approach"
        title="A working skeleton for the project flow."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {processSections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContactCTA title="Have a project that needs a clearer path?" />
    </SiteLayout>
  );
}
