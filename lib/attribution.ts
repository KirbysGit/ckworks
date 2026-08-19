/**
 * Where an inquiry came from, read off the browser at submit time.
 *
 * Both inquiry surfaces must send this. The modal used to send only `source`
 * and `sourcePage`, so every lead from the higher-intent surface arrived with
 * "UTM source: Not provided" and could not be attributed at all. Keeping the
 * shape in one place is what stops that from drifting apart again.
 *
 * Answer-engine referrals are worth watching here: ChatGPT appends
 * `utm_source=chatgpt.com`, so those arrive as an ordinary UTM source with no
 * special handling needed.
 */
export type InquiryAttribution = {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

const empty: InquiryAttribution = {
  landingPage: "",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
};

/** Safe during SSR — returns empty strings rather than throwing on `window`. */
export function readAttribution(): InquiryAttribution {
  if (typeof window === "undefined") return empty;

  const params = new URLSearchParams(window.location.search);
  return {
    landingPage: window.location.pathname,
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}
