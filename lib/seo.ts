import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
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
