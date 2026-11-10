import type { NextConfig } from "next";
import { routeSegmentsNlToEn } from "./src/lib/i18n/config";

/**
 * Content Security Policy.
 * Static pages cannot carry per-request nonces, so inline scripts that Next.js
 * emits for hydration are allowed with 'unsafe-inline'. Third-party origins are
 * only added when the matching integration is configured.
 */
const analyticsProvider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "none";
const plausibleHost = process.env.NEXT_PUBLIC_PLAUSIBLE_HOST ?? "https://plausible.io";
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const scriptSrc = ["'self'", "'unsafe-inline'"];
const connectSrc = ["'self'"];
const imgSrc = ["'self'", "data:", "blob:"];

if (analyticsProvider === "plausible") {
  scriptSrc.push(plausibleHost);
  connectSrc.push(plausibleHost);
}
if (analyticsProvider === "ga4") {
  scriptSrc.push("https://www.googletagmanager.com");
  connectSrc.push("https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com");
  imgSrc.push("https://*.google-analytics.com", "https://www.googletagmanager.com");
}
if (sanityProjectId) {
  imgSrc.push("https://cdn.sanity.io");
}
if (process.env.NODE_ENV !== "production") {
  scriptSrc.push("'unsafe-eval'");
}

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src ${imgSrc.join(" ")}`,
  "font-src 'self'",
  `connect-src ${connectSrc.join(" ")}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Classic static generation + tag-based revalidation keeps CMS caching predictable.
  cacheComponents: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  output: process.env.BUILD_STANDALONE === "1" ? "standalone" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: sanityProjectId ? [{ protocol: "https", hostname: "cdn.sanity.io" }] : [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // The previous yellowblocks.nl was a single holding page; no legacy URLs exist.
    // Add 301s here (permanent: true) when URLs change in the future.
    return [
      { source: "/over", destination: "/over-ons", permanent: true },
      { source: "/oplossingen/conditional-access-scan", destination: "/oplossingen/conditional-access-assessment", permanent: true },
      { source: "/oplossingen/microsoft-365-health-scan", destination: "/oplossingen/microsoft-365-health-check", permanent: true },
      { source: "/diensten", destination: "/oplossingen", permanent: true },
      { source: "/blog", destination: "/inzichten", permanent: true },
      { source: "/blog/:slug", destination: "/inzichten/:slug", permanent: true },
      { source: "/en/solutions/conditional-access-scan", destination: "/en/solutions/conditional-access-assessment", permanent: true },
      { source: "/en/solutions/microsoft-365-health-scan", destination: "/en/solutions/microsoft-365-health-check", permanent: true },
      // The internal locale prefix for Dutch is never public: /nl/... -> /...
      { source: "/nl", destination: "/", permanent: true },
      { source: "/nl/:path*", destination: "/:path*", permanent: true },
      // Dutch-only articles have no English page.
      { source: "/en/insights/:slug", destination: "/inzichten/:slug", permanent: false },
    ];
  },
  /*
   * Locale routing (see src/lib/i18n/config.ts). All pages live under app/[lang] with
   * Dutch folder names. These rewrites map public URLs onto them before the filesystem
   * is checked, so every page remains statically generated:
   *   /                      -> /nl
   *   /oplossingen/x         -> /nl/oplossingen/x
   *   /en/solutions/x        -> /en/oplossingen/x
   */
  async rewrites() {
    // Only top-level folders are rewritten; translated slugs (tenant-continuity) are
    // generated as English params by the page itself.
    const en = Object.entries(routeSegmentsNlToEn).flatMap(([nlSeg, enSeg]) => [
      { source: `/en/${enSeg}`, destination: `/en/${nlSeg}` },
      { source: `/en/${enSeg}/:rest*`, destination: `/en/${nlSeg}/:rest*` },
    ]);
    return {
      beforeFiles: [
        ...en,
        { source: "/", destination: "/nl" },
        {
          // Everything that is not English, internal, an API route or a static file.
          source: "/:path((?!en(?:/|$)|nl(?:/|$)|_next/|api/|brand/)(?!.*\\.).+)",
          destination: "/nl/:path",
        },
      ],
    };
  },
};

export default nextConfig;
