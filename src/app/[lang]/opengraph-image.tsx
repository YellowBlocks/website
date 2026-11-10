import { ogSize, renderOg } from "@/lib/seo/og";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/config";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "YellowBlocks – Stay in control";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return renderOg("Stay in control.", dictionaries[isLocale(lang) ? lang : "nl"].seo.ogKicker);
}
