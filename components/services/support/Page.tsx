/** Renders the bespoke Ongoing Support service experience. */
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronRight,
  CircleCheck,
  Clock,
  FileText,
  Gauge,
  Mail,
  Megaphone,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  TrendingUp,
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
import { supportTimeline, type ServiceArea } from "@/lib/services";
import ServiceFrame from "../shared/ServiceFrame";
import RelatedLinks from "../shared/RelatedLinks";
import ProjectWorkCard from "../shared/ProjectWorkCard";
import SupportCareView, { supportHeroTiming } from "./SupportCareView";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
  serviceHeroTitleClassName,
  serviceSectionBodyClassName,
  serviceSectionLabelClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";
const supportWhyItMatters = [
  {
    icon: RefreshCw,
    title: "Stay current",
    body: "Content, tools, and integrations stay up to date.",
  },
  {
    icon: Wrench,
    title: "Fix problems early",
    body: "Small issues are addressed before they become bigger.",
  },
  {
    icon: TrendingUp,
    title: "Improve when it matters",
    body: "Changes are prioritized based on impact and timing.",
  },
] as const;

/**
 * The four support areas. `tags` name the concrete work inside each one, which
 * is what stops the row reading as four generic promises. Entry 04 renders as
 * the full-width band beneath the grid, so its tag list can run longer.
 */
const supportIncludes = [
  {
    title: "Website care",
    body: "Keep your site updated, secure, and working as it should.",
    icon: ShieldCheck,
    tags: ["Updates", "Backups", "Security"],
  },
  {
    title: "Fixes and troubleshooting",
    body: "Investigate issues and make corrections to get things back on track.",
    icon: Wrench,
    tags: ["Bug fixes", "Errors", "Corrections"],
  },
  {
    title: "Content and small improvements",
    body: "Update content and make useful changes to keep things clear and effective.",
    icon: Pencil,
    tags: ["Text & images", "Page tweaks", "Small enhancements"],
  },
  {
    title: "Performance and measurement checks",
    body: "Check speed, tracking, and metrics to ensure things are performing well.",
    icon: Gauge,
    tags: ["Speed tests", "Uptime", "Core Web Vitals", "Reporting"],
  },
] as const;

/**
 * Status strip under the demo site preview — the at-a-glance read a client
 * gets when someone is actually looking after the thing.
 */
const supportSiteStatus = [
  { icon: Calendar, label: "Last updated", value: "Today, 9:42am" },
  { icon: FileText, label: "Forms", value: "All working" },
  { icon: BarChart3, label: "Tracking", value: "Active" },
  { icon: Smartphone, label: "Mobile checks", value: "No issues" },
] as const;

/**
 * The three shapes support can take. Ordered by commitment — a one-off fix,
 * occasional attention, then a standing arrangement — so the row reads as a
 * range rather than a menu of tiers.
 */
const supportModes = [
  { icon: Clock, label: "One-time fixes" },
  { icon: Calendar, label: "Occasional updates" },
  { icon: ShieldCheck, label: "Ongoing care" },
] as const;

const supportRequests = [
  {
    icon: Pencil,
    label: "Update a service or team page",
    body: "Add new information, refresh content, or update images and details.",
  },
  {
    icon: Smartphone,
    label: "Fix a mobile layout issue",
    body: "Adjust spacing, stacking, or elements to improve the mobile experience.",
  },
  {
    icon: Mail,
    label: "Add a new form field or notification",
    body: "Collect the right information and make sure the right people are notified.",
  },
  {
    icon: Megaphone,
    label: "Publish a project or announcement",
    body: "Add a new case study, blog post, or announcement to your site.",
  },
  {
    icon: BarChart3,
    label: "Investigate a tracking problem",
    body: "Check events, conversions, and dashboards so your data is accurate and useful.",
  },
  {
    icon: Gauge,
    label: "Improve a slow or confusing section",
    body: "Simplify navigation, improve performance, and make the content easier to follow.",
  },
] as const;

const supportTrackerSteps = [
  { label: "Received", date: "May 3" },
  { label: "In review", date: "May 3" },
  { label: "In progress", date: "May 4" },
  { label: "Completed", date: "May 4" },
] as const;

const supportProcess = [
  {
    step: "1",
    title: "Share the issue",
    body: "Send a quick message with what you're seeing or need.",
  },
  {
    step: "2",
    title: "Review and prioritize",
    body: "I review the request, confirm the scope, and outline next steps.",
  },
  {
    step: "3",
    title: "Complete and confirm",
    body: "The work is completed and you receive a summary of what changed.",
  },
] as const;

const supportFaqs = [
  {
    question: "Do you support websites or systems you did not build?",
    answer:
      "Often, yes. It depends on how the site or system is built and what access is available. The first step is a quick review to see what shape it is in and whether ongoing support makes sense, or a bit of cleanup comes first.",
  },
  {
    question: "Can support include new pages or features?",
    answer:
      "Yes. Small additions — a new page, a form field, a section — fit naturally into support. Larger feature work is scoped as its own focused piece so it stays clear and predictable.",
  },
  {
    question: "Is support monthly or request-based?",
    answer:
      "Either. Some businesses prefer a steady monthly arrangement for regular attention; others just reach out when something comes up. We'll pick whatever matches how often the site actually needs changes.",
  },
  {
    question: "How quickly are support requests handled?",
    // Figure comes from the same object the hero reads, so the two cannot drift.
    answer: `Most requests turn around in ${supportTimeline.value}. Small fixes are usually quicker than that; anything larger gets a clear date up front, and urgent breakage jumps the queue.`,
  },
  {
    question: "What access will CK Works need?",
    answer:
      "Only what the work requires: usually hosting or the code repository, the CMS or admin, and any relevant analytics or domain settings. Access is kept minimal and documented.",
  },
] as const;

function SupportRelated() {
  return (
    <RelatedLinks
      links={[
        {
          label: "Review the analytics behind your site",
          href: "/services/analytics-lead-tracking",
          note: "Support decisions are easier when you can see what pages are doing.",
        },
        {
          label: "See the systems running behind the scenes",
          href: "/services/digital-systems-integrations",
          note: "Dashboards, forms, and integrations that also need looking after.",
        },
      ]}
    />
  );
}

export default function Page({ service }: { service: ServiceArea }) {
  return (
    <ServiceFrame service={service}><section className="bg-ivory pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-16 lg:pt-10">
        <div className={serviceContainer}>
          <SupportHero timeline={service.timeline} />
          <SupportWhyItMatters />
          <SupportIncludes />
          <SupportRequests />
          <SupportPrinciple />
          <SupportProcess />
          <SupportFaq />
          <SupportRebuildNote />
          <SupportRelated />
          <SupportBottomCta />
        </div>
      </section>
    </ServiceFrame>
  );
}

function SupportHero({ timeline }: { timeline: ServiceArea["timeline"] }) {
  return (
    <div className="border-b border-line pb-11 lg:pb-14">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
        <div className="max-w-xl">
          <p
            className="ck-rise text-xs font-semibold uppercase tracking-[0.26em] text-forest"
            style={{ animationDelay: `${supportHeroTiming.eyebrow}ms` }}
          >
            Care
          </p>
          <h1
            className={`ck-rise ${serviceHeroTitleClassName}`}
            style={{ animationDelay: `${supportHeroTiming.title}ms` }}
          >
            Ongoing Support
          </h1>
          <p
            className="ck-rise mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]"
            style={{ animationDelay: `${supportHeroTiming.leadCopy}ms` }}
          >
            Updates, fixes, technical cleanup, and continued improvements that
            keep your website or system useful after launch.
          </p>
          <ServiceTimeline
            timeline={timeline}
            className="ck-rise mt-7"
            style={{ animationDelay: `${supportHeroTiming.actions}ms` }}
          />
          <div
            className="ck-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: `${supportHeroTiming.actions}ms` }}
          >
            <ProjectInquiryTrigger
              source="support_service_hero"
              className="rounded-md px-5"
            >
              Request support
              <ArrowRight className="h-4 w-4" />
            </ProjectInquiryTrigger>
            <a
              href="#support-includes"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
            >
              See what support can include
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <SupportCareView />
      </div>
    </div>
  );
}

function SupportWhyItMatters() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_1px_minmax(0,1.1fr)] lg:gap-12 lg:py-16">
      <Reveal className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Why it matters
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Keep what you built working well.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Support is useful when the site needs to stay current, small issues
          need attention, or improvements make more sense over time than
          through another full rebuild.
        </p>
      </Reveal>

      <span className="hidden w-px bg-line lg:block" aria-hidden />

      <div className="divide-y divide-line lg:self-center">
        {supportWhyItMatters.map(({ icon: Icon, title, body }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 110}
            className="flex gap-5 py-5 first:pt-0 last:pb-0"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="font-serif text-xl font-medium leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SupportIncludes() {
  const [care, fixes, content, performance] = supportIncludes;

  return (
    <section
      id="support-includes"
      className="scroll-mt-24 border-b border-line py-14 lg:py-16"
    >
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>What support can include</p>
        <h2 className={serviceCenterTitleClassName}>
          Steady care after launch.
        </h2>
      </Reveal>

      {/* Left half is the thing being looked after; right half is the work. */}
      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)]">
        <Reveal className="min-w-0">
          <SupportSitePreview />
        </Reveal>

        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <Reveal delay={110} className="min-w-0">
            <SupportIncludeCard index={0} item={care} />
          </Reveal>
          <Reveal delay={190} className="min-w-0">
            <SupportIncludeCard index={1} item={fixes} />
          </Reveal>
          <Reveal delay={270} className="min-w-0 sm:col-span-2">
            <SupportIncludeCard index={2} item={content} wide />
          </Reveal>
        </div>
      </div>

      <Reveal delay={110} className="mt-4 block">
        <SupportIncludeBanner index={3} item={performance} />
      </Reveal>
    </section>
  );
}

/** Illustrative Hearth & Home site, framed as something under active care. */
function SupportSitePreview() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#D96859]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#DEA741]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#74A66D]" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[0.82rem] font-semibold text-ink">
          CK Works client site
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-forest-soft/70 px-2.5 py-1 text-[0.68rem] font-semibold text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
          Live
        </span>
      </div>

      <div className="px-4 pb-3 pt-4">
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="flex items-center justify-between gap-3 bg-card px-3.5 py-2.5">
            <span className="flex min-w-0 items-center gap-2">
              <Image
                src="/images/services/svg/01-hearth-logo-demo.svg"
                alt=""
                width={18}
                height={18}
                className="h-[1.05rem] w-[1.05rem] object-contain"
              />
              <span className="font-serif text-[0.82rem] font-medium tracking-[0.02em] text-ink">
                Hearth &amp; Home
              </span>
            </span>
            <div className="hidden items-center gap-3.5 text-[0.7rem] font-medium text-ink/70 sm:flex">
              {["Projects", "About", "Services", "Journal", "Contact"].map(
                (link) => (
                  <span key={link}>{link}</span>
                ),
              )}
            </div>
          </div>

          <div className="relative aspect-[16/7] w-full">
            <Image
              src="/images/services/png/01-hearth-home-demo.png"
              alt="Illustrative Hearth &amp; Home site under ongoing care"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,23,20,0.62)_0%,rgba(20,23,20,0.34)_52%,transparent_88%)]"
              aria-hidden
            />
            <div className="absolute inset-y-0 left-0 flex max-w-[68%] flex-col justify-center px-4 sm:px-5">
              <p className="font-serif text-[1.15rem] font-medium leading-[1.1] text-ivory sm:text-[1.35rem]">
                Thoughtful spaces,
                <br />
                designed for living.
              </p>
              <p className="mt-2 text-[0.7rem] leading-5 text-ivory/85 sm:text-[0.78rem]">
                Timeless design. Considered details.
              </p>
              <span className="mt-3 inline-flex w-fit rounded bg-forest px-3 py-2 text-[0.7rem] font-semibold text-ivory sm:text-[0.75rem]">
                View our work
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 border-t border-line px-4 py-3.5 sm:grid-cols-4">
        {supportSiteStatus.map(({ icon: Icon, label, value }, index) => (
          <div
            key={label}
            className={`flex min-w-0 items-center gap-2.5 ${
              index > 0 ? "sm:border-l sm:border-line sm:pl-3" : ""
            }`}
          >
            <Icon
              className="h-4 w-4 shrink-0 text-forest"
              strokeWidth={1.5}
              aria-hidden
            />
            <span className="min-w-0">
              <span className="block truncate text-[0.68rem] font-semibold text-ink">
                {label}
              </span>
              <span className="block truncate text-[0.66rem] text-muted">
                {value}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportIncludeCard({
  index,
  item,
  wide = false,
}: {
  index: number;
  item: (typeof supportIncludes)[number];
  wide?: boolean;
}) {
  const { title, body, icon: Icon, tags } = item;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 pb-0 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className={wide ? "flex min-w-0 items-start gap-3.5" : "min-w-0"}>
          <SupportStepBadge index={index} />
          {wide ? (
            <div className="min-w-0">
              <h3 className="font-serif text-[1.35rem] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[1.45rem]">
                {title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-7 text-muted">{body}</p>
            </div>
          ) : null}
        </div>
        <Icon
          className="h-6 w-6 shrink-0 text-ink/45"
          strokeWidth={1.35}
          aria-hidden
        />
      </div>

      {wide ? null : (
        <>
          <h3 className="mt-4 font-serif text-[1.35rem] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[1.45rem]">
            {title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-7 text-muted">{body}</p>
        </>
      )}

      <SupportTagRow tags={tags} className="mt-auto" />
    </article>
  );
}

/** Entry 04 sits on its own band so the row above stays a clean three-up. */
function SupportIncludeBanner({
  index,
  item,
}: {
  index: number;
  item: (typeof supportIncludes)[number];
}) {
  const { title, body, icon: Icon, tags } = item;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-card px-5 py-5 shadow-soft lg:flex-row lg:items-center lg:gap-8 lg:px-6">
      <div className="flex min-w-0 flex-1 items-start gap-3.5 lg:gap-5">
        {/* Inline with the title on mobile; its own column once there is room. */}
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-card text-forest">
          <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <SupportStepBadge index={index} muted />
            <h3 className="font-serif text-[1.35rem] font-bold leading-snug tracking-[-0.01em] text-ink sm:text-[1.45rem]">
              {title}
            </h3>
          </div>
          <p className="mt-2 text-[0.95rem] leading-7 text-muted">{body}</p>
        </div>
      </div>
      <SupportTagRow
        tags={tags}
        showLine={false}
        className="lg:min-w-[18rem] lg:flex-1"
      />
    </article>
  );
}

function SupportStepBadge({
  index,
  muted = false,
}: {
  index: number;
  muted?: boolean;
}) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-source-serif-display text-[0.78rem] font-semibold tabular-nums ${
        muted ? "bg-card text-forest" : "bg-forest-soft/60 text-forest"
      }`}
      style={{ fontVariationSettings: '"opsz" 16' }}
      aria-hidden
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function SupportTagRow({
  tags,
  className = "",
  showLine = true,
}: {
  tags: readonly string[];
  className?: string;
  showLine?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 ${
        showLine
          ? "-mx-5 mt-auto border-t border-line px-5 py-3.5"
          : "pt-0"
      } ${className}`}
    >
      {tags.map((tag, index) => (
        <Fragment key={tag}>
          {index > 0 && (
            <span
              className="h-1 w-1 rounded-full bg-forest/45"
              aria-hidden
            />
          )}
          <span className="text-[0.8rem] font-semibold text-forest">
            {tag}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function SupportRequests() {
  return (
    <section className="border-b border-line py-14 lg:py-16">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className={serviceCenterLabelClassName}>
          Examples of common requests
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {supportRequests.map(({ icon: Icon, label, body }, index) => (
          <Reveal
            as="article"
            key={label}
            delay={index * 80}
            className="flex h-full items-start gap-3.5 rounded-2xl border border-line bg-card p-4 shadow-soft"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-soft/55 text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.92rem] font-semibold leading-snug text-ink">
                {label}
              </span>
              <span className="mt-1 block text-[0.82rem] leading-5 text-muted">
                {body}
              </span>
            </span>
            <ChevronRight
              className="mt-1 h-4 w-4 shrink-0 text-ink/30"
              strokeWidth={1.8}
              aria-hidden
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SupportPrinciple() {
  return (
    <section className="border-b border-line py-14 lg:py-16">
      {/* The three shapes on the right are the point: support is scoped to
          what is needed, not sold as one mandatory retainer. */}
      <Reveal className="grid items-center gap-8 rounded-2xl border border-line bg-card px-6 py-8 shadow-soft sm:px-8 lg:grid-cols-[minmax(0,1.24fr)_1px_minmax(0,0.76fr)] lg:gap-12 lg:px-10 lg:py-10">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
            Flexible support
          </p>
          <h2 className="mt-4 font-serif text-[1.9rem] font-medium leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.4rem]">
            Support should remove uncertainty.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-[0.95rem]">
            The goal is not to create unnecessary monthly work. Support can be
            scoped around a specific need or organized into ongoing care when
            regular attention would genuinely help.
          </p>
        </div>

        <span className="hidden self-stretch bg-line lg:block" aria-hidden />

        <ul className="min-w-0 divide-y divide-line">
          {supportModes.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-soft/50 text-forest">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="min-w-0 text-[0.98rem] font-semibold text-ink">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function SupportProcess() {
  return (
    <section
      id="support-process"
      className="grid scroll-mt-24 gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 lg:py-16"
    >
      <Reveal className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          How requests are handled
        </p>
        <h2 className={serviceSectionTitleClassName}>
          A simple path from request to resolution.
        </h2>
        <div className="mt-7 divide-y divide-line">
          {supportProcess.map(({ step, title, body }, index) => (
            <Reveal
              as="article"
              key={title}
              delay={index * 100}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 font-source-serif-display text-[0.85rem] font-semibold tabular-nums text-forest"
                style={{ fontVariationSettings: '"opsz" 16' }}
              >
                {step}
              </span>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          You receive a clear understanding of what is being changed, what it
          will require, and what happens next.
        </p>
      </Reveal>

      {/* min-w-0: a grid item defaults to min-width:auto and will not shrink
          below its content, which pushed the tracker past the viewport. */}
      <Reveal delay={120} className="min-w-0">
        <SupportRequestTracker />
      </Reveal>
    </section>
  );
}

/** "Support request" tracker — how-requests-are-handled visual. */
function SupportRequestTracker() {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)] sm:p-5">
      <p className="font-sans text-sm font-semibold text-ink">
        Support request
      </p>

      <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-ivory/60 p-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-forest">
          <FileText className="h-4 w-4" strokeWidth={1.7} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.8rem] font-semibold text-ink">
            Update contact form confirmation message
          </span>
          <span className="block text-[0.66rem] text-muted">
            Submitted May 3, 2025 · via email
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-forest-soft px-2.5 py-1 text-[0.62rem] font-semibold text-forest">
          Completed
        </span>
      </div>

      <div className="relative mt-6 px-1">
        <span
          className="absolute left-[12.5%] right-[12.5%] top-3 h-px bg-forest/40"
          aria-hidden
        />
        <div className="relative grid grid-cols-4">
          {supportTrackerSteps.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-ivory ring-4 ring-card">
                <Check className="h-3 w-3" strokeWidth={2.8} />
              </span>
              <span className="text-center text-[0.66rem] font-semibold leading-tight text-ink">
                {step.label}
              </span>
              <span className="-mt-1 text-[0.6rem] text-muted">
                {step.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-forest-soft/50 p-4">
        <CircleCheck
          className="mt-0.5 h-5 w-5 shrink-0 fill-forest text-ivory"
          strokeWidth={2.2}
        />
        <div>
          <p className="text-[0.78rem] font-semibold text-ink">
            Completed May 4, 2025
          </p>
          <p className="mt-1 text-[0.72rem] leading-5 text-muted">
            Confirmation message updated and tested on desktop and mobile. You
            can view the change on your site.
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal>
        <FAQSection
          faqs={[...supportFaqs]}
          description="Common questions about ongoing support, how requests work, and what to expect."
        />
      </Reveal>
    </section>
  );
}

function SupportRebuildNote() {
  return (
    <section className="border-b border-line py-8 text-center">
      <Reveal as="p" className="text-sm text-muted">
        Planning a larger rebuild instead?{" "}
        <Link
          href="/services/web-design-development"
          className="group inline-flex items-center gap-1.5 font-semibold text-forest transition-colors hover:text-ink"
        >
          View Web Design &amp; Development
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}

function SupportBottomCta() {
  return (
    <Reveal className="mt-10 flex flex-col gap-6 rounded-2xl border border-line bg-sand px-6 py-7 shadow-soft sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10">
      <div>
        <h2 className="font-serif text-[1.7rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2rem]">
          Need help keeping something current?
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          Share the website, system, or issue you&apos;re working with, and
          I&apos;ll help determine the most practical next step.
        </p>
      </div>
      <ProjectInquiryTrigger
        source="support_service_bottom_cta"
        className="shrink-0 rounded-md px-6"
      >
        Request support
        <ArrowRight className="h-4 w-4" />
      </ProjectInquiryTrigger>
    </Reveal>
  );
}
