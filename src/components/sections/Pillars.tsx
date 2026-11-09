import type { PillarsSection } from "@/lib/content/types";
import { BlockBullet, ButtonLink, Container } from "@/components/ui/primitives";

/** Main lines of business side by side: consultancy and services. */
export function Pillars({ s }: { s: PillarsSection }) {
  return (
    <section id="wat-we-doen" className="bg-canvas py-20 sm:py-24 lg:py-28" aria-labelledby="pijlers-h">
      <Container>
        <div className="max-w-[46rem]">
          <h2 id="pijlers-h" className="text-3xl lg:text-[2.75rem] lg:leading-[1.08]">
            {s.heading}
          </h2>
          {s.intro ? <p className="mt-5 text-lg text-slate">{s.intro}</p> : null}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {s.pillars.map((p) => (
            <article key={p._key} className="flex flex-col rounded-[5px] border border-line border-t-[3px] border-t-yellow bg-mist p-7 sm:p-10">
              <h3 className="text-2xl sm:text-3xl">{p.title}</h3>
              <p className="mt-3 text-lg font-medium text-paper">{p.lead}</p>
              <p className="mt-4 text-slate">{p.body}</p>
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
                  <ButtonLink cta={p.cta} variant="secondary" />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
