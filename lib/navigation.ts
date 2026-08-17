import { serviceAreas } from "@/lib/services";

/**
 * Navigation is pages, the header button is an action. `Contact` belongs here
 * so someone who wants the full form can reach it without meeting a modal,
 * and so `/contact` is linked from the header of every page rather than only
 * the footer.
 */
export const primaryNav = [
  { label: "Services", href: "/services", children: serviceAreas },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
