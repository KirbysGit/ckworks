import { serviceAreas } from "@/lib/services";

export const primaryNav = [
  { label: "Services", href: "/services", children: serviceAreas },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
];

export const footerGroups = [
  {
    title: "Services",
    links: serviceAreas.map((service) => ({
      label: service.title,
      href: service.href,
    })),
  },
  {
    title: "Studio",
    links: [
      { label: "Work", href: "/work" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
