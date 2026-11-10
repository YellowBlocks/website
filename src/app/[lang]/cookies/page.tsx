import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";

export const generateMetadata = ({ params }: PageProps<"/[lang]/cookies">) => contentPageMetadata("cookies", params);

export default function CookiesPage({ params }: PageProps<"/[lang]/cookies">) {
  return <ContentPage slug="cookies" params={params} />;
}
