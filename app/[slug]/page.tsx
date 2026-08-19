import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Cpu,
  ExternalLink,
  FileText,
  Hammer,
  Mountain,
  Palette,
  Target,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudyViewed from "@/components/projects/CaseStudyViewed";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import WhatsAppContactLink from "@/components/contact/WhatsAppContactLink";
import Button from "@/components/ui/Button";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import Reveal from "@/components/ui/Reveal";
import { caseStudies, getCaseStudy, type CaseStudy } from "@/lib/projects";
import { serviceAreas } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.metaTitle,
    description: study.oneLiner,
    alternates: {
      canonical: `/${study.slug}`,
    },
    openGraph: {
      title: study.metaTitle,
      description: study.oneLiner,
      url: `/${study.slug}`,
      type: "article",
      ...(study.coverImage
        ? {
            images: [
              {
                url: study.coverImage.src,
                alt: study.coverImage.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.oneLiner,
    },
  };
}

/**
 * Hero entrance (ms). Above the fold, so CSS primitives rather than Reveal —
 * the copy must not wait on hydration. Body sections below use Reveal.
 */
const caseStudyHeroTiming = {
  eyebrow: 0,
  title: 80,
  lead: 170,
  outcome: 240,
  facts: 320,
} as const;

/** Small forest circle + label used above each fact group and body section. */
function SectionLabel({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <h2 className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-soft">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
      </span>
      {children}
    </h2>
  );
}

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-forest-soft/70 px-3 py-1 text-[0.78rem] font-medium text-forest">
      {children}
    </span>
  );
}

/**
 * Role, timeframe, status, contributions, and stack in one card.
 *
 * Stack and `workedOn` are lists, and a four-column text grid rendered them as
 * comma runs that wrapped mid-phrase — which is what made this block feel
 * cramped. Lists are pills now; only the three single-value facts stay in the
 * grid. `workedOn` was written for every project and had never been rendered.
 */
function ProjectFacts({ study }: { study: CaseStudy }) {
  const facts = [
    { label: "Role", value: study.role, icon: UserRound },
    { label: "Timeframe", value: study.timeframe, icon: CalendarDays },
    { label: "Status", value: study.status, icon: Activity },
  ];

  return (
    <div
      className="ck-lift mt-8 overflow-hidden rounded-2xl border border-line bg-card shadow-soft"
      style={{ animationDelay: `${caseStudyHeroTiming.facts}ms` }}
    >
      <div className="grid gap-6 p-6 sm:grid-cols-3">
        {facts.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {label}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink">
                {value}
              </span>
            </span>
          </div>
        ))}
      </div>

      {study.workedOn.length > 0 && (
        <div className="border-t border-line/70 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            What I worked on
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {study.workedOn.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </div>
        </div>
      )}

      {study.stack.length > 0 && (
        <div className="border-t border-line/70 bg-ivory/50 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-card px-3 py-1 text-[0.78rem] font-medium text-ink/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  label,
  paragraphs,
  icon,
}: {
  label: string;
  paragraphs: string[];
  icon: LucideIcon;
}) {
  if (paragraphs.length === 0) return null;

  return (
    <Reveal as="section" className="border-t border-line/70 py-10">
      <SectionLabel icon={icon}>{label}</SectionLabel>
      <div className="mt-5 space-y-4 sm:pl-[2.4rem]">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/85 sm:text-lg">
            {p}
          </p>
        ))}
      </div>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Header />
      <SchemaMarkup
        id={`${study.slug}-case-study-schema`}
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: study.name,
              url: absoluteUrl(`/${study.slug}`),
              description: study.oneLiner,
              genre: study.category,
              creator: {
                "@type": "Organization",
                name: "CK Works",
                url: absoluteUrl("/"),
              },
              ...(study.liveUrl
                ? {
                    sameAs: study.liveUrl,
                  }
                : {}),
              ...(study.coverImage
                ? {
                    image: absoluteUrl(study.coverImage.src),
                  }
                : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Work",
                  item: absoluteUrl("/work"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: study.name,
                  item: absoluteUrl(`/${study.slug}`),
                },
              ],
            },
          ],
        }}
      />
      <CaseStudyViewed name={study.name} slug={study.slug} />
      <main>
        <section className="container-ck pb-12 pt-10 lg:pt-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" /> Selected work
          </Link>

          <div className="mx-auto mt-10 max-w-3xl">
            <p
              className="ck-rise text-xs font-semibold uppercase tracking-[0.18em] text-forest"
              style={{ animationDelay: `${caseStudyHeroTiming.eyebrow}ms` }}
            >
              {study.category}
            </p>
            <h1
              className="ck-rise mt-4 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl"
              style={{ animationDelay: `${caseStudyHeroTiming.title}ms` }}
            >
              {study.name}
            </h1>
            <p
              className="ck-rise mt-5 text-xl leading-relaxed text-muted"
              style={{ animationDelay: `${caseStudyHeroTiming.lead}ms` }}
            >
              {study.oneLiner}
            </p>

            {/* The proof line. Sits above the fold on purpose — a visitor
                scanning the page should get what changed before they decide
                whether to read the write-up underneath. */}
            <p
              className="ck-rise mt-6 border-l-2 border-forest pl-4 text-lg leading-relaxed text-ink"
              style={{ animationDelay: `${caseStudyHeroTiming.outcome}ms` }}
            >
              {study.outcomeLine}
            </p>

            <ProjectFacts study={study} />

            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex flex-col gap-1 rounded-xl border border-line bg-card px-4 py-3 text-sm shadow-soft transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-muted">Live project</span>
                <span className="inline-flex items-center gap-2 break-all font-medium text-forest">
                  {study.liveUrl}
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </span>
              </a>
            )}
          </div>

          {study.coverImage && (
            <div
              className={`relative mx-auto mt-10 aspect-[16/8] w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-gradient-to-br shadow-soft ${study.accent}`}
            >
              <Image
                src={study.coverImage.src}
                alt={study.coverImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-contain"
                style={{ objectPosition: study.coverImage.position ?? "center" }}
              />
            </div>
          )}
        </section>

        <article className="container-ck pb-16">
          <div className="mx-auto max-w-3xl">
            <Section label="The short version" paragraphs={study.shortVersion} icon={FileText} />
            <Section label="The problem" paragraphs={study.problem} icon={CircleHelp} />

            {study.built.length > 0 && (
              <Reveal as="section" className="border-t border-line/70 py-10">
                <SectionLabel icon={Hammer}>What I built</SectionLabel>
                <ul className="mt-5 space-y-3 sm:pl-[2.4rem]">
                  {study.built.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base leading-relaxed text-ink/85 sm:text-lg"
                    >
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft">
                        <Check className="h-3 w-3 text-forest" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Section
              label="Design decisions"
              paragraphs={study.designDecisions}
              icon={Palette}
            />
            <Section
              label="Technical decisions"
              paragraphs={study.technicalDecisions}
              icon={Cpu}
            />
            <Section label="Challenges" paragraphs={study.challenges} icon={Mountain} />
            <Section label="The outcome" paragraphs={study.outcome} icon={Target} />
            <Section
              label="What I&apos;d improve next"
              paragraphs={study.improveNext}
              icon={TrendingUp}
            />
          </div>

          <CaseStudyLinks study={study} />

          <ProjectPageCta />
        </article>
      </main>
      <Footer />
    </>
  );
}

/**
 * The two links the case studies were missing. Until now a project connected
 * to its service only through the footer, and dead-ended at the CTA — so a
 * reader who finished one had nowhere to go and a crawler saw a leaf node.
 */
function CaseStudyLinks({ study }: { study: CaseStudy }) {
  const service = serviceAreas.find((area) => area.slug === study.serviceSlug);
  const others = caseStudies.filter((item) => item.slug !== study.slug);
  const next = others[(caseStudies.indexOf(study) + 1) % Math.max(others.length, 1)];

  if (!service && !next) return null;

  return (
    <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
      {service && (
        <Link
          href={service.href}
          className="group flex flex-col rounded-xl border border-line bg-card px-5 py-4 shadow-soft transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft/30"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            The service behind this
          </span>
          <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
            {service.title}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={`/${next.slug}`}
          className="group flex flex-col rounded-xl border border-line bg-card px-5 py-4 shadow-soft transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft/30"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Next project
          </span>
          <span className="mt-1.5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
            {next.name}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}
    </div>
  );
}

function ProjectPageCta() {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-line bg-card px-6 py-8 shadow-soft sm:px-8 lg:px-10 lg:py-10">
      <div className="grid items-center gap-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/images/cta/svg/sticky-note-cta.svg"
            alt=""
            width={240}
            height={240}
            className="h-auto w-40 rotate-[-3deg] drop-shadow-[0_18px_18px_rgba(31,36,32,0.16)] sm:w-full"
            aria-hidden="true"
          />
        </div>

        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
            Let&apos;s Talk
          </p>
          <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-ink sm:text-3xl">
            Want something like this for your business?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Whether it&apos;s a website, a system, or an idea that still feels a
            little messy, I can help you figure out what makes sense next.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
            {/* "Send me a note" sat here on the same /contact href as "Start a
                project". Removed rather than relabelled: WhatsApp below is the
                genuinely different channel. */}
            <ProjectInquiryTrigger
              source="case_study_cta"
              className="min-w-44"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </ProjectInquiryTrigger>
            <WhatsAppContactLink
              location="work_cta"
              className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl border border-forest/50 bg-transparent px-6 py-3 text-sm font-medium text-forest transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-soft/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              WhatsApp
            </WhatsAppContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
