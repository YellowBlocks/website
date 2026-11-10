import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import type { Article, Page, SiteSettings, Solution, SolutionCategoryDoc } from "./types";
import { isSanityConfigured, sanityQuery } from "./sanity";
import { pages as pagesNl } from "./local/pages";
import { articles as localArticles } from "./local/articles";
import { siteSettings as settingsNl, solutionCategories as categoriesNl } from "./local/site";
import { solutions as solutionsNl } from "./local/solutions";
import { pages as pagesEn } from "./local/en/pages";
import { siteSettings as settingsEn, solutionCategories as categoriesEn } from "./local/en/site";
import { solutions as solutionsEn } from "./local/en/solutions";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import type { Locale } from "@/lib/i18n/config";

const local = {
  nl: { pages: pagesNl, settings: settingsNl, categories: categoriesNl, solutions: solutionsNl },
  en: { pages: pagesEn, settings: settingsEn, categories: categoriesEn, solutions: solutionsEn },
} as const;

/**
 * Single entry point for content. Pages never know whether content comes from
 * Sanity or from the local seed; both return the same domain types.
 *
 * - With NEXT_PUBLIC_SANITY_PROJECT_ID set, content is read from Sanity.
 * - Without it, the typed seed in ./local is used (development, CI, fallback).
 * - In draft mode (via /api/draft), unpublished CMS changes are shown.
 *
 * Every getter takes an optional locale; by default it uses the request locale set by
 * the [lang] layout/page. In Sanity, translatable documents carry a `language` field
 * ("nl" | "en"). Articles are Dutch only and are returned for both locales.
 */

async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    // draftMode() is unavailable during generateStaticParams / sitemap generation.
    return false;
  }
}

const visible = <T extends { status: string }>(items: T[], draft: boolean) =>
  items.filter((i) => i.status === "published" || (draft && i.status === "draft"));

/** Expands references inside modular sections. */
const SECTIONS = `sections[]{ ..., _type == "testimonialsSection" => { ..., "items": items[]->{ quote, name, role, company, verified } } }`;

const SOLUTION_FIELDS = `
  _id, "slug": slug.current, status, category, order, title, shortTitle, question, summary, outcome,
  audienceSummary, heroIntro, primaryCta, secondaryCta, priceHint, ${SECTIONS}, serviceType,
  "relatedArticles": relatedArticles[]->slug.current, seo, "updatedAt": _updatedAt`;

const ARTICLE_FIELDS = `
  _id, "slug": slug.current, status, title, excerpt, topics, author->{name, role, url}, publishedAt,
  "updatedAt": _updatedAt, readingMinutes, body, "relatedSolutions": relatedSolutions[]->slug.current, seo`;

export const getSolutions = (lang: Locale = getLocale()) => solutionsFor(lang);
const solutionsFor = cache(async (lang: Locale): Promise<Solution[]> => {
  const draft = await isDraft();
  const items = isSanityConfigured
    ? await sanityQuery<Solution[]>(
        `*[_type == "solution" && coalesce(language, "nl") == $lang] | order(order asc) { ${SOLUTION_FIELDS} }`,
        { lang },
        { draft },
      )
    : local[lang].solutions;
  return visible(items, draft).sort((a, b) => a.order - b.order);
});

export async function getSolution(slug: string, lang: Locale = getLocale()): Promise<Solution | null> {
  return (await getSolutions(lang)).find((s) => s.slug === slug) ?? null;
}

export const getSolutionCategories = (lang: Locale = getLocale()) => categoriesFor(lang);
const categoriesFor = cache(async (lang: Locale): Promise<SolutionCategoryDoc[]> => {
  if (!isSanityConfigured) return [...local[lang].categories];
  return sanityQuery<SolutionCategoryDoc[]>(
    `*[_type == "solutionCategory" && coalesce(language, "nl") == $lang] | order(order asc) { "slug": slug.current, title, description, order }`,
    { lang },
  );
});

export const getArticles = cache(async (): Promise<Article[]> => {
  const draft = await isDraft();
  const items = isSanityConfigured
    ? await sanityQuery<Article[]>(`*[_type == "article"] | order(publishedAt desc) { ${ARTICLE_FIELDS} }`, {}, { draft })
    : localArticles;
  return visible(items, draft).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const getArticle = cache(async (slug: string): Promise<Article | null> => {
  return (await getArticles()).find((a) => a.slug === slug) ?? null;
});

export const getSiteSettings = (lang: Locale = getLocale()) => settingsFor(lang);
const settingsFor = cache(async (lang: Locale): Promise<SiteSettings> => {
  if (!isSanityConfigured) return local[lang].settings;
  const remote = await sanityQuery<SiteSettings | null>(`*[_type == "siteSettings" && coalesce(language, "nl") == $lang][0]`, { lang });
  return remote ?? local[lang].settings;
});

const PAGE_FIELDS = `_id, "slug": slug.current, title, intro, hero, ${SECTIONS}, seo, "updatedAt": _updatedAt`;

export const getPage = (slug: string, lang: Locale = getLocale()) => pageFor(slug, lang);
const pageFor = cache(async (slug: string, lang: Locale): Promise<Page | null> => {
  const fallback = local[lang].pages.find((p) => p.slug === slug) ?? null;
  if (!isSanityConfigured) return fallback;
  const draft = await isDraft();
  const remote = await sanityQuery<Page | null>(
    `*[_type == "page" && slug.current == $slug && coalesce(language, "nl") == $lang][0] { ${PAGE_FIELDS} }`,
    { slug, lang },
    { draft },
  );
  return remote ?? fallback;
});

/** Contact topics derive from published solutions, so new offerings appear automatically. */
export async function getContactTopics(lang: Locale = getLocale()): Promise<{ value: string; label: string }[]> {
  const t = getDictionary(lang).contact;
  const solutions = await getSolutions(lang);
  return [
    ...solutions.map((s) => ({ value: s.slug, label: s.shortTitle })),
    { value: "kennismaking", label: t.topicIntro },
    { value: "anders", label: t.topicOther },
  ];
}
