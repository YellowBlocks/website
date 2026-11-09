import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getArticles, getSolutions } from "@/lib/content/repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [solutions, articles] = await Promise.all([getSolutions(), getArticles()]);
  const staticPages = ["/", "/oplossingen", "/werkwijze", "/over-ons", "/inzichten", "/contact", "/privacy", "/cookies", "/voorwaarden"];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.6 })),
    ...solutions
      .filter((s) => s.status === "published" && !s.seo.noIndex)
      .map((s) => ({ url: absoluteUrl(`/oplossingen/${s.slug}`), lastModified: s.updatedAt, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...articles
      .filter((a) => a.status === "published" && !a.seo.noIndex)
      .map((a) => ({ url: absoluteUrl(`/inzichten/${a.slug}`), lastModified: a.updatedAt, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
