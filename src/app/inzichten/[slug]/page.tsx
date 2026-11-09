import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getSolutions } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs, ButtonLink, Container } from "@/components/ui/primitives";
import { PortableTextView } from "@/components/ui/PortableTextView";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/inzichten/[slug]">): Promise<Metadata> {
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
  });
}

export default async function ArticlePage({ params }: PageProps<"/inzichten/[slug]">) {
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
      <header className="on-ink border-b border-ink-line bg-ink pb-14 pt-10 sm:pb-16">
        <Container>
          <div className="text-on-ink-muted">
            <Breadcrumbs items={crumbs.map((c, i) => ({ label: i === 2 ? "Artikel" : c.label, href: i === 2 ? undefined : c.path }))} />
          </div>
          <div className="mt-10 max-w-[52rem]">
            <p className="text-sm text-on-ink-muted">{article.topics.join(", ")}</p>
            <h1 className="mt-3 text-[clamp(2rem,1.4rem+2.2vw,3.1rem)] leading-[1.08] text-paper!">{article.title}</h1>
            <p className="mt-6 text-lg text-on-ink">{article.excerpt}</p>
            <p className="mt-8 text-sm text-on-ink-muted">
              {article.author.name}, {article.author.role}. <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {article.updatedAt !== article.publishedAt ? (
                <>
                  , bijgewerkt <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                </>
              ) : null}
              . {article.readingMinutes} min lezen.
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
            <div className="sticky top-28 overflow-hidden rounded-[5px] border-t-[3px] border-yellow bg-mist p-7">
              {solutions.map((s) => (
                <div key={s.slug}>
                  <p className="text-sm font-medium text-muted">Gerelateerd assessment</p>
                  <p className="mt-2 text-lg font-semibold text-paper">{s.title}</p>
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
          Alle inzichten
        </Link>
      </Container>

      <JsonLd data={[articleSchema(article), breadcrumbSchema(crumbs)]} />
    </article>
  );
}
