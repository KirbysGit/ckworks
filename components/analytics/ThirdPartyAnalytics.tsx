"use client";

/**
 * Starts core analytics after engagement or a short fallback, then exposes a
 * later GTM event for lower-priority session recording.
 */

import { useEffect } from "react";
import { gtmId } from "@/lib/analytics";

const gtmFallbackDelayMs = 5_000;
const clarityDelayMs = 10_000;
const clarityReadyEvent = "ck_clarity_ready";
const interactionEvents = ["pointerdown", "keydown", "scroll"] as const;

export default function ThirdPartyAnalytics() {
  useEffect(() => {
    let gtmStarted = Boolean(document.getElementById("google-tag-manager"));
    // prefer-const sees one assignment and suggests const, but `startGtm`
    // above closes over this to clear the timeout, so the declaration has to
    // precede the assignment on line 58.
    // eslint-disable-next-line prefer-const
    let gtmTimer: number | undefined;

    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, startGtm);
      });
    };

    const startGtm = () => {
      if (gtmStarted || document.getElementById("google-tag-manager")) {
        gtmStarted = true;
        removeInteractionListeners();
        return;
      }

      gtmStarted = true;
      removeInteractionListeners();
      if (gtmTimer !== undefined) window.clearTimeout(gtmTimer);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": Date.now(),
        event: "gtm.js",
      });

      const script = document.createElement("script");
      script.id = "google-tag-manager";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startGtm, {
        once: true,
        passive: true,
      });
    });

    gtmTimer = window.setTimeout(startGtm, gtmFallbackDelayMs);

    const clarityTimer = window.setTimeout(() => {
      window.dataLayer = window.dataLayer || [];

      const clarityAlreadyQueued = window.dataLayer.some(
        (entry) => entry.event === clarityReadyEvent,
      );

      if (!clarityAlreadyQueued) {
        window.dataLayer.push({ event: clarityReadyEvent });
      }
    }, clarityDelayMs);

    return () => {
      removeInteractionListeners();
      if (gtmTimer !== undefined) window.clearTimeout(gtmTimer);
      window.clearTimeout(clarityTimer);
    };
  }, []);

  return null;
}
