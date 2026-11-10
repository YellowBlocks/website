import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getSolutions } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/seo/jsonld";
import { Accent, Breadcrumbs, ButtonLink, Container } from "@/components/ui/primitives";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { PortableTextView } from "@/components/ui/PortableTextView";
import { formatDate } from "@/lib/format";

/** Articles are written in Dutch and only published under the Dutch locale. */
export async function generateStaticParams({ params }: { params: { lang: string } | Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (await getArticles()).map((a) => ({ lang, slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/inzichten/[slug]">): Promise<Metadata> {
  await resolveLocale(params);
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return pageMetadata({
    ...a.seo,
    path: `/inzichten/${a.slug}`,
    type: "article",
    publishedTime: a.publishedAt,
    modifiedTime: a.updatedAt,
    authors: [a.author.name],
    noIndex: a.status !== "published" || a.seo.noIndex,
    available: ["nl"],
  });
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/inzichten/[slug]">) {
  const lang = await resolveLocale(params);
  if (lang !== "nl") notFound();
  const t = getDictionary(lang);
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const solutions = (await getSolutions()).filter((s) => article.relatedSolutions?.includes(s.slug));
  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Inzichten", path: "/inzichten" },
    { label: article.title, path: `/inzichten/${article.slug}` },
  ];

  return (
    <article>
      <header className="hero-glow relative overflow-hidden border-b border-line pb-14 pt-10 sm:pb-16">
        <div aria-hidden="true" className="grid-fade pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="text-muted">
            <Breadcrumbs label={t.common.breadcrumb} items={crumbs.map((c, i) => ({ label: i === 2 ? "Artikel" : c.label, href: i === 2 ? undefined : c.path }))} />
          </div>
          <div className="mx-auto mt-10 max-w-[52rem] text-center">
            <p className="eyebrow">{article.topics.join(" · ")}</p>
            <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.06]">
              <Accent text={article.title} />
            </h1>
            <p className="mx-auto mt-6 max-w-[44rem] text-lg text-muted">{article.excerpt}</p>
            <p className="mt-8 text-sm text-muted">
              {article.author.name}, {article.author.role}. <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
              {article.updatedAt !== article.publishedAt ? (
                <>
                  , bijgewerkt <time dateTime={article.updatedAt}>{formatDate(article.updatedAt, lang)}</time>
                </>
              ) : null}
              . {article.readingMinutes} {t.common.minutesRead}.
            </p>
          </div>
        </Container>
      </header>

      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <PortableTextView value={article.body} />
        </div>
        {solutions.length ? (
          <aside className="lg:col-span-4">
            <div className="card sticky top-28 overflow-hidden border-yellow/30 p-7">
              {solutions.map((s) => (
                <div key={s.slug}>
                  <p className="text-sm font-medium text-muted">Gerelateerd assessment</p>
                  <p className="mt-2 font-display text-lg font-semibold text-paper">{s.title}</p>
                  <p className="mt-2 text-[0.95rem] text-slate">{s.outcome}</p>
                  <div className="mt-5">
                    <ButtonLink cta={{ label: "Bekijk het assessment", href: `/oplossingen/${s.slug}`, event: "assessment_cta_clicked" }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        ) : null}
      </Container>

      <Container className="pb-20">
        <Link href="/inzichten" className="link font-semibold">
          {t.insights.backToAll}
        </Link>
      </Container>

      <JsonLd data={[articleSchema(article), breadcrumbSchema(crumbs, lang)]} />
    </article>
  );
}
