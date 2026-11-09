import "server-only";
import { cache } from "react";
import { draftMode } from "next/headers";
import type { Article, Page, SiteSettings, Solution, SolutionCategoryDoc } from "./types";
import { pages as localPages } from "./local/pages";
import { isSanityConfigured, sanityQuery } from "./sanity";
import { articles as localArticles } from "./local/articles";
import { siteSettings as localSettings, solutionCategories as localCategories } from "./local/site";
import { solutions as localSolutions } from "./local/solutions";

/**
 * Single entry point for content. Pages never know whether content comes from
 * Sanity or from the local seed; both return the same domain types.
 *
 * - With NEXT_PUBLIC_SANITY_PROJECT_ID set, content is read from Sanity.
 * - Without it, the typed seed in ./local is used (development, CI, fallback).
 * - In draft mode (via /api/draft), unpublished CMS changes are shown.
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

export const getSolutions = cache(async (): Promise<Solution[]> => {
  const draft = await isDraft();
  const items = isSanityConfigured
    ? await sanityQuery<Solution[]>(`*[_type == "solution"] | order(order asc) { ${SOLUTION_FIELDS} }`, {}, { draft })
    : localSolutions;
  return visible(items, draft).sort((a, b) => a.order - b.order);
});

export const getSolution = cache(async (slug: string): Promise<Solution | null> => {
  return (await getSolutions()).find((s) => s.slug === slug) ?? null;
});

export const getSolutionCategories = cache(async (): Promise<SolutionCategoryDoc[]> => {
  if (!isSanityConfigured) return localCategories;
  return sanityQuery<SolutionCategoryDoc[]>(
    `*[_type == "solutionCategory"] | order(order asc) { "slug": slug.current, title, description, order }`,
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

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSanityConfigured) return localSettings;
  const remote = await sanityQuery<SiteSettings | null>(`*[_type == "siteSettings"][0]`);
  return remote ?? localSettings;
});

const PAGE_FIELDS = `_id, "slug": slug.current, title, intro, hero, ${SECTIONS}, seo, "updatedAt": _updatedAt`;

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  if (!isSanityConfigured) return localPages.find((p) => p.slug === slug) ?? null;
  const draft = await isDraft();
  const remote = await sanityQuery<Page | null>(`*[_type == "page" && slug.current == $slug][0] { ${PAGE_FIELDS} }`, { slug }, { draft });
  return remote ?? localPages.find((p) => p.slug === slug) ?? null;
});

/** Contact topics derive from published solutions, so new offerings appear automatically. */
export async function getContactTopics(): Promise<{ value: string; label: string }[]> {
  const solutions = await getSolutions();
  return [
    ...solutions.map((s) => ({ value: s.slug, label: s.shortTitle })),
    { value: "kennismaking", label: "Kennismakingsgesprek" },
    { value: "anders", label: "Iets anders" },
  ];
}
