import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { defaultLocale, localeMeta, localizePath, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/server";

interface PageMetaInput {
  title: string;
  description: string;
  /** Internal (Dutch) path, e.g. "/oplossingen/intune-assessment". */
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  ogImage?: string;
  /** Locales this page exists in. Default: all. Articles are Dutch only. */
  available?: readonly Locale[];
  lang?: Locale;
}

const stripAccent = (t: string) => t.replace(/\*/g, "");

/** Builds unique, canonical metadata with hreflang alternates for every page. */
export function pageMetadata(input: PageMetaInput): Metadata {
  const lang = input.lang ?? getLocale();
  const available = input.available ?? locales;
  const url = absoluteUrl(localizePath(input.path, lang));
  const languages: Record<string, string> = {};
  for (const l of available) languages[localeMeta[l].htmlLang] = absoluteUrl(localizePath(input.path, l));
  if (available.includes(defaultLocale)) languages["x-default"] = absoluteUrl(localizePath(input.path, defaultLocale));
  const title = stripAccent(input.title);
  return {
    title,
    description: input.description,
    alternates: { canonical: url, languages },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: input.type ?? "website",
      url,
      title,
      description: input.description,
      siteName: "YellowBlocks",
      locale: localeMeta[lang].ogLocale,
      alternateLocale: available.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
      ...(input.ogImage ? { images: [{ url: input.ogImage, width: 1200, height: 630 }] } : {}),
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: input.authors }
        : {}),
    },
    twitter: { card: "summary_large_image", title, description: input.description },
  };
}

export function defaultMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang).seo;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.defaultTitle, template: "%s | YellowBlocks" },
    description: t.defaultDescription,
    applicationName: "YellowBlocks",
    formatDetection: { telephone: false },
  };
}
