/**
 * Case-study content model.
 *
 * Every project page is generated from this file — edit copy here, never in
 * the components. Empty arrays are fine: sections with no content are simply
 * not rendered (e.g. "Technical decisions" on a pure brand project).
 *
 * NOTE: Taylor.io copy is final-ish (Colin's draft). The other projects have
 * DRAFT copy written to match the voice — review and rewrite as needed.
 */

export type Group = "client" | "product" | "prototype";

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  group: Group;
  featured: boolean;
  /** One-liner under the name on the project page hero. */
  oneLiner: string;
  /** Single sentence on homepage/index cards explaining the problem. */
  teaser: string;
  /** Short chips shown as "What I worked on". */
  workedOn: string[];
  role: string;
  stack: string[];
  status: string;
  /** Placeholder gradient until real screenshots exist. */
  accent: string;
  hidden?: boolean;
  shortVersion: string[];
  problem: string[];
  built: string[];
  designDecisions: string[];
  technicalDecisions: string[];
  challenges: string[];
  outcome: string[];
  improveNext: string[];
};

export const groups: { id: Group; title: string; blurb: string }[] = [
  {
    id: "client",
    title: "Client & Brand Work",
    blurb: "Work with real people, real budgets, and real business goals.",
  },
  {
    id: "product",
    title: "Product & Systems Work",
    blurb: "Actual software and workflows, built end to end.",
  },
  {
    id: "prototype",
    title: "Technical Prototypes",
    blurb: "From idea to working demo.",
  },
];

const allCaseStudies: CaseStudy[] = [
  {
    slug: "halo-reserve",
    name: "Halo Reserve",
    category: "Brand Identity / Wellness Direction",
    group: "client",
    featured: true,
    hidden: true,
    oneLiner:
      "A premium wellness brand direction built around calm, routine, recovery, and trust.",
    teaser:
      "A premium wellness identity built around calm, recovery, and trust.",
    workedOn: ["Brand Identity", "Art Direction", "Visual System", "Content Direction"],
    role: "Brand Design, Art Direction",
    stack: ["Figma", "Illustrator"],
    status: "Client Work",
    accent: "from-[#3a4d3f] to-[#6d7d5f]",
    shortVersion: [
      "Halo Reserve needed an identity that felt premium and calm without falling into the generic wellness-brand look that's everywhere right now.",
      "I built a brand direction around a few simple ideas — calm, routine, recovery, trust — and turned those into a visual system the brand could actually use: type, color, imagery direction, and the tone for how it talks.",
    ],
    problem: [
      "The wellness space is crowded, and most of it looks the same: soft gradients, thin sans-serifs, stock photos of people meditating on cliffs. Blending in was the real risk.",
      "The brand needed to feel premium and trustworthy — the kind of thing you'd build a daily routine around — without looking like a template.",
    ],
    built: [
      "logo and wordmark direction",
      "color and typography system",
      "imagery and art direction guidelines",
      "voice and content direction",
      "brand guidelines document",
    ],
    designDecisions: [
      "The biggest decision was restraint. Instead of piling on wellness clichés, the identity leans on warm neutrals, generous space, and one confident accent — so the calm comes from the design itself, not from pictures of candles.",
      "Everything in the system maps back to the four brand ideas: calm, routine, recovery, trust. If an element didn't serve one of those, it didn't make it in.",
    ],
    technicalDecisions: [],
    challenges: [
      "The challenge was making the brand feel premium and calm without making it look generic or overly spa-template. That line is thinner than it sounds — most \"calm\" design reads as empty, and most \"premium\" design reads as cold.",
    ],
    outcome: [
      "The result was a brand direction that gives Halo Reserve a clear, consistent way to show up — easier to understand, easier to trust, and easier to build on as the brand grows.",
    ],
    improveNext: [
      "The next step would be extending the system into packaging and digital product surfaces, and pressure-testing the identity against real campaign content.",
    ],
  },
  {
    slug: "tizirsso",
    name: "Tizirsso Racing",
    category: "Website Design & Development",
    group: "client",
    featured: true,
    oneLiner:
      "A motorsport portfolio and sponsorship site built to make the driver's story easier to understand and share.",
    teaser:
      "A motorsport portfolio and sponsorship site built to make the driver's story easier to understand and share.",
    workedOn: ["Web Design", "Development", "Content Structure", "Sponsorship Page"],
    role: "Design, Development, Content Structure",
    stack: ["Next.js", "Tailwind CSS"],
    status: "Client Work",
    accent: "from-[#2F5B3F] to-[#4f7a58]",
    shortVersion: [
      "Tizirsso Racing had a stronger real-world presence than their digital presence showed. Years of racing history, results, and photos — but no single place that told the story well.",
      "I designed and built a site that organizes all of it: who the driver is, what they've achieved, and why a sponsor should want their logo on the car.",
    ],
    problem: [
      "The business had a stronger real-world presence than their digital presence showed. The goal was to create a site that explained the brand clearly, felt credible, and gave potential sponsors a better reason to reach out.",
      "The raw material was all there — history, achievements, media — but without structure it read as a pile of facts instead of a story.",
    ],
    built: [
      "full site design and build",
      "racing history and achievements structure",
      "media gallery",
      "sponsor-facing partnership page",
      "contact and inquiry flow",
    ],
    designDecisions: [
      "The design leads with the story, not the stats. Results and achievements support the narrative instead of replacing it — a sponsor should understand who this driver is within one scroll.",
      "Photography does the heavy lifting, so the layout stays quiet: strong hierarchy, lots of space, and type that doesn't compete with the cars.",
    ],
    technicalDecisions: [
      "Built as a static Next.js site for speed and simple hosting, with the content structured so results and media can be updated without touching layout code.",
    ],
    challenges: [
      "The main challenge was organizing a lot of racing history, images, achievements, and sponsor-facing information without making the site feel cluttered.",
    ],
    outcome: [
      "The result was a cleaner digital presence that made the brand easier to understand, easier to trust, and easier to share with potential sponsors and partners.",
    ],
    improveNext: [
      "Next up would be a lightweight CMS for race results and a news section, so the site stays current through a season without developer help.",
    ],
  },
  {
    slug: "taylor",
    name: "Taylor.io",
    category: "AI Product / Full-Stack System",
    group: "product",
    featured: true,
    oneLiner:
      "An AI-powered resume platform built to turn messy career documents into structured, editable profile data.",
    teaser:
      "A guided resume workflow that turns messy documents into structured, editable career data.",
    workedOn: ["Product UX", "AI Parsing", "Resume Editor", "Export System"],
    role: "Product Design, Full-Stack Development, AI Workflow Design",
    stack: ["React", "FastAPI", "PostgreSQL", "OpenAI API", "Tailwind"],
    status: "Personal Product / In Progress",
    accent: "from-[#43524a] to-[#7a8a72]",
    shortVersion: [
      "Taylor.io started from a simple frustration: applying to jobs felt messy, repetitive, and weirdly hard to manage.",
      "I wanted to build a tool that could take someone's existing resume, parse it into clean structured data, and help them tailor it for specific roles without starting from scratch every time.",
      "The project became a full-stack resume workflow with parsing, editing, previewing, and export logic built around a guided user experience.",
    ],
    problem: [
      "Most resume tools either feel too rigid or too generic. They let you fill in sections, but they do not really help you understand how your experience should shift depending on the role.",
      "The harder part was not just generating text. It was turning messy resume files into structured profile data that could be edited, reused, and exported cleanly.",
    ],
    built: [
      "resume upload and parsing",
      "structured profile editing",
      "job-description-aware tailoring",
      "live preview flow",
      "PDF/DOCX export logic",
      "authentication and saved user data",
    ],
    designDecisions: [
      "The biggest design choice was to make the app feel guided instead of blank.",
      "I did not want users staring at an empty editor wondering what to change. The interface needed to show them what was already there, what could be improved, and how their resume changed based on the job they were targeting.",
      "That led to a layout focused on structured sections, live preview, and small editing decisions instead of one giant text box.",
    ],
    technicalDecisions: [
      "The backend was built around structured data instead of treating the resume as one big document. That made the system easier to edit, preview, and eventually export.",
      "I used FastAPI for the API layer, PostgreSQL for storing profile data, and React for the editing experience. The AI layer was used for extraction and drafting, but the important part was keeping the output structured enough that users could actually control it.",
    ],
    challenges: [
      "The hardest part was balancing automation with control.",
      "If the AI changed too much, the user could lose trust. If it changed too little, the tool was not useful. So the product had to guide the user without making the whole process feel like a black box.",
    ],
    outcome: [
      "Taylor.io became a working product that helped me explore AI-assisted document workflows, structured editing, and export systems. More importantly, it gave me a clear example of how I think about software: not just as features, but as a guided system that helps people make better decisions.",
    ],
    improveNext: [
      "The next version would focus more on onboarding, clearer version history, and a stronger way to compare tailored resumes side by side.",
      "I'd also like to improve how the system explains its suggestions, so users understand why something changed instead of just accepting generated text.",
    ],
  },
  {
    slug: "centi",
    name: "Centi",
    category: "Finance Dashboard / API Integration",
    group: "product",
    featured: true,
    oneLiner:
      "A personal finance dashboard that connects account data and turns transactions into clearer insights.",
    teaser:
      "A personal finance dashboard that connects account data and turns transactions into clearer insights.",
    workedOn: ["Dashboard UX", "API Integration", "Data Modeling", "Insights"],
    role: "Design, Full-Stack Development",
    stack: ["React", "FastAPI", "PostgreSQL", "Tailwind"],
    status: "Personal Product",
    accent: "from-[#2F5B3F] to-[#6d7d5f]",
    shortVersion: [
      "Centi came out of wanting one honest picture of my money instead of five apps that each showed a slice of it.",
      "I built a dashboard that pulls account data together, cleans up the transactions, and turns them into something you can actually read: where money goes, how it trends, and what changed this month.",
    ],
    problem: [
      "Raw transaction data is technically information, but it isn't insight. It's inconsistent, badly labeled, and spread across accounts that don't talk to each other.",
      "The goal was less \"another budgeting app\" and more a clear reporting layer: connect the data once, then let the dashboard do the explaining.",
    ],
    built: [
      "account and transaction data integration",
      "categorization and cleanup pipeline",
      "spending and trends dashboard",
      "monthly summaries and comparisons",
      "API layer for the frontend",
    ],
    designDecisions: [
      "Dashboards die from density. Centi shows a few numbers that matter up front, and keeps the deep detail one click away instead of one glance away.",
      "Every chart answers a question in plain words — \"what changed this month?\" — instead of assuming the user wants to read graphs for fun.",
    ],
    technicalDecisions: [
      "The core of the system is the data model, not the charts. Transactions are normalized into a consistent structure first, which keeps categorization, summaries, and the API layer simple.",
      "FastAPI serves the data, PostgreSQL stores it, and React renders the dashboard. Most of the real work happens in the cleanup pipeline before anything hits the screen.",
    ],
    challenges: [
      "The messy part was the data itself: the same merchant showing up five different ways, refunds, transfers pretending to be spending. Getting categorization trustworthy took more iterations than any UI decision.",
    ],
    outcome: [
      "Centi became a working dashboard and a strong example of the systems side of what I do: API integration, data modeling, and turning messy inputs into reporting people can trust.",
    ],
    improveNext: [
      "Next would be smarter categorization that learns from corrections, and simple forecasting — showing where the month is heading, not just where it ended.",
    ],
  },
  {
    slug: "setlst",
    name: "Setlst",
    category: "Music Product / Event Workflow",
    group: "product",
    featured: true,
    oneLiner:
      "A music-focused product concept for organizing setlists, events, and the details performers need before showtime.",
    teaser:
      "A music workflow for organizing setlists, events, and show details in one place.",
    workedOn: ["Product UX", "Workflow Design", "Dashboard Design", "Prototype"],
    role: "Product Design, Development, Systems Thinking",
    stack: ["React", "Tailwind CSS"],
    status: "Personal Product / In Progress",
    accent: "from-[#3f4f46] to-[#9a7f53]",
    shortVersion: [
      "Setlst came from noticing how much live performance planning still happens across notes apps, screenshots, text threads, and memory.",
      "The idea is a cleaner home for the practical details around a set: what songs are being played, where the event is, what needs to be ready, and what changed since the last show.",
    ],
    problem: [
      "Performers and small teams often have the information they need, but it is scattered across too many places.",
      "The goal was to make the workflow feel lightweight enough to use before a show, while still structured enough that important details do not get lost.",
    ],
    built: [
      "setlist organization flow",
      "event and show detail structure",
      "dashboard concept for upcoming performances",
      "song and note management patterns",
      "early product interface direction",
    ],
    designDecisions: [
      "The interface needed to feel fast and calm. A music tool like this cannot feel like admin software first; it has to respect that the user is trying to get ready to perform.",
      "I focused the concept around the next show, then let deeper song and planning details sit one level below that.",
    ],
    technicalDecisions: [
      "The project is structured as a product prototype first, with the data model shaped around shows, songs, notes, and reusable setlist details.",
    ],
    challenges: [
      "The main challenge is keeping the product simple. It is easy for a setlist app to become a full project-management tool, but the useful version needs to stay close to the moment of performance.",
    ],
    outcome: [
      "Setlst is a strong example of how I think about workflow products: take a messy real-world process, identify the repeated decisions, and give them a calmer interface.",
    ],
    improveNext: [
      "The next step would be tightening the core show-planning flow and adding real screenshots once the prototype is more visually complete.",
    ],
  },
  {
    slug: "internal-automation-tool",
    name: "Internal Automation Tool",
    category: "Systems / Internal Tooling",
    group: "product",
    featured: false,
    oneLiner:
      "An internal dashboard and automation layer that replaced manual, repetitive ops work.",
    teaser:
      "Internal dashboards and automations that replaced repetitive manual ops work.",
    workedOn: ["Automation", "Dashboards", "Reporting", "Ops Workflows"],
    role: "Design, Development, Systems",
    stack: ["Python", "SQL", "Internal APIs"],
    status: "Professional Work (generalized)",
    accent: "from-[#43524a] to-[#5F665F]",
    shortVersion: [
      "This is a generalized write-up of internal tooling work: taking a process that lived in spreadsheets and copy-paste, and turning it into a dashboard with automations behind it.",
      "The interesting part wasn't the code — it was mapping how the work actually happened, then removing the steps nobody needed to be doing by hand.",
    ],
    problem: [
      "Manual processes don't fail loudly. They just quietly eat hours every week and produce small errors that someone has to catch later.",
      "The goal was to make the process visible in one place, automate the repetitive parts, and keep humans on the judgment calls.",
    ],
    built: [
      "internal dashboard for process visibility",
      "automated data collection and syncing",
      "reporting and status tracking",
      "alerting on the cases that needed a human",
    ],
    designDecisions: [
      "Internal tools get skipped if they're slower than the old way, so the bar was: faster than the spreadsheet on day one, or it fails.",
    ],
    technicalDecisions: [
      "Automation handled the collection and syncing; the dashboard focused on making state obvious. The system was designed so a failure meant falling back to the manual process, never silent bad data.",
    ],
    challenges: [
      "The hard part was trust. People keep using spreadsheets they trust over tools they don't — the rollout mattered as much as the build.",
    ],
    outcome: [
      "Hours of weekly manual work went away, errors dropped, and the process became something a new person could understand by looking at one screen.",
    ],
    improveNext: [
      "More of the alerting could become self-serve configuration, so process owners can tune it without a developer.",
    ],
  },
  {
    slug: "securescape",
    name: "SecureScape",
    category: "Hardware/Software Prototype",
    group: "prototype",
    featured: false,
    oneLiner:
      "A hardware and software security prototype, taken from idea to working demo.",
    teaser:
      "A hardware/software security prototype taken from idea to working demo.",
    workedOn: ["Prototyping", "Hardware + Software", "Demo Build"],
    role: "Prototyping, Development",
    stack: ["Hardware", "Python"],
    status: "Prototype",
    accent: "from-[#111714] to-[#43524a]",
    shortVersion: [
      "SecureScape was a from-scratch prototype: an idea about physical security, turned into hardware and software that actually worked together in a live demo.",
    ],
    problem: [
      "Prototypes answer one question: can this idea survive contact with reality? The goal wasn't polish — it was a working end-to-end demo.",
    ],
    built: [
      "hardware prototype",
      "software control layer",
      "working end-to-end demo",
    ],
    designDecisions: [
      "Scope discipline was the whole game: one core flow, working reliably, demoed live — everything else cut.",
    ],
    technicalDecisions: [],
    challenges: [
      "Hardware fails differently than software. Half the effort went into making the demo resilient to the physical world.",
    ],
    outcome: [
      "A working demo, and proof of the thing prototypes are for: I can take an idea from nothing to something you can hold and try.",
    ],
    improveNext: [],
  },
];

export const caseStudies = allCaseStudies.filter((c) => !c.hidden);
export const featuredCaseStudies = caseStudies.filter((c) => c.featured);
export const secondaryCaseStudies = caseStudies.filter((c) => !c.featured);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
