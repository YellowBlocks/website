/**
 * Lean conversion events. Provider-agnostic: Analytics.tsx wires these to
 * Plausible or GA4 (after consent). Without a configured provider they are no-ops.
 */
export type TrackedEvent =
  | "assessment_cta_clicked"
  | "contact_cta_clicked"
  | "contact_form_started"
  | "contact_form_submitted"
  | "scheduling_link_clicked"
  | "sample_report_clicked"
  | "solution_page_visited";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const analyticsProvider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none") as "none" | "plausible" | "ga4";
export const CONSENT_COOKIE = "yb_consent";

export function track(event: TrackedEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    if (analyticsProvider === "plausible") window.plausible?.(event, { props });
    if (analyticsProvider === "ga4") window.gtag?.("event", event, props);
  } catch {
    // Analytics must never break the page.
  }
}

export function readConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return (match?.[1] as "granted" | "denied" | undefined) ?? null;
}

export function writeConsent(value: "granted" | "denied") {
  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
}
