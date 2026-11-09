"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { consentStore } from "@/lib/analytics/consent-store";
import { analyticsProvider, track, type TrackedEvent } from "@/lib/analytics/events";

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
    if (pathname.startsWith("/oplossingen/")) track("solution_page_visited", { solution: pathname.split("/")[2] ?? "" });
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
          aria-label="Cookievoorkeuren"
          className="fixed inset-x-3 bottom-3 z-50 max-w-[34rem] rounded-[5px] border border-line bg-mist p-5 shadow-[0_24px_48px_-24px_rgba(24,33,47,0.5)] sm:left-6 sm:bottom-6"
        >
          <p className="font-semibold text-paper">Mogen we meten hoe de site gebruikt wordt?</p>
          <p className="mt-2 text-sm text-muted">
            We gebruiken analytische cookies alleen met je toestemming, om te zien welke pagina&apos;s bezoekers helpen. Meer in de{" "}
            <Link href="/cookies" className="link">
              cookieverklaring
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => decide("granted")} className="min-h-11 rounded-[5px] bg-yellow px-4 text-sm font-semibold text-ink hover:bg-[#ffd65a]">
              Toestaan
            </button>
            <button type="button" onClick={() => decide("denied")} className="min-h-11 rounded-[5px] px-4 text-sm font-semibold text-paper ring-1 ring-inset ring-paper/25 hover:ring-paper">
              Weigeren
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
