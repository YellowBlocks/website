import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";
import { BlockLattice } from "@/components/visuals/BlockLattice";
import { resolveLocale } from "@/lib/i18n/server";

export const generateMetadata = ({ params }: PageProps<"/[lang]/werkwijze">) => contentPageMetadata("werkwijze", params);

export default async function MethodologyPage({ params }: PageProps<"/[lang]/werkwijze">) {
  const lang = await resolveLocale(params);
  return <ContentPage slug="werkwijze" params={params} aside={<BlockLattice lang={lang} />} />;
}
