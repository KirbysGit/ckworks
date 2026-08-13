import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDot } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import Reveal from "@/components/ui/Reveal";
import StageChain from "@/components/process/StageChain";
import {
  BriefVisual,
  BuildVisual,
  LaunchVisual,
  SitemapVisual,
} from "@/components/process/PhaseVisuals";
import { getCaseStudy } from "@/lib/projects";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const processDescription =
  "CK Works plans, designs, builds, and improves websites and digital systems through a calm process built around clarity, structure, launch, and ongoing improvement.";

export const metadata: Metadata = createPageMetadata({
  title: "Process",
  description: processDescription,
  path: "/process",
});

type Phase = {
  number: string;
  title: string;
  body: string;
  outcome: string;
  visual: ReactNode;
};

const phases: Phase[] = [
  {
    number: "01",
    title: "Discovery & clarity",
    body:
      "We learn how the business works, what needs to improve, and what the project needs to accomplish. The goal is to turn a loose idea into a clear direction before design or development starts.",
    outcome: "goals, priorities, and project direction",
    visual: <BriefVisual />,
  },
  {
    number: "02",
    title: "Structure & direction",
    body:
      "We shape the pages, user paths, content priorities, and system requirements around the real goal. This gives the project a practical structure before the interface becomes polished.",
    outcome: "sitemap, key flows, and content plan",
    visual: <SitemapVisual />,
  },
  {
    number: "03",
    title: "Design & build",
    body:
      "The direction turns into a responsive interface and working implementation. I move between design details and code so the final site or system feels clear, usable, and reliable.",
    outcome: "designed screens, working code, and tested flows",
    visual: <BuildVisual />,
  },
  {
    number: "04",
    title: "Launch & improve",
    body:
      "Once the project is live, we check the important paths, fix the rough edges, and learn from real usage. The launch is treated as the start of a cleaner operating rhythm, not the end of the work.",
    outcome: "live project, launch checks, and next improvements",
    visual: <LaunchVisual />,
  },
];

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "A small website or focused landing page can often move faster, while a larger site, system, or integration needs more planning and testing time. After the first conversation, CK Works outlines a practical timeline based on scope, content readiness, feedback cycles, and launch needs.",
  },
  {
    question: "What do I need before starting?",
    answer:
      "You do not need a perfect brief. It helps to bring business context, goals, any current website or tool access, rough content, and examples of what feels right or wrong so the project can start with clear direction.",
  },
  {
    question: "How are feedback and revisions handled?",
    answer:
      "Feedback is organized around clear milestones instead of scattered one-off changes. We review direction, structure, design, and build stages at the right moments so decisions stay focused and the project keeps moving.",
  },
  {
    question: "What happens after launch?",
    answer:
      "After launch, CK Works can help with fixes, updates, analytics checks, SEO and AI-search improvements, integrations, and ongoing support. The goal is to keep the site or system clean as the business changes.",
  },
];

const collaborationRows = [
  ["Business knowledge", "Strategy and structure"],
  ["Content and access", "Design and development"],
  ["Feedback and decisions", "Testing and launch"],
] as const;

/**
 * Hero entrance rhythm. Copy rises first; the stage chain picks the sequence up
 * at 340ms and carries it left to right (see `components/process/StageChain.tsx`).
 */
const processHeroTiming = {
  eyebrow: 0,
  title: 80,
  lead: 170,
  actions: 250,
} as const;

export default function ProcessPage() {
  const tizirsso = getCaseStudy("tizirsso");

  return (
    <SiteLayout>
      <SchemaMarkup
        id="process-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "CK Works Process",
              url: absoluteUrl("/process"),
              description: processDescription,
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
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

      <section className="bg-ivory py-12 sm:py-14 lg:py-20">
        <div className="container-ck">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.5fr)] lg:gap-12">
            <div>
              <p
                className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest"
                style={{ animationDelay: `${processHeroTiming.eyebrow}ms` }}
              >
                The Approach
              </p>
              <h1
                className="ck-rise mt-5 max-w-3xl font-serif text-[2.75rem] font-medium leading-[1.03] text-ink sm:text-5xl lg:text-6xl"
                style={{ animationDelay: `${processHeroTiming.title}ms` }}
              >
                A calm way projects take shape.
              </h1>
              <p
                className="ck-rise mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg"
                style={{ animationDelay: `${processHeroTiming.lead}ms` }}
              >
                CK Works plans, designs, builds, and improves websites and
                digital systems through a focused process that keeps decisions
                clear and the work moving.
              </p>
              <div
                className="ck-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: `${processHeroTiming.actions}ms` }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-md bg-forest px-7 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#phases"
                  className="inline-flex items-center justify-center gap-3 rounded-md border border-forest/60 bg-transparent px-7 py-3.5 text-sm font-semibold text-forest transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-soft/35 hover:shadow-soft"
                >
                  See how it works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <StageChain />
          </div>
        </div>
      </section>

      <section id="phases" className="scroll-mt-24 bg-ivory py-12 lg:py-16">
        <div className="container-ck">
          <Reveal>
            <p className="w-fit border-b-2 border-forest pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              The Process
            </p>
          </Reveal>

          <div className="mt-8 space-y-4 lg:mt-10 lg:space-y-5">
            {phases.map((phase, index) => (
              <PhaseSection key={phase.number} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 lg:py-16">
        <div className="container-ck">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Working Together
            </p>
            <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink">
                  You bring
                </h2>
                <ul className="mt-5 space-y-4">
                  {collaborationRows.map(([client]) => (
                    <li
                      key={client}
                      className="flex items-center gap-3 text-base text-muted"
                    >
                      <CircleDot className="h-4 w-4 text-forest" />
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink">
                  CK Works handles
                </h2>
                <ul className="mt-5 space-y-4">
                  {collaborationRows.map(([, studio]) => (
                    <li
                      key={studio}
                      className="flex items-center gap-3 text-base text-muted"
                    >
                      <CheckCircle2 className="h-4 w-4 text-forest" />
                      {studio}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 max-w-3xl border-t border-line/70 pt-6 text-base leading-8 text-ink/82">
              Communication stays organized through clear milestones, review
              points, and next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 lg:py-16">
        <div className="container-ck grid gap-8 lg:grid-cols-[minmax(16rem,0.45fr)_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              FAQ
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              The deeper details, without the word wall.
            </h2>
          </div>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5 open:bg-ivory/45">
                <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-forest transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {tizirsso && (
        <section className="bg-ivory py-12 lg:py-16">
          <div className="container-ck">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                Process In Practice
              </p>
              <div className="mt-6 grid items-center gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.8fr)]">
                <div>
                  <h2 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
                    {tizirsso.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                    From organizing the story and sponsorship goals to
                    designing, developing, and launching the final site.
                  </p>
                  <Link
                    href={`/${tizirsso.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 border-b border-forest pb-1 text-sm font-semibold text-forest transition-colors hover:text-ink"
                  >
                    View project
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
                {tizirsso.coverImage && (
                  <Link
                    href={`/${tizirsso.slug}`}
                    className={`group relative block aspect-[16/9] overflow-hidden rounded-xl border border-line bg-gradient-to-br ${tizirsso.accent}`}
                  >
                    <Image
                      src={tizirsso.coverImage.src}
                      alt={tizirsso.coverImage.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        title="Have a project that needs a clearer path?"
        description="Send a note with where things stand now, and I will help you sort the next practical step."
      />
    </SiteLayout>
  );
}

/**
 * One phase as a full-width band. Alternating tint and side keeps four similar
 * blocks from reading as one long column; the eyebrow repeats the title in
 * small caps so the number, the name, and the illustration all land together.
 *
 * Below the fold, so the band is a `Reveal`. It wraps the whole article rather
 * than the two columns separately — the copy and its illustration should
 * arrive as one thought.
 */
function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  const visualFirst = index % 2 === 1;

  return (
    <Reveal
      as="article"
      delay={index * 60}
      className={`rounded-2xl border border-line/70 px-5 py-8 sm:px-8 lg:px-12 lg:py-12 ${
        index % 2 === 0 ? "bg-card" : "bg-sand"
      }`}
    >
      <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
        <div className={visualFirst ? "lg:order-2" : ""}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
            {phase.number} {phase.title}
          </p>
          <h2 className="mt-3 font-serif text-[2.5rem] font-medium leading-[1.05] text-forest sm:text-5xl">
            {phase.title}
          </h2>
          <span className="mt-5 block h-px w-12 bg-forest/50" aria-hidden />
          <p className="mt-5 max-w-md text-base leading-8 text-muted">
            {phase.body}
          </p>
          <p className="mt-5 text-sm leading-6 text-forest/85">
            <span className="font-semibold">Typical outcome:</span>{" "}
            {phase.outcome}
          </p>
        </div>

        <div className={visualFirst ? "lg:order-1" : ""}>{phase.visual}</div>
      </div>
    </Reveal>
  );
}
