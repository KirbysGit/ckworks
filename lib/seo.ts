import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Override the shared social card. Case studies pass their cover image. */
  image?: { url: string; alt: string };
};

/** Matches the `size` export in `app/opengraph-image.tsx`. */
const socialCardSize = { width: 1200, height: 630 } as const;

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
  const socialImage = image
    ? { url: image.url, alt: image.alt }
    : {
        url: "/opengraph-image",
        alt: `${title} | ${siteName}`,
        ...socialCardSize,
      };

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      type,
      siteName,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [socialImage.url],
    },
  };
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * The single node id for the CK Works organization, declared once in
 * `app/layout.tsx` and referenced everywhere else.
 *
 * Page-level schema should link to the business with `organizationRef` rather
 * than describing it again. Three pages used to emit a second, id-less
 * "CK Works" node beside the canonical one, which leaves a search engine to
 * guess whether they are the same entity.
 */
export const organizationId = `${siteUrl}/#organization`;

/** Use as the value of `provider`, `creator`, `publisher`, and similar. */
export const organizationRef = { "@id": organizationId } as const;
