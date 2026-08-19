import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects";
import { serviceAreas } from "@/lib/services";
import { siteUrl } from "@/lib/site";

/**
 * `lastmod` is an explicit date per route, not a build timestamp.
 *
 * It used to be `new Date()`, which told Google every page on the site changed
 * on every deploy — a signal that says nothing, and one Google learns to
 * discount. Deriving it from git at build time is not an option either: Vercel
 * clones shallowly, so `git log` on a file returns the deploy commit and we are
 * back to the same problem.
 *
 * So the dates live here. Seeded from each route's real last commit date.
 *
 * When you meaningfully change a page's content, bump its date. Cosmetic tweaks
 * do not count — this should track what a returning crawler would find new.
 */
const routeUpdated = {
  "": "2026-08-17",
  "/services": "2026-08-11",
  "/work": "2026-08-17",
  "/process": "2026-08-17",
  "/about": "2026-08-17",
  "/contact": "2026-08-17",
  "/privacy-policy": "2026-08-17",
  "/terms": "2026-08-17",
} as const;

/** Keyed by service slug. Bump when that service's page copy changes. */
const serviceUpdated: Record<string, string> = {
  "web-design-development": "2026-08-16",
  "search-ai-visibility": "2026-08-09",
  "analytics-lead-tracking": "2026-08-09",
  "digital-systems-integrations": "2026-08-11",
  "ongoing-support": "2026-08-11",
};

/** Case studies are all driven by `lib/projects.ts`, so they share its date. */
const caseStudyUpdated = "2026-07-18";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPageConfig = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.85, changeFrequency: "monthly" },
    { path: "/process", priority: 0.75, changeFrequency: "monthly" },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ] as const;

  const staticPages: MetadataRoute.Sitemap = staticPageConfig.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified: routeUpdated[path],
      changeFrequency,
      priority,
    }),
  );

  const serviceEntries: MetadataRoute.Sitemap = serviceAreas.map((service) => ({
    url: `${siteUrl}${service.href}`,
    lastModified: serviceUpdated[service.slug] ?? routeUpdated["/services"],
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${siteUrl}/${study.slug}`,
    lastModified: caseStudyUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...serviceEntries, ...projectEntries];
}
