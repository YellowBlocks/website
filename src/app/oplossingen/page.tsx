import type { Metadata } from "next";
import Link from "next/link";
import { getSolutionCategories, getSolutions } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/primitives";
import { CtaBlock } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Assessments voor Microsoft 365, Entra en Intune",
  description:
    "Overzicht van de onafhankelijke assessments van YellowBlocks: de Conditional Access Scan en de Microsoft 365 Health Scan. Read-only, onderbouwd en met een geprioriteerd verbeterplan.",
  path: "/oplossingen",
});

export default async function SolutionsPage() {
  const [solutions, categories] = await Promise.all([getSolutions(), getSolutionCategories()]);
  // Categories without published solutions are not shown: no empty promises.
  const groups = categories
    .map((c) => ({ ...c, items: solutions.filter((s) => s.category === c.slug) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        title="Oplossingen"
        intro="Onafhankelijke, read-only onderzoeken naar je Microsoft-omgeving, met een vaste werkwijze en een rapport waar je op kunt besluiten."
        crumbs={[{ label: "Oplossingen", path: "/oplossingen" }]}
      />
      {groups.map((g) => (
        <section key={g.slug} className="py-20 sm:py-24" aria-labelledby={`cat-${g.slug}`}>
          <Container>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 id={`cat-${g.slug}`} className="text-2xl sm:text-3xl">
                  {g.title}
                </h2>
                <p className="mt-4 text-muted">{g.description}</p>
              </div>
              <ul className="border-t border-rule lg:col-span-8">
                {g.items.map((s) => (
                  <li key={s.slug} className="group relative grid gap-6 border-b border-line py-10 md:grid-cols-[1fr_14rem]">
                    <div>
                      <h3 className="text-2xl">
                        <Link href={`/oplossingen/${s.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-yellow group-hover:decoration-2 group-hover:underline-offset-4">
                          {s.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-lg text-paper">{s.question}</p>
                      <p className="mt-4 max-w-[60ch] text-slate">{s.summary}</p>
                    </div>
                    <dl className="relative z-10 space-y-4 text-[0.95rem] md:border-l md:border-line md:pl-6">
                      <div>
                        <dt className="font-semibold text-paper">Voor wie</dt>
                        <dd className="mt-1 text-muted">{s.audienceSummary}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-paper">Interesse?</dt>
                        <dd className="mt-1">
                          <Link href={`/contact?onderwerp=${s.slug}`} data-track="contact_cta_clicked" className="link">
                            Neem contact op
                          </Link>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}
      <CtaBlock
        s={{
          _type: "ctaSection",
          _key: "solutions-cta",
          heading: "Weet je niet welk assessment past?",
          body: "Beschrijf je vraag. We adviseren eerlijk welke aanpak zinvol is.",
          primary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
        }}
      />
    </>
  );
}
