import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "./PageHero";
import { SectionRenderer } from "@/components/sections/Sections";

/** Template for CMS "page" documents (werkwijze, over-ons, legal pages). */
export async function contentPageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  if (!page) return {};
  return pageMetadata({ ...page.seo, path: `/${slug}` });
}

export async function ContentPage({ slug, crumb, aside }: { slug: string; crumb: string; aside?: React.ReactNode }) {
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <>
      <PageHero title={page.title} intro={page.intro} crumbs={[{ label: crumb, path: `/${slug}` }]} aside={aside} />
      <SectionRenderer sections={page.sections} />
    </>
  );
}
