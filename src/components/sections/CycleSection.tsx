import type { CycleSection as CycleSectionType } from "@/lib/content/types";
import { BlockBullet, ButtonLink, Container } from "@/components/ui/primitives";

/**
 * Plan–Do–Check–Act as four blocks in a clockwise loop, with maturity growing
 * in the middle. The diagram is drawn from the step data, so the CMS controls the labels.
 */
function CycleDiagram({ steps, centerLabel }: { steps: CycleSectionType["steps"]; centerLabel: string }) {
  const pos = [
    { x: 16, y: 16 },
    { x: 224, y: 16 },
    { x: 224, y: 264 },
    { x: 16, y: 264 },
  ];
  const w = 160;
  const h = 120;
  const arrows = [
    "M180 76 H218", // top-left → top-right
    "M304 140 V258", // top-right → bottom-right
    "M220 324 H182", // bottom-right → bottom-left
    "M96 260 V142", // bottom-left → top-left
  ];
  const [l1, l2] = centerLabel.split("\n");
  return (
    <svg viewBox="0 0 400 400" className="h-auto w-full max-w-[26rem]" role="img" aria-labelledby="cycle-title">
      <title id="cycle-title">{`Doorlopende cyclus: ${steps.map((s) => s.title).join(", ")}, en daarna opnieuw.`}</title>
      <defs>
        <marker id="cycle-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--color-muted)" />
        </marker>
      </defs>
      {arrows.map((d) => (
        <path key={d} d={d} stroke="var(--color-muted)" strokeWidth="2" fill="none" markerEnd="url(#cycle-arrow)" />
      ))}
      {steps.slice(0, 4).map((s, i) => {
        const p = pos[i];
        return (
          <g key={s._key}>
            <rect x={p.x} y={p.y} width={w} height={h} fill="var(--color-ink)" stroke="var(--color-line)" rx="5" />
            <text x={p.x + 16} y={p.y + 42} fontSize="34" fontWeight="700" fill="var(--color-yellow)" fontFamily="var(--font-sans)">
              {s.letter}
            </text>
            <text x={p.x + 16} y={p.y + 76} fontSize={s.title.length > 14 ? 15 : 17} fontWeight="650" fill="var(--color-paper)" fontFamily="var(--font-sans)">
              {s.title}
            </text>
            <text x={p.x + 16} y={p.y + 98} fontSize="12.5" fill="var(--color-on-ink-muted)" fontFamily="var(--font-sans)">
              {s.subtitle}
            </text>
          </g>
        );
      })}
      {/* Centre: maturity rises with each turn of the loop. */}
      <g>
        <rect x="150" y="150" width="100" height="100" fill="var(--color-yellow)" rx="5" />
        <rect x="166" y="214" width="14" height="20" fill="var(--color-ink)" />
        <rect x="186" y="202" width="14" height="32" fill="var(--color-ink)" />
        <rect x="206" y="188" width="14" height="46" fill="var(--color-ink)" />
        <text x="200" y="172" textAnchor="middle" fontSize="11.5" fontWeight="650" fill="var(--color-ink)" fontFamily="var(--font-sans)">
          {l1}
        </text>
        {l2 ? (
          <text x="200" y="185" textAnchor="middle" fontSize="11.5" fontWeight="650" fill="var(--color-ink)" fontFamily="var(--font-sans)">
            {l2}
          </text>
        ) : null}
      </g>
    </svg>
  );
}

export function CycleBlock({ s }: { s: CycleSectionType }) {
  return (
    <section id="wat-we-doen" className="bg-mist py-20 sm:py-24 lg:py-28" aria-labelledby="wat-we-doen-h">
      <Container>
        <div className="max-w-[46rem]">
          <h2 id="wat-we-doen-h" className="text-2xl sm:text-3xl">
            {s.heading}
          </h2>
          {s.intro ? <p className="mt-5 text-lg text-slate">{s.intro}</p> : null}
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <CycleDiagram steps={s.steps} centerLabel={s.centerLabel} />
            </div>
          </div>
          <ol className="border-t border-rule lg:col-span-7">
            {s.steps.map((step) => (
              <li key={step._key} className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-line py-7">
                <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-[5px] border border-line bg-ink text-xl font-bold text-yellow">
                  {step.letter}
                </span>
                <div>
                  <p className="text-sm text-muted">{step.subtitle}</p>
                  <h3 className="text-xl">{step.title}</h3>
                  <p className="mt-2 text-slate">{step.body}</p>
                  <ul className="mt-4 grid gap-2 text-[0.97rem] text-slate sm:grid-cols-2">
                    {step.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <BlockBullet className="bg-muted" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {s.note || s.cta ? (
          <div className="mt-12 flex flex-col gap-6 rounded-r-[5px] border-l-4 border-yellow bg-canvas px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            {s.note ? <p className="max-w-[60ch] text-slate">{s.note}</p> : null}
            {s.cta ? <ButtonLink cta={s.cta} className="shrink-0" /> : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
