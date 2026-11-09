import { getArticle } from "@/lib/content/repository";
import { ogSize, renderOg } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Artikel van YellowBlocks";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  return renderOg(a?.title ?? "Inzichten", "Inzichten");
}
