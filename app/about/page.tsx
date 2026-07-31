import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import ProjectCard from "@/components/ProjectCard";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { featuredCaseStudies } from "@/lib/projects";

const aboutSections = [
  {
    title: "What CK Works is",
    body: "A small digital studio focused on clean websites, practical systems, and clearer digital foundations for growing businesses.",
  },
  {
    title: "Who is behind the studio",
    body: "CK Works is led by Colin Kirby, combining a technical background with a strong interest in design, clarity, and useful business tools.",
  },
  {
    title: "Design and technical background",
    body: "The work sits between frontend design, software systems, data, integrations, and the practical details that make a site easier to use.",
  },
  {
    title: "Why CK Works was created",
    body: "The studio exists to help business owners close the gap between what they do well and how clearly that shows up online.",
  },
  {
    title: "Types of businesses CK Works helps",
    body: "The best fit is a founder, small team, or local business that needs a thoughtful digital presence without a bloated agency process.",
  },
  {
    title: "How CK Works approaches projects",
    body: "The process favors calm structure, direct communication, practical decisions, and systems that match how the business actually works.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about CK Works, the small digital studio by Colin Kirby focused on websites, systems, clarity, and practical digital foundations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="about-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              name: "About CK Works",
              url: absoluteUrl("/about"),
            },
            {
              "@type": "Person",
              name: "Colin Kirby",
              jobTitle: "Founder",
              worksFor: {
                "@type": "ProfessionalService",
                name: "CK Works",
                url: absoluteUrl("/"),
              },
            },
          ],
        }}
      />
      <PageHero
        label="About"
        title="A small studio for thoughtful digital work."
        description="This page keeps the founder story, technical background, and studio point of view separate from the homepage overview."
      />

      <ContentSection
        label="Studio Notes"
        title="The sections this page should grow into."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {aboutSections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <h2 className="font-serif text-2xl font-semibold leading-tight text-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection label="Relevant Work" title="A few examples to connect back.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredCaseStudies.map((study) => (
            <ProjectCard key={study.slug} study={study} variant="compact" />
          ))}
        </div>
      </ContentSection>

      <ContactCTA />
    </SiteLayout>
  );
}
