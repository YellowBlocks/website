import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";

export const generateMetadata = ({ params }: PageProps<"/[lang]/voorwaarden">) => contentPageMetadata("voorwaarden", params);

export default function TermsPage({ params }: PageProps<"/[lang]/voorwaarden">) {
  return <ContentPage slug="voorwaarden" params={params} />;
}
