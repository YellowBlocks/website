import { getSolution } from "@/lib/content/repository";
import { ogSize, renderOg } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "YellowBlocks assessment";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getSolution(slug);
  return renderOg(s?.question ?? "YellowBlocks", s?.title ?? "Assessment");
}
