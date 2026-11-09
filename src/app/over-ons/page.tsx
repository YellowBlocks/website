import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";
import { DomainsDiagram } from "@/components/visuals/DomainsDiagram";

export const generateMetadata = () => contentPageMetadata("over-ons");

export default function AboutPage() {
  return <ContentPage slug="over-ons" crumb="Over YellowBlocks" aside={<DomainsDiagram />} />;
}
