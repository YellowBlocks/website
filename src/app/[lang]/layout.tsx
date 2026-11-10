import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { defaultMetadata } from "@/lib/seo/metadata";
import { JsonLd, organizationSchema } from "@/lib/seo/jsonld";
import { getSiteSettings } from "@/lib/content/repository";
import { getDictionary, resolveLocale, staticLocaleParams } from "@/lib/i18n/server";
import { LocaleProvider } from "@/lib/i18n/client";
import { localeMeta } from "@/lib/i18n/config";

const inter = localFont({
  src: "../../fonts/inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
});

const grotesk = localFont({
  src: "../../fonts/space-grotesk.woff2",
  variable: "--font-grotesk",
  weight: "300 700",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
});

const jetbrains = localFont({
  src: "../../fonts/jetbrains-mono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;
export const generateStaticParams = staticLocaleParams;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  return defaultMetadata(await resolveLocale(params));
}

export const viewport: Viewport = {
  themeColor: "#0c0e12",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);
  const [settings, draft] = await Promise.all([getSiteSettings(lang), draftMode()]);
  return (
    <html lang={localeMeta[lang].htmlLang} className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <LocaleProvider lang={lang}>
          {draft.isEnabled ? (
            <div className="bg-yellow px-4 py-2 text-center text-sm font-semibold text-ink">
              {t.common.draftBanner}{" "}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- API route, full navigation intended */}
              <a href="/api/draft/disable" className="underline">
                {t.common.draftStop}
              </a>
            </div>
          ) : null}
          <Header />
          <main id="inhoud" className="flex-1">
            {children}
          </main>
          <Footer />
          <Analytics />
        </LocaleProvider>
        <JsonLd data={organizationSchema(settings, lang)} />
      </body>
    </html>
  );
}
