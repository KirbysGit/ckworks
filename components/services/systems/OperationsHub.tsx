/** Renders the illustrative inquiry-to-operations system map in the hero. */
import {
  Bell,
  Calendar,
  Check,
  Eye,
  FolderKanban,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

const operationsHubLayout = {
  /** The hub leads while the outcome cards remain visibly secondary. */
  columns: "lg:grid-cols-[minmax(0,1fr)_minmax(12rem,0.52fr)]",
  outcomeGrid: "lg:grid-cols-1 lg:gap-y-4",
} as const;

const inquirySteps: {
  label: string;
  detail: string;
  time: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Form received",
    detail: "Website form submitted",
    time: "Just now",
    icon: Check,
  },
  {
    label: "Contact validated",
    detail: "Details verified",
    time: "1 min ago",
    icon: Check,
  },
  {
    label: "Client record created",
    detail: "Added to the client database",
    time: "2 min ago",
    icon: Check,
  },
  {
    label: "Follow-up scheduled",
    detail: "Intro call on calendar",
    time: "5 min ago",
    icon: Calendar,
  },
];

const outcomes: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: UserRound, title: "Client record", body: "Saved" },
  { icon: Bell, title: "Team notification", body: "Sent" },
  { icon: Calendar, title: "Follow-up", body: "Scheduled" },
  {
    icon: FolderKanban,
    title: "Project record",
    body: "Created",
  },
];

export default function OperationsHub() {
  return (
    <div className="relative">
      <AutomationBanner />
      <div className={`mt-7 grid gap-6 ${operationsHubLayout.columns} lg:gap-x-16 lg:gap-y-10`}>
        <HubWindow />

        <div className="self-start lg:self-center">
          <p className="mb-3 text-left text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-muted lg:text-right">
            Automatically updated
          </p>
          <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${operationsHubLayout.outcomeGrid}`}>
            {outcomes.map(({ icon: Icon, title, body }) => (
              <OutcomeNode key={title} Icon={Icon} title={title} body={body} />
            ))}
          </div>
        </div>

        <ReportingNode />
      </div>
      <p className="mt-5 text-center text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
        Illustrative system example
      </p>
    </div>
  );
}

function AutomationBanner() {
  return (
    <p className="mx-auto flex max-w-[44rem] items-center justify-center gap-3 rounded-2xl border border-line bg-card/75 px-5 py-3 text-center text-[0.64rem] font-semibold uppercase tracking-[0.15em] text-ink shadow-[0_14px_30px_-28px_rgba(31,36,32,0.58)] sm:text-[0.68rem]">
      <Zap className="h-5 w-5 shrink-0 text-forest" strokeWidth={1.7} aria-hidden />
      <span>One inquiry - the next steps happen automatically</span>
    </p>
  );
}

function HubWindow() {
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 sm:px-5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#D96859]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#DEA741]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#74A66D]" aria-hidden />
        <p className="ml-1 text-[0.78rem] font-semibold text-ink">Operations Hub</p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="rounded-2xl border border-line bg-ivory/45 p-3.5 sm:p-4">
          <p className="text-[1.05rem] font-semibold text-ink">New website inquiry</p>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-card px-3.5 py-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-ivory">
              SM
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">
                Sarah Mitchell
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted">
                Kitchen remodeling
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted">Orlando, FL</span>
            </span>
            <span className="rounded-md bg-forest-soft px-2.5 py-1 text-xs font-semibold text-forest">
              New
            </span>
          </div>

          <ol className="relative mt-5 space-y-4 before:absolute before:bottom-5 before:left-[0.93rem] before:top-5 before:border-l before:border-dashed before:border-forest/50">
            {inquirySteps.map(({ label, detail, time, icon: Icon }) => (
              <li
                key={label}
                className="relative grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-3"
              >
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-ivory ring-4 ring-ivory/45">
                  <Icon className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-sm font-semibold leading-5 text-ink">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-4 text-muted">
                    {detail}
                  </span>
                </span>
                <span className="pt-0.5 text-xs text-muted">{time}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function OutcomeNode({
  Icon,
  title,
  body,
}: {
  Icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <article className="relative flex min-h-[5.25rem] min-w-0 items-center gap-3 rounded-2xl border border-line bg-card p-3.5 shadow-[0_18px_34px_-28px_rgba(31,36,32,0.48)] lg:p-4">
      <OutcomeConnector />
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 text-forest">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.85rem] font-semibold leading-5 text-ink">{title}</span>
        <span className="mt-1 block text-[0.76rem] font-medium leading-4 text-forest">{body}</span>
      </span>
    </article>
  );
}

function ReportingNode() {
  return (
    <article className="relative flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-card p-4 shadow-[0_18px_34px_-28px_rgba(31,36,32,0.48)] lg:col-start-1 lg:mt-2">
      <ReportingConnector />
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 text-forest">
        <Eye className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-5 text-ink">
          Everything stays visible
        </span>
        <span className="mt-1 block text-xs leading-4 text-muted">
          The inquiry, next step, and project status stay together.
        </span>
      </span>
    </article>
  );
}

function OutcomeConnector() {
  return (
    <svg
      className="pointer-events-none absolute -left-16 top-1/2 hidden h-5 w-16 -translate-y-1/2 overflow-visible text-forest lg:block"
      viewBox="0 0 64 20"
      fill="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="10"
        x2="58"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
      <path d="M53 5L58 10L53 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReportingConnector() {
  return (
    <svg
      className="pointer-events-none absolute -top-12 left-1/2 hidden h-12 w-5 -translate-x-1/2 overflow-visible text-forest lg:block"
      viewBox="0 0 20 48"
      fill="none"
      aria-hidden
    >
      <line
        x1="10"
        y1="0"
        x2="10"
        y2="42"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
      <path d="M5 37L10 42L15 37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
