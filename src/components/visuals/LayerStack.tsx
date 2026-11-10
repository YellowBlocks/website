/**
 * Hero visual: the layers between "ingesteld" and "geregeld", stacked as rows
 * of blocks. Lower layers are usually in order; the higher you go, the bigger
 * the gap (dashed blocks). Illustrative, not a measurement.
 * Plain HTML so it reflows on mobile; one bottom-up reveal, static with reduced motion.
 */
const CELLS = 12;

const TEXT = {
  nl: { sr: (l: string) => `Van ingesteld naar geregeld: ${l}. Hoe hoger de laag, hoe vaker er een kloof zit tussen wat bedoeld is en wat er gebeurt.`, ok: "Op orde", gap: "Kloof" },
  en: { sr: (l: string) => `From configured to in control: ${l}. The higher the layer, the more often there is a gap between what was intended and what happens.`, ok: "In order", gap: "Gap" },
};

export function LayerStack({ layers, topLabel, caption, lang = "nl" }: { layers: string[]; topLabel: string; caption?: string; lang?: "nl" | "en" }) {
  const t = TEXT[lang];
  const rows = layers.map((name, i) => ({ name, filled: Math.max(2, CELLS - i * 2), fromBottom: i }));
  const ordered = [...rows].reverse();
  const topDelay = rows.length * 0.18 + 0.2;

  return (
    <figure>
      <p className="sr-only">
        {t.sr(layers.join(", "))}
      </p>
      <div aria-hidden="true" className="space-y-2.5">
        <Row label={topLabel} tone="top" filled={CELLS} delay={topDelay} />
        <div className="ml-[7.5rem] h-px bg-line sm:ml-[9rem]" />
        {ordered.map((r) => (
          <Row key={r.name} label={r.name} tone="layer" filled={r.filled} delay={0.15 + r.fromBottom * 0.18} />
        ))}
      </div>
      {caption ? (
        <figcaption className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 bg-muted/60" aria-hidden="true" /> {t.ok}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2.5 border border-dashed border-on-ink-muted" aria-hidden="true" /> {t.gap}
          </span>
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function Row({ label, tone, filled, delay }: { label: string; tone: "top" | "layer"; filled: number; delay: number }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] items-center gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-2">
      <span className={`text-sm ${tone === "top" ? "font-semibold text-yellow" : "text-on-ink"}`}>{label}</span>
      <span className="yb-appear grid grid-cols-12 gap-1 sm:gap-1.5" style={{ ["--d" as string]: `${delay}s` }}>
        {Array.from({ length: CELLS }, (_, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[3px] ${
              tone === "top" ? "bg-yellow" : i < filled ? "bg-muted/60" : "border border-dashed border-rule"
            }`}
          />
        ))}
      </span>
    </div>
  );
}
