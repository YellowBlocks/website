import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";
import { DomainsDiagram } from "@/components/visuals/DomainsDiagram";
import { resolveLocale } from "@/lib/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/over-ons">) => contentPageMetadata("over-ons", params);

export default async function AboutPage({ params }: PageProps<"/[lang]/over-ons">) {
  const lang = await resolveLocale(params);
  return <ContentPage slug="over-ons" params={params} aside={<DomainsDiagram lang={lang} />} />;
}
