import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Layers3,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  TrendingUp,
  Workflow,
} from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import WhatsAppContactLink from "@/components/contact/WhatsAppContactLink";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import Reveal from "@/components/ui/Reveal";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import {
  caseStudies,
  featuredCaseStudies,
  secondaryCaseStudies,
  type CaseStudy,
} from "@/lib/projects";

export const metadata: Metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "A clean portfolio of CK Works websites, products, systems, integrations, and prototypes built around clearer business goals.",
  path: "/work",
});

const workPageContainer =
  "mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-7 2xl:px-8";

const groupLabels: Record<CaseStudy["group"], string> = {
  client: "Client Work",
  product: "Product / System",
  prototype: "Prototype",
};

const groupIcons: Record<CaseStudy["group"], LucideIcon> = {
  client: BriefcaseBusiness,
  product: Layers3,
  prototype: MonitorSmartphone,
};

const secondaryIcons: Record<string, LucideIcon> = {
  "ck-dev": Palette,
  "sentiment-trader": TrendingUp,
  "internal-automation-tool": Workflow,
  securescape: ShieldCheck,
};

export default function WorkPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="work-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CK Works Selected Work",
          description:
            "Selected websites, products, systems, and prototypes by CK Works.",
          url: absoluteUrl("/work"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: caseStudies.map((study, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "CreativeWork",
                name: study.name,
                url: absoluteUrl(`/${study.slug}`),
                description: study.oneLiner,
              },
            })),
          },
        }}
      />

      <WorkHero />
      <FeaturedWorkSection />
      <MoreWorkSection />
      <WorkFooterCta />
    </SiteLayout>
  );
}

/**
 * Hero entrance rhythm. Copy rises first, then the folders land in drawer
 * order (01 -> 04) so the cluster assembles rather than arriving as a slab.
 * Card delays are read by `workHeroLogoCards` below.
 */
const workHeroTiming = {
  eyebrow: 0,
  title: 80,
  lead: 170,
  tizirsso: 260,
  taylor: 360,
  setlst: 460,
  centi: 560,
} as const;

function WorkHero() {
  return (
    <section className="overflow-hidden border-b border-line/70 bg-ivory py-12 sm:py-14 lg:py-16">
      <div className={workPageContainer}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(28rem,1.06fr)] lg:items-center">
          <div>
            <p
              className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest"
              style={{ animationDelay: `${workHeroTiming.eyebrow}ms` }}
            >
              Selected Work
            </p>
            <h1
              className="ck-rise mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[4rem]"
              style={{ animationDelay: `${workHeroTiming.title}ms` }}
            >
              A few things I&apos;ve built, designed, or helped bring into
              shape.
            </h1>
            <p
              className="ck-rise mt-6 max-w-2xl text-base leading-7 text-ink/76 sm:text-lg"
              style={{ animationDelay: `${workHeroTiming.lead}ms` }}
            >
              Websites, products, systems, and the experiments in between.
              Here&apos;s a selection of work I&apos;m proud of and the problems
              I set out to solve.
            </p>
          </div>

          <WorkLogoStack />
        </div>
      </div>
    </section>
  );
}

// Card positioning configuration - easy to adjust.
// These values are applied as inline styles so percentages and negatives work.
const cardPositions = {
  tizirsso: {
    left: "6%",
    top: "0%",
    zIndex: 20,
    width: "53%",
    mobileWidth: "55%",
    rotation: "-2.2deg",
  },
  taylor: {
    right: "7%",
    top: "12%",
    zIndex: 30,
    width: "34%",
    mobileWidth: "43%",
    rotation: "3.5deg",
  },
  setlst: {
    left: "12%",
    bottom: "-8%",
    zIndex: 10,
    width: "42%",
    mobileWidth: "48%",
    rotation: "2.4deg",
  },
  centi: {
    right: "6%",
    bottom: "3%",
    zIndex: 20,
    width: "38%",
    mobileWidth: "45%",
    rotation: "-1.2deg",
  },
} as const;

type CardPosition = typeof cardPositions[keyof typeof cardPositions];

const buildCardStyle = (pos: CardPosition) => {
  return {
    left: "left" in pos ? pos.left : undefined,
    right: "right" in pos ? pos.right : undefined,
    top: "top" in pos ? pos.top : undefined,
    bottom: "bottom" in pos ? pos.bottom : undefined,
    zIndex: pos.zIndex,
    "--work-card-mobile-width": pos.mobileWidth,
    "--work-card-width": pos.width,
    "--work-card-rotation": pos.rotation,
  } as CSSProperties;
};

const workHeroLogoCards = [
  {
    slug: "tizirsso",
    number: "01",
    type: "Website",
    src: "/images/projects/png/tizi-logo.png",
    alt: "Tizirsso Racing",
    meta: ["Client Work", "Live"],
    style: buildCardStyle(cardPositions.tizirsso),
    delay: workHeroTiming.tizirsso,
    logoClassName: "p-5 sm:p-6",
    background: "linear-gradient(140deg, #E10600 0%, #7d0400 55%, #160404 100%)",
  },
  {
    slug: "taylor",
    number: "02",
    type: "Product",
    src: "/images/projects/png/taylor-logo.png",
    alt: "Taylor.io",
    meta: ["Personal Project", "Early Build"],
    style: buildCardStyle(cardPositions.taylor),
    delay: workHeroTiming.taylor,
    logoClassName: "p-4 sm:p-5",
    background:
      "radial-gradient(55% 48% at 22% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%), radial-gradient(42% 38% at 82% 78%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 55%), linear-gradient(155deg, #D65656 0%, #AF3E48 55%, #7f2c37 100%)",
  },
  {
    slug: "setlst",
    number: "03",
    type: "Concept",
    src: "/images/projects/png/setlst-logo.png",
    alt: "SETLST",
    meta: ["Product Concept", "In Progress"],
    style: buildCardStyle(cardPositions.setlst),
    delay: workHeroTiming.setlst,
    logoClassName: "p-5 sm:p-6",
    background: "linear-gradient(135deg, #2EF2C3 0%, #8B5CF6 100%)",
  },
  {
    slug: "centi",
    number: "04",
    type: "Fintech",
    src: "/images/projects/png/centi-logo.png",
    alt: "Centi",
    meta: ["Personal Project", "Working Build"],
    style: buildCardStyle(cardPositions.centi),
    delay: workHeroTiming.centi,
    logoClassName: "p-4 sm:p-5",
    background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)",
  },
] as const;

function WorkLogoStack() {
  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-[46rem] lg:mx-0 lg:ml-auto lg:h-[31rem]">
      <span
        className="pointer-events-none absolute bottom-[11%] right-[5%] text-4xl text-muted/35"
        aria-hidden
      >
        *
      </span>

      {/* Three transforms are in play per card — the entrance, the resting
          tilt, and the hover lift. They must live on separate elements: every
          entrance primitive ends at `transform: none` with `both` fill, so
          sharing one element would permanently discard the tilt and the hover.
          The Link owns the entrance; the inner div owns tilt + hover. */}
      {workHeroLogoCards.map((card) => (
        <Link
          key={card.slug}
          href={`/${card.slug}`}
          className="ck-lift group absolute block w-[var(--work-card-mobile-width)] sm:w-[var(--work-card-width)]"
          style={{ ...card.style, animationDelay: `${card.delay}ms` }}
        >
          <div className="flex rotate-[var(--work-card-rotation)] flex-col transition-transform duration-300 group-hover:-translate-y-1">
            {/* Folder tab. Sits above the card, borders on three sides only,
                and the -mb-px lets its fill cover the card's top border. */}
            <span className="relative z-10 -mb-px ml-3 flex items-center gap-1.5 self-start whitespace-nowrap rounded-t-[0.3rem] border-x border-t border-line bg-card px-2 pb-1.5 pt-1 text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-ink/70 sm:ml-4 sm:px-3 sm:text-[0.55rem] sm:tracking-[0.14em]">
              <span className="text-forest">{card.number}</span>
              <span className="h-2 w-px bg-line/80" aria-hidden />
              <span>{card.type}</span>
            </span>

            <article className="relative aspect-[1.28/1] overflow-hidden rounded-[0.35rem] border border-line bg-card shadow-[0_2px_5px_rgba(31,36,32,0.07),0_24px_42px_-32px_rgba(31,36,32,0.48)] transition-shadow duration-300 group-hover:shadow-[0_4px_10px_rgba(31,36,32,0.08),0_30px_46px_-30px_rgba(31,36,32,0.62)]">
              <span
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.65),transparent_42%,rgba(31,36,32,0.035))]"
                aria-hidden
              />

              <div className="relative z-10 flex h-full flex-col p-4 sm:p-5">
                <div
                  className="relative min-h-0 flex-1 overflow-hidden rounded-[0.25rem]"
                  style={{ background: card.background }}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 340px, 50vw"
                    className={`relative object-contain transition-transform duration-300 group-hover:scale-[1.035] ${card.logoClassName}`}
                  />
                </div>

                <div className="mt-3 border-t border-line/70" aria-hidden />

                <div className="flex items-center justify-center gap-1.5 whitespace-nowrap pt-2.5 text-[0.55rem] font-medium uppercase tracking-[0.08em] text-ink/70 sm:text-[0.62rem]">
                  {card.meta.map((item, index) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5"
                    >
                      {index > 0 && (
                        <span
                          className="h-1 w-1 rounded-full bg-forest"
                          aria-hidden
                        />
                      )}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </Link>
      ))}
    </div>
  );
}

function FeaturedWorkSection() {
  return (
    <section className="bg-ivory py-12 sm:py-14 lg:py-16">
      <div className={workPageContainer}>
        <Reveal>
          <SectionIntro
            label="Featured Work"
            title="Client sites, product ideas, and systems with a little more story."
            description="Each case study keeps the visible summary short, then gives more detail when someone wants the full context."
          />
        </Reveal>

        {/* One Reveal around the whole stack, not per card: the cards overlap
            via `-mt-5` / `first:mt-0`, so wrapping each one individually would
            break those sibling selectors and collapse the drawer. */}
        <Reveal className="mt-12" delay={90}>
          <div>
            {featuredCaseStudies.map((study, index) => (
              <FileDrawerWorkCard
                key={study.slug}
                study={study}
                index={index + 1}
                total={featuredCaseStudies.length}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MoreWorkSection() {
  return (
    <section className="border-t border-line/70 bg-ivory py-10 sm:py-12 lg:py-14">
      <div className={workPageContainer}>
        <Reveal>
          <SectionIntro
            label="More Technical Work"
            title="Smaller builds with useful technical range."
            description="A selection of experiments, prototypes, and systems that reflect how I approach product and engineering problems."
          />
        </Reveal>

        <Reveal
          className="mt-10 rounded-xl border border-line/70 bg-card/70 sm:mt-12"
          delay={90}
        >
          {secondaryCaseStudies.map((study, index) => (
            <TechnicalWorkRow
              key={study.slug}
              study={study}
              index={index + 1}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function SectionIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
        {label}
      </p>
      <h2 className="mt-4 font-serif text-[2rem] font-medium leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        {description}
      </p>
    </div>
  );
}

function FileDrawerWorkCard({
  study,
  index,
  total,
}: {
  study: CaseStudy;
  index: number;
  total: number;
}) {
  const tabLabel = `${String(index).padStart(2, "0")} Featured`;
  const stackLevel = total - index;
  const isFrontFile = index === total;

  return (
    <article
      className="group relative -mt-5 pt-7 first:mt-0 sm:-mt-6 lg:-mt-7"
      style={{ zIndex: index }}
    >
      <div
        className="absolute left-5 top-[0px] z-20 flex h-8 w-[15rem] items-center justify-center sm:left-7"
        aria-hidden
      >
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 240 32"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M24 0H216Q222 0 226 6L240 32H0L14 6Q18 0 24 0Z" fill="#FFFDF8" />
          <path
            d="M0 32L14 6Q18 0 24 0H216Q222 0 226 6L240 32"
            fill="none"
            stroke="#DDD6C8"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative z-10 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-forest">
          {tabLabel}
        </span>
      </div>
      <span
        className="pointer-events-none absolute left-5 top-[1.72rem] z-30 h-[3px] w-[15rem] bg-card sm:left-7"
        aria-hidden
      />

      <div
        className={`relative z-10 overflow-visible rounded-t-xl border border-line bg-card px-5 pb-9 pt-6 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_18px_42px_-38px_rgba(31,36,32,0.45)] sm:px-7 sm:pb-10 sm:pt-7 lg:px-9 lg:pb-10 lg:pt-8 ${
          isFrontFile ? "rounded-b-xl" : "rounded-b-none"
        }`}
        style={{
          transform: `translateY(${stackLevel * 1}px)`,
          boxShadow: `0 1px 0 rgba(255,255,255,0.75) inset, 0 ${
            16 + index * 2
          }px ${34 + index * 3}px -${34 - index}px rgba(31,36,32,0.34)`,
        }}
      >
        {!isFrontFile && (
          <span
            className="pointer-events-none absolute inset-x-[-1px] bottom-[-1.35rem] h-6 border-x border-line bg-card"
            aria-hidden
          />
        )}
        <EditorialWorkCardContent study={study} index={index} />
      </div>
    </article>
  );
}

function EditorialWorkCardContent({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`grid items-stretch gap-7 lg:gap-10 ${
        isEven
          ? "lg:grid-cols-[minmax(0,0.66fr)_minmax(16rem,0.34fr)]"
          : "lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]"
      }`}
    >
      {/* Text Content */}
      <div className={`pt-2 lg:pt-1 ${isEven ? "lg:col-start-2" : ""}`}>
        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-forest/75">
          {String(index).padStart(2, "0")}
        </p>
        <p className="mt-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-forest">
          {groupLabels[study.group]} / {cleanText(study.category)}
        </p>

        <div className="mt-5">
          <h3 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2.35rem]">
            {study.name}
          </h3>
        </div>

        <p className="mt-6 max-w-sm text-[0.98rem] leading-7 text-muted">
          {study.teaser}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href={`/${study.slug}`}
            className="group/link inline-flex items-center gap-2 border-b border-forest/45 pb-1 font-sans text-sm font-semibold text-forest transition-colors duration-200 hover:border-forest hover:text-ink"
          >
            View project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 border-b border-forest/45 pb-1 font-sans text-sm font-semibold text-forest transition-colors duration-200 hover:border-forest hover:text-ink"
            >
              Live site
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      {/* Image */}
      <Link
        href={`/${study.slug}`}
        className={`group/image relative z-0 flex min-h-[16rem] overflow-hidden rounded-t-lg rounded-b-none border border-line shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift sm:min-h-[18rem] lg:h-full lg:min-h-[19rem] ${
          isEven ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        {study.coverImage ? (
          <div className="absolute -bottom-4 left-0 right-0 top-0 transition-transform duration-500 group-hover/image:scale-[1.025] sm:-bottom-5">
            <Image
              src={study.coverImage.src}
              alt={study.coverImage.alt}
              fill
              sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              style={{
                objectPosition: study.coverImage.position ?? "center top",
              }}
            />
          </div>
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${study.accent}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
      </Link>
    </div>
  );
}

const technicalWorkSummaries: Record<
  string,
  { summary: string; stack: string; status: string; image?: string }
> = {
  "ck-dev": {
    summary: "Creative frontend portfolio",
    status: "Personal build",
    stack: "Frontend · UI experiments",
    image: "/images/projects/png/ck-dev.png",
  },
  "sentiment-trader": {
    summary: "Financial sentiment data pipeline",
    status: "Active experiment",
    stack: "Python · NLP · Market data",
    image: "/images/projects/png/sentiment-trader.png",
  },
  "internal-automation-tool": {
    summary: "Internal operations platform",
    status: "Internship work",
    stack: "Automation · Backend systems",
  },
  securescape: {
    summary: "Hardware/software security prototype",
    status: "Senior design",
    stack: "Embedded systems · Computer vision",
    image: "/images/projects/png/secure-scape.png",
  },
};

function TechnicalWorkRow({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const Icon = secondaryIcons[study.slug] ?? groupIcons[study.group];
  const summary = technicalWorkSummaries[study.slug];

  return (
    <Link
      href={`/${study.slug}`}
      className="group grid gap-4 border-b border-line px-4 py-5 transition-colors duration-200 last:border-b-0 hover:bg-forest-soft/18 sm:grid-cols-[3.5rem_12.5rem_minmax(0,1fr)_minmax(9rem,0.16fr)_2rem] sm:items-center sm:px-7 lg:px-8"
    >
      <div className="flex items-center sm:justify-center">
        <span className="font-source-serif-display text-xl font-medium tabular-nums text-forest">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-[1.9/1] overflow-hidden rounded-lg border border-line bg-forest-soft shadow-[0_10px_24px_-20px_rgba(31,36,32,0.6)]">
        {summary?.image ? (
          <Image
            src={summary.image}
            alt=""
            fill
            sizes="220px"
            className="object-cover"
          />
        ) : study.slug === "internal-automation-tool" ? (
          <InternalAutomationThumb />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-forest">
            <Icon className="h-6 w-6" strokeWidth={1.55} />
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-serif text-[1.55rem] font-medium leading-tight text-ink sm:text-[1.85rem]">
            {study.name}
          </h3>
          <p className="text-[0.72rem] font-semibold leading-5 text-forest sm:text-[0.82rem]">
            {summary?.summary ?? cleanText(study.category)}
          </p>
        </div>
        <p className="mt-1.5 text-sm leading-6 text-muted sm:text-[1rem]">
          {summary?.stack ?? cleanText(study.category)}
        </p>
      </div>

      <span className="hidden justify-self-end text-right font-sans text-[0.76rem] font-medium uppercase tracking-[0.07em] text-muted sm:block">
        {summary?.status ?? groupLabels[study.group]}
      </span>

      <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest sm:justify-self-end">
        <span className="sr-only">View {study.name}</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.55}
          aria-hidden
        />
      </span>
    </Link>
  );
}

function InternalAutomationThumb() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#111614] p-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="h-1.5 w-8 rounded-full bg-ivory/30" />
        <span className="h-1.5 w-4 rounded-full bg-[#5F9C69]" />
      </div>
      <div className="grid grid-cols-[0.38fr_1fr] gap-2">
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className="block h-1.5 rounded-full bg-ivory/20"
            />
          ))}
        </div>
        <div className="space-y-1.5">
          <span className="block h-4 rounded bg-ivory/12" />
          <span className="block h-1.5 w-4/5 rounded-full bg-ivory/25" />
          <span className="block h-1.5 w-2/3 rounded-full bg-[#5F9C69]/70" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((item) => (
          <span key={item} className="h-3 rounded bg-ivory/12" />
        ))}
      </div>
    </div>
  );
}

function WorkFooterCta() {
  return (
    <section className="border-t border-line/70 bg-ivory py-12 sm:py-14 lg:py-16">
      <div className={workPageContainer}>
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-card px-5 py-8 text-center shadow-soft sm:px-8 lg:px-10 lg:py-12">
          <Image
            src="/images/projects/svg/work-cta-left.svg"
            alt=""
            width={300}
            height={230}
            className="pointer-events-none absolute left-8 top-[15%] hidden w-50 opacity-90 lg:block xl:left-12 xl:w-90"
          />
          <Image
            src="/images/projects/svg/work-cta-right.svg"
            alt=""
            width={300}
            height={250}
            className="pointer-events-none absolute right-8 top-[20%] hidden w-44 opacity-90 lg:block xl:right-12 xl:w-60"
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Let&apos;s build something
            </p>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.03] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[4rem]">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Send a note with the site, system, or idea you&apos;re working
              through. I&apos;ll help you shape the next step.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-forest px-7 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift sm:min-w-[13rem]"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppContactLink
                location="work_footer_cta"
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

function cleanText(value: string) {
  return value.replaceAll("Â·", "·").replaceAll("â€”", "—");
}
