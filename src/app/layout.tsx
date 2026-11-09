import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { draftMode } from "next/headers";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { defaultMetadata } from "@/lib/seo/metadata";
import { JsonLd, organizationSchema } from "@/lib/seo/jsonld";
import { getSiteSettings } from "@/lib/content/repository";

const figtree = localFont({
  src: "../fonts/figtree.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
});

const jetbrains = localFont({
  src: "../fonts/jetbrains-mono.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#191919",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, draft] = await Promise.all([getSiteSettings(), draftMode()]);
  return (
    <html lang="nl" className={`${figtree.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {draft.isEnabled ? (
          <div className="bg-yellow px-4 py-2 text-center text-sm font-semibold text-ink">
            Voorbeeldweergave met concepten.{" "}
            <a href="/api/draft/disable" className="underline">
              Stoppen
            </a>
          </div>
        ) : null}
        <Header />
        <main id="inhoud" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <JsonLd data={organizationSchema(settings)} />
      </body>
    </html>
  );
}
