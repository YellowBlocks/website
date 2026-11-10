import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";

export const generateMetadata = ({ params }: PageProps<"/[lang]/privacy">) => contentPageMetadata("privacy", params);

export default function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  return <ContentPage slug="privacy" params={params} />;
}
