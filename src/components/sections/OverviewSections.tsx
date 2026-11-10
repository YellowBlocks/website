import Link from "@/components/ui/Link";
import type { CapabilitiesSection, EngagementSection } from "@/lib/content/types";
import { Accent, BlockBullet, Container, ReviewMarker } from "@/components/ui/primitives";

/** Expertise areas, shown per group as a ruled three-column grid. */
export function Capabilities({ s }: { s: CapabilitiesSection }) {
  return (
    <section id="op-elk-vlak" className="bg-canvas py-20 sm:py-24 lg:py-28" aria-labelledby="op-elk-vlak-h">
      <Container>
        <div className="max-w-[46rem]">
          <h2 id="op-elk-vlak-h" className="text-2xl sm:text-3xl">
            <Accent text={s.heading} />
          </h2>
          {s.intro ? <p className="mt-5 text-lg text-slate">{s.intro}</p> : null}
        </div>

        <div className="mt-14 space-y-16">
          {s.groups.map((g, gi) => (
            <div key={g._key}>
              {s.groups.length > 1 ? (
              <div className="flex flex-col gap-2 border-b border-rule pb-4 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="flex items-center gap-3 text-xl">
                  <span aria-hidden="true" className={`size-3 ${gi === 0 ? "bg-paper" : "bg-yellow"}`} />
                  {g.title}
                </h3>
                {g.description ? <p className="max-w-[48ch] text-muted sm:text-right">{g.description}</p> : null}
              </div>
              ) : null}
              <ul className={`grid md:grid-cols-3 ${s.groups.length > 1 ? "" : "border-t border-rule"}`}>
                {g.items.map((item, i) => (
                  <li
                    key={item._key}
                    className={`flex flex-col border-b border-line py-8 md:border-b-0 md:py-9 ${i > 0 ? "md:border-l md:pl-8" : ""} ${i < g.items.length - 1 ? "md:pr-8" : ""}`}
                  >
                    {s.groups.length > 1 ? (
                      <h4 className="text-2xl font-semibold tracking-[-0.02em] text-paper">{item.title}</h4>
                    ) : (
                      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-paper">{item.title}</h3>
                    )}
                    <p className="mt-3 font-medium text-paper">{item.lead}</p>
                    <ul className="mt-5 space-y-2.5 text-[0.98rem] text-slate">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <BlockBullet className="bg-muted" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {item.link ? (
                      <div className="mt-auto pt-7">
                        <Link href={item.link.href} data-track={item.link.event} className="link text-[0.98rem] font-semibold">
                          {item.link.label}
                        </Link>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Ways to work together, as ruled rows. */
export function Engagement({ s }: { s: EngagementSection }) {
  return (
    <section id="samenwerken" className="bg-mist py-20 sm:py-24 lg:py-28" aria-labelledby="samenwerken-h">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="samenwerken-h" className="text-2xl sm:text-3xl">
            <Accent text={s.heading} />
          </h2>
          {s.intro ? <p className="mt-5 max-w-[46ch] text-muted">{s.intro}</p> : null}
        </div>
        <ol className="border-t border-rule lg:col-span-8">
          {s.items.map((item) => (
            <li key={item._key} className="grid gap-3 border-b border-line py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8">
              <h3 className="text-xl">
                {item.title}
                {item.needsApproval ? <ReviewMarker>aanbod</ReviewMarker> : null}
              </h3>
              <div>
                <p className="text-slate">{item.body}</p>
                {item.cta ? (
                  <p className="mt-4">
                    {/^https?:\/\//.test(item.cta.href) ? (
                      <a href={item.cta.href} target="_blank" rel="noopener noreferrer" data-track={item.cta.event} className="link font-semibold">
                        {item.cta.label}
                      </a>
                    ) : (
                      <Link href={item.cta.href} data-track={item.cta.event} className="link font-semibold">
                        {item.cta.label}
                      </Link>
                    )}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
