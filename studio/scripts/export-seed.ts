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

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  ...siteSettings,
  social: keyed(siteSettings.social, "s"),
  founder: { ...siteSettings.founder, facts: keyed(siteSettings.founder.facts, "f") },
  externalWriting: keyed(siteSettings.externalWriting, "e"),
});

for (const c of solutionCategories) docs.push({ _id: `solutionCategory.${c.slug}`, _type: "solutionCategory", ...c, slug: slug(c.slug) });

const authorId = "author.sander-rozemuller";
docs.push({ _id: authorId, _type: "author", ...articles[0].author });

for (const s of solutions) {
  docs.push({
    ...omit(s, "updatedAt"),
    _type: "solution",
    slug: slug(s.slug),
    relatedArticles: (s.relatedArticles ?? []).map((a, i) => ref(`article.${a}`, i)),
  });
}

for (const a of articles) {
  docs.push({
    ...omit(a, "updatedAt"),
    _type: "article",
    slug: slug(a.slug),
    author: { _type: "reference", _ref: authorId },
    relatedSolutions: (a.relatedSolutions ?? []).map((s, i) => ref(`solution.${s}`, i)),
  });
}

for (const p of pages) docs.push({ ...omit(p, "updatedAt"), _type: "page", slug: slug(p.slug) });

const out = join(here, "..", "seed", "seed.ndjson");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`Wrote ${docs.length} documents to ${out}`);
