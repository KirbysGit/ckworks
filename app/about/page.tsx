import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Code2,
  MessageCircle,
  Monitor,
  Pencil,
  Settings,
  Sprout,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";

const aboutDescription =
  "CK Works is a small digital studio led by Colin Kirby, combining design, software development, and systems thinking to build clearer websites and practical digital tools for growing businesses.";

const beliefSteps = [
  {
    label: "Your business",
    icon: Building2,
  },
  {
    label: "Clear communication",
    icon: MessageCircle,
  },
  {
    label: "Stronger relationships",
    icon: UserRound,
  },
];

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
      <FounderStudioSection />
      <AudienceSection />
      <SelectedWorkSection />
      <AboutClosingCTA />
    </SiteLayout>
  );
}

function AboutHero() {
  return (
    <section className="overflow-hidden border-b border-line/70 bg-ivory py-12 sm:py-16 lg:py-20">
      <div className="container-ck grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(34rem,1fr)]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            About CK Works
          </p>
          <h1 className="mt-6 font-serif text-[3.25rem] font-medium leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            A small studio for thoughtful digital work.
          </h1>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            CK Works is led by Colin Kirby and combines design, software
            development, and systems thinking to build clearer websites and
            practical digital tools for growing businesses.
          </p>
        </div>

        <StudioDeskVisual />
      </div>
    </section>
  );
}

function StudioDeskVisual() {
  return (
    <div className="relative mx-auto min-h-[25rem] w-full max-w-[46rem]">
      <div className="absolute bottom-0 left-0 right-0 h-14 rounded-t-[3rem] border-t border-line bg-[linear-gradient(180deg,#EFE8DA,#D9CBB8)] shadow-[0_-18px_50px_-35px_rgba(31,36,32,0.45)]" />

      <div className="absolute bottom-12 right-0 hidden h-72 w-24 sm:block">
        <div className="absolute bottom-0 left-8 h-24 w-12 rounded-b-full rounded-t-lg border border-line bg-[#E4D8C7] shadow-soft" />
        <div className="absolute bottom-20 left-[3.7rem] h-32 w-px rotate-[-6deg] bg-forest/50" />
        {[0, 1, 2, 3, 4, 5].map((leaf) => (
          <span
            key={leaf}
            className="absolute h-9 w-4 rounded-full bg-forest/65"
            style={{
              bottom: `${8.7 + leaf * 1.55}rem`,
              left: `${leaf % 2 === 0 ? 3.3 : 4.35}rem`,
              transform: `rotate(${leaf % 2 === 0 ? -38 : 38}deg)`,
            }}
          />
        ))}
      </div>

      <div className="absolute left-5 top-8 z-10 hidden rotate-[-7deg] rounded-lg border border-line bg-card p-4 shadow-lift sm:block">
        <div className="grid grid-cols-2 gap-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/65">
          <span className="rounded border border-line px-3 py-2 text-center">
            Plan
          </span>
          <span className="rounded border border-line px-3 py-2 text-center">
            Build
          </span>
          <span className="col-span-2 mx-auto rounded border border-line px-3 py-2 text-center">
            Improve
          </span>
        </div>
        <svg
          viewBox="0 0 150 82"
          className="absolute inset-x-4 top-8 h-20 text-forest/55"
          fill="none"
        >
          <path
            d="M45 18C62 5 89 5 106 18M105 18l-8-1M105 18l-1-8M105 63C88 77 61 77 44 63M44 63l8 1M44 63l1 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 5"
          />
        </svg>
      </div>

      <div className="absolute bottom-20 left-12 z-20 hidden w-32 rotate-[2deg] rounded-md border border-line bg-[#F6EEDC] px-5 py-4 shadow-soft sm:block">
        <p className="font-serif text-base leading-7 text-ink">
          Focus
          <br />
          Clarity
          <br />
          Useful tools
        </p>
        <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#C6A16F] shadow-soft" />
      </div>

      <div className="absolute bottom-[4.7rem] right-24 w-[64%] min-w-[20rem] max-w-[29rem]">
        <div className="rounded-t-2xl bg-panel p-3 shadow-float">
          <div className="aspect-[16/9] overflow-hidden rounded-sm bg-card">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-serif text-sm uppercase tracking-[0.08em] text-ink">
                CK Works
              </p>
              <div className="hidden gap-5 text-[10px] font-semibold text-ink/70 sm:flex">
                <span>Work</span>
                <span>Services</span>
                <span>Process</span>
                <span>About</span>
              </div>
            </div>
            <div className="grid h-[calc(100%-2.75rem)] grid-cols-[1fr_0.85fr] gap-5 p-7">
              <div>
                <p className="font-serif text-3xl leading-none text-ink">
                  Better systems.
                  <br />
                  Clearer growth.
                </p>
                <p className="mt-4 text-[11px] leading-5 text-muted">
                  Practical tools and websites that help your business move
                  forward.
                </p>
                <span className="mt-5 inline-flex rounded bg-forest px-4 py-2 text-[10px] font-semibold text-ivory">
                  Start a project
                </span>
              </div>
              <div className="rounded bg-[linear-gradient(135deg,#EFECE3,#BEB7A7)] p-5">
                <div className="ml-auto mt-6 h-24 w-20 bg-card shadow-[22px_-26px_0_-12px_rgba(31,36,32,0.16),-36px_18px_0_-18px_rgba(47,91,63,0.18)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-12 w-20 bg-[linear-gradient(180deg,#D5D1C8,#BDB7AA)]" />
        <div className="mx-auto h-4 w-40 rounded-t-full bg-[linear-gradient(180deg,#CFC8BB,#AFA798)]" />
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <section className="border-b border-line/70 bg-card/30 py-10 lg:py-12">
      <div className="container-ck grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(34rem,1fr)]">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            Why CK Works Exists
          </p>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            Good businesses deserve digital experiences that communicate clearly
            and work reliably.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
          {beliefSteps.map(({ label, icon: Icon }, index) => (
            <div key={label} className="contents">
              <div
                className="flex flex-col items-center text-center text-sm font-medium text-ink"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-ivory text-forest shadow-soft">
                  <Icon className="h-8 w-8" strokeWidth={1.4} />
                </span>
                <span className="mt-4">{label}</span>
              </div>
              {index < beliefSteps.length - 1 && (
                <ArrowRight
                  className="mx-auto hidden h-5 w-5 text-muted/70 sm:block"
                  strokeWidth={1.5}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
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
