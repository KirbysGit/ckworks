import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Code2,
  Monitor,
  Pencil,
  Settings,
  Sprout,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import AboutHero from "@/components/about/AboutHero";
import CreativeTechnicalSplit from "@/components/about/CreativeTechnicalSplit";
import WhySection from "@/components/about/WhySection";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";

const aboutDescription =
  "CK Works is a small digital studio led by Colin Kirby, combining design, software development, and systems thinking to build clearer websites and practical digital tools for growing businesses.";

const studioCapabilities = [
  {
    title: "Design",
    body: "Clarity in messaging and shape a better experience.",
    icon: Pencil,
  },
  {
    title: "Development",
    body: "Build clean, maintainable sites and tools.",
    icon: Code2,
  },
  {
    title: "Systems",
    body: "Organize data and workflows so things run smoothly.",
    icon: Settings,
  },
  {
    title: "Visibility",
    body: "Improve how you are found, understood, and chosen.",
    icon: BarChart3,
  },
];

const audienceItems = [
  {
    title: "Founders",
    body: "Building something important from the ground up.",
    icon: UserRound,
  },
  {
    title: "Small teams",
    body: "Need an extra set of hands that plugs in quickly.",
    icon: UsersRound,
  },
  {
    title: "Local businesses",
    body: "Want a professional online presence that reflects their work.",
    icon: Store,
  },
  {
    title: "Useful systems",
    body: "Need a practical tool or workflow without a bloated agency process.",
    icon: Monitor,
  },
];

const selectedWork = ["tizirsso", "taylor", "centi"]
  .map((slug) => getCaseStudy(slug))
  .filter((study): study is CaseStudy => Boolean(study));

export const metadata: Metadata = createPageMetadata({
  title: "About",
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
              "@type": "ProfessionalService",
              name: "CK Works",
              url: absoluteUrl("/"),
              founder: {
                "@type": "Person",
                name: "Colin Kirby",
                jobTitle: "Founder",
              },
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
          ],
        }}
      />

      <AboutHero />
      <WhySection />
      <CreativeTechnicalSplit />
      <FounderStudioSection />
      <AudienceSection />
      <SelectedWorkSection />
      <AboutClosingCTA />
    </SiteLayout>
  );
}

function FounderStudioSection() {
  return (
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-16">
      <div className="container-ck grid gap-12 lg:grid-cols-[minmax(18rem,0.65fr)_minmax(0,1fr)] lg:items-start">
        <div className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            Founder & Studio
          </p>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink">
            Colin Kirby
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted sm:text-base">
            <p>
              I&apos;m a computer engineer by training and a builder by nature.
              Years in software development gave me a deep respect for clean
              systems and reliable code.
            </p>
            <p>
              My continued interest in design grew out of a simple belief: good
              design makes complex things easier to understand and use.
            </p>
            <p>
              Today I combine both sides, engineering and design, to create
              digital work that&apos;s clear, practical, and built to last.
            </p>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-line bg-card shadow-soft sm:grid-cols-2">
          {studioCapabilities.map(({ title, body, icon: Icon }, index) => (
            <article
              key={title}
              className={`min-h-52 border-line p-7 ${
                index % 2 === 0 ? "sm:border-r" : ""
              } ${index < 2 ? "border-b" : index === 2 ? "border-b sm:border-b-0" : ""}`}
            >
              <Icon className="h-10 w-10 text-forest" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-2xl font-medium text-ink">
                {title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="border-b border-line/70 bg-card/25 py-10 lg:py-12">
      <div className="container-ck">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
          Who CK Works Works With
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {audienceItems.map(({ title, body, icon: Icon }, index) => (
            <article
              key={title}
              className={`flex gap-5 lg:px-8 ${
                index > 0 ? "lg:border-l lg:border-line" : ""
              }`}
            >
              <Icon
                className="mt-1 h-9 w-9 shrink-0 text-forest"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-serif text-xl font-medium text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedWorkSection() {
  return (
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-14">
      <div className="container-ck">
        <div className="flex items-end justify-between gap-6">
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
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {selectedWork.map((study) => (
            <AboutWorkCard key={study.slug} study={study} />
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

function AboutClosingCTA() {
  return (
    <section className="bg-[linear-gradient(180deg,#FAF7F0_0%,#E8EFE3_100%)] py-12 lg:py-16">
      <div className="container-ck grid items-center gap-8 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1fr)]">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-28 w-44 text-forest/80">
            <Sprout
              className="absolute left-12 top-1 h-20 w-20"
              strokeWidth={1.35}
            />
            <svg
              viewBox="0 0 210 95"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <path
                d="M13 72C50 38 101 33 145 50C168 58 184 69 198 78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Have something that needs to work better?
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Tell me a little about your business and what you&apos;d like to
            improve.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-forest px-7 py-3 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
