import type { PillarsSection } from "@/lib/content/types";
import { BlockBullet, ButtonLink, Container, IconTile, Section, SectionHeader } from "@/components/ui/primitives";
import { getDictionary } from "@/lib/i18n/server";

/** Main lines of business side by side: consultancy and services. */
export function Pillars({ s }: { s: PillarsSection }) {
  const t = getDictionary();
  return (
    <Section id="aanbod">
      <Container>
        <SectionHeader id="aanbod" eyebrow={t.eyebrows.pillars} heading={s.heading} intro={s.intro} />
        <div className="mx-auto mt-14 grid max-w-[64rem] gap-6 md:grid-cols-2">
          {s.pillars.map((p, i) => (
            <article key={p._key} className="card card-hover flex flex-col p-7 sm:p-9">
              <IconTile index={i === 0 ? 2 : 3} />
              <h3 className="mt-6 text-2xl">{p.title}</h3>
              <p className="mt-2 font-medium text-paper">{p.lead}</p>
              <p className="mt-4 text-muted">{p.body}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-slate">
                    <BlockBullet />
                    {pt}
                  </li>
                ))}
              </ul>
              {p.cta ? (
                <div className="mt-auto pt-8">
                  <ButtonLink cta={p.cta} variant={i === 0 ? "outline" : "primary"} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
