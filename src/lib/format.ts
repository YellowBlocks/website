import type { Locale } from "@/lib/i18n/config";

const formatters: Record<Locale, Intl.DateTimeFormat> = {
  nl: new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" }),
  en: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" }),
};

export const formatDate = (iso: string, lang: Locale = "nl") => formatters[lang].format(new Date(iso));
