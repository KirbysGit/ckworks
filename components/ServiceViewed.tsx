"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ServiceViewed({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  useEffect(() => {
    trackEvent("service_viewed", {
      service: name,
      slug,
      surface: "service_page",
    });
  }, [name, slug]);

  return null;
}
