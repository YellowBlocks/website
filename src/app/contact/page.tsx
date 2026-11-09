import type { Metadata } from "next";
import { getContactTopics, getSiteSettings } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact: assessment aanvragen of kennismaken",
  description: "Neem contact op met YellowBlocks voor een Conditional Access Scan, een Microsoft 365 Health Scan of een kennismakingsgesprek.",
  path: "/contact",
});

export default async function ContactPage() {
  const [topics, settings] = await Promise.all([getContactTopics(), getSiteSettings()]);

  return (
    <>
      <PageHero
        title="Bespreek je omgeving"
        intro="Vraag een assessment aan, bespreek een consultancyvraag of plan een kennismaking. Een paar zinnen over je situatie is genoeg om te beginnen."
        crumbs={[{ label: "Contact", path: "/contact" }]}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm topics={topics} phone={settings.phone} phoneHref={settings.phoneHref} />
          </div>
          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div>
              <h2 className="text-lg">Wat er daarna gebeurt</h2>
              <ol className="mt-4 space-y-4">
                {[
                  "We lezen je vraag en reageren persoonlijk.",
                  "In een kort gesprek bepalen we wat je wilt weten en wat in scope is.",
                  "Je ontvangt een voorstel met scope en planning.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4 text-slate">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-[5px] bg-yellow font-mono text-sm text-ink">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <div className="border-t border-line pt-8">
              <h2 className="text-lg">Liever direct contact?</h2>
              <p className="mt-3">
                <a href={settings.phoneHref} className="link text-lg font-semibold">
                  {settings.phone}
                </a>
              </p>
              {siteConfig.schedulingUrl ? (
                <p className="mt-4">
                  <a href={siteConfig.schedulingUrl} target="_blank" rel="noopener noreferrer" data-track="scheduling_link_clicked" className="link font-semibold">
                    Kies direct een moment in de agenda
                  </a>
                </p>
              ) : null}
            </div>
            <div className="rounded-r-[5px] border-l-4 border-yellow bg-mist p-5 text-sm text-slate">
              Stuur via dit formulier geen configuratie-exports, wachtwoorden of andere gevoelige gegevens. Gegevens voor een assessment wisselen we alleen uit
              binnen een opdracht, via een vooraf afgesproken veilige route.
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
