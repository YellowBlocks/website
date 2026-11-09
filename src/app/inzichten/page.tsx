import type { Metadata } from "next";
import Link from "next/link";
import { getArticles, getSiteSettings } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/primitives";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = pageMetadata({
  title: "Inzichten over Conditional Access en Intune",
  description:
    "Technische artikelen over Conditional Access, Intune compliance en Microsoft 365-configuratie: waar verwachting en werkelijkheid uit elkaar lopen, en wat je eraan doet.",
  path: "/inzichten",
});

export default async function InsightsPage() {
  const [articles, settings] = await Promise.all([getArticles(), getSiteSettings()]);
  const topics = Array.from(new Set(articles.flatMap((a) => a.topics)));

  return (
    <>
      <PageHero
        title="Inzichten"
        intro="Technische achtergrond bij wat we in Microsoft-omgevingen tegenkomen. Geschreven voor beheerders en engineers, leesbaar voor wie erover beslist."
        crumbs={[{ label: "Inzichten", path: "/inzichten" }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <h2 className="text-base">Onderwerpen</h2>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {topics.map((t) => (
                <li key={t} className="rounded-[5px] border border-line px-3 py-1 text-sm text-slate">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <div className="lg:col-span-9">
            {articles.length === 0 ? (
              <p className="text-slate">Er zijn nog geen artikelen gepubliceerd.</p>
            ) : (
              <ul className="border-t border-rule">
                {articles.map((a) => (
                  <li key={a.slug} className="group relative grid gap-3 border-b border-line py-9 md:grid-cols-[10rem_1fr] md:gap-8">
                    <p className="text-sm text-muted">
                      <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
                      <br />
                      {a.readingMinutes} min lezen
                    </p>
                    <div>
                      <h2 className="text-xl sm:text-2xl">
                        <Link href={`/inzichten/${a.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-yellow group-hover:decoration-2 group-hover:underline-offset-4">
                          {a.title}
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-[64ch] text-slate">{a.excerpt}</p>
                      <p className="mt-3 text-sm text-muted">{a.topics.join(", ")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-16 rounded-[5px] bg-mist p-7 sm:p-9">
              <h2 className="text-lg">Meer technische verdieping op rozemuller.com</h2>
              <p className="mt-2 max-w-[60ch] text-slate">
                Sander schrijft op zijn eigen blog in het Engels over Intune, identity, automatisering en de Graph API.
              </p>
              <ul className="mt-5 space-y-2.5">
                {settings.externalWriting.map((e) => (
                  <li key={e.url}>
                    <a href={e.url} rel="noopener noreferrer" target="_blank" className="link">
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
