import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { SectionRenderer } from "@/components/sections/Sections";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { BlockLattice } from "@/components/visuals/BlockLattice";
import { LayerStack } from "@/components/visuals/LayerStack";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");
  if (!page) return {};
  return { ...pageMetadata({ ...page.seo, path: "/" }), title: { absolute: page.seo.title } };
}

export default async function HomePage() {
  const page = await getPage("home");
  if (!page?.hero) notFound();
  const { hero } = page;

  return (
    <>
      <section className="on-ink relative overflow-hidden bg-ink text-on-ink">
        <Container className="grid gap-12 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-5">
            <h1 className="text-4xl text-paper!">{hero.heading}</h1>
            <p className="mt-7 max-w-[52ch] text-lg text-on-ink">{hero.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink cta={hero.primaryCta} variant="onInk" />
              {hero.secondaryCta ? <ButtonLink cta={hero.secondaryCta} variant="onInkSecondary" /> : null}
            </div>
            <p className="mt-10 max-w-[46ch] border-l-2 border-ink-line pl-4 text-sm text-on-ink-muted">
              Voor Microsoft 365, identity en modern work. Onafhankelijk en aanvullend op je eigen team, je beheerpartij en de tools die je al gebruikt.
            </p>
          </div>
          <div className="lg:col-span-7">
            {hero.stack ? <LayerStack {...hero.stack} /> : <BlockLattice />}
          </div>
        </Container>
      </section>
      <SectionRenderer sections={page.sections} />
    </>
  );
}
