import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getSolution, getSolutions } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd, serviceSchema } from "@/lib/seo/jsonld";
import { PageHero } from "@/components/layout/PageHero";
import { SectionRenderer } from "@/components/sections/Sections";
import { ButtonLink, Container } from "@/components/ui/primitives";

const categoryLabel = { assessment: "Assessment", product: "Product", service: "Dienst" } as const;

export async function generateStaticParams() {
  return (await getSolutions()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/oplossingen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSolution(slug);
  if (!s) return {};
  return pageMetadata({ ...s.seo, path: `/oplossingen/${s.slug}`, noIndex: s.status !== "published" || s.seo.noIndex });
}

export default async function SolutionPage({ params }: PageProps<"/oplossingen/[slug]">) {
  const { slug } = await params;
  const solution = await getSolution(slug);
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
          { label: "Oplossingen", path: "/oplossingen" },
          { label: solution.title, path: `/oplossingen/${solution.slug}` },
        ]}
        aside={
          <dl className="border-l-2 border-yellow pl-6 text-[0.98rem]">
            <dt className="text-on-ink-muted">{categoryLabel[solution.category]}</dt>
            <dd className="mt-1 text-lg font-semibold text-paper">{solution.title}</dd>
            <dt className="mt-5 text-on-ink-muted">Uitkomst</dt>
            <dd className="mt-1 text-on-ink">{solution.outcome}</dd>
            <dt className="mt-5 text-on-ink-muted">Interesse?</dt>
            <dd className="mt-1">
              <Link href={`/contact?onderwerp=${solution.slug}`} data-track="contact_cta_clicked" className="link font-semibold">
                Neem contact op
              </Link>
            </dd>
          </dl>
        }
      >
        <p className="mt-6 max-w-[62ch] text-lg text-on-ink">{solution.heroIntro}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink cta={solution.primaryCta} variant="onInk" />
          {solution.secondaryCta ? <ButtonLink cta={solution.secondaryCta} variant="onInkSecondary" /> : null}
          {hasDeliverables ? (
            <a href="#wat-je-ontvangt" data-track="sample_report_clicked" className="font-semibold text-paper underline decoration-yellow decoration-2 underline-offset-4 hover:decoration-paper">
              Bekijk wat je ontvangt
            </a>
          ) : null}
        </div>
      </PageHero>

      <SectionRenderer sections={solution.sections} />

      {related.length || others.length ? (
        <section className="border-t border-line bg-canvas py-16" aria-label="Verder lezen">
          <Container className="grid gap-10 md:grid-cols-2">
            {related.length ? (
              <div>
                <h2 className="text-lg">Achtergrond</h2>
                <ul className="mt-4 space-y-3">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/inzichten/${a.slug}`} className="link">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {others.length ? (
              <div>
                <h2 className="text-lg">Ook interessant</h2>
                <ul className="mt-4 space-y-3">
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

      <JsonLd data={serviceSchema(solution)} />
    </>
  );
}
