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

export type ServiceArea = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  href: string;
  eyebrow: string;
  description: string;
  whoFor: string[];
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedServiceSlugs: ServiceSlug[];
  relevantProjectSlugs: string[];
  icon: LucideIcon;
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
        question: "Can this be a small site?",
        answer:
          "Yes. A focused one-page or small multi-page site can be the right move when the offer is clear.",
      },
      {
        question: "Do you help with copy?",
        answer:
          "Yes. I help shape page structure, messaging hierarchy, and calls to action.",
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
    title: "Search & AI Visibility",
    shortTitle: "Search Visibility",
    href: "/services/search-ai-visibility",
    eyebrow: "Visibility",
    description:
      "Search-friendly structure, indexing basics, and clearer content signals so people and answer engines can understand the site.",
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
