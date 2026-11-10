/**
 * Signature visual: configuration blocks resolving into one insight.
 * Configuration → Relations → Context → Impact → Advice, drawn on a lattice.
 * Synthetic data. One orchestrated reveal on load; static with reduced motion.
 */

type Kind = "config" | "derived" | "context" | "impact" | "advice";

interface Block {
  id: string;
  kind: Kind;
  title: string;
  detail: string;
  /** desktop (600×440) and mobile (340×700) positions */
  d: { x: number; y: number; w: number; h: number };
  m: { x: number; y: number; w: number; h: number };
  delay: number;
}

const blocks: Block[] = [
  { id: "b1", kind: "config", title: "Compliance-policy", detail: "Windows 11 baseline", d: { x: 16, y: 36, w: 176, h: 58 }, m: { x: 16, y: 16, w: 300, h: 50 }, delay: 0.1 },
  { id: "b2", kind: "config", title: "Toewijzingsfilter", detail: "osVersion 10.0.22*", d: { x: 16, y: 122, w: 176, h: 58 }, m: { x: 16, y: 78, w: 300, h: 50 }, delay: 0.25 },
  { id: "b3", kind: "config", title: "Conditional Access", detail: "grant: compliantDevice", d: { x: 16, y: 208, w: 176, h: 58 }, m: { x: 16, y: 140, w: 300, h: 50 }, delay: 0.4 },
  { id: "b4", kind: "derived", title: "312 apparaten", detail: "build 10.0.26100", d: { x: 212, y: 122, w: 176, h: 58 }, m: { x: 16, y: 222, w: 300, h: 50 }, delay: 1.1 },
  { id: "b5", kind: "context", title: "Context, te bevestigen", detail: "upgrade naar 24H2", d: { x: 212, y: 268, w: 176, h: 58 }, m: { x: 16, y: 296, w: 300, h: 50 }, delay: 1.6 },
  { id: "b6", kind: "impact", title: "Buiten de toewijzing", detail: "geen compliance-toets", d: { x: 404, y: 122, w: 176, h: 58 }, m: { x: 16, y: 378, w: 300, h: 50 }, delay: 2.1 },
  { id: "b7", kind: "advice", title: "Advies", detail: "filter laten gelden\nvoor alle builds", d: { x: 404, y: 268, w: 176, h: 76 }, m: { x: 16, y: 452, w: 300, h: 66 }, delay: 2.6 },
];

const links: { from: string; to: string; delay: number }[] = [
  { from: "b1", to: "b4", delay: 0.8 },
  { from: "b2", to: "b4", delay: 0.85 },
  { from: "b4", to: "b5", delay: 1.4 },
  { from: "b4", to: "b6", delay: 1.85 },
  { from: "b3", to: "b6", delay: 1.9 },
  { from: "b6", to: "b7", delay: 2.4 },
];

const byId = Object.fromEntries(blocks.map((b) => [b.id, b]));

type Lang = "nl" | "en";
const EN: Record<string, { title: string; detail?: string }> = {
  b1: { title: "Compliance policy" },
  b2: { title: "Assignment filter" },
  b4: { title: "312 devices" },
  b5: { title: "Context, to confirm", detail: "upgrade to 24H2" },
  b6: { title: "Outside assignment", detail: "no compliance check" },
  b7: { title: "Advice", detail: "apply the filter\nto all builds" },
};
const label = (b: Block, lang: Lang) => (lang === "en" ? { title: EN[b.id]?.title ?? b.title, detail: EN[b.id]?.detail ?? b.detail } : b);
const TEXT = {
  nl: {
    title:
      "Illustratief voorbeeld: een compliance-policy, een toewijzingsfilter en een Conditional Access-policy leiden samen tot 312 apparaten buiten de compliance-toewijzing. Advies: het filter build-onafhankelijk maken.",
    config: "Configuratie",
    context: "Te bevestigen context",
    insight: "Inzicht en advies",
    note: "Illustratief voorbeeld, fictieve gegevens.",
  },
  en: {
    title:
      "Illustrative example: a compliance policy, an assignment filter and a Conditional Access policy together leave 312 devices outside the compliance assignment. Advice: make the filter independent of the build.",
    config: "Configuration",
    context: "Context to confirm",
    insight: "Insight and advice",
    note: "Illustrative example, fictional data.",
  },
};

function path(layout: "d" | "m", from: Block, to: Block) {
  const a = from[layout];
  const b = to[layout];
  if (layout === "m") {
    // vertical: right edge rail
    const x1 = a.x + a.w;
    const y1 = a.y + a.h / 2;
    const x2 = b.x + b.w;
    const y2 = b.y + b.h / 2;
    const rail = 330;
    return { d: `M${x1} ${y1} H${rail} V${y2} H${x2}`, len: Math.abs(rail - x1) + Math.abs(y2 - y1) + Math.abs(rail - x2) };
  }
  const sameColumn = Math.abs(a.x - b.x) < 5;
  if (sameColumn) {
    const x = a.x + a.w / 2;
    return { d: `M${x} ${a.y + a.h} V${b.y}`, len: Math.abs(b.y - a.y - a.h) };
  }
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  // Turn just before the target so connectors never cross intermediate blocks.
  const mid = x2 - 12;
  return { d: `M${x1} ${y1} H${mid} V${y2} H${x2}`, len: Math.abs(mid - x1) + Math.abs(y2 - y1) + Math.abs(x2 - mid) };
}

const styleFor = (kind: Kind) => {
  switch (kind) {
    case "advice":
      return { fill: "var(--color-yellow)", stroke: "none", title: "var(--color-ink)", detail: "var(--color-ink)", dash: undefined };
    case "context":
      return { fill: "transparent", stroke: "var(--color-on-ink-muted)", title: "var(--color-on-ink)", detail: "var(--color-on-ink-muted)", dash: "4 4" };
    case "impact":
      return { fill: "var(--color-ink-3)", stroke: "var(--color-yellow)", title: "var(--color-paper)", detail: "var(--color-on-ink)", dash: undefined };
    case "derived":
      return { fill: "var(--color-ink-3)", stroke: "var(--color-on-ink-muted)", title: "var(--color-paper)", detail: "var(--color-on-ink)", dash: undefined };
    default:
      return { fill: "var(--color-ink-2)", stroke: "var(--color-ink-line)", title: "var(--color-on-ink)", detail: "var(--color-on-ink-muted)", dash: undefined };
  }
};

function Lattice({ layout, width, height }: { layout: "d" | "m"; width: number; height: number }) {
  const pitch = 28;
  const cells: { x: number; y: number }[] = [];
  for (let x = 6; x < width; x += pitch) for (let y = 6; y < height; y += pitch) cells.push({ x, y });
  return (
    <g aria-hidden="true">
      {cells.map((c) => (
        <rect key={`${layout}${c.x}-${c.y}`} x={c.x} y={c.y} width="3" height="3" fill="var(--color-ink-line)" />
      ))}
    </g>
  );
}

function Diagram({ layout, lang }: { layout: "d" | "m"; lang: Lang }) {
  const width = layout === "d" ? 600 : 340;
  const height = layout === "d" ? 380 : 534;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-labelledby={`lattice-title-${layout}`}>
      <title id={`lattice-title-${layout}`}>{TEXT[lang].title}</title>
      <Lattice layout={layout} width={width} height={height} />
      {links.map((l) => {
        const p = path(layout, byId[l.from], byId[l.to]);
        return (
          <path
            key={`${l.from}-${l.to}`}
            d={p.d}
            fill="none"
            stroke={l.to === "b7" || l.to === "b6" ? "var(--color-yellow)" : "var(--color-on-ink-muted)"}
            strokeWidth="1.5"
            className="yb-draw"
            style={{ ["--len" as string]: Math.ceil(p.len) + 2, ["--d" as string]: `${l.delay}s` }}
          />
        );
      })}
      {blocks.map((b) => {
        const r = b[layout];
        const s = styleFor(b.kind);
        return (
          <g key={b.id} className="yb-appear" style={{ ["--d" as string]: `${b.delay}s` }}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={s.fill} stroke={s.stroke} strokeWidth="1.5" strokeDasharray={s.dash} rx="5" />
            {b.kind === "advice" ? <rect x={r.x} y={r.y} width="6" height={r.h} fill="var(--color-ink)" opacity="0.85" /> : null}
            <text x={r.x + (b.kind === "advice" ? 18 : 12)} y={r.y + (layout === "m" ? 20 : 23)} fontSize="13" fontWeight="600" fill={s.title} fontFamily="var(--font-sans)">
              {label(b, lang).title}
            </text>
            <text x={r.x + (b.kind === "advice" ? 18 : 12)} y={r.y + (layout === "m" ? 38 : 43)} fontSize="11" fill={s.detail} fontFamily="var(--font-mono)">
              {label(b, lang).detail.split("\n").map((line, i) => (
                <tspan key={line} x={r.x + (b.kind === "advice" ? 18 : 12)} dy={i === 0 ? 0 : 15}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BlockLattice({ lang = "nl" }: { lang?: Lang }) {
  const t = TEXT[lang];
  return (
    <figure className="relative">
      <div className="hidden sm:block">
        <Diagram layout="d" lang={lang} />
      </div>
      <div className="sm:hidden">
        <Diagram layout="m" lang={lang} />
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-on-ink-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 border border-ink-line bg-ink-2" aria-hidden="true" /> {t.config}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 border border-dashed border-on-ink-muted" aria-hidden="true" /> {t.context}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 bg-yellow" aria-hidden="true" /> {t.insight}
        </span>
        <span>{t.note}</span>
      </figcaption>
    </figure>
  );
}
