import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { notFound } from "next/navigation";
import { getArticles, getSolution, getSolutions } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd, serviceSchema } from "@/lib/seo/jsonld";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { locales, slugsEnToNl, slugsNlToEn, type Locale } from "@/lib/i18n/config";
import { PageHero } from "@/components/layout/PageHero";
import { SectionRenderer } from "@/components/sections/Sections";
import { Arrow, ButtonLink, Container } from "@/components/ui/primitives";

/* English params use translated slugs (tenant-continuity); content is keyed by the Dutch slug. */
const toParam = (slug: string, lang: Locale) => (lang === "en" ? (slugsNlToEn[slug] ?? slug) : slug);
const fromParam = (param: string, lang: Locale) => (lang === "en" ? (slugsEnToNl[param] ?? param) : param);

export async function generateStaticParams({ params }: { params: { lang: string } | Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (locales as readonly string[]).includes(raw) ? (raw as Locale) : "nl";
  return (await getSolutions(lang)).map((s) => ({ slug: toParam(s.slug, lang) }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/oplossingen/[slug]">): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const { slug } = await params;
  const s = await getSolution(fromParam(slug, lang));
  if (!s) return {};
  return pageMetadata({ ...s.seo, path: `/oplossingen/${s.slug}`, noIndex: s.status !== "published" || s.seo.noIndex });
}

export default async function SolutionPage({ params }: PageProps<"/[lang]/oplossingen/[slug]">) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);
  const { slug } = await params;
  const solution = await getSolution(fromParam(slug, lang));
  if (!solution) notFound();

  const [articles, all] = await Promise.all([getArticles(), getSolutions()]);
  const related = articles.filter((a) => solution.relatedArticles?.includes(a.slug));
  const others = all.filter((s) => s.slug !== solution.slug);
  const hasDeliverables = solution.sections.some((x) => x._type === "deliverablesSection");

  return (
    <>
      <PageHero
        title={solution.question}
        crumbs={[
          { label: t.solutionsIndex.title, path: "/oplossingen" },
          { label: solution.title, path: `/oplossingen/${solution.slug}` },
        ]}
        aside={
          <dl className="card grid gap-6 p-6 text-left sm:grid-cols-3 sm:p-7">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{t.solution.categories[solution.category]}</dt>
              <dd className="mt-2 font-display text-lg font-semibold text-paper">
                {solution.title}
                {solution.badge ? (
                  <span className="ml-2 rounded-full border border-yellow/40 bg-yellow/10 px-2 py-0.5 align-middle text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-yellow">
                    {solution.badge}
                  </span>
                ) : null}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{t.solution.outcome}</dt>
              <dd className="mt-2 text-slate">{solution.outcome}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{t.solution.interested}</dt>
              <dd className="mt-2">
                <Link href={`/contact?onderwerp=${solution.slug}`} data-track="contact_cta_clicked" className="link font-semibold">
                  {t.solution.contact}
                </Link>
              </dd>
            </div>
          </dl>
        }
      >
        <p className="mx-auto mt-6 max-w-[46rem] text-lg text-muted">{solution.heroIntro}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink cta={solution.primaryCta} />
          {solution.secondaryCta ? <ButtonLink cta={solution.secondaryCta} variant="secondary" /> : null}
        </div>
        {hasDeliverables ? (
          <p className="mt-6">
            <a href="#wat-je-ontvangt" data-track="sample_report_clicked" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-yellow hover:text-yellow-2">
              {t.solution.seeDeliverables}
              <Arrow />
            </a>
          </p>
        ) : null}
      </PageHero>

      <SectionRenderer sections={solution.sections} />

      {related.length || others.length ? (
        <section className="border-t border-line py-16" aria-label={t.solution.readFurther}>
          <Container className="grid gap-6 md:grid-cols-2">
            {related.length ? (
              <div className="card p-7">
                <h2 className="text-lg">{t.solution.background}</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/inzichten/${a.slug}`} locale="nl" lang="nl" className="link">
                        {a.title.replace(/\*/g, "")}
                      </Link>
                    </li>
                  ))}
                </ul>
                {t.insights.languageNote ? <p className="mt-4 text-xs text-faint">{t.insights.languageNote}</p> : null}
              </div>
            ) : null}
            {others.length ? (
              <div className="card p-7">
                <h2 className="text-lg">{t.solution.alsoInteresting}</h2>
                <ul className="mt-4 space-y-4">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/oplossingen/${o.slug}`} className="link">
                        {o.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{o.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <JsonLd data={serviceSchema(solution, lang)} />
    </>
  );
}
