import {
  BarChart3,
  LifeBuoy,
  LineChart,
  MonitorSmartphone,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceSlug =
  | "web-design-development"
  | "search-ai-visibility"
  | "analytics-lead-tracking"
  | "digital-systems-integrations"
  | "ongoing-support";

/**
 * Shown as one line in the service hero, above the CTA. `null` means we do not
 * have a figure we can stand behind yet — the hero then renders nothing rather
 * than a number that would have to be walked back on a call.
 *
 * Reads as one sentence: "{lead} {value} — {note}." Only `value` is emphasised.
 *
 * Quote elapsed calendar time, not working days; `note` is where that gets
 * said. Not every service is a project with an end date, so `lead` varies —
 * support quotes a response window, not a duration.
 */
export type ServiceTimeline = {
  /** Lead-in, varied per service so the five pages don't read templated. */
  lead: string;
  /** The emphasised figure, e.g. "6–10 weeks". */
  value: string;
  /** Caveat after the em dash. Lowercase; it continues the sentence. */
  note: string;
};

export type ServiceArea = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  href: string;
  eyebrow: string;
  description: string;
  timeline: ServiceTimeline | null;
  whoFor: string[];
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedServiceSlugs: ServiceSlug[];
  relevantProjectSlugs: string[];
  icon: LucideIcon;
};

/**
 * Each service hero and its matching "how long" FAQ read from the same object,
 * so the two can never drift — change the figure here and both update.
 *
 * TODO(Colin): these are starting points, not measured delivery data. Confirm
 * each one before it goes live; you are the one who has to honour them.
 */
export const webDesignTimeline: ServiceTimeline = {
  lead: "Most sites take",
  value: "6 – 10 weeks",
  note: "calendar time from kickoff to launch, including your review rounds",
};

export const searchVisibilityTimeline: ServiceTimeline = {
  lead: "The first pass takes",
  value: "3 – 4 weeks",
  note: "visibility keeps building in the months after, so this is a starting point rather than an end date",
};

export const analyticsTimeline: ServiceTimeline = {
  lead: "Setup takes about",
  value: "2 – 3 weeks",
  note: "then roughly a month of traffic before the first report tells you anything useful",
};

/**
 * Widest variance of the five, and the one with the least delivered evidence
 * behind it — a single integration is nothing like an internal tool. Swap to
 * `null` if you would rather say nothing until a client build is done.
 */
export const systemsTimeline: ServiceTimeline = {
  lead: "Most builds run",
  value: "8 – 14 weeks",
  note: "scope is set during discovery, and a single integration lands far sooner than a full internal tool",
};

/** Support is a retainer, so the honest commitment is response time. */
export const supportTimeline: ServiceTimeline = {
  lead: "Most requests turn around in",
  value: "1–3 business days",
  note: "larger changes get scheduled with a date up front, and urgent breakage jumps the queue",
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "web-design-development",
    title: "Web Design & Development",
    shortTitle: "Web Design",
    href: "/services/web-design-development",
    eyebrow: "Websites",
    description:
      "Clean, responsive websites that explain the business clearly and make the next step easy to take.",
    timeline: webDesignTimeline,
    whoFor: [
      "Businesses that need a sharper first impression.",
      "Founders replacing an outdated site or launching something new.",
      "Teams that need clearer messaging and a cleaner page structure.",
    ],
    sections: [
      {
        title: "New websites",
        body: "A focused site structure, visual direction, responsive build, and launch-ready pages.",
      },
      {
        title: "Website redesigns",
        body: "A cleaner version of what already exists, with stronger hierarchy, flow, and calls to action.",
      },
      {
        title: "Landing pages",
        body: "Focused pages for one offer, campaign, product, or service.",
      },
      {
        title: "Performance and usability",
        body: "Practical improvements so the site is easier to use across devices.",
      },
      {
        title: "Website migrations",
        body: "Support moving content, structure, or builds into a cleaner long-term setup.",
      },
    ],
    faqs: [
      {
        question: "How much does a business website cost?",
        answer:
          "It depends on scope: pages, content, design depth, and any integrations. After a short discovery call, I can give you a clear range based on what the site actually needs to do.",
      },
      {
        question: "How long does a website project usually take?",
        answer: `Most small-business sites run ${webDesignTimeline.value} — ${webDesignTimeline.note}. What moves the number: how many pages there are, how ready your content is, how quickly feedback comes back, and whether the site needs integrations. Redesigns and custom features sit at the longer end.`,
      },
      {
        question: "Can CK Works redesign my existing website?",
        answer:
          "Yes. I can keep what still works, clean up the structure and messaging, and rebuild the experience so it looks sharper and converts more clearly.",
      },
      {
        question: "What will you need from me during the project?",
        answer:
          "Typically: goals, who you serve, brand assets if you have them, examples you like, and content inputs or access to what already exists. I guide the process so you always know what is needed next.",
      },
      {
        question: "Will I be able to update the website after launch?",
        answer:
          "Yes. I can set it up so you can handle common updates yourself, or keep CK Works involved for ongoing changes, depending on how hands-on you want to be.",
      },
    ],
    relatedServiceSlugs: [
      "search-ai-visibility",
      "analytics-lead-tracking",
      "ongoing-support",
    ],
    relevantProjectSlugs: ["tizirsso", "taylor", "centi"],
    icon: MonitorSmartphone,
  },
  {
    slug: "search-ai-visibility",
    title: "SEO & AI Search Visibility",
    shortTitle: "SEO & AI Visibility",
    href: "/services/search-ai-visibility",
    eyebrow: "Visibility",
    description:
      "Technical SEO, local search structure, indexing, and clearer content signals so customers and answer engines can understand the site.",
    timeline: searchVisibilityTimeline,
    whoFor: [
      "Businesses that want to be easier to find online.",
      "Sites that need stronger service pages and clearer page meaning.",
      "Owners who want search improvements explained without jargon.",
    ],
    sections: [
      {
        title: "Technical SEO",
        body: "A practical check of crawlability, metadata, internal links, page structure, and technical blockers.",
      },
      {
        title: "Local search visibility",
        body: "Foundational improvements for businesses that serve a city, region, or local audience.",
      },
      {
        title: "Google and Bing indexing",
        body: "Setup and checks so search engines can discover the right pages.",
      },
      {
        title: "Structured data and schema",
        body: "Page data that matches the visible content and helps search systems understand the site.",
      },
      {
        title: "AI discovery",
        body: "Clear pages, headings, and answers that make the business easier to interpret in modern search experiences.",
      },
    ],
    faqs: [
      {
        question: "What do SEO, AEO, and GEO mean here?",
        answer:
          "For clients, the goal is simple: make the site easier for search engines and answer tools to understand.",
      },
      {
        question: "Is this a guarantee of rankings?",
        answer:
          "No. This is foundational visibility work: structure, clarity, indexing, measurement, and useful content direction.",
      },
    ],
    relatedServiceSlugs: [
      "web-design-development",
      "analytics-lead-tracking",
      "ongoing-support",
    ],
    relevantProjectSlugs: ["tizirsso", "ck-dev"],
    icon: Search,
  },
  {
    slug: "analytics-lead-tracking",
    title: "Analytics & Lead Tracking",
    shortTitle: "Analytics",
    href: "/services/analytics-lead-tracking",
    eyebrow: "Measurement",
    description:
      "A clean measurement setup for traffic, events, forms, CTAs, and lead sources without turning reporting into a maze.",
    timeline: analyticsTimeline,
    whoFor: [
      "Businesses that want to know what is working on the site.",
      "Teams setting up GA4, Search Console, or event tracking for the first time.",
      "Owners who want simple reporting tied to real next steps.",
    ],
    sections: [
      {
        title: "GA4 and website events",
        body: "Track meaningful actions like form starts, submissions, email clicks, service views, and project views.",
      },
      {
        title: "Traffic-source attribution",
        body: "Prepare landing page, referrer, and UTM fields so leads can be understood later.",
      },
      {
        title: "Search visibility measurement",
        body: "Connect the pieces needed to see search impressions, clicks, and query patterns.",
      },
      {
        title: "Conversion tracking",
        body: "Make form and CTA actions measurable without collecting unnecessary personal details.",
      },
      {
        title: "Simplified reporting",
        body: "A future-ready reporting layer focused on what changed and what to do next.",
      },
    ],
    faqs: [
      {
        question: "Do I need analytics if traffic is low?",
        answer:
          "Yes. A clean baseline makes the business easier to learn from as it starts getting attention.",
      },
      {
        question: "Will you build a dashboard here?",
        answer:
          "This page leaves room for that later, but the first step is clean tracking and useful events.",
      },
    ],
    relatedServiceSlugs: [
      "search-ai-visibility",
      "digital-systems-integrations",
      "ongoing-support",
    ],
    relevantProjectSlugs: ["centi", "sentiment-trader", "internal-automation-tool"],
    icon: BarChart3,
  },
  {
    slug: "digital-systems-integrations",
    title: "Digital Systems & Integrations",
    shortTitle: "Systems",
    href: "/services/digital-systems-integrations",
    eyebrow: "Systems",
    description:
      "Dashboards, admin tools, backend workflows, and integrations that organize the parts behind the scenes.",
    timeline: systemsTimeline,
    whoFor: [
      "Businesses outgrowing spreadsheets, manual updates, or scattered tools.",
      "Teams that need forms, data, notifications, and accounts to work together.",
      "Owners who want practical systems without unnecessary complexity.",
    ],
    sections: [
      {
        title: "Internal dashboards",
        body: "Simple views for tracking the information a business actually uses.",
      },
      {
        title: "Forms and databases",
        body: "Capture information cleanly and route it where it needs to go.",
      },
      {
        title: "APIs and integrations",
        body: "Connect tools, accounts, notifications, payments, or booking flows where needed.",
      },
      {
        title: "Lightweight backend systems",
        body: "Practical server-side pieces for the workflows that need more than a static website.",
      },
      {
        title: "Automation opportunities",
        body: "Identify repeated steps that can be simplified without making the business harder to manage.",
      },
    ],
    faqs: [
      {
        question: "Is this only for big systems?",
        answer:
          "No. The best system may be a small admin view, one clean workflow, or one reliable integration.",
      },
      {
        question: "Can this connect to an existing site?",
        answer:
          "Often, yes. The first step is understanding the current tools and where information gets stuck.",
      },
    ],
    relatedServiceSlugs: [
      "analytics-lead-tracking",
      "web-design-development",
      "ongoing-support",
    ],
    relevantProjectSlugs: ["centi", "taylor", "internal-automation-tool"],
    icon: Workflow,
  },
  {
    slug: "ongoing-support",
    title: "Ongoing Support",
    shortTitle: "Support",
    href: "/services/ongoing-support",
    eyebrow: "Care",
    description:
      "Updates, fixes, technical cleanup, and continued improvements after the site or system is live.",
    timeline: supportTimeline,
    whoFor: [
      "Businesses that want their site to stay current after launch.",
      "Owners who need small changes, bug fixes, or performance checks.",
      "Teams that want steady improvements instead of one big rebuild every few years.",
    ],
    sections: [
      {
        title: "Website maintenance",
        body: "Small updates, technical checks, and cleanup so the site stays healthy.",
      },
      {
        title: "Content updates",
        body: "Help making simple changes as the business evolves.",
      },
      {
        title: "Technical fixes",
        body: "Bug fixes, broken states, layout issues, and practical improvements.",
      },
      {
        title: "Analytics reviews",
        body: "Periodic checks of traffic, events, visibility, and conversion signals.",
      },
      {
        title: "Support plan placeholder",
        body: "This area can later become a clearer support plan section once the offer is finalized.",
      },
    ],
    faqs: [
      {
        question: "Do you support projects you did not build?",
        answer:
          "Sometimes. It depends on the stack, access, and how much cleanup is needed first.",
      },
      {
        question: "Can support include new features?",
        answer:
          "Yes, if the scope is clear. Bigger feature work may be treated as a new project phase.",
      },
    ],
    relatedServiceSlugs: [
      "web-design-development",
      "analytics-lead-tracking",
      "digital-systems-integrations",
    ],
    relevantProjectSlugs: ["tizirsso", "centi", "taylor"],
    icon: LifeBuoy,
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((service) => service.slug === slug);
}
