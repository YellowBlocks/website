import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";

export const generateMetadata = () => contentPageMetadata("privacy");

export default function PrivacyPage() {
  return <ContentPage slug="privacy" crumb="Privacy" />;
}
