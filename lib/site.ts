/** Canonical production site config. Override locally with NEXT_PUBLIC_SITE_URL. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ckworks.co";

export const siteName = "CK Works";

export const siteTagline = "Websites. Systems. Clarity.";

export const siteDescription =
  "CK Works is a small digital studio by Colin Kirby. Clean websites and practical systems for growing businesses—design, automations, and integrations built to fit the way you work.";
