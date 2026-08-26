import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Pencil,
  Rocket,
  Settings2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import RelatedLinks from "@/components/services/shared/RelatedLinks";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import WhatsAppContactLink from "@/components/contact/WhatsAppContactLink";
import FAQSection from "@/components/page/FAQSection";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import BuildPhase from "@/components/process/BuildPhase";
import GetClearPhase from "@/components/process/GetClearPhase";
import LaunchImprovePhase from "@/components/process/LaunchImprovePhase";
import ShapeDirectionPhase from "@/components/process/ShapeDirectionPhase";
import StageChain from "@/components/process/StageChain";
import { getCaseStudy } from "@/lib/projects";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const processDescription =
  "CK Works plans, designs, builds, and improves websites and digital systems through a calm process built around clarity, structure, launch, and ongoing improvement.";

export const metadata: Metadata = createPageMetadata({
  title: "How a Website Project Works",
  description: processDescription,
  path: "/process",
});

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
      "Feedback is organized around clear milestones instead of scattered one-off changes. We'll review direction, structure, design, and build stages at the right moments so decisions stay focused and the project keeps moving.",
  },
  {
    question: "What happens after launch?",
    answer:
      "After launch, CK Works can help with fixes, updates, analytics checks, SEO and AI-search improvements, integrations, and ongoing support. The goal is to keep the site or system clean as the business changes.",
  },
];

const fromYou = [
  "Business context",
  "Existing content / assets",
  "Useful feedback",
  "Final approval",
] as const;

const fromCkWorks: { icon: LucideIcon; label: string }[] = [
  { icon: FileText, label: "Structure + planning" },
  { icon: Pencil, label: "Design + development" },
  { icon: Settings2, label: "Technical setup" },
  { icon: Rocket, label: "Testing + launch" },
];

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

      <section className="bg-ivory pb-12 pt-16 sm:pb-14 sm:pt-18 lg:pb-20 lg:pt-24">
        <div className="container-ck">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.5fr)] lg:gap-12">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                The Approach
              </p>
              <h1 className="mt-5 max-w-3xl font-serif text-[2.75rem] font-medium leading-[1.03] text-ink sm:text-5xl lg:text-6xl">
                A calm way projects take shape.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted sm:mx-0 sm:text-lg">
                CK Works plans, designs, builds, and improves websites and
                digital systems through a focused process that keeps decisions
                clear and the work moving.
              </p>
            </div>

            <StageChain />
          </div>
        </div>
      </section>

      <section id="phases" className="scroll-mt-24 bg-ivory py-12 lg:py-16">
        <div className="container-ck">
          <Reveal>
            <div>
              <SectionLabel className="[&>span:first-child]:hidden">
                The Process
              </SectionLabel>
              <span className="mt-3 block h-px w-12 bg-forest/55" aria-hidden />
            </div>
          </Reveal>

          {/* Arrows carry the sequence on a phone, where the four phases
              stack and nothing else says they run in order. Desktop keeps its
              tighter rhythm and reads as a sequence already. */}
          <div className="mt-7 flex flex-col gap-5 lg:mt-8 lg:gap-4">
            <GetClearPhase />
            <PhaseArrow />
            <ShapeDirectionPhase />
            <PhaseArrow />
            <BuildPhase />
            <PhaseArrow />
            <LaunchImprovePhase />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-ck">
          <Reveal>
            <div className="grid gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.85fr)] lg:gap-12 lg:gap-x-14 lg:gap-y-0">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                  Working together
                </p>
                <span className="mt-3 block h-px w-10 bg-forest/55" aria-hidden />
                <h2 className="mt-6 font-serif text-[2.35rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:text-[3.15rem]">
                  A good project doesn&apos;t need to take over your week.
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-ink/75 sm:text-[1.05rem] sm:leading-8">
                  Most of the heavy lifting stays with me. I just need enough
                  context and feedback to keep the project moving in the right
                  direction.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                  From you
                </p>
                <ul className="mt-4 grid auto-rows-fr grid-cols-2 gap-2.5 sm:mt-6 lg:block lg:divide-y lg:divide-line/80">
                  {fromYou.map((item, index) => (
                    <li
                      key={item}
                      className="flex h-full flex-col items-start justify-start gap-2 rounded-[0.3rem] border border-line bg-card px-3.5 pb-3.5 pt-3 lg:h-auto lg:flex-row lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:py-4 lg:first:pt-0 lg:last:pb-0"
                    >
                      <span className="font-source-serif-display text-[1.55rem] font-semibold leading-none tabular-nums text-forest/40 lg:flex lg:h-8 lg:w-8 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-line lg:text-[0.78rem] lg:text-forest">
                        {index + 1}
                      </span>
                      <TileLabel text={item} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:border-l lg:border-line/80 lg:pl-14">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                  From CK Works
                </p>
                <ul className="mt-4 grid auto-rows-fr grid-cols-2 gap-2.5 sm:mt-6 lg:block lg:divide-y lg:divide-line/80">
                  {fromCkWorks.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex h-full flex-col items-start justify-start gap-2 rounded-[0.3rem] border border-line bg-sand/60 px-3.5 pb-3.5 pt-3 lg:h-auto lg:flex-row lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:py-4 lg:first:pt-0 lg:last:pb-0"
                    >
                      <span className="flex h-[1.55rem] shrink-0 items-center justify-start text-forest/65 lg:h-8 lg:w-8 lg:justify-center lg:text-forest">
                        <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
                      </span>
                      <TileLabel text={label} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line/70 bg-ivory py-12 lg:py-14">
        <div className="container-ck">
          <Reveal>
            <FAQSection
              faqs={[...faqs]}
              title="The deeper details, without the word wall."
              description="Common questions about timelines, what you need before starting, feedback, and what happens after launch."
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-12">
        <div className="container-ck">
          <RelatedLinks
            compactMobile
            heading="Where this leads"
            links={[
              {
                label: "Browse the services this process covers",
                href: "/services",
                note: "Websites, SEO, analytics, systems, and ongoing support.",
              },
              {
                label: "See the Tizirsso Racing website project",
                href: "/tizirsso",
                note: "A client site taken through these four phases end to end.",
              },
            ]}
          />
        </div>
      </section>

      <ProcessFooterCta />
    </SiteLayout>
  );
}

/**
 * Handwritten asides for the Process footer CTA.
 * Tweak width / inset / top / opacity here — values are CSS lengths or %.
 * `*Xl` applies from the xl breakpoint up.
 */
const processFooterAsides = {
  left: {
    width: "9rem",
    widthXl: "13rem",
    left: "1.5rem",
    leftXl: "3rem",
    top: "22.5%",
    opacity: 0.9,
  },
  right: {
    width: "8rem",
    widthXl: "13rem",
    right: "1.5rem",
    rightXl: "3rem",
    top: "30%",
    opacity: 0.9,
  },
} as const;

/**
 * Tile label, always two lines on a phone.
 *
 * The squares are equal height, so the longest label sets the size for all
 * eight. Left to wrap naturally, three of them took three lines and the
 * short ones were left sitting in a lot of air. Breaking every label into
 * two lines — keeping a "+" or "/" on the first line where there is one,
 * otherwise splitting at the last space — makes the natural height and the
 * enforced height the same. The full string renders unbroken from lg, where
 * these are list rows again.
 */
function TileLabel({ text }: { text: string }) {
  const separated = text.match(/^(.*\s[+/])\s(.*)$/);
  const lastSpace = text.lastIndexOf(" ");
  const lines = separated
    ? [separated[1], separated[2]]
    : lastSpace === -1
      ? [text]
      : [text.slice(0, lastSpace), text.slice(lastSpace + 1)];

  return (
    <span className="text-[0.92rem] font-medium leading-snug text-ink lg:text-[0.98rem]">
      <span className="lg:hidden">
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        ))}
      </span>
      <span className="hidden lg:inline">{text}</span>
    </span>
  );
}

/** Sequence marker between stacked phase cards on mobile. */
function PhaseArrow() {
  return (
    <span className="flex justify-center lg:hidden" aria-hidden>
      <ChevronDown className="h-5 w-5 text-forest/45" strokeWidth={1.8} />
    </span>
  );
}

function ProcessFooterCta() {
  const { left, right } = processFooterAsides;

  return (
    <section className="border-t border-line/70 bg-ivory py-12 sm:py-14 lg:py-16">
      <div className="container-ck">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-card px-5 py-8 text-center shadow-soft sm:px-8 lg:px-10 lg:py-12">
          <style>{`
            .process-footer-aside-left {
              left: ${left.left};
              top: ${left.top};
              width: ${left.width};
              opacity: ${left.opacity};
            }
            .process-footer-aside-right {
              right: ${right.right};
              top: ${right.top};
              width: ${right.width};
              opacity: ${right.opacity};
            }
            @media (min-width: 1280px) {
              .process-footer-aside-left {
                left: ${left.leftXl};
                width: ${left.widthXl};
              }
              .process-footer-aside-right {
                right: ${right.rightXl};
                width: ${right.widthXl};
              }
            }
          `}</style>
          <Image
            src="/images/process/svg/process-footer-01.svg"
            alt=""
            width={300}
            height={230}
            aria-hidden
            className="process-footer-aside-left pointer-events-none absolute hidden lg:block"
          />
          <Image
            src="/images/process/svg/process-footer-02.svg"
            alt=""
            width={300}
            height={250}
            aria-hidden
            className="process-footer-aside-right pointer-events-none absolute hidden lg:block"
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              A clearer path
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.03] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[4rem]">
              Need a clearer path?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Share where things stand now, even if it is just a rough idea, and
              I&apos;ll help map the next practical step.
            </p>

            <div className="mx-auto mt-8 flex w-fit flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              <ProjectInquiryTrigger
                source="process_footer_cta"
                className="rounded-md px-7 py-3.5 text-sm font-semibold hover:bg-ink sm:min-w-[13rem]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </ProjectInquiryTrigger>
              <WhatsAppContactLink
                location="process_footer_cta"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-forest/60 bg-transparent px-7 py-3.5 text-sm font-semibold text-forest transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-soft/35 hover:shadow-soft sm:min-w-[12rem]"
                iconClassName="h-5 w-5"
              >
                WhatsApp
              </WhatsAppContactLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
