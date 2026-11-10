import type { LayersSection as LayersSectionType } from "@/lib/content/types";
import { Container, Section, SectionHeader } from "@/components/ui/primitives";
import { LayerStack } from "@/components/visuals/LayerStack";
import { getDictionary, getLocale } from "@/lib/i18n/server";

/** Mini stack: which layer this row is about. Lower layers solid, current yellow, higher dashed. */
function LayerGlyph({ index, total }: { index: number; total: number }) {
  const h = 5;
  const gap = 3;
  const height = total * h + (total - 1) * gap;
  return (
    <svg width="32" height={height} viewBox={`0 0 32 ${height}`} aria-hidden="true" className="shrink-0">
      {Array.from({ length: total }, (_, i) => {
        const y = height - (i + 1) * h - i * gap;
        const state = i < index ? "below" : i === index ? "current" : "above";
        return (
          <rect
            key={i}
            rx="1.5"
            x="0"
            y={y}
            width="32"
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
  const t = getDictionary();
  const lang = getLocale();
  const total = s.layers.length;
  return (
    <Section id="lagen" tone="mist">
      <Container>
        <SectionHeader id="lagen" eyebrow={t.eyebrows.layers} heading={s.heading} intro={s.intro} />

        <div className="card mx-auto mt-14 max-w-[44rem] p-6 sm:p-8">
          <LayerStack layers={s.layers.map((l) => l.name)} topLabel={s.topLabel} lang={lang} />
        </div>

        <ol className="mx-auto mt-10 grid max-w-[68rem] gap-4">
          {s.layers.map((layer, i) => (
            <li
              key={layer._key}
              className="card card-hover grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-4 p-6 md:grid-cols-[2.5rem_minmax(0,13rem)_1fr_minmax(0,12rem)] md:items-start md:gap-8 md:p-7"
            >
              <div className="pt-1.5">
                <LayerGlyph index={i} total={total} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                  {t.solution.layer} {i + 1}
                </p>
                <h3 className="mt-1 text-xl">{layer.name}</h3>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="font-medium text-paper">{layer.question}</p>
                <p className="mt-2 text-muted">{layer.body}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{t.solution.whatWeDo}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {layer.capabilities.map((c) => (
                    <li key={c}>
                      <a
                        href="#wat-we-doen"
                        className="inline-flex min-h-8 items-center rounded-full border border-yellow/30 bg-yellow/10 px-3 text-xs font-semibold text-yellow transition-colors hover:bg-yellow hover:text-ink"
                      >
                        {c}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-6 grid max-w-[68rem] items-center gap-3 rounded-[var(--radius-card)] bg-[linear-gradient(135deg,var(--color-yellow),var(--color-yellow-2))] px-7 py-6 text-ink md:grid-cols-[auto_1fr] md:gap-8">
          <p className="font-display text-2xl font-bold tracking-[-0.02em]">{s.topLabel}</p>
          {s.note ? <p className="font-medium">{s.note}</p> : null}
        </div>
      </Container>
    </Section>
  );
}
