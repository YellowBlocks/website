/**
 * Exports the typed seed content in src/lib/content/local to Sanity NDJSON.
 * Usage (from /studio):  npm run seed:export  &&  npm run seed:import
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { solutions } from "../../src/lib/content/local/solutions";
import { articles } from "../../src/lib/content/local/articles";
import { pages } from "../../src/lib/content/local/pages";
import { siteSettings, solutionCategories } from "../../src/lib/content/local/site";
import { solutions as solutionsEn } from "../../src/lib/content/local/en/solutions";
import { pages as pagesEn } from "../../src/lib/content/local/en/pages";
import { siteSettings as siteSettingsEn, solutionCategories as solutionCategoriesEn } from "../../src/lib/content/local/en/site";

const here = dirname(fileURLToPath(import.meta.url));
const slug = (current: string) => ({ _type: "slug", current });
const ref = (id: string, i: number) => ({ _type: "reference", _ref: id, _key: `r${i}` });
const keyed = <T extends object>(items: T[], prefix: string) => items.map((it, i) => ({ _key: `${prefix}${i}`, ...it }));
const omit = <T extends object, K extends keyof T>(o: T, ...keys: K[]) => {
  const copy = { ...o };
  for (const k of keys) delete copy[k];
  return copy;
};

const docs: Record<string, unknown>[] = [];

/* Dutch documents keep their ids; English versions get an ".en" suffix and language "en". */
const suffix = (lang: "nl" | "en") => (lang === "en" ? ".en" : "");

for (const [lang, s] of [["nl", siteSettings], ["en", siteSettingsEn]] as const) {
  docs.push({
    _id: `siteSettings${suffix(lang)}`,
    _type: "siteSettings",
    language: lang,
    ...s,
    social: keyed(s.social, "s"),
    founder: { ...s.founder, facts: keyed(s.founder.facts, "f") },
    externalWriting: keyed(s.externalWriting, "e"),
  });
}

for (const [lang, list] of [["nl", solutionCategories], ["en", solutionCategoriesEn]] as const)
  for (const c of list) docs.push({ _id: `solutionCategory.${c.slug}${suffix(lang)}`, _type: "solutionCategory", language: lang, ...c, slug: slug(c.slug) });

const authorId = "author.sander-rozemuller";
docs.push({ _id: authorId, _type: "author", ...articles[0].author });

for (const [lang, list] of [["nl", solutions], ["en", solutionsEn]] as const)
  for (const s of list) {
    docs.push({
      ...omit(s, "updatedAt"),
      _id: `solution.${s.slug}${suffix(lang)}`,
      _type: "solution",
      language: lang,
      slug: slug(s.slug),
      relatedArticles: (s.relatedArticles ?? []).map((a, i) => ref(`article.${a}`, i)),
    });
  }

for (const a of articles) {
  docs.push({
    ...omit(a, "updatedAt"),
    _type: "article",
    language: "nl",
    slug: slug(a.slug),
    author: { _type: "reference", _ref: authorId },
    relatedSolutions: (a.relatedSolutions ?? []).map((s, i) => ref(`solution.${s}`, i)),
  });
}

for (const [lang, list] of [["nl", pages], ["en", pagesEn]] as const)
  for (const p of list) docs.push({ ...omit(p, "updatedAt"), _id: `page.${p.slug}${suffix(lang)}`, _type: "page", language: lang, slug: slug(p.slug) });

const out = join(here, "..", "seed", "seed.ndjson");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to ${out}`);
