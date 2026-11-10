"use client";

import { analyticsProvider } from "@/lib/analytics/events";

export function CookieSettingsButton({ label }: { label: string }) {
  if (analyticsProvider !== "ga4") return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("yb:open-consent"))} className="hover:text-paper">
      {label}
    </button>
  );
}
