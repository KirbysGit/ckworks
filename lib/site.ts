/** Canonical production site config. Override locally with NEXT_PUBLIC_SITE_URL. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.ckworks.studio";

export const siteName = "CK Works";

export const siteTagline = "Websites. Systems. Clarity.";

export const siteDescription =
  "CK Works is a small digital studio in Orlando, Florida, led by Colin Kirby, working with businesses across the U.S. Web design, SEO, analytics, and practical systems built to fit the way you work.";
