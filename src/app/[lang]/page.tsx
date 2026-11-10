import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { SectionRenderer } from "@/components/sections/Sections";
import { Accent, ButtonLink, Container } from "@/components/ui/primitives";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  await resolveLocale(params);
  const page = await getPage("home");
  if (!page) return {};
  return { ...pageMetadata({ ...page.seo, path: "/" }), title: { absolute: page.seo.title } };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);
  const page = await getPage("home");
  if (!page?.hero) notFound();
  const { hero } = page;

  return (
    <>
      <section className="hero-glow relative overflow-hidden">
        <div aria-hidden="true" className="grid-fade pointer-events-none absolute inset-0" />
        <Container className="relative flex min-h-[min(46rem,calc(100svh-4.5rem))] flex-col items-center justify-center py-20 text-center sm:py-24">
          <p className="eyebrow yb-appear" style={{ ["--d" as string]: "0.05s" }}>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow shadow-[0_0_10px_2px_rgb(254_198_31/0.6)]" />
            {t.home.eyebrow}
          </p>
          <h1 className="yb-appear mt-8 max-w-[15ch] text-[clamp(3rem,1.6rem+6vw,6rem)] leading-[0.98] tracking-[-0.035em]" style={{ ["--d" as string]: "0.12s" }}>
            <Accent text={hero.heading} />
          </h1>
          <p className="yb-appear mx-auto mt-8 max-w-[46rem] text-lg text-muted sm:text-xl sm:leading-relaxed" style={{ ["--d" as string]: "0.22s" }}>
            {hero.intro}
          </p>
          <div className="yb-appear mt-10 flex flex-wrap justify-center gap-3" style={{ ["--d" as string]: "0.32s" }}>
            <ButtonLink cta={hero.primaryCta} variant="primary" />
            {hero.secondaryCta ? <ButtonLink cta={hero.secondaryCta} variant="secondary" /> : null}
          </div>
          <p className="mx-auto mt-10 max-w-[44rem] text-sm text-faint">{t.home.heroNote}</p>
        </Container>
      </section>

      <div className="border-y border-line bg-surface/50">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-sm font-medium text-muted sm:gap-x-12">
            {t.home.trust.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1.5 rounded-[1.5px] bg-yellow/70" />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <SectionRenderer sections={page.sections} />
    </>
  );
}
