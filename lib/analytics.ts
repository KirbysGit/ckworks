export const gtmId = "GTM-MD9GZV33";

type AnalyticsEventName =
  | "contact_form_started"
  | "contact_form_submitted"
  | "email_clicked"
  | "service_viewed"
  | "case_study_viewed"
  | "project_inquiry_opened";

type AnalyticsPayloadValue = string | number | boolean | null;
type AnalyticsPayload = Record<
  string,
  AnalyticsPayloadValue | undefined
>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") return;

  const cleanedPayload: Record<string, AnalyticsPayloadValue> = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) cleanedPayload[key] = value;
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...cleanedPayload,
  });
}
