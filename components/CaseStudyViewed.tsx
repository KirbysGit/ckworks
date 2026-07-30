"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type CaseStudyViewedProps = {
  name: string;
  slug: string;
};

export default function CaseStudyViewed({
  name,
  slug,
}: CaseStudyViewedProps) {
  useEffect(() => {
    trackEvent("case_study_viewed", {
      case_study: name,
      slug,
    });
  }, [name, slug]);

  return null;
}
