import { getSolution } from "@/lib/content/repository";
import { ogSize, renderOg } from "@/lib/seo/og";
import { isLocale, slugsEnToNl } from "@/lib/i18n/config";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "YellowBlocks assessment";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const l = isLocale(lang) ? lang : "nl";
  const s = await getSolution(l === "en" ? (slugsEnToNl[slug] ?? slug) : slug, l);
  return renderOg(s?.question ?? "YellowBlocks", s?.title ?? "Assessment");
}
