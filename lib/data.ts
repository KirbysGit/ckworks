import {
  LayoutTemplate,
  Workflow,
  Plug,
  LifeBuoy,
  MessageSquareText,
  Layers,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const nav = [
  { label: "Home", href: "#home" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export const trustChips = [
  "Built for trust",
  "Systems that scale",
  "Designed to perform",
  "Ongoing support",
];

export type Outcome = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const outcomes: Outcome[] = [
  {
    icon: MessageSquareText,
    title: "Clearer messaging",
    body: "Words and structure that quickly communicate what you do—and why it matters.",
  },
  {
    icon: Layers,
    title: "Stronger foundations",
    body: "Design and systems built to be consistent, reliable, and aligned with the quality of your work.",
  },
  {
    icon: Zap,
    title: "Smoother workflows",
    body: "Systems and automations that reduce busywork and keep everything moving.",
  },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const services: Service[] = [
  {
    icon: LayoutTemplate,
    title: "Web Design",
    body: "Custom websites that look clean, work everywhere, and convert visitors.",
  },
  {
    icon: Workflow,
    title: "Digital Systems",
    body: "Forms, dashboards, and workflows that save time and reduce errors.",
  },
  {
    icon: Plug,
    title: "Integrations",
    body: "Connect the tools you use so data flows where it should—without the manual work.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    body: "Updates, tweaks, and technical support so your site and systems stay solid.",
  },
];

export type Project = {
  title: string;
  tag: string;
  description: string;
  // Placeholder gradient used until real case-study imagery is ready.
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Ironwood Cabinetry",
    tag: "Custom website",
    description: "A refined portfolio site that lets the craftsmanship do the talking.",
    accent: "from-[#3a4d3f] to-[#6d7d5f]",
  },
  {
    title: "Northbridge Wellness",
    tag: "Website + intake system",
    description: "A calm patient experience backed by streamlined intake and scheduling.",
    accent: "from-[#2F5B3F] to-[#4f7a58]",
  },
  {
    title: "Ledger Lane",
    tag: "Website + workflow automation",
    description: "A modern presence with automations that cut hours of manual work.",
    accent: "from-[#43524a] to-[#7a8a72]",
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
    body: "I map the right solution—structure, systems, and tools that fit your business.",
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
  { label: "Work", href: "#work" },
  { label: "Services", href: "#what-i-do" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const contactEmail = "hello@ckworks.co";
