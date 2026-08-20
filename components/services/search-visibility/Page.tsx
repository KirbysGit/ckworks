/** Renders the bespoke SEO and AI Search Visibility service experience. */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bell,
  Box,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Database,
  Eye,
  FileCode2,
  FileText,
  Flag,
  Gauge,
  Globe,
  Headphones,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareText,
  MonitorSmartphone,
  Navigation,
  Paintbrush,
  Pencil,
  PhoneCall,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkle,
  Store,
  Tag,
  TrendingUp,
  UserRound,
  Wrench,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import {
  SiAirtable,
  SiGooglecalendar,
  SiGooglesheets,
  SiStripe,
} from "react-icons/si";
import FAQSection from "@/components/page/FAQSection";
import Reveal from "@/components/ui/Reveal";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import ServiceTimeline from "@/components/services/shared/ServiceTimeline";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";
import { searchVisibilityTimeline, type ServiceArea } from "@/lib/services";
import ServiceFrame from "../shared/ServiceFrame";
import RelatedLinks from "../shared/RelatedLinks";
import ProjectWorkCard from "../shared/ProjectWorkCard";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
  serviceHeroTitleClassName,
  serviceSectionBodyClassName,
  serviceSectionLabelClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";

const visibilityBenefits = [
  {
    title: "Easier to find",
    body: "Help search engines and AI tools discover your pages.",
    icon: Search,
  },
  {
    title: "Clearer page meaning",
    body: "Structure and signals that explain what each page is about.",
    icon: FileText,
  },
  {
    title: "Practical guidance",
    body: "Actionable recommendations you can use right away.",
    icon: UserRound,
  },
] as const;

const visibilityScope = [
  {
    title: "Technical foundations",
    body: "Clear hierarchy and indexing basics help search systems read your site correctly.",
    icon: Settings2,
    helpsWith: ["Indexing", "page hierarchy", "performance"],
    demo: "technical",
  },
  {
    title: "Local presence",
    body: "Consistent business details help local customers find the right fit faster.",
    icon: MapPin,
    helpsWith: ["Maps", "local search", "trust signals"],
    demo: "local",
  },
  {
    title: "Clear content",
    body: "Clear service pages help people and answer engines understand what you do.",
    icon: FileText,
    helpsWith: ["Relevance", "clarity", "AI summaries"],
    demo: "content",
  },
  {
    title: "Structured data",
    body: "Schema connects your business, service, place, and contact details.",
    icon: FileCode2,
    helpsWith: ["Search understanding", "rich context"],
    demo: "schema",
  },
  {
    title: "Ongoing visibility",
    body: "A simple reporting rhythm shows what is changing and where to improve.",
    icon: TrendingUp,
    helpsWith: ["Measurement", "changes", "refinement"],
    demo: "monitoring",
  },
] as const;

// Shared card dimensions keep the five visibility artifacts compact and consistent.
const visibilityScopeLayout = {
  cardRadius: "rounded-[1.25rem]",
  /** Shared demo band height so all five cards stay even. */
  demoHeight: "h-[9.75rem] sm:h-[10.25rem]",
} as const;

const visibilitySignals = [
  {
    title: "Clear service name",
    body: "Helps systems know what you do.",
    icon: Tag,
  },
  {
    title: "Orlando location",
    body: "Signals your service area and relevance.",
    icon: MapPin,
  },
  {
    title: "Clear from the first glance",
    body: "The subtitle shows what they stand for.",
    icon: Eye,
  },
  {
    title: "Project examples",
    body: "Real proof builds trust and context.",
    icon: LayoutTemplate,
  },
  {
    title: "Helpful answers",
    body: "Direct answers help AI tools quote you.",
    icon: MessageSquareText,
  },
  {
    title: "Contact pathway",
    body: "Makes it easy to take the next step.",
    icon: PhoneCall,
  },
] as const;

const searchVisibilityFaqs = [
  {
    question: "What do SEO, AEO, and GEO mean here?",
    answer:
      "The practical goal is the same: make your site easier for search engines, answer tools, and people to understand. CK Works focuses on the useful foundations behind that work, without the jargon-heavy sales pitch.",
  },
  {
    question: "Is this a guarantee of rankings?",
    answer:
      "No. Search visibility is influenced by competition, demand, site history, and many factors outside one website. The work here improves clarity, technical health, discoverability, and measurement so the site has a stronger foundation.",
  },
  {
    question: "How long does it take to see results?",
    // Figure comes from the same object the hero reads, so the two cannot drift.
    answer: `The first pass takes ${searchVisibilityTimeline.value}. Technical fixes and indexation updates can show up fairly quickly, while meaningful search growth builds over the months after — this is a starting point rather than an end date. I begin with the changes that make the site easier to understand now, then use real signals to guide what comes next.`,
  },
  {
    question: "Do you work with a specific platform?",
    answer:
      "The right approach depends on how your current site is built and what access is available. The first step is reviewing the site, identifying the most useful improvements, and deciding whether the existing setup supports them well.",
  },
] as const;

/**
 * Hero entrance choreography (ms). A search resolves, then an answer engine
 * reads it: copy settles → the result card lifts → query and tabs appear →
 * the result resolves into focus → action icons land → the AI Overview
 * follows, because it can only summarise a page once that page is understood.
 *
 * CSS animation delays only (runs on first paint, no hydration wait).
 * The envelope matches `webDesignHeroTiming` so the service pages feel
 * like siblings rather than two different sites.
 */
const searchVisibilityHeroTiming = {
  eyebrow: 0,
  title: 80,
  leadCopy: 170,
  actions: 310,
  resultCard: 260,
  searchBar: 420,
  tabs: 520,
  result: 620,
  actionIcons: 720,
  /** Added per icon after `actionIcons`. */
  actionIconStep: 50,
  snippet: 900,
  aiCard: 1000,
  aiHeader: 1120,
  aiSummary: 1200,
  aiChecks: 1320,
  /** Added per row after `aiChecks`. */
  aiCheckStep: 80,
} as const;

function SearchVisibilityRelated() {
  return (
    <RelatedLinks
      links={[
        {
          label: "See how website design and SEO work together",
          href: "/services/web-design-development",
          note: "Structure, hierarchy, and page copy are what search has to read in the first place.",
        },
        {
          label: "Connect search visibility to lead tracking",
          href: "/services/analytics-lead-tracking",
          note: "Measure which searches actually turn into inquiries, not just impressions.",
        },
      ]}
    />
  );
}

export default function Page({ service }: { service: ServiceArea }) {
  return (
    <ServiceFrame service={service}><section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={serviceContainer}>
          <SearchVisibilityHero timeline={service.timeline} />
          <SearchVisibilityBenefits />
          <SearchVisibilityScope />
          <SearchVisibilitySignals />
          <SearchVisibilityFaq />
          <SearchVisibilityRelated />
          <SearchVisibilityCta />
        </div>
      </section>
    </ServiceFrame>
  );
}

function SearchVisibilityHero({ timeline }: { timeline: ServiceArea["timeline"] }) {
  return (
    <section className="grid items-start gap-10 border-b border-line pb-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:gap-14">
      <div className="max-w-xl">
        <p
          className="ck-rise text-xs font-semibold uppercase tracking-[0.26em] text-forest"
          style={{ animationDelay: `${searchVisibilityHeroTiming.eyebrow}ms` }}
        >
          Visibility
        </p>
        <h1
          className={`ck-rise ${serviceHeroTitleClassName}`}
          style={{ animationDelay: `${searchVisibilityHeroTiming.title}ms` }}
        >
          SEO &amp; AI{" "}
          <br />
          Search Visibility
        </h1>
        <p
          className="ck-rise mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]"
          style={{ animationDelay: `${searchVisibilityHeroTiming.leadCopy}ms` }}
        >
          CK Works improves technical SEO, local search structure, on-page
          content, structured data, and AI-search visibility so customers and
          answer engines can understand what your business does.
        </p>
        <ServiceTimeline
          timeline={timeline}
          className="ck-rise mt-7"
          style={{ animationDelay: `${searchVisibilityHeroTiming.actions}ms` }}
        />
        <div
          className="ck-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: `${searchVisibilityHeroTiming.actions}ms` }}
        >
          <ProjectInquiryTrigger
            source="search_visibility_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <a
            href="#visibility-explained"
            className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-forest transition-colors hover:text-ink"
          >
            See how visibility works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <SearchVisibilityHeroVisual />
    </section>
  );
}

function GoogleMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <Image
      src="/images/services/svg/google-logo.svg"
      alt="Google"
      width={24}
      height={24}
      className={`shrink-0 ${className}`}
    />
  );
}

function SearchBar({
  compact = false,
  query = "custom home builder Orlando",
}: {
  compact?: boolean;
  query?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-line bg-ivory shadow-[0_8px_18px_-18px_rgba(31,36,32,0.6)] ${
        compact ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      <span
        className={`min-w-0 flex-1 truncate font-sans font-medium text-ink ${
          compact ? "text-[0.64rem]" : "text-sm"
        }`}
      >
        {query}
      </span>
      <Search
        className={`shrink-0 text-ink/65 ${compact ? "h-3.5 w-3.5" : "h-5 w-5"}`}
        strokeWidth={2}
      />
    </div>
  );
}

// Desktop overlap values for the illustrative search result and AI explanation.
const searchHeroVisualLayout = {
  mainCardWidth: "lg:w-[calc(60%)]",
  aiCardWidth: "lg:w-[40%]",
  aiCardTop: "lg:top-[10rem]",
  aiCardRight: "lg:right-10",
} as const;

function SearchVisibilityHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[48rem] pb-1 lg:min-h-[34rem] lg:pt-2">
      {/* Soft context sits behind the two artifacts rather than becoming another card. */}
      <span
        className="pointer-events-none absolute right-0 top-12 hidden h-[26rem] w-[26rem] opacity-45 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(95,156,105,0.42) 1.2px, transparent 1.3px)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />
      <Image
        src="/images/services/svg/02-writing-hero.svg"
        alt=""
        width={400}
        height={300}
        className="pointer-events-none absolute right-[2rem] top-[-3rem] z-0 hidden w-72 object-contain opacity-95 lg:block"
        aria-hidden
      />

      <div
        className={`ck-lift relative z-10 ${searchHeroVisualLayout.mainCardWidth}`}
        style={{
          animationDelay: `${searchVisibilityHeroTiming.resultCard}ms`,
        }}
      >
        <GoogleResultCard />
        <p
          className="ck-fade ml-4 mt-3 text-left text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted"
          style={{ animationDelay: `${searchVisibilityHeroTiming.snippet}ms` }}
        >
          Illustrative search example
        </p>
      </div>
      {/* Lands after the result: an answer engine can only summarise a page it has read. */}
      <div
        className={`ck-lift relative z-20 ml-auto mt-4 w-full max-w-[18rem] sm:w-[min(100%,18rem)] lg:absolute lg:mt-0 lg:max-w-none ${searchHeroVisualLayout.aiCardWidth} ${searchHeroVisualLayout.aiCardTop} ${searchHeroVisualLayout.aiCardRight}`}
        style={{ animationDelay: `${searchVisibilityHeroTiming.aiCard}ms` }}
      >
        <AiOverviewCard />
      </div>

    </div>
  );
}

const searchResultActions = [
  { label: "Website", icon: Globe },
  { label: "Call", icon: PhoneCall },
  { label: "Directions", icon: Navigation },
  { label: "Reviews", icon: Flag },
] as const;

function SearchResultCardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-line bg-card px-5 py-5 shadow-[0_22px_46px_-34px_rgba(31,36,32,0.54)] sm:px-6 sm:py-6 ${className}`}
    >
      {children}
    </div>
  );
}

function GoogleResultCard() {
  return (
    <SearchResultCardShell className="pb-3 sm:pb-4 lg:min-h-[24rem]">
      <div
        className="ck-fade flex items-center gap-4"
        style={{ animationDelay: `${searchVisibilityHeroTiming.searchBar}ms` }}
      >
        <GoogleMark className="h-7 w-7 sm:h-8 sm:w-8" />
        <div className="min-w-0 flex-1">
          <SearchBar compact query="Riverstone Builders" />
        </div>
      </div>

      <div
        className="ck-fade mt-4 flex border-b border-line text-[0.7rem] font-medium text-muted"
        style={{ animationDelay: `${searchVisibilityHeroTiming.tabs}ms` }}
      >
        {["All", "Maps", "Images", "News", "Videos", "More"].map((item) => (
          <span
            key={item}
            className={`relative flex-1 px-1 pb-2.5 text-center first:pl-0 last:pr-0 sm:px-2 ${
              item === "All" ? "font-semibold text-forest" : ""
            }`}
          >
            {item}
            {item === "All" && (
              <span className="absolute inset-x-1 bottom-0 h-0.5 bg-forest sm:inset-x-2" />
            )}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <div
          className="ck-resolve flex items-start justify-between gap-3"
          style={
            {
              "--ck-anim-delay": `${searchVisibilityHeroTiming.result}ms`,
            } as CSSProperties
          }
        >
          <div className="min-w-0">
            <p className="font-sans text-[1.12rem] font-semibold leading-tight text-[#1A5FCC] sm:text-[1.2rem]">
              Riverstone Builders
            </p>
            <p className="mt-1 text-[0.76rem] text-ink/78">
              Local residential builder
            </p>
            <p className="mt-1 text-[0.7rem] font-medium text-ink/80">
              5.0 <span className="text-[#D99323]">★★★★★</span> (23) · Builder
            </p>
          </div>
          <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-sand sm:h-16 sm:w-20">
            <Image
              src="/images/services/png/02-riverstone-demo.png"
              alt="Illustrative Riverstone Builders result"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 border-y border-line py-3.5 pr-5">
          {searchResultActions.map(({ label, icon: ActionIcon }, index) => (
            <span
              key={label}
              className="ck-pop flex min-w-0 flex-col items-center gap-1.5 text-center text-[0.65rem] font-medium text-ink/78 sm:text-[0.68rem]"
              style={{
                animationDelay: `${
                  searchVisibilityHeroTiming.actionIcons +
                  index * searchVisibilityHeroTiming.actionIconStep
                }ms`,
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-ivory text-forest sm:h-9 sm:w-9">
                <ActionIcon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={1.8} />
              </span>
              <span className="truncate">{label}</span>
            </span>
          ))}
        </div>

        <p
          className="ck-rise mt-4 text-[0.72rem] leading-5 text-ink/86"
          style={{ animationDelay: `${searchVisibilityHeroTiming.snippet}ms` }}
        >
          Riverstone Builders is a local residential builder specializing in
          custom homes, renovations, and additions. View projects and request a
          quote.
        </p>
        <div
          className="ck-rise mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] font-semibold text-[#0B57D0]"
          style={{ animationDelay: `${searchVisibilityHeroTiming.snippet}ms` }}
        >
          {["Services", "Projects", "About", "Contact"].map((link, index) => (
            <span key={link} className="flex items-center gap-x-2">
              {index > 0 && (
                <span
                  className="h-1 w-1 rounded-full bg-[#0B57D0]/50"
                  aria-hidden
                />
              )}
              {link}
            </span>
          ))}
        </div>
      </div>
    </SearchResultCardShell>
  );
}

function AiOverviewCard() {
  return (
    <SearchResultCardShell className="bg-[linear-gradient(145deg,rgba(255,253,248,1),rgba(247,243,234,0.72))] lg:min-h-[22rem]">
      <div className="flex h-full flex-col">
        <p
          className="ck-fade flex items-center gap-2.5 font-sans text-[0.9rem] font-bold text-ink"
          style={{ animationDelay: `${searchVisibilityHeroTiming.aiHeader}ms` }}
        >
          <Sparkle
            className="h-5 w-5 shrink-0 fill-forest text-forest"
            strokeWidth={1.25}
          />
          AI Overview
        </p>
        <div
          className="ck-draw-x mt-3 h-px w-full bg-line"
          style={
            {
              "--ck-anim-delay": `${searchVisibilityHeroTiming.aiHeader}ms`,
            } as CSSProperties
          }
          aria-hidden
        />
        <p
          className="ck-resolve mt-4 text-[0.85rem] leading-6 text-ink/88"
          style={
            {
              "--ck-anim-delay": `${searchVisibilityHeroTiming.aiSummary}ms`,
            } as CSSProperties
          }
        >
          Riverstone Builders is positioned as a local residential builder that
          focuses on custom homes, renovations, and additions. The site clearly
          outlines services, showcases project proof, and provides direct ways
          to inquire.
        </p>
        <div className="mt-1 divide-y divide-line sm:mt-2">
          {[
            "Clear services and focus",
            "Project examples and proof",
            "Direct contact and inquiry options",
          ].map((item, index) => (
            <p
              key={item}
              className="ck-rise flex items-center gap-2.5 py-3 text-[0.8rem] font-medium text-ink/80 last:pb-0"
              style={{
                animationDelay: `${
                  searchVisibilityHeroTiming.aiChecks +
                  index * searchVisibilityHeroTiming.aiCheckStep
                }ms`,
              }}
            >
              <CircleCheck
                className="h-4 w-4 shrink-0 fill-forest text-ivory"
                strokeWidth={2.4}
              />
              {item}
            </p>
          ))}
        </div>
      </div>
    </SearchResultCardShell>
  );
}

function SearchVisibilityBenefits() {
  return (
    <section
      id="visibility-explained"
      className="scroll-mt-28 grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-8 lg:gap-y-16 lg:py-16"
    >
      <div className="min-w-0">
        <Reveal className="max-w-lg">
          <p className={serviceSectionLabelClassName}>Why visibility matters</p>
          <h2 className={serviceSectionTitleClassName}>
            Built for clarity and findability.
          </h2>
          <p className={`${serviceSectionBodyClassName} max-w-md`}>
            This service helps your business become easier to find, clearer to
            understand, and more confident about what to improve next.
          </p>
        </Reveal>
        <Reveal className="mt-10 max-w-md border-t border-line pt-7 lg:mt-12">
          <p className={serviceSectionLabelClassName}>A quick test</p>
          <ul className="mt-5 space-y-4" aria-label="Visibility quick test">
            {[
              "What do you do?",
              "Where do you serve?",
              "What should someone do next?",
            ].map((question) => (
              <li key={question} className="flex items-center gap-3.5">
                <CircleCheck
                  className="h-6 w-6 shrink-0 fill-forest text-ivory"
                  strokeWidth={2.1}
                  aria-hidden
                />
                <span className="text-[0.98rem] font-medium text-ink sm:text-[1.05rem]">
                  {question}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div>
        {visibilityBenefits.map(({ title, body, icon: Icon }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 110}
            className={`grid min-h-[8.75rem] grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 py-6 sm:py-7 ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-soft text-forest sm:h-11 sm:w-11">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <h3 className="font-serif text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
                {body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SearchVisibilityScope() {
  return (
    <section id="visibility-signals" className="border-b border-line py-14 lg:py-20">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>
          What this service can include
        </p>
        <h2 className={serviceCenterTitleClassName}>
          The signals that help your site get understood.
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        {visibilityScope.map((card, index) => (
          <Reveal
            key={card.title}
            delay={index * 110}
            className={`h-full ${
              index < 3
                ? "lg:col-span-2"
                : index === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : "lg:col-span-2 lg:col-start-4"
            }`}
          >
            <ScopeSignalCard card={card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ScopeSignalCard({
  card,
}: {
  card: (typeof visibilityScope)[number];
}) {
  const { title, body, icon: Icon, helpsWith, demo } = card;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden border border-line/80 bg-card shadow-soft transition-shadow duration-200 hover:shadow-lift ${visibilityScopeLayout.cardRadius}`}
    >
      <div className="flex items-start gap-3.5 px-5 pb-3.5 pt-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.45} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[1.35rem] font-semibold leading-tight text-ink sm:text-[1.42rem]">
            {title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[0.8rem] leading-5 text-muted">{body}</p>
        </div>
      </div>

      {/* Demo fills the card body — no outer panel, shared height across cards. */}
      <div
        className={`flex w-full shrink-0 items-center justify-center px-6 pb-3.5 pt-1 sm:px-7 lg:px-8 ${visibilityScopeLayout.demoHeight}`}
      >
        <div className="h-full w-full min-w-0">
          {demo === "technical" && <TechnicalFoundationsDemo />}
          {demo === "local" && <LocalPresenceDemo />}
          {demo === "content" && <ClearContentDemo />}
          {demo === "schema" && <StructuredDataDemo />}
          {demo === "monitoring" && <OngoingVisibilityDemo />}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-line bg-sand/60 px-5 py-2.5">
        <CircleCheck
          className="h-3.5 w-3.5 shrink-0 text-forest"
          strokeWidth={2}
        />
        <p className="text-[0.8rem] leading-8 text-ink/80 sm:text-[0.85rem]">
          <span className="font-semibold text-ink">Helps with:</span>{" "}
          {helpsWith.join(", ")}
        </p>
      </div>
    </article>
  );
}

function TechnicalFoundationsDemo() {
  const rows = [
    {
      label: "H1",
      graphic: (
        <span className="block h-2 w-[72%] rounded-full bg-forest" aria-hidden />
      ),
    },
    {
      label: "H2",
      graphic: (
        <span
          className="block h-1.5 w-[54%] rounded-full bg-[#8FAE8F]"
          aria-hidden
        />
      ),
    },
    {
      label: "Body",
      graphic: (
        <span className="flex w-[68%] flex-col gap-1" aria-hidden>
          <span className="block h-1 w-full rounded-full bg-[#D8CFBE]" />
          <span className="block h-1 w-[62%] rounded-full bg-[#D8CFBE]" />
        </span>
      ),
    },
  ] as const;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-[#F7F4EC] px-3 py-3 shadow-[0_12px_22px_-20px_rgba(31,36,32,0.55)] sm:px-3.5 sm:py-3.5">
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-card px-2.5 py-1.5 shadow-[0_4px_10px_-8px_rgba(31,36,32,0.45)]">
        <Search className="h-3 w-3 shrink-0 text-ink/45" strokeWidth={2} />
        <span className="h-1 w-[42%] rounded-full bg-[#D8CFBE]" aria-hidden />
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center">
        {rows.map(({ label, graphic }, index) => (
          <div
            key={label}
            className={`grid grid-cols-[2.4rem_minmax(0,1fr)_1.1rem] items-center gap-3.5 py-1.5 ${
              index > 0 ? "border-t border-line/80" : ""
            }`}
          >
            <span className="text-[0.68rem] font-semibold text-ink/70">
              {label}
            </span>
            {graphic}
            <CircleCheck
              className="h-4 w-4 fill-forest text-ivory"
              strokeWidth={2}
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function LocalPresenceDemo() {
  return (
    <div className="relative mx-auto grid h-full w-full grid-cols-[0.92fr_1.08fr] overflow-hidden rounded-lg border border-line bg-card shadow-[0_12px_22px_-20px_rgba(31,36,32,0.55)]">
      <div className="relative overflow-hidden border-r border-line bg-[#dfe8da]">
        {/* Soft block fill behind the road network */}
        <span
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,253,248,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,253,248,0.55) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
          aria-hidden
        />

        {/* Horizontal roads */}
        <span className="absolute left-0 top-[18%] h-[3px] w-full bg-[#F4F0E6]" aria-hidden />
        <span className="absolute left-0 top-[42%] h-[5px] w-full bg-[#F7F3EA] shadow-[0_0_0_1px_rgba(47,91,63,0.06)]" aria-hidden />
        <span className="absolute left-0 top-[68%] h-[3px] w-full bg-[#F4F0E6]" aria-hidden />
        <span className="absolute left-0 top-[86%] h-[2px] w-[72%] bg-[#EFE9DC]" aria-hidden />

        {/* Vertical roads */}
        <span className="absolute left-[22%] top-0 h-full w-[3px] bg-[#F4F0E6]" aria-hidden />
        <span className="absolute left-[48%] top-0 h-full w-[5px] bg-[#F7F3EA] shadow-[0_0_0_1px_rgba(47,91,63,0.06)]" aria-hidden />
        <span className="absolute left-[76%] top-0 h-full w-[3px] bg-[#F4F0E6]" aria-hidden />

        {/* Short side streets so it feels like a neighborhood, not a star */}
        <span className="absolute left-[48%] top-[42%] h-[3px] w-[28%] bg-[#EFE9DC]" aria-hidden />
        <span className="absolute left-[22%] top-[68%] h-[2px] w-[26%] bg-[#EFE9DC]" aria-hidden />
        <span className="absolute left-[76%] top-[18%] h-[28%] w-[2px] bg-[#EFE9DC]" aria-hidden />

        <span className="absolute left-1/2 top-[40%] h-12 w-12 -translate-x-1/2 -translate-y-1/2" aria-hidden>
          <MapPin
            className="h-full w-full fill-[#5F9C69] text-forest drop-shadow-[0_4px_5px_rgba(31,36,32,0.22)]"
            strokeWidth={1.45}
          />
          <span className="absolute left-1/2 top-[40%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card" />
        </span>
        <span className="absolute bottom-2 left-2 rounded-full bg-card/95 px-1.5 py-0.5 text-[0.48rem] font-semibold text-forest shadow-soft">
          Orlando, FL
        </span>
      </div>
      <div className="flex flex-col justify-between px-3 py-3">
        <div>
          <p className="text-[0.82rem] font-semibold leading-tight text-ink">
            Riverstone Builders
          </p>
          <p className="mt-1 text-[0.64rem] font-semibold text-forest">
            4.9 ★★★★★
          </p>
          <p className="mt-2 text-[0.66rem] leading-snug text-muted">
            Custom home builder
          </p>
          <p className="mt-0.5 text-[0.66rem] leading-snug text-muted">
            Orlando, Florida
          </p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-line rounded-md border border-line bg-sand/60">
          {[Globe, Navigation, PhoneCall].map((ActionIcon, index) => (
            <span
              key={index}
              className="flex h-7 items-center justify-center text-forest"
            >
              <ActionIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClearContentDemo() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2.5 rounded-lg border border-line bg-card px-3.5 py-3.5 shadow-[0_12px_22px_-20px_rgba(31,36,32,0.55)]">
      <p className="font-sans text-[0.92rem] font-semibold leading-[1.15] text-ink">
        Custom Homes &amp; Renovations
      </p>
      <div className="space-y-2" aria-hidden>
        <span className="block h-1.5 w-[94%] rounded-full bg-[#D8CFBE]" />
        <span className="block h-1.5 w-[82%] rounded-full bg-[#D8CFBE]" />
        <span className="block h-1.5 w-[68%] rounded-full bg-[#D8CFBE]" />
      </div>
      {/* Answer-ready passage — check + summary lines, even with the body above. */}
      <div className="flex items-center gap-2.5 rounded-md border border-forest/20 bg-forest-soft/65 px-1.5 py-1.5">
        <CircleCheck
          className="h-7 w-7 shrink-0 fill-forest text-ivory"
          strokeWidth={2.4}
          aria-hidden
        />
        <div className="min-w-0 flex-1 space-y-1.5" aria-hidden>
          <span className="block h-1.5 w-[94%] rounded-full bg-forest/45" />
          <span className="block h-1.5 w-[62%] rounded-full bg-forest/30" />
        </div>
      </div>
    </div>
  );
}

/**
 * Structured-data connector knobs (spine between Business name / Service type / Location).
 * Bullets stay locked to the branch ends; the spine is centered on those bullets.
 *   top / bottom   — how far the vertical spine starts/ends (% of the pill column)
 *   spineNudge     — fine horizontal nudge of the spine only (px; + right, - left)
 *   width          — spine thickness (px)
 *   stemTop        — where the short stem from the left card meets the spine (% down)
 *   stemLeft       — horizontal start of the stem (px; 0 = column edge, negative = further left)
 *   stemWidth      — length of that stem (px)
 *   branchWidth    — length of each horizontal tick into a pill (px)
 *   dotSize        — end-dot diameter (px)
 *   gutter         — space from column edge to the bullet centers (px)
 */
const structuredDataConnector = {
  top: "16%",
  bottom: "16%",
  spineNudge: 0,
  width: 2,
  stemTop: "50%",
  stemLeft: -4,
  stemWidth: 20,
  branchWidth: 14,
  dotSize: 6,
  gutter: 10,
} as const;

function StructuredDataDemo() {
  const fields = [
    { label: "Name", value: "Riverstone Builders", icon: Store },
    { label: "Service", value: "Custom home builder", icon: Wrench },
    { label: "Location", value: "Orlando, FL", icon: MapPin },
  ] as const;
  const {
    top,
    bottom,
    spineNudge,
    width,
    stemTop,
    stemLeft,
    stemWidth,
    branchWidth,
    dotSize,
    gutter,
  } = structuredDataConnector;

  // Bullet centers sit at `gutter`; spine is centered on that same x.
  const bulletX = gutter;
  const spineLeft = bulletX - width / 2 + spineNudge;

  return (
    <div className="grid h-[90%] w-full grid-cols-[0.56fr_1.44fr] items-center gap-1">
      {/* Source content card — narrower so the image reads more portrait */}
      <div className="flex h-full flex-col gap-2 rounded-lg border border-line bg-card px-2 pb-2 pt-2 shadow-[0_12px_22px_-20px_rgba(31,36,32,0.55)]">
        <div className="relative h-12 shrink-0 overflow-hidden rounded-md bg-[#E4EDE1]" aria-hidden>
          <svg
            viewBox="0 0 72 48"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="72" height="48" fill="#E4EDE1" />
            {/* Sun sits higher in the taller frame */}
            <circle cx="62" cy="10" r="4.5" fill="#8FB392" />
            {/* Back mountain — sharper peaks, slight tip ease only */}
            <path
              d="M0 48
                 L18 20
                 Q24 12, 30 18
                 L42 30
                 Q52 16, 58 18
                 L72 46
                 Z"
              fill="#A8C4AB"
            />
            {/* Front mountain — cleaner, more pointed ridge */}
            <path
              d="M0 48
                 L14 30
                 Q20 22, 26 28
                 L38 38
                 Q46 24, 52 26
                 L66 40
                 L72 48
                 Z"
              fill="#7FA883"
            />
          </svg>
        </div>
        <div className="space-y-1.5" aria-hidden>
          <span className="block h-1 w-full rounded-full bg-[#D8CFBE]" />
          <span className="block h-1 w-[78%] rounded-full bg-[#D8CFBE]" />
        </div>
        <div className="space-y-1.5" aria-hidden>
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <span className="block h-1 w-[72%] rounded-full bg-[#D8CFBE]" />
            </div>
          ))}
        </div>
      </div>

      {/* Branching connectors + structured field pills */}
      <div
        className="relative flex h-full min-w-0 flex-col justify-center gap-2 overflow-visible"
        style={{ paddingLeft: gutter + branchWidth }}
      >
        {/* Vertical center spine — locked to bullet centers via gutter */}
        <span
          className="absolute bg-forest/45"
          style={{
            top,
            bottom,
            left: spineLeft,
            width,
          }}
          aria-hidden
        />
        {/* Short stem from the content card into the spine */}
        <span
          className="absolute h-px -translate-y-1/2 bg-forest/45"
          style={{
            top: stemTop,
            left: stemLeft,
            width: stemWidth,
          }}
          aria-hidden
        />
        {fields.map(({ label, value, icon: Icon }) => (
          <div key={label} className="relative">
            <span
              className="absolute top-1/2 h-px -translate-y-1/2 bg-forest/45"
              style={{
                left: -branchWidth,
                width: branchWidth,
              }}
              aria-hidden
            />
            <span
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest"
              style={{
                left: -branchWidth,
                width: dotSize,
                height: dotSize,
              }}
              aria-hidden
            />
            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-line bg-card px-2 py-1.5 shadow-[0_8px_14px_-14px_rgba(31,36,32,0.6)]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
                <Icon className="h-2.5 w-2.5" strokeWidth={1.8} />
              </span>
              <p className="min-w-0 truncate text-[0.62rem] leading-none">
                <span className="font-semibold text-forest">{label}:</span>{" "}
                <span className="font-medium text-ink">{value}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OngoingVisibilityDemo() {
  const points = [
    { x: 6, y: 43 },
    { x: 18, y: 35 },
    { x: 30, y: 39 },
    { x: 42, y: 26 },
    { x: 54, y: 31 },
    { x: 66, y: 21 },
    { x: 78, y: 25 },
    { x: 90, y: 14 },
  ] as const;
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const metrics = [
    { label: "Visibility trend", value: "+18%" },
    { label: "Top 10 rankings", value: "+12" },
    { label: "Impressions", value: "+24%" },
  ] as const;

  return (
    <div className="grid h-full w-full grid-cols-[1.2fr_0.8fr] items-stretch gap-1.5 sm:gap-2">
      <div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-line bg-card px-2.5 pb-1.5 pt-2 shadow-[0_12px_22px_-20px_rgba(31,36,32,0.55)]">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <p className="text-[0.58rem] font-semibold text-ink">Visibility trend</p>
          <p className="text-[0.5rem] font-medium text-muted">Illustrative 30-day view</p>
        </div>
        <svg viewBox="0 0 100 56" className="mt-1 min-h-0 w-full flex-1" aria-hidden>
          <defs>
            <linearGradient id="visibility-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5F9C69" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#5F9C69" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <line x1="5" x2="95" y1="12" y2="12" stroke="#DDD6C8" strokeDasharray="2 2" />
          <line x1="5" x2="95" y1="31" y2="31" stroke="#DDD6C8" strokeDasharray="2 2" />
          <line x1="5" x2="95" y1="50" y2="50" stroke="#DDD6C8" strokeDasharray="2 2" />
          <polygon points={`6,50 ${polyline} 90,50`} fill="url(#visibility-area)" />
          <polyline
            fill="none"
            stroke="#2F5B3F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polyline}
          />
          {points.map((p) => (
            <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="1.85" fill="#FFFDF8" stroke="#2F5B3F" strokeWidth="1.5" />
          ))}
        </svg>
        <div className="mt-0.5 flex shrink-0 justify-between px-0.5 text-[0.5rem] font-medium text-muted">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-col justify-center overflow-hidden rounded-lg border border-line bg-card px-2.5 py-1 shadow-[0_12px_22px_-20px_rgba(31,36,32,0.55)]">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`flex flex-1 items-center justify-between gap-2 ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <p className="text-[0.55rem] leading-none text-ink/80">{metric.label}</p>
            <p className="flex shrink-0 items-center gap-0.5 text-[0.62rem] font-semibold leading-none text-forest">
              <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.4} />
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Connector line + dot on the right of each signal row (xl and up).
 * Tune these to line the dots up with the site preview on the right.
 *   length  — how far the line extends toward the preview
 *   height  — thickness (visual weight) of the line
 *   dotSize — diameter of the end dot
 *   gap     — space between the line and its end dot
 *   rows    — individual tuning for the signal rows below
 *
 * `offsetY` moves the complete signal row against the demo preview.
 * Positive values move the icon, text, line, and dots down together.
 * `offsetX` only adjusts how far the connector reaches toward the preview.
 * The rows match `visibilitySignals` in order.
 */
const signalConnector = {
  previewOverlap: "2rem",
  length: "5rem",
  height: "1.5px",
  dotSize: "0.5rem",
  gap: "0rem",
  rows: [
    {
      length: "6rem",
      offsetX: "0.25rem",
      offsetY: "-4.25rem",
    },
    {
      length: "5rem",
      offsetX: "0.25rem",
      offsetY: "-0.75rem",
    },
    {
      // Clear from the first glance → hero subtitle
      length: "5.5rem",
      offsetX: "0.25rem",
      offsetY: "0.25rem",
    },
    {
      length: "5rem",
      offsetX: "0.25rem",
      offsetY: "5rem",
    },
    {
      length: "6rem",
      offsetX: "0.25rem",
      offsetY: "5.5rem",
    },
    {
      length: "6rem",
      offsetX: "0.25rem",
      offsetY: "6rem",
    },
  ],
} as const;

/**
 * Arrows between the site preview and Google / AI cards.
 * Sit in the column gap, vertically centered on each card.
 *   size     — arrow icon size
 *   inset    — how far into the gap from the card's left edge (toward preview)
 *   offsetY  — per-card vertical nudge (0 = dead center of the card)
 */
const signalOutboundArrow = {
  size: "1.15rem",
  inset: "0.35rem",
  cards: [
    { offsetY: "0px" }, // Google result
    { offsetY: "0px" }, // AI Overview
  ],
} as const;

function SearchVisibilitySignals() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal className="max-w-3xl">
        <p className={serviceSectionLabelClassName}>Page clarity</p>
        <h2 className={serviceSectionTitleClassName}>
          What search systems need to understand.
        </h2>
        <p className={`${serviceSectionBodyClassName} max-w-lg`}>
          Strong visibility begins with pages that state what the business does,
          who it serves, and what a visitor can do next.
        </p>
      </Reveal>

      <div className="mt-9 grid items-center gap-7 xl:grid-cols-[minmax(13rem,0.74fr)_minmax(22rem,1.2fr)_minmax(13rem,0.76fr)] xl:gap-8">
        {/* z-20 keeps connector dots above the site preview they overlap */}
        <div className="relative z-20 space-y-3">
          {visibilitySignals.map(({ title, body, icon: Icon }, index) => {
            const connector =
              signalConnector.rows[index] ?? signalConnector.rows[0];

            return (
              /*
               * The reveal lives on a wrapper: the row itself carries an inline
               * translateY for alignment, and an entrance animating transform
               * would settle at `none` and wipe that offset out.
               */
              <Reveal key={title} delay={index * 90}>
              <div
                className="group relative z-20 flex items-center gap-3"
                style={{ transform: `translateY(${connector.offsetY})` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">{title}</p>
                  <p className="mt-0.5 text-[0.68rem] leading-4 text-muted">{body}</p>
                </div>
                <span
                  className="relative z-30 ml-auto hidden min-w-0 flex-1 items-center xl:flex"
                  style={{
                    gap: signalConnector.gap,
                    marginRight: `calc(-1 * ${signalConnector.previewOverlap})`,
                    transform: `translateX(${connector.offsetX})`,
                  }}
                  aria-hidden
                >
                  <span
                    className="shrink-0 rounded-full bg-forest"
                    style={{
                      width: signalConnector.dotSize,
                      height: signalConnector.dotSize,
                    }}
                  />
                  <span
                    className="ck-draw-x min-w-0 flex-1 bg-forest/45"
                    style={
                      {
                        height: signalConnector.height,
                        "--ck-anim-delay": `${300 + index * 90}ms`,
                      } as CSSProperties
                    }
                  />
                  <span
                    className="shrink-0 rounded-full bg-[rgb(77,146,77)]"
                    style={{
                      width: signalConnector.dotSize,
                      height: signalConnector.dotSize,
                    }}
                  />
                </span>
              </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <SearchReadySitePreview />
        </Reveal>

        {/* The results land last: signals feed the page, the page feeds search. */}
        <div className="relative z-20 space-y-4">
          <Reveal delay={520}>
            <OutboundSignalCard>
              <SearchResultSnapshot />
            </OutboundSignalCard>
          </Reveal>
          <Reveal delay={640}>
            <div>
              <OutboundSignalCard offsetY={signalOutboundArrow.cards[1].offsetY}>
                <AiOverviewSnapshot />
              </OutboundSignalCard>
              <p className="mt-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Illustrative example
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OutboundSignalCard({
  children,
  offsetY = signalOutboundArrow.cards[0].offsetY,
}: {
  children: ReactNode;
  offsetY?: string;
}) {
  return (
    <div
      className="relative"
      style={{
        transform: offsetY === "0px" ? undefined : `translateY(${offsetY})`,
      }}
    >
      {/* Simple arrow in the gap, centered on this card (xl+) */}
      <span
        className="pointer-events-none absolute top-1/2 z-30 hidden -translate-y-1/2 text-forest xl:flex"
        style={{
          right: "100%",
          marginRight: signalOutboundArrow.inset,
        }}
        aria-hidden
      >
        <ArrowRight
          style={{
            width: signalOutboundArrow.size,
            height: signalOutboundArrow.size,
          }}
          strokeWidth={2.2}
        />
      </span>
      {children}
    </div>
  );
}

function SearchReadySitePreview() {
  return (
    <div className="relative z-0 overflow-hidden rounded-xl border border-line bg-card shadow-[0_20px_38px_-30px_rgba(31,36,32,0.5)]">
      <div className="flex h-8 items-center justify-between border-b border-line px-4">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C87264]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#D8A847]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#5F9C69]" />
        </span>
        <span className="font-sans text-[0.57rem] font-medium text-muted">
          riverstonebuilders.com
        </span>
        <span className="w-7" />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.12em] text-ink">
          Riverstone Builders
        </p>
        <div className="hidden items-center gap-2.5 text-[0.52rem] font-semibold text-ink/70 sm:flex">
          <span>Services</span>
          <span>Projects</span>
          <span>About</span>
          <span>Blog</span>
          <span>Contact</span>
        </div>
        <span className="shrink-0 rounded bg-[#174A31] px-1.5 py-1 text-[0.5rem] font-semibold text-ivory">
          Request a Quote
        </span>
      </div>
      <div className="relative min-h-[11.5rem] overflow-hidden bg-ink px-5 py-6 text-ivory">
        <Image
          src="/images/services/png/02-riverstone-demo.png"
          alt="Illustrative local builder homepage"
          fill
          sizes="(min-width: 1280px) 32vw, 90vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,9,0.92)_0%,rgba(8,10,9,0.78)_28%,rgba(8,10,9,0.42)_58%,rgba(8,10,9,0.12)_82%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 max-w-[15rem]">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ivory/80">
            Orlando custom home builder
          </p>
          <h3 className="mt-2.5 font-serif text-[1.55rem] leading-[1.02] tracking-[-0.025em]">
            Custom Homes &amp; Renovations in Orlando, Florida
          </h3>
          <p
            id="search-ready-subtitle"
            className="mt-2.5 text-[0.66rem] leading-5 text-ivory/88"
          >
            Thoughtful design, quality craftsmanship, and clear next steps for
            how you live.
          </p>
          <span className="mt-3.5 inline-flex rounded bg-[#174A31] px-3 py-2 text-[0.62rem] font-semibold text-ivory">
            Request a Quote
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-sand">
          <Image
            src="/images/services/png/02-riverstone-demo-2.png"
            alt="Illustrative featured project"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Featured project
          </p>
          <p className="mt-0.5 text-[0.72rem] font-semibold leading-tight text-ink">
            Lake Nona Custom Home
          </p>
          <p className="mt-0.5 text-[0.6rem] leading-4 text-ink/70">
            A modern, open-concept home designed for entertaining and everyday
            living.
          </p>
        </div>
        <span className="ml-auto hidden shrink-0 items-center gap-1 text-[0.6rem] font-semibold text-forest sm:flex">
          View
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.66rem] font-semibold text-ink">
            How long does a custom home build take?
          </p>
          <Plus className="h-3 w-3 shrink-0 text-ink/50" strokeWidth={2.4} />
        </div>
        <p className="mt-1 text-[0.6rem] leading-4 text-muted">
          Most custom homes take 7–10 months from design approval to move-in,
          depending on scope and materials.
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line bg-[#faf8f4] px-4 py-3">
        <p className="text-[0.66rem] font-semibold text-ink">
          Ready to build something great?
        </p>
        <span className="shrink-0 rounded bg-[#174A31] px-2.5 py-1 text-[0.58rem] font-semibold text-ivory">
          Contact Us
        </span>
      </div>
    </div>
  );
}

function SearchResultSnapshot() {
  return (
    <div className="rounded-xl border border-line bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2.5">
        <GoogleMark className="h-5 w-5" />
        <div className="min-w-0 flex-1">
          <SearchBar compact />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.67rem] text-forest">
            https://riverstonebuilders.com
          </p>
          <p className="mt-1 text-[0.85rem] font-semibold leading-tight text-[#1A5FCC]">
            Riverstone Builders
          </p>
          <p className="mt-2 text-[0.67rem] leading-4 text-ink/78">
            Custom homes and renovations in Orlando. View projects, services,
            and request a quote.
          </p>
        </div>
        <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md border border-line bg-sand">
          <Image
            src="/images/services/png/02-riverstone-demo.png"
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-3 flex gap-2 text-[0.62rem] font-medium text-[#1A5FCC]">
        <span>Services</span>
        <span>Projects</span>
        <span>Contact</span>
      </div>
    </div>
  );
}

function AiOverviewSnapshot() {
  return (
    <div className="rounded-xl border border-line bg-[linear-gradient(135deg,rgba(239,244,233,0.76),rgba(255,252,245,0.96))] p-4 shadow-soft">
      <p className="flex items-center gap-2 text-[0.75rem] font-semibold text-ink">
        <Sparkle className="h-4 w-4 fill-forest text-forest" strokeWidth={1.2} />
        AI Overview
      </p>
      <p className="mt-3 text-[0.67rem] leading-4 text-ink/80">
        Riverstone Builders is a custom home builder in Orlando, Florida. The
        site showcases projects, explains services, and provides clear ways to
        request a quote.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Location: Orlando, FL', 'Service: Custom Homes', 'Proof: Project examples'].map(
          (item) => (
            <span
              key={item}
              className="rounded-full bg-forest-soft px-2 py-1 text-[0.55rem] font-semibold text-forest"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function SearchVisibilityWork() {
  const project = getCaseStudy("tizirsso");
  if (!project) return null;

  return (
    <section className="border-b border-line py-12 lg:py-14">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        Relevant work
      </h2>
      <Link
        href={`/${project.slug}`}
        className="group mt-6 grid overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] sm:items-center"
      >
        <div className="relative min-h-[9rem] overflow-hidden bg-sand sm:min-h-[8.5rem]">
          {project.coverImage ? (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="(min-width: 640px) 30vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 sm:pr-8">
          <div className="min-w-0">
            <h3 className="font-serif text-[1.4rem] font-medium leading-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-1 text-[0.72rem] font-medium text-muted">
              {project.badge} · {project.category}
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              {project.teaser}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest">
            View project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </section>
  );
}

function SearchVisibilityFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal>
        <FAQSection
          faqs={[...searchVisibilityFaqs]}
          description="Straight answers about search visibility, what the work changes, and what to expect along the way."
        />
      </Reveal>
    </section>
  );
}

function SearchVisibilityCta() {
  return (
    <section className="py-10 lg:py-12">
      <Reveal className="mt-0 flex flex-col gap-6 rounded-xl border border-line bg-card px-6 py-7 shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Search &amp; AI Visibility
          </p>
          <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
            Let&apos;s make your site easier to find and understand.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
            Send over your site and a little context about what you want to
            improve.
          </p>
        </div>

        <div className="flex w-fit shrink-0 flex-col items-stretch gap-4">
          <ProjectInquiryTrigger
            source="search_visibility_service_cta"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
          >
            Send my site for a visibility review
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
        </div>
      </Reveal>
    </section>
  );
}
