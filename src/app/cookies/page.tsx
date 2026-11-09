import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";

export const generateMetadata = () => contentPageMetadata("cookies");

export default function CookiesPage() {
  return <ContentPage slug="cookies" crumb="Cookies" />;
}
