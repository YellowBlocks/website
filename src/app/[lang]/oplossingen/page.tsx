import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import { getSolutionCategories, getSolutions } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Arrow, Container, IconTile, Section, SectionHeader } from "@/components/ui/primitives";
import { CtaBlock } from "@/components/sections/Sections";

export async function generateMetadata({ params }: PageProps<"/[lang]/oplossingen">): Promise<Metadata> {
  const t = getDictionary(await resolveLocale(params)).solutionsIndex;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/oplossingen" });
}

export default async function SolutionsPage({ params }: PageProps<"/[lang]/oplossingen">) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);
  const [solutions, categories] = await Promise.all([getSolutions(), getSolutionCategories()]);
  // Categories without published solutions are not shown: no empty promises.
  const groups = categories
    .map((c) => ({ ...c, items: solutions.filter((s) => s.category === c.slug) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero title={t.solutionsIndex.title} intro={t.solutionsIndex.intro} crumbs={[{ label: t.solutionsIndex.title, path: "/oplossingen" }]} />
      {groups.map((g, gi) => (
        <Section key={g.slug} id={`cat-${g.slug}`} tone={gi % 2 ? "mist" : "paper"}>
          <Container>
            <SectionHeader id={`cat-${g.slug}`} heading={g.title} intro={g.description} />
            <ul className={`mx-auto mt-12 grid gap-6 ${g.items.length > 1 ? "md:grid-cols-2" : "max-w-[40rem]"} ${g.items.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {g.items.map((s, i) => (
                <li key={s.slug} className="card card-hover group relative flex flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <IconTile index={i + gi} />
                    {s.badge ? (
                      <span className="rounded-full border border-yellow/40 bg-yellow/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-yellow">{s.badge}</span>
                    ) : null}
                  </div>
                  <h3 className="mt-6 text-2xl">
                    <Link href={`/oplossingen/${s.slug}`} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)]">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-2 font-medium text-paper">{s.question}</p>
                  <p className="mt-4 text-muted">{s.summary}</p>
                  <dl className="mt-6 border-t border-line pt-5 text-[0.95rem]">
                    <dt className="font-semibold text-paper">{t.solution.forWhom}</dt>
                    <dd className="mt-1 text-muted">{s.audienceSummary}</dd>
                  </dl>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                    <Link href={`/contact?onderwerp=${s.slug}`} data-track="contact_cta_clicked" className="relative z-10 text-sm font-semibold text-paper hover:text-yellow">
                      {t.solution.contact}
                    </Link>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow">
                      {t.solution.viewService}
                      <Arrow />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}
      <CtaBlock
        s={{
          _type: "ctaSection",
          _key: "solutions-cta",
          heading: t.solutionsIndex.ctaHeading,
          body: t.solutionsIndex.ctaBody,
          primary: { label: t.nav.bookIntro, href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
        }}
      />
    </>
  );
}
