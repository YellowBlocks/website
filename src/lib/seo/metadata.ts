import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  ogImage?: string;
}

/** Builds unique, canonical metadata for every page. */
export function pageMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      // hreflang: add `languages: { en: absoluteUrl('/en' + path) }` only once English pages exist.
    },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: input.type ?? "website",
      url,
      title: input.title,
      description: input.description,
      siteName: "YellowBlocks",
      locale: "nl_NL",
      ...(input.ogImage ? { images: [{ url: input.ogImage, width: 1200, height: 630 }] } : {}),
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: input.authors }
        : {}),
    },
    twitter: { card: "summary_large_image", title: input.title, description: input.description },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "YellowBlocks – Stay in control", template: "%s | YellowBlocks" },
  description:
    "Onafhankelijke assessments voor Microsoft 365, Intune en Conditional Access. We onderzoeken niet alleen wat er is ingesteld, maar ook hoe configuraties, uitzonderingen en afhankelijkheden samenhangen.",
  applicationName: "YellowBlocks",
  formatDetection: { telephone: false },
};
