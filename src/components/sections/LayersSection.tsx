import type { LayersSection as LayersSectionType } from "@/lib/content/types";
import { Container } from "@/components/ui/primitives";

/** Mini stack: which layer this row is about. Lower layers solid, current yellow, higher dashed. */
function LayerGlyph({ index, total }: { index: number; total: number }) {
  const h = 6;
  const gap = 3;
  const height = total * h + (total - 1) * gap;
  return (
    <svg width="36" height={height} viewBox={`0 0 36 ${height}`} aria-hidden="true" className="shrink-0">
      {Array.from({ length: total }, (_, i) => {
        // i = 0 is the bottom layer; draw from the bottom up.
        const y = height - (i + 1) * h - i * gap;
        const state = i < index ? "below" : i === index ? "current" : "above";
        return (
          <rect
            key={i}
            rx="1.5"
            x="0"
            y={y}
            width="36"
            height={h}
            fill={state === "current" ? "var(--color-yellow)" : state === "below" ? "var(--color-muted)" : "none"}
            stroke={state === "above" ? "var(--color-faint)" : "none"}
            strokeDasharray="3 2"
          />
        );
      })}
    </svg>
  );
}

export function Layers({ s }: { s: LayersSectionType }) {
  const total = s.layers.length;
  return (
    <section id="lagen" className="bg-canvas py-20 sm:py-24 lg:py-28" aria-labelledby="lagen-h">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="lagen-h" className="text-3xl lg:col-span-6 lg:text-[2.75rem] lg:leading-[1.08]">
            {s.heading}
          </h2>
          {s.intro ? <p className="text-lg text-slate lg:col-span-6 lg:pt-2">{s.intro}</p> : null}
        </div>

        <ol className="mt-14 border-t border-rule">
          {s.layers.map((layer, i) => (
            <li key={layer._key} className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-4 border-b border-line py-8 md:grid-cols-[3rem_minmax(0,15rem)_1fr_minmax(0,13rem)] md:gap-8">
              <div className="pt-1.5">
                <LayerGlyph index={i} total={total} />
              </div>
              <div>
                <p className="font-mono text-sm text-muted">Laag {i + 1}</p>
                <h3 className="mt-1 text-2xl">{layer.name}</h3>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-lg font-medium text-paper">{layer.question}</p>
                <p className="mt-2 text-slate">{layer.body}</p>
              </div>
              <div className="col-span-2 md:col-span-1 md:pt-1">
                <p className="text-sm text-muted">Wat we doen</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {layer.capabilities.map((c) => (
                    <li key={c}>
                      <a href="#wat-we-doen" className="inline-flex min-h-9 items-center rounded-[5px] border border-rule px-3 text-sm font-semibold text-paper hover:border-yellow hover:bg-yellow hover:text-ink">
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid items-center gap-4 rounded-[5px] bg-yellow px-6 py-5 text-ink md:grid-cols-[3rem_minmax(0,15rem)_1fr] md:gap-8">
          <svg width="36" height="12" viewBox="0 0 36 12" aria-hidden="true">
            <rect width="36" height="12" fill="var(--color-ink)" />
          </svg>
          <p className="text-2xl font-semibold tracking-[-0.02em]">{s.topLabel}</p>
          {s.note ? <p className="font-medium">{s.note}</p> : null}
        </div>
      </Container>
    </section>
  );
}
