import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getArticles, getSolutions } from "@/lib/content/repository";
import { localizePath, locales, type Locale } from "@/lib/i18n/config";

/** Every page per locale, with hreflang alternates. Articles exist in Dutch only. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, ...solutionsPerLang] = await Promise.all([getArticles(), ...locales.map((l) => getSolutions(l))]);
  const alternates = (path: string, available: readonly Locale[] = locales) => ({
    languages: Object.fromEntries(available.map((l) => [l, absoluteUrl(localizePath(path, l))])),
  });
  const staticPages = ["/", "/oplossingen", "/werkwijze", "/over-ons", "/inzichten", "/contact", "/privacy", "/cookies", "/voorwaarden"];

  return [
    ...locales.flatMap((l) =>
      staticPages.map((p) => ({
        url: absoluteUrl(localizePath(p, l)),
        changeFrequency: "monthly" as const,
        priority: p === "/" ? 1 : 0.6,
        alternates: alternates(p),
      })),
    ),
    ...locales.flatMap((l, i) =>
      solutionsPerLang[i]
        .filter((s) => s.status === "published" && !s.seo.noIndex)
        .map((s) => ({
          url: absoluteUrl(localizePath(`/oplossingen/${s.slug}`, l)),
          lastModified: s.updatedAt,
          changeFrequency: "monthly" as const,
          priority: 0.9,
          alternates: alternates(`/oplossingen/${s.slug}`),
        })),
    ),
    ...articles
      .filter((a) => a.status === "published" && !a.seo.noIndex)
      .map((a) => ({ url: absoluteUrl(`/inzichten/${a.slug}`), lastModified: a.updatedAt, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
