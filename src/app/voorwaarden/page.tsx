import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";

export const generateMetadata = () => contentPageMetadata("voorwaarden");

export default function TermsPage() {
  return <ContentPage slug="voorwaarden" crumb="Voorwaarden" />;
}
