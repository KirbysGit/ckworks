import {
  LayoutTemplate,
  Workflow,
  Plug,
  LifeBuoy,
  Sparkles,
  Settings2,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

// "/#anchor" form so links work from project pages, not just the homepage.
export const nav = [
  { label: "Home", href: "/#home" },
  { label: "What I Do", href: "/#what-i-do" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

export type TrustChip = {
  icon: LucideIcon;
  label: string;
};

export const trustChips: TrustChip[] = [
  { icon: Sparkles, label: "Clean design" },
  { icon: Settings2, label: "Practical systems" },
  { icon: MessageCircle, label: "Ongoing support" },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  tags?: string[];
  visual?: "website" | "systems" | "integrations" | "support";
  featured?: boolean;
};

export const services: Service[] = [
  {
    icon: LayoutTemplate,
    title: "Web Design",
    body: "Custom websites that look clean, work everywhere, and convert visitors.",
    tags: ["Custom Design", "Responsive", "SEO"],
    visual: "website",
  },
  {
    icon: Workflow,
    title: "Digital Systems",
    body: "Forms, dashboards, and workflows that save time and reduce errors.",
    tags: ["Dashboards", "Automation", "Workflows"],
    visual: "systems",
    featured: true,
  },
  {
    icon: Plug,
    title: "Integrations",
    body: "Connect the tools you use so data flows where it should without the manual work.",
    tags: ["APIs", "Zapier", "Data Sync"],
    visual: "integrations",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    body: "Updates, tweaks, and technical support so your site and systems stay solid.",
    tags: ["Maintenance", "Updates", "Support"],
    visual: "support",
  },
];

export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "1",
    title: "Discover",
    body: "We start with a conversation about your goals, challenges, and what success looks like.",
  },
  {
    number: "2",
    title: "Plan",
    body: "I map the right solution - structure, systems, and tools that fit your business.",
  },
  {
    number: "3",
    title: "Design",
    body: "Clear layouts, smart content structure, and a visual direction that builds trust.",
  },
  {
    number: "4",
    title: "Build",
    body: "Clean code, reliable systems, and careful attention to detail.",
  },
  {
    number: "5",
    title: "Launch & Support",
    body: "We launch, test, and stay in your corner for what comes next.",
  },
];

export const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#what-i-do" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

export const contactEmail = "hello@ckworks.co";
