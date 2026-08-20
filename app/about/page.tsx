import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import AboutHero from "@/components/about/AboutHero";
import CreativeTechnicalSplit from "@/components/about/CreativeTechnicalSplit";
import PracticeMeans from "@/components/about/PracticeMeans";
import WhySection from "@/components/about/WhySection";
import FAQSection from "@/components/page/FAQSection";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import Reveal from "@/components/ui/Reveal";
import { absoluteUrl, createPageMetadata, organizationId } from "@/lib/seo";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";

const aboutDescription =
  "CK Works is a small digital studio led by Colin Kirby, combining design, software development, and systems thinking to build clearer websites and practical digital tools for growing businesses.";

const selectedWork = ["tizirsso", "taylor", "centi"]
  .map((slug) => getCaseStudy(slug))
  .filter((study): study is CaseStudy => Boolean(study));

const quickAnswers = [
  {
    question: "Do you only work with certain kinds of businesses?",
    answer:
      "No. CK Works isn’t built around one specific industry. The better fit is usually a business that has something online that feels outdated, unclear, disconnected, or ready for a stronger next version.",
  },
  {
    question: "Can you work with a website or system I already have?",
    answer:
      "Absolutely. A project can start with something existing. Sometimes that means a full redesign, and other times it means improving a few specific parts, adding functionality, or connecting tools that are already in use.",
  },
  {
    question: "Do I need to know exactly what I need before reaching out?",
    answer:
      "Nope. Bring what you have. If you know what feels off or what you’d like to improve, that’s usually enough to start figuring out the right direction together.",
  },
  {
    question: "Who will I actually be working with?",
    answer:
      "You’ll work directly with me, Colin, through the planning, design, development, and launch. There isn’t a handoff between a bunch of different teams.",
  },
  {
    question: "What happens after something launches?",
    answer:
      "That depends on what makes sense for the project. I can stick around for updates, fixes, search and analytics work, new features, or ongoing support, but there doesn’t need to be unnecessary monthly work just for the sake of it.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "About Colin Kirby",
  description: aboutDescription,
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
              description: aboutDescription,
            },
            {
              // Reference the organization declared in app/layout.tsx rather
              // than describing it a second time with no @id.
              "@id": organizationId,
              description: aboutDescription,
            },
            {
              "@type": "ItemList",
              name: "Selected CK Works projects",
              itemListElement: selectedWork.map((study, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: study.name,
                url: absoluteUrl(`/${study.slug}`),
              })),
            },
            {
              "@type": "FAQPage",
              mainEntity: quickAnswers.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ],
        }}
      />

      <AboutHero />
      <WhySection />
      <CreativeTechnicalSplit />
      <PracticeMeans />
      <SelectedWorkSection />
      <AboutQuickAnswers />
      <AboutClosingCTA />
    </SiteLayout>
  );
}

function SelectedWorkSection() {
  return (
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-14">
      <div className="container-ck">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Selected Work
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              A few projects connected to the studio&apos;s way of working.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden items-center gap-2 border-b border-forest pb-1 text-sm font-semibold text-forest transition-colors hover:text-ink sm:inline-flex"
          >
            View all work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {/* Independent grid items with no sibling selectors between them, so a
            Reveal per card is right here rather than one around the grid. */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {selectedWork.map((study, index) => (
            <Reveal key={study.slug} delay={index * 90} className="min-w-0">
              <AboutWorkCard study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutWorkCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group grid overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift sm:grid-cols-[minmax(9rem,0.75fr)_1fr] lg:grid-cols-[minmax(9rem,0.9fr)_1fr]">
      <Link
        href={`/${study.slug}`}
        aria-label={`View the ${study.name} case study`}
        className={`relative min-h-40 bg-gradient-to-br ${study.accent}`}
      >
        {study.coverImage && (
          <Image
            src={study.coverImage.src}
            alt={study.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 38vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ objectPosition: study.coverImage.position ?? "center" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
      </Link>
      <div className="flex flex-col p-5">
        <h3 className="font-serif text-2xl font-medium leading-tight text-ink">
          {study.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-forest">{study.badge}</p>
        <Link
          href={`/${study.slug}`}
          className="group/link mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium text-forest transition-colors hover:text-ink"
        >
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function AboutQuickAnswers() {
  return (
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-14">
      <div className="container-ck">
        <Reveal>
          <FAQSection
            faqs={[...quickAnswers]}
            label="Quick Answers"
            title="A few things you might be wondering."
            description="You don’t need to know exactly what you need before reaching out. These are just a few common questions about how I work and what CK Works can help with."
          />
        </Reveal>
      </div>
    </section>
  );
}

function AboutClosingCTA() {
  return (
    <section className="bg-ivory py-10 sm:py-12 lg:py-14">
      <div className="container-ck">
        <Reveal className="flex flex-col gap-6 rounded-xl border border-line bg-card px-6 py-7 shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
              About CK Works
            </p>
            <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
              Have something that needs to work better?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
              Tell me a little about your business and what you&apos;d like to
              improve.
            </p>
          </div>

          <div className="flex w-fit shrink-0 flex-col items-stretch gap-4">
            <ProjectInquiryTrigger
              source="about_footer_cta"
              className="rounded-lg px-6 py-3.5 text-sm font-semibold hover:bg-ink"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </ProjectInquiryTrigger>
            <Link
              href="/process"
              className="group inline-flex items-center justify-center gap-1.5 border-b border-forest pb-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
            >
              See how the process works
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
