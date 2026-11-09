/**
 * Runtime configuration read from environment variables.
 * Only NEXT_PUBLIC_* values may be used in client components.
 */
export const siteConfig = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://yellowblocks.nl").replace(/\/$/, ""),
  locale: "nl-NL",
  language: "nl",
  /** Show "ter goedkeuring" markers on facts that still need business approval. */
  showReviewMarkers:
    process.env.NEXT_PUBLIC_SHOW_REVIEW_MARKERS === "1" ||
    (process.env.NEXT_PUBLIC_SHOW_REVIEW_MARKERS !== "0" && process.env.NODE_ENV !== "production"),
  schedulingUrl: process.env.NEXT_PUBLIC_SCHEDULING_URL || null,
  sampleReportUrl: process.env.NEXT_PUBLIC_SAMPLE_REPORT_URL || null,
} as const;

export const absoluteUrl = (path = "/") => `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
