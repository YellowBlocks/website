/**
 * Home hero visual: the three domains (top) and the three engineering
 * disciplines (bottom), connected through the Microsoft Graph API.
 * Same visual language as BlockLattice: one reveal on load, static with reduced motion.
 */

type Kind = "domain" | "spine" | "discipline" | "insight";

interface Box {
  id: string;
  kind: Kind;
  title: string;
  detail: string;
  d: { x: number; y: number; w: number; h: number };
  m: { x: number; y: number; w: number; h: number };
  delay: number;
}

const boxes: Box[] = [
  { id: "id", kind: "domain", title: "Identity", detail: "Entra ID, toegangsbeleid", d: { x: 16, y: 24, w: 176, h: 62 }, m: { x: 16, y: 16, w: 308, h: 50 }, delay: 0.1 },
  { id: "m365", kind: "domain", title: "Microsoft 365", detail: "tenant, governance", d: { x: 212, y: 24, w: 176, h: 62 }, m: { x: 16, y: 76, w: 308, h: 50 }, delay: 0.2 },
  { id: "mw", kind: "domain", title: "Modern work", detail: "Intune, Windows, AVD", d: { x: 408, y: 24, w: 176, h: 62 }, m: { x: 16, y: 136, w: 308, h: 50 }, delay: 0.3 },
  { id: "graph", kind: "spine", title: "Microsoft Graph API", detail: "uitlezen, vergelijken, automatiseren", d: { x: 16, y: 150, w: 568, h: 52 }, m: { x: 16, y: 214, w: 308, h: 50 }, delay: 0.75 },
  { id: "auto", kind: "discipline", title: "Automation", detail: "PowerShell, pipelines", d: { x: 16, y: 266, w: 176, h: 62 }, m: { x: 16, y: 292, w: 308, h: 50 }, delay: 1.2 },
  { id: "scale", kind: "discipline", title: "Schaalbaarheid", detail: "multi-tenant, as code", d: { x: 212, y: 266, w: 176, h: 62 }, m: { x: 16, y: 352, w: 308, h: 50 }, delay: 1.35 },
  { id: "mon", kind: "insight", title: "Monitoring", detail: "drift, desired state", d: { x: 408, y: 266, w: 176, h: 62 }, m: { x: 16, y: 412, w: 308, h: 50 }, delay: 1.6 },
];

const byId = Object.fromEntries(boxes.map((b) => [b.id, b]));

/** Vertical connectors between the domain row, the spine and the discipline row. */
const linksDesktop = ["id", "m365", "mw"].map((id, i) => {
  const b = byId[id].d;
  const x = b.x + b.w / 2;
  return { key: `up-${id}`, d: `M${x} ${b.y + b.h} V150`, len: 64, delay: 0.55 + i * 0.05, yellow: false };
}).concat(
  ["auto", "scale", "mon"].map((id, i) => {
    const b = byId[id].d;
    const x = b.x + b.w / 2;
    return { key: `down-${id}`, d: `M${x} 202 V${b.y}`, len: 64, delay: 1.0 + i * 0.1, yellow: id === "mon" };
  }),
);

const styleFor = (kind: Kind) => {
  switch (kind) {
    case "insight":
      return { fill: "var(--color-yellow)", stroke: "none", title: "var(--color-ink)", detail: "var(--color-ink)" };
    case "spine":
      return { fill: "var(--color-ink-3)", stroke: "var(--color-on-ink-muted)", title: "var(--color-paper)", detail: "var(--color-on-ink)" };
    case "discipline":
      return { fill: "var(--color-ink-2)", stroke: "var(--color-on-ink-muted)", title: "var(--color-paper)", detail: "var(--color-on-ink-muted)" };
    default:
      return { fill: "var(--color-ink-2)", stroke: "var(--color-ink-line)", title: "var(--color-on-ink)", detail: "var(--color-on-ink-muted)" };
  }
};

function Diagram({ layout }: { layout: "d" | "m" }) {
  const width = layout === "d" ? 600 : 340;
  const height = layout === "d" ? 344 : 478;
  const dots: { x: number; y: number }[] = [];
  for (let x = 6; x < width; x += 28) for (let y = 6; y < height; y += 28) dots.push({ x, y });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-labelledby={`domains-title-${layout}`}>
      <title id={`domains-title-${layout}`}>
        Identity, Microsoft 365 en modern work, verbonden via de Microsoft Graph API met automation, schaalbaarheid en monitoring.
      </title>
      <g aria-hidden="true">
        {dots.map((c) => (
          <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width="3" height="3" fill="var(--color-ink-line)" />
        ))}
      </g>
      {layout === "d" ? (
        linksDesktop.map((l) => (
          <path
            key={l.key}
            d={l.d}
            fill="none"
            stroke={l.yellow ? "var(--color-yellow)" : "var(--color-on-ink-muted)"}
            strokeWidth="1.5"
            className="yb-draw"
            style={{ ["--len" as string]: l.len, ["--d" as string]: `${l.delay}s` }}
          />
        ))
      ) : (
        <path d="M330 41 V437" fill="none" stroke="var(--color-on-ink-muted)" strokeWidth="1.5" className="yb-draw" style={{ ["--len" as string]: 400, ["--d" as string]: "0.4s" }} />
      )}
      {boxes.map((b) => {
        const r = b[layout];
        const s = styleFor(b.kind);
        const centered = b.kind === "spine" && layout === "d";
        const tx = centered ? r.x + r.w / 2 : r.x + 12;
        return (
          <g key={b.id} className="yb-appear" style={{ ["--d" as string]: `${b.delay}s` }}>
            {layout === "m" ? <path d={`M${r.x + r.w} ${r.y + r.h / 2} H330`} stroke="var(--color-on-ink-muted)" strokeWidth="1.5" /> : null}
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={s.fill} stroke={s.stroke} strokeWidth="1.5" rx="5" />
            {b.kind === "spine" ? <rect x={r.x} y={r.y} width="6" height={r.h} fill="var(--color-yellow)" /> : null}
            <text x={tx} y={r.y + (layout === "m" ? 21 : 26)} textAnchor={centered ? "middle" : "start"} fontSize="13.5" fontWeight="600" fill={s.title} fontFamily="var(--font-sans)">
              {b.title}
            </text>
            <text x={tx} y={r.y + (layout === "m" ? 39 : 46)} textAnchor={centered ? "middle" : "start"} fontSize="11" fill={s.detail} fontFamily="var(--font-mono)">
              {b.detail}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DomainsDiagram() {
  return (
    <figure>
      <div className="hidden sm:block">
        <Diagram layout="d" />
      </div>
      <div className="sm:hidden">
        <Diagram layout="m" />
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-on-ink-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 border border-ink-line bg-ink-2" aria-hidden="true" /> Domeinen
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 border border-on-ink-muted bg-ink-2" aria-hidden="true" /> Engineering
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 bg-yellow" aria-hidden="true" /> Inzicht
        </span>
      </figcaption>
    </figure>
  );
}
