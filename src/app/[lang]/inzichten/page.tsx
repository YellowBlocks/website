import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { getArticles, getSiteSettings } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Accent, Arrow, Container } from "@/components/ui/primitives";
import { formatDate } from "@/lib/format";

export async function generateMetadata({ params }: PageProps<"/[lang]/inzichten">): Promise<Metadata> {
  const t = getDictionary(await resolveLocale(params)).insights;
  return pageMetadata({ title: t.title, description: t.metaDescription, path: "/inzichten" });
}

export default async function InsightsPage({ params }: PageProps<"/[lang]/inzichten">) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);
  const [articles, settings] = await Promise.all([getArticles(), getSiteSettings()]);
  const topics = Array.from(new Set(articles.flatMap((a) => a.topics)));

  return (
    <>
      <PageHero title={t.insights.title} intro={t.insights.intro} crumbs={[{ label: t.insights.title, path: "/inzichten" }]}>
        {t.insights.languageNote ? <p className="mx-auto mt-5 max-w-[40rem] text-sm text-faint">{t.insights.languageNote}</p> : null}
        {topics.length ? (
          <ul className="mt-8 flex flex-wrap justify-center gap-2" lang="nl">
            {topics.map((topic) => (
              <li key={topic} className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-medium text-muted">
                {topic}
              </li>
            ))}
          </ul>
        ) : null}
      </PageHero>
      <section className="py-16 sm:py-20">
        <Container>
          {articles.length === 0 ? (
            <p className="text-center text-muted">{t.insights.empty}</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={a.slug} className="card card-hover group relative flex flex-col p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.06em] text-muted">
                    <time dateTime={a.publishedAt}>{formatDate(a.publishedAt, lang)}</time> · {a.readingMinutes} {t.common.minutesRead}
                  </p>
                  <h2 className="mt-3 text-xl leading-snug" lang="nl">
                    <Link href={`/inzichten/${a.slug}`} locale="nl" className="after:absolute after:inset-0 after:rounded-[var(--radius-card)]">
                      <Accent text={a.title} />
                    </Link>
                  </h2>
                  <p className="mt-3 text-muted" lang="nl">
                    {a.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-faint" lang="nl">
                    {a.topics.join(" · ")}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-yellow">
                    {t.common.readMore}
                    <Arrow />
                  </span>
                </li>
              ))}
            </ul>
          )}

          {settings.externalWriting.length ? (
            <div className="card mx-auto mt-14 max-w-[48rem] p-7 text-center sm:p-9">
              <h2 className="text-lg">{t.insights.externalHeading}</h2>
              <ul className="mt-5 space-y-2.5">
                {settings.externalWriting.map((e) => (
                  <li key={e.url}>
                    <a href={e.url} rel="noopener noreferrer" target="_blank" className="link" lang="en">
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
