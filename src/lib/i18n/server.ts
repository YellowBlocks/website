import "server-only";
import { cache } from "react";
import { defaultLocale, isLocale, type Locale } from "./config";
import { dictionaries } from "./dictionaries";

/**
 * Request-scoped locale. Every layout, page and generateMetadata under app/[lang]
 * calls `setRequestLocale(params.lang)` first; components and the content
 * repository then read it with `getLocale()` instead of threading it through props.
 */
const store = cache(() => ({ lang: defaultLocale as Locale }));

export function setRequestLocale(lang: string): Locale {
  const l = isLocale(lang) ? lang : defaultLocale;
  store().lang = l;
  return l;
}

export const getLocale = (): Locale => store().lang;

export const getDictionary = (lang: Locale = getLocale()) => dictionaries[lang];

/** Resolves the [lang] param and sets it for the request. */
export async function resolveLocale(params: Promise<{ lang: string }>): Promise<Locale> {
  return setRequestLocale((await params).lang);
}

export const staticLocaleParams = () => [{ lang: "nl" }, { lang: "en" }];
