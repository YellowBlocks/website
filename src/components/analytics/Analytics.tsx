"use client";

import Link from "@/components/ui/Link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { consentStore } from "@/lib/analytics/consent-store";
import { analyticsProvider, track, type TrackedEvent } from "@/lib/analytics/events";
import { parsePublicPath } from "@/lib/i18n/config";
import { useDictionary } from "@/lib/i18n/client";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_HOST = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? "https://plausible.io";
export const OPEN_CONSENT_EVENT = "yb:open-consent";

/**
 * - "plausible": cookieless, no personal data; loaded without a consent banner.
 * - "ga4": sets cookies, so it only loads after explicit consent.
 * - "none": nothing is loaded.
 */
export function Analytics() {
  const pathname = usePathname();
  const t = useDictionary().consent;
  const consent = useSyncExternalStore(consentStore.subscribe, consentStore.getSnapshot, consentStore.getServerSnapshot);
  const [reopened, setReopened] = useState(false);
  const bannerOpen = analyticsProvider === "ga4" && (consent === null || reopened);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // One delegated listener for every element with data-track.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      const name = el?.dataset.track as TrackedEvent | undefined;
      if (name) track(name, { path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const { path } = parsePublicPath(pathname);
    if (path.startsWith("/oplossingen/")) track("solution_page_visited", { solution: path.split("/")[2] ?? "" });
  }, [pathname]);

  const decide = (value: "granted" | "denied") => {
    const wasGranted = consent === "granted";
    consentStore.set(value);
    setReopened(false);
    // Unloading an already-running analytics script requires a fresh page.
    if (value === "denied" && wasGranted) window.location.reload();
  };

  return (
    <>
      {analyticsProvider === "plausible" && PLAUSIBLE_DOMAIN ? (
        <Script defer data-domain={PLAUSIBLE_DOMAIN} src={`${PLAUSIBLE_HOST}/js/script.tagged-events.js`} strategy="afterInteractive" />
      ) : null}

      {analyticsProvider === "ga4" && GA_ID && consent === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {bannerOpen ? (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t.label}
          className="fixed inset-x-3 bottom-3 z-50 max-w-[34rem] rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-[0_24px_48px_-24px_rgba(24,33,47,0.5)] sm:left-6 sm:bottom-6"
        >
          <p className="font-semibold text-paper">{t.title}</p>
          <p className="mt-2 text-sm text-muted">
            {t.body}{" "}
            <Link href="/cookies" className="link">
              {t.link}
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => decide("granted")} className="min-h-11 rounded-[var(--radius-block)] bg-yellow px-4 text-sm font-semibold text-ink hover:bg-[#ffd65a]">
              {t.accept}
            </button>
            <button type="button" onClick={() => decide("denied")} className="min-h-11 rounded-[var(--radius-block)] px-4 text-sm font-semibold text-paper ring-1 ring-inset ring-paper/25 hover:ring-paper">
              {t.decline}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
