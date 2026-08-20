/** Renders the bespoke Digital Systems and Integrations service experience. */
import { Fragment, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CircleCheck,
  CreditCard,
  Eye,
  FileText,
  Folder,
  IdCard,
  LayoutTemplate,
  MessageSquareText,
  Package,
  RefreshCw,
  Store,
  UserRoundCheck,
} from "lucide-react";
import { SiAirtable, SiGooglecalendar, SiStripe } from "react-icons/si";
import FAQSection from "@/components/page/FAQSection";
import Reveal from "@/components/ui/Reveal";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import ServiceTimeline from "@/components/services/shared/ServiceTimeline";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";
import type { ServiceArea } from "@/lib/services";
import ServiceFrame from "../shared/ServiceFrame";
import RelatedLinks from "../shared/RelatedLinks";
import ProjectWorkCard from "../shared/ProjectWorkCard";
import OperationsHub, { systemsHeroTiming } from "./OperationsHub";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
  serviceHeroTitleClassName,
  serviceSectionBodyClassName,
  serviceSectionLabelClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";
const systemsWhyItMatters = [
  {
    icon: RefreshCw,
    title: "Less repeated work",
    body: "Information is entered once instead of copied between tools.",
  },
  {
    icon: Bell,
    title: "Fewer missed steps",
    body: "Notifications and follow-ups happen when they should.",
  },
  {
    icon: Eye,
    title: "A clearer view",
    body: "Important records and statuses stay visible in one place.",
  },
] as const;

/**
 * Tool cards for the integration diagram. Gmail/Slack use full-color SVGs
 * from public/images/services/svg; the rest use brand-tinted react-icons.
 * Drop an official SVG into that folder and switch an entry to upgrade it.
 */
type SystemsTool = { name: string; use: string; logo: ReactNode };

/**
 * The grid reads as a direction, not a logo wall: information arrives from the
 * tools above, lands in one place, and is pushed back out to the tools below.
 * Keep each row at three so the connectors stay legible.
 */
const systemsInputs: SystemsTool[] = [
  {
    name: "Gmail",
    use: "Lead notifications",
    logo: (
      <Image
        src="/images/services/svg/gmail-logo.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    name: "Website Forms",
    use: "Client intake",
    logo: <FileText className="h-7 w-7 text-ink/80" strokeWidth={1.4} />,
  },
  {
    name: "Stripe",
    use: "Payment sync",
    logo: <SiStripe className="h-7 w-7" color="#635BFF" />,
  },
];

const systemsConnected: SystemsTool[] = [
  {
    name: "Airtable",
    use: "Project management",
    logo: <SiAirtable className="h-7 w-7" color="#18BFFF" />,
  },
  {
    name: "Slack",
    use: "Team updates",
    logo: (
      <Image
        src="/images/services/svg/slack-logo.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    name: "Google Calendar",
    use: "Scheduling",
    logo: <SiGooglecalendar className="h-7 w-7" color="#4285F4" />,
  },
];

/**
 * Flow-diagram tuning. Percentages are of the diagram's width, so the
 * connectors stay attached to their columns at any container size.
 *   columnCenters — horizontal centre of each card column
 *   hubAnchors    — where each connector meets the hub
 *   bandIn / bandOut — visible gap between card row and hub
 *   hubNudgeY        — shift "Your business" up (−) or down (+)
 *   cardDip          — how far lines tuck under the cards (top + bottom)
 *   snakeFromCard*   — % of (dip + band) before the first bend, from the card
 *   note*            — handwritten aside placement (desktop only)
 */
const systemsFlowLayout = {
  /**
   * Outer starts sit on the inner half of each outer card (not the card
   * centre) so the horizontal snake run stays short. Centre stays at 50%.
   * Keep the `2rem` in sync with the row's `sm:gap-4`.
   */
  columnCenters: [
    "calc((100%) / 3 * 0.48)",
    "50%",
    "calc(100% - (100%) / 3 * 0.5)",
  ],
  /** Meet the hub near its outer edges — shortens the inward jog. */
  hubAnchors: ["38%", "50%", "62%"],
  /** Top connectors (inputs → hub). */
  bandIn: "h-20",
  /** Bottom connectors (hub → tools). Match the top’s visible rhythm. */
  bandOut: "h-20",
  /**
   * Vertical nudge for the hub pill. Negative = up, positive = down.
   * e.g. "-0.5rem" / "0.75rem" / "0rem"
   */
  hubNudgeY: "0.25rem",
  /**
   * How far outer/center lines tuck under the tool cards. Cards must sit
   * above the connector band (z-index) for the dip to read.
   */
  cardDip: "0.85rem",
  /**
   * % of the full connector box (dip + band) from the card to the bend.
   * Keep these similar so top/bottom stubs match.
   */
  snakeFromCardIn: 28,
  snakeFromCardOut: 80,
  /** Corner radius for outer snake bends (viewBox 0–100 units). */
  snakeCorner: 8,
  /**
   * Small node dots at the card edge. Half sits under the card so they read
   * as connection points the lines plug into.
   */
  cardNode: "0.7rem",
  noteWidth: "w-[9rem] xl:w-[11rem]",
  noteLeft: "-left-4 xl:-left-10",
  noteRight: "-right-4 xl:-right-10",
  noteTop: "top-1/2 -translate-y-1/2",
} as const;

/**
 * Tool-diagram sequence (ms), measured from when the section scrolls in.
 * It reads top to bottom, the same direction as the diagram: the inputs
 * arrive, the lines reach the hub, the hub lands, then the work flows back
 * out to the connected tools.
 *
 * These drive `ck-step`, which is held until `<Reveal>` adds `.is-in` — so a
 * single wrapper sequences the whole diagram without one observer per part.
 */
const systemsFlowTiming = {
  inputCards: 0,
  /** Added per card in a row. */
  cardStep: 80,
  linesIn: 300,
  hub: 430,
  linesOut: 560,
  outputCards: 690,
} as const;

/**
 * Per-row workflow sequence (ms). Icon, arrow, icon, arrow — so the chain
 * traces itself in the order the work actually happens.
 */
const systemsWorkflowTiming = {
  /** Added per step index (icon 0, 1, 2, 3). */
  iconStep: 200,
  /** Arrow lands between the icons it joins. */
  arrowOffset: 90,
  /** Arrowhead follows its line. */
  headOffset: 200,
  /** Added per workflow row. */
  rowStep: 110,
} as const;

/**
 * Three everyday workflows, each shown as the chain of steps a system takes
 * over. `removes` is the point of the row — it names the manual work that
 * stops happening, rather than describing the software.
 *
 * These are illustrative examples, not delivered client work; the section
 * labels them as such.
 */
const systemsWorkflows = [
  {
    step: "01",
    title: "New inquiries",
    audience: "Service business",
    steps: [
      { icon: LayoutTemplate, label: "Website form" },
      { icon: IdCard, label: "Client record" },
      { icon: Bell, label: "Team notification", alert: true },
      { icon: CircleCheck, label: "Follow-up" },
    ],
    removes: "manual lead entry and forgotten follow-ups.",
  },
  {
    step: "02",
    title: "Orders & updates",
    audience: "Retail / product business",
    steps: [
      { icon: CreditCard, label: "Payment received" },
      { icon: Package, label: "Order updated" },
      { icon: Bell, label: "Team notified", alert: true },
      { icon: MessageSquareText, label: "Customer update" },
    ],
    removes: "checking multiple tools and manual status updates.",
  },
  {
    step: "03",
    title: "Client onboarding",
    audience: "professional-services business",
    steps: [
      { icon: UserRoundCheck, label: "Client confirmed" },
      { icon: Folder, label: "Record created" },
      { icon: FileText, label: "Documents organized" },
      { icon: CalendarDays, label: "Kickoff scheduled" },
    ],
    removes: "repetitive setup every time a new client starts.",
  },
] as const;

const systemsFaqs = [
  {
    question: "Can you connect the tools I already use?",
    answer:
      "Usually, yes. If a tool offers an API or export — think Stripe, Airtable, Google Sheets, Slack, or a CRM — it can typically be connected. The first step is mapping what you use and where information gets stuck.",
  },
  {
    question: "Do I need a full system, or just one integration?",
    answer:
      "Often just one. Many businesses get the most value from a single dashboard or one reliable connection. I start with the piece that removes the most manual work, then grow only if it earns its place.",
  },
  {
    question: "What parts of my process can be automated?",
    answer:
      "Anything repetitive and rule-based: routing form submissions, sending notifications, syncing records between tools, generating simple reports, or updating a status. If you do it the same way every time, it is a candidate.",
  },
  {
    question: "Will this work with my existing website?",
    answer:
      "In most cases, yes. Systems and integrations can sit alongside your current site or connect directly to it. I'll review how it is built and what access is available before recommending an approach.",
  },
  {
    question: "Who maintains the system after launch?",
    answer:
      "Whatever fits how you work. Many businesses pair systems work with Ongoing Support so updates and small improvements are handled for them; others take a documented handoff and run it themselves. Either way, nothing is locked in.",
  },
] as const;

const systemsProjectSlugs = ["internal-automation-tool", "centi"] as const;

function SystemsRelated() {
  return (
    <RelatedLinks
      links={[
        {
          label: "Measure what your workflows produce",
          href: "/services/analytics-lead-tracking",
          note: "See which automated steps lead to real inquiries and where people drop off.",
        },
        {
          label: "Explore ongoing website support",
          href: "/services/ongoing-support",
          note: "Systems need maintenance once they are running day to day.",
        },
      ]}
    />
  );
}

export default function Page({ service }: { service: ServiceArea }) {
  const projects = systemsProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <ServiceFrame service={service}><section className="bg-ivory pb-10 pt-5 sm:pb-12 sm:pt-6 lg:pb-16 lg:pt-6">
        <div className={serviceContainer}>
          <SystemsHero timeline={service.timeline} />
          <SystemsWhyItMatters />
          <SystemsToolGrid />
          <SystemsHowItWorks />
          <SystemsWork projects={projects} />
          <SystemsFaq />
          <SystemsRelated />
          <SystemsBottomCta />
        </div>
      </section>
    </ServiceFrame>
  );
}

function SystemsHero({ timeline }: { timeline: ServiceArea["timeline"] }) {
  return (
    <div className="grid items-center gap-10 border-b border-line pb-11 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14 lg:pb-14">
      <div className="max-w-xl">
        <p
          className="ck-rise text-xs font-semibold uppercase tracking-[0.26em] text-forest"
          style={{ animationDelay: `${systemsHeroTiming.eyebrow}ms` }}
        >
          Flow
        </p>
        <h1
          className={`ck-rise ${serviceHeroTitleClassName}`}
          style={{ animationDelay: `${systemsHeroTiming.title}ms` }}
        >
          Custom systems that keep the work moving.
        </h1>
        <p
          className="ck-rise mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]"
          style={{ animationDelay: `${systemsHeroTiming.leadCopy}ms` }}
        >
          CK Works builds internal dashboards, connected forms, workflow automations,
          and integrations that bring your tools and information together.
        </p>
        <p
          className="ck-rise mt-4 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]"
          style={{ animationDelay: `${systemsHeroTiming.supportCopy}ms` }}
        >
          The goal is simple: less copying, fewer missed steps, and a clearer
          view of what&apos;s happening.
        </p>
        <ServiceTimeline
          timeline={timeline}
          className="ck-rise mt-7"
          style={{ animationDelay: `${systemsHeroTiming.actions}ms` }}
        />
        <div
          className="ck-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: `${systemsHeroTiming.actions}ms` }}
        >
          <ProjectInquiryTrigger
            source="systems_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <a
            href="#how-it-works"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
          >
            See how it works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <OperationsHub />
    </div>
  );
}

function SystemsWhyItMatters() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_1px_minmax(0,1.1fr)] lg:gap-12 lg:py-16">
      <Reveal className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Why it matters
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Keep information moving without the manual handoffs.
        </h2>
        <p className={serviceSectionBodyClassName}>
          As businesses grow, information spreads across forms, spreadsheets,
          inboxes, and disconnected tools.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
          CK Works connects the pieces so information moves without the extra handoffs.
        </p>
      </Reveal>

      <span className="hidden w-px bg-line lg:block" aria-hidden />

      <div className="divide-y divide-line lg:self-center">
        {systemsWhyItMatters.map(({ icon: Icon, title, body }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 110}
            className="grid min-h-[8.75rem] grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 py-6 first:pt-0 last:pb-0 sm:py-7"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-soft/60 text-forest sm:h-11 sm:w-11">
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

function SystemsToolGrid() {
  return (
    <section className="border-b border-line py-14 lg:py-16">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className={serviceCenterLabelClassName}>
          What this service can include
        </p>
        <h2 className={serviceCenterTitleClassName}>
          Connect the tools you already use.
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-10 max-w-4xl">
        {/* Handwritten asides flank the hub; they need room, so desktop only. */}
        <Image
          src="/images/services/svg/04-demo-text-01.svg"
          alt=""
          width={835}
          height={349}
          aria-hidden
          className={`pointer-events-none absolute z-0 hidden h-auto lg:block ${systemsFlowLayout.noteWidth} ${systemsFlowLayout.noteLeft} ${systemsFlowLayout.noteTop}`}
        />
        <Image
          src="/images/services/svg/04-demo-text-02.svg"
          alt=""
          width={1046}
          height={436}
          aria-hidden
          className={`pointer-events-none absolute z-0 hidden h-auto lg:block ${systemsFlowLayout.noteWidth} ${systemsFlowLayout.noteRight} ${systemsFlowLayout.noteTop}`}
        />

        <Reveal className="relative z-10 block">
          <SystemsFlowLabel>Inputs</SystemsFlowLabel>
          <SystemsToolRow
            tools={systemsInputs}
            baseDelay={systemsFlowTiming.inputCards}
          />

          <SystemsFlowConnectors direction="in" />

          {/* The connector bands supply this spacing at lg; mobile needs its own. */}
          <div
            className="relative z-30 my-6 flex justify-center lg:my-0"
            style={{ transform: `translateY(${systemsFlowLayout.hubNudgeY})` }}
          >
            {/* ck-step goes on the pill, not the parent — the parent carries
                the hubNudgeY transform this animation would overwrite. */}
            <div
              className="ck-step relative z-30 flex items-center gap-3.5 rounded-xl bg-forest px-6 py-4 shadow-[0_18px_38px_-18px_rgba(47,91,63,0.6)]"
              style={
                { "--ck-anim-delay": `${systemsFlowTiming.hub}ms` } as CSSProperties
              }
            >
              <Store
                className="h-7 w-7 shrink-0 text-ivory"
                strokeWidth={1.5}
              />
              <span className="min-w-0">
                <span className="block font-sans text-lg font-semibold leading-tight text-ivory">
                  Your business
                </span>
                <span className="mt-0.5 block text-[0.78rem] leading-tight text-ivory/80">
                  records &middot; notifications &middot; follow-up
                </span>
              </span>
            </div>
          </div>

          <SystemsFlowConnectors direction="out" />

          <SystemsToolRow
            tools={systemsConnected}
            baseDelay={systemsFlowTiming.outputCards}
          />
          {/* Label sits outside the row (below) so the hub has matching gaps above/below. */}
          <SystemsFlowLabel className="mb-0 mt-4">Connected tools</SystemsFlowLabel>
        </Reveal>
      </div>
    </section>
  );
}

function SystemsFlowLabel({
  children,
  className = "mb-4",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px flex-1 bg-line" aria-hidden />
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-forest">
        {children}
      </span>
      <span className="h-px flex-1 bg-line" aria-hidden />
    </div>
  );
}

/**
 * Connectors between a card row and the hub.
 * Outer columns use a two-bend snake (down → inward → down);
 * the centre column stays a straight drop.
 * Bands tuck under the cards via `cardDip` so lines plug into both rows.
 */
function SystemsFlowConnectors({ direction }: { direction: "in" | "out" }) {
  const lineDelay =
    direction === "in"
      ? systemsFlowTiming.linesIn
      : systemsFlowTiming.linesOut;
  const {
    columnCenters,
    hubAnchors,
    bandIn,
    bandOut,
    cardDip,
    snakeFromCardIn,
    snakeFromCardOut,
    snakeCorner,
    cardNode,
  } = systemsFlowLayout;
  const toHub = direction === "in";
  const band = toHub ? bandIn : bandOut;
  /**
   * Bend position from the top of the connector box. Top: short stub from
   * the card, then across, then down. Bottom: mirror so the card stub matches.
   */
  const bendAt = toHub ? snakeFromCardIn : 100 - snakeFromCardOut;
  const corner = Math.min(
    snakeCorner,
    Math.max(2, bendAt - 2),
    Math.max(2, 100 - bendAt - 2),
  );

  return (
    <div
      className={`relative isolate hidden lg:block ${band}`}
      style={
        toHub
          ? { marginTop: `-${cardDip}`, paddingTop: cardDip }
          : { marginBottom: `-${cardDip}`, paddingBottom: cardDip }
      }
      aria-hidden
    >
      {/* Lines underneath (z-0). */}
      <div className="absolute inset-0 z-0">
        {columnCenters.map((center, index) => {
          const anchor = hubAnchors[index];
          const isCenter = index === 1;
          const isLeft = index === 0;
          const boxLeft = isCenter ? center : isLeft ? center : anchor;
          const boxRight = isCenter ? center : isLeft ? anchor : center;

          const snakePath = (() => {
            if (isCenter) {
              return "M 0 0 L 0 100";
            }

            const downRight = `M 0 0 L 0 ${bendAt - corner} Q 0 ${bendAt} ${corner} ${bendAt} L ${100 - corner} ${bendAt} Q 100 ${bendAt} 100 ${bendAt + corner} L 100 100`;
            const downLeft = `M 100 0 L 100 ${bendAt - corner} Q 100 ${bendAt} ${100 - corner} ${bendAt} L ${corner} ${bendAt} Q 0 ${bendAt} 0 ${bendAt + corner} L 0 100`;

            if (toHub) {
              return isLeft ? downRight : downLeft;
            }
            return isLeft ? downLeft : downRight;
          })();

          if (isCenter) {
            return (
              <svg
                key={`${direction}-line-${center}`}
                /* Centred via calc, not -translate-x-1/2: ck-step animates
                   transform and would settle at `none`, losing the offset. */
                className="ck-step pointer-events-none absolute inset-y-0 w-3 overflow-visible text-ink/45"
                style={
                  {
                    left: `calc(${center} - 0.375rem)`,
                    "--ck-anim-delay": `${lineDelay}ms`,
                  } as CSSProperties
                }
                viewBox="0 0 12 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M 6 0 L 6 100"
                  stroke="currentColor"
                  strokeWidth={2.25}
                  strokeDasharray="1.75 5.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            );
          }

          return (
            <svg
              key={`${direction}-line-${center}`}
              className="ck-step pointer-events-none absolute inset-y-0 overflow-visible text-ink/45"
              style={
                {
                  left: boxLeft,
                  right: `calc(100% - (${boxRight}))`,
                  "--ck-anim-delay": `${lineDelay}ms`,
                } as CSSProperties
              }
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d={snakePath}
                stroke="currentColor"
                strokeWidth={2.25}
                strokeDasharray="1.75 5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          );
        })}
      </div>

      {/* Nodes above lines (z-10), still under tool cards (z-20). */}
      <div className="absolute inset-0 z-10">
        {columnCenters.map((center) => (
          <span
            key={`${direction}-node-${center}`}
            className="absolute rounded-full bg-ink/40"
            style={{
              left: `calc(${center} - ${cardNode} / 2)`,
              width: cardNode,
              height: cardNode,
              ...(toHub
                ? { top: `calc(${cardDip} - ${cardNode} / 2)` }
                : { bottom: `calc(${cardDip} - ${cardNode} / 2)` }),
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SystemsToolRow({
  tools,
  baseDelay,
}: {
  tools: SystemsTool[];
  baseDelay: number;
}) {
  return (
    <div className="relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {tools.map((tool, index) => (
        <article
          key={tool.name}
          className="ck-step flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-5 text-center shadow-soft"
          style={
            {
              "--ck-anim-delay": `${
                baseDelay + index * systemsFlowTiming.cardStep
              }ms`,
            } as CSSProperties
          }
        >
          <span className="flex h-9 items-center justify-center">
            {tool.logo}
          </span>
          <h3 className="text-sm font-semibold text-ink">{tool.name}</h3>
          <p className="text-xs leading-4 text-muted">{tool.use}</p>
        </article>
      ))}
    </div>
  );
}

function SystemsHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-line py-14 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-0">
        <Reveal className="max-w-md lg:pr-14">
          <p className={serviceSectionLabelClassName}>
            Where a system earns its place
          </p>
          <h2 className={serviceSectionTitleClassName}>
            Small systems for the work that keeps repeating.
          </h2>
          <span className="mt-7 block h-px w-10 bg-forest" aria-hidden />
          <p className={`${serviceSectionBodyClassName} max-w-sm`}>
            The best opportunities are usually the repeated handoffs, updates,
            and follow-ups that happen every day. A useful system connects the
            work already happening and removes the steps your team keeps doing
            by hand.
          </p>
        </Reveal>

        {/* Divider belongs to the right column so it spans the full stack. */}
        <div className="min-w-0 lg:border-l lg:border-line lg:pl-12">
          <p className="mb-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Illustrative workflow examples
          </p>
          <div className="divide-y divide-line">
            {systemsWorkflows.map((workflow, index) => (
              <Reveal
                as="article"
                key={workflow.step}
                delay={index * 110}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-4 py-6 first:pt-0 last:pb-0 sm:gap-x-5"
              >
                {/* The number is its own column, so the title, chain, and
                    "Removes" line all share one left edge automatically. */}
                <span
                  className="font-source-serif-display text-[1.35rem] font-semibold leading-none tabular-nums text-forest/60"
                  style={{ fontVariationSettings: '"opsz" 20' }}
                >
                  {workflow.step}
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-[1.6rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
                    {workflow.title}{" "}
                    <span className="font-sans text-[0.85rem] font-medium tracking-normal text-ink/55 sm:text-[0.9rem]">
                      for a
                    </span>{" "}
                    <span className="font-sans text-[0.9rem] font-semibold tracking-normal text-forest sm:text-[0.95rem]">
                      {workflow.audience}
                    </span>
                  </h3>
                  <p className="mt-1 text-[0.85rem] leading-6 text-ink/80">
                    <span className="font-semibold text-ink">Removes:</span>{" "}
                    {workflow.removes}
                  </p>

                  <SystemsWorkflowChain
                    steps={workflow.steps}
                    rowDelay={index * systemsWorkflowTiming.rowStep}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Icon chain for one workflow. Arrows live in their own auto-width columns so
 * the four steps stay evenly spaced, and they drop out below `sm` where the
 * chain reflows to a two-column grid.
 */
function SystemsWorkflowChain({
  steps,
  rowDelay,
}: {
  steps: (typeof systemsWorkflows)[number]["steps"];
  rowDelay: number;
}) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-[repeat(4,minmax(0,1fr))] sm:gap-x-0 lg:grid-cols-[repeat(3,minmax(0,1fr)_auto)_minmax(0,1fr)]">
      {steps.map(({ icon: Icon, ...rest }, index) => {
        const iconAt = rowDelay + index * systemsWorkflowTiming.iconStep;
        // The arrow into this step leaves just after the previous icon lands.
        const arrowAt =
          iconAt -
          systemsWorkflowTiming.iconStep +
          systemsWorkflowTiming.arrowOffset;

        return (
          <Fragment key={rest.label}>
            {index > 0 && (
              <span
                className="hidden items-center px-3 lg:flex xl:px-4"
                aria-hidden
              >
                <span
                  className="ck-draw-x relative block h-px w-full min-w-[1.5rem] bg-ink/35"
                  style={
                    { "--ck-anim-delay": `${arrowAt}ms` } as CSSProperties
                  }
                >
                  {/* Head follows the line it caps rather than scaling with
                      it. The rotation lives on an inner span because ck-step
                      animates transform and would settle at `none`. */}
                  <span
                    className="ck-step absolute -right-px -top-[3px] block h-[7px] w-[7px]"
                    style={
                      {
                        "--ck-anim-delay": `${
                          arrowAt + systemsWorkflowTiming.headOffset
                        }ms`,
                      } as CSSProperties
                    }
                  >
                    <span className="block h-full w-full rotate-45 border-r border-t border-ink/35" />
                  </span>
                </span>
              </span>
            )}
            <div
              className="ck-step flex min-w-0 flex-col items-center gap-2.5 text-center"
              style={{ "--ck-anim-delay": `${iconAt}ms` } as CSSProperties}
            >
              <span className="relative flex h-11 w-11 items-center justify-center">
                <Icon className="h-8 w-8 text-ink/75" strokeWidth={1.15} />
                {"alert" in rest && rest.alert ? (
                  <span
                    className="absolute right-1 top-0.5 h-2 w-2 rounded-full bg-forest ring-2 ring-ivory"
                    aria-hidden
                  />
                ) : null}
              </span>
              <span className="text-[0.8rem] leading-4 text-ink/80">
                {rest.label}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

function SystemsWork({ projects }: { projects: CaseStudy[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal>
        <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
          Relevant work
        </h2>
      </Reveal>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 120}
            className="h-full min-h-0"
          >
            <ProjectWorkCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SystemsFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal>
        <FAQSection
          faqs={[...systemsFaqs]}
          description="Common questions about connecting tools, automating steps, and keeping systems running."
        />
      </Reveal>
    </section>
  );
}

function SystemsBottomCta() {
  return (
    <Reveal className="mt-10 block rounded-2xl border border-line bg-sand px-6 py-8 shadow-soft sm:px-8 sm:py-9 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[1.85rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2.15rem]">
            Have a workflow that should run itself?
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            Tell me where the manual work is, and I&apos;ll help you find the
            simplest system that removes it.
          </p>
        </div>
        <ProjectInquiryTrigger
          source="systems_service_bottom_cta"
          className="shrink-0 rounded-md px-6"
        >
          Start a project
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
      </div>
    </Reveal>
  );
}

// ── Ongoing Support (bespoke page) ────────────────────────────────────────
