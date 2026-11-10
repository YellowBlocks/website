import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { PageHero } from "./PageHero";
import { SectionRenderer } from "@/components/sections/Sections";

type Params = Promise<{ lang: string }>;

/** Template for CMS "page" documents (werkwijze, over-ons, legal pages). */
export async function contentPageMetadata(slug: string, params: Params): Promise<Metadata> {
  await resolveLocale(params);
  const page = await getPage(slug);
  if (!page) return {};
  return pageMetadata({ ...page.seo, path: `/${slug}` });
}

export async function ContentPage({ slug, params, aside }: { slug: string; params: Params; aside?: React.ReactNode }) {
  const lang = await resolveLocale(params);
  const page = await getPage(slug);
  if (!page) notFound();
  const crumb = getDictionary(lang).pages[slug] ?? page.title;
  return (
    <>
      <PageHero
        title={page.title}
        intro={page.intro}
        crumbs={[{ label: crumb, path: `/${slug}` }]}
        aside={aside ? <div className="card p-5 sm:p-8">{aside}</div> : undefined}
      />
      <SectionRenderer sections={page.sections} />
    </>
  );
}
