import { ContentPage, contentPageMetadata } from "@/components/layout/ContentPage";
import { BlockLattice } from "@/components/visuals/BlockLattice";

export const generateMetadata = () => contentPageMetadata("werkwijze");

export default function MethodologyPage() {
  return <ContentPage slug="werkwijze" crumb="Werkwijze" aside={<BlockLattice />} />;
}
