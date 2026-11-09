import type {
  AudienceSection,
  BoundariesSection,
  ContrastSection,
  CtaSection,
  DeliverablesSection,
  ExampleInsightSection,
  FaqSection,
  PageSection,
  PricingSection,
  ProblemSection,
  ProcessSection,
  RichTextSection,
  ScopeSection,
  TestimonialsSection,
} from "@/lib/content/types";
import { BlockBullet, ButtonLink, Container, ReviewMarker, SplitSection } from "@/components/ui/primitives";
import { PortableTextView } from "@/components/ui/PortableTextView";
import { siteConfig } from "@/config/site";
import { Approach, Founder, InsightsList, SolutionsList } from "./CompositeSections";
import { Capabilities, Engagement } from "./OverviewSections";
import { CycleBlock } from "./CycleSection";
import { ProblemSolution } from "./ProblemSolution";
import { Layers } from "./LayersSection";
import { Pillars } from "./Pillars";

/* Stable, readable anchors for in-page links and CTAs. */
const anchors: Partial<Record<PageSection["_type"], string>> = {
  problemSection: "probleem",
  contrastSection: "verschil",
  exampleInsightSection: "voorbeeld",
  scopeSection: "wat-we-onderzoeken",
  deliverablesSection: "wat-je-ontvangt",
  processSection: "verloop",
  audienceSection: "voor-wie",
  boundariesSection: "scope-en-beperkingen",
  pricingSection: "prijs",
  faqSection: "veelgestelde-vragen",
};

export function Problem({ s }: { s: ProblemSection }) {
  return (
    <SplitSection id={anchors.problemSection} heading={s.heading} intro={s.intro}>
      <ol className="divide-y divide-line border-y border-line">
        {s.points.map((p) => (
          <li key={p._key} className="grid gap-2 py-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
            <h3 className="flex gap-3 text-lg">
              <BlockBullet />
              {p.title}
            </h3>
            <p className="text-slate">{p.body}</p>
          </li>
        ))}
      </ol>
    </SplitSection>
  );
}

export function Contrast({ s }: { s: ContrastSection }) {
  return (
    <section id={anchors.contrastSection} className="bg-mist py-20 sm:py-24 lg:py-28" aria-labelledby="verschil-h">
      <Container>
        <div className="max-w-[44rem]">
          <h2 id="verschil-h" className="text-2xl sm:text-3xl">
            {s.heading}
          </h2>
          {s.intro ? <p className="mt-5 text-muted">{s.intro}</p> : null}
        </div>
        <div className="mt-12 grid lg:grid-cols-[5fr_7fr]">
          <div className="rounded-[5px] border border-line bg-canvas p-7 sm:p-9">
            <h3 className="text-base font-semibold text-muted!">{s.ordinaryLabel}</h3>
            <ul className="mt-5 space-y-3.5">
              {s.ordinary.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <BlockBullet className="border border-faint bg-transparent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="on-ink rounded-[5px] border border-yellow/40 bg-ink p-7 sm:p-9 lg:-my-6 lg:p-11">
            <h3 className="text-base font-semibold text-yellow!">{s.contextualLabel}</h3>
            <ul className="mt-5 space-y-3.5">
              {s.contextual.map((item) => (
                <li key={item} className="flex gap-3 text-on-ink">
                  <BlockBullet />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

const kindLabel = { fact: "Vastgesteld", hypothesis: "Te bevestigen", effect: "Mogelijk, niet bewezen" } as const;

export function ExampleInsight({ s }: { s: ExampleInsightSection }) {
  return (
    <SplitSection id={anchors.exampleInsightSection} heading={s.heading} intro={s.intro} tone="mist">
      <div className="overflow-hidden rounded-[5px] border border-line bg-canvas">
        <div className="border-b border-line bg-fog px-6 py-5 sm:px-8">
          <p className="text-sm font-medium text-muted">{s.observationSource}</p>
          <p className="mt-2 font-mono text-[0.92rem] text-paper">{s.observation}</p>
        </div>
        <ol className="relative px-6 py-6 sm:px-8">
          <span aria-hidden="true" className="absolute bottom-10 left-[2.15rem] top-10 w-px bg-line sm:left-[2.65rem]" />
          {s.chain.map((c) => (
            <li key={c._key} className="relative flex gap-4 py-3">
              <span
                aria-hidden="true"
                className={`relative z-10 mt-1 size-3.5 shrink-0 ${
                  c.kind === "effect" ? "bg-yellow" : c.kind === "hypothesis" ? "border-2 border-dashed border-unknown bg-canvas" : "bg-paper"
                }`}
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-paper">{c.label}</span>
                  <span className="ml-2 text-muted">{kindLabel[c.kind]}</span>
                </p>
                <p className="mt-1 text-slate">{c.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t-4 border-yellow bg-canvas px-6 py-6 sm:px-8">
          <p className="text-lg font-semibold leading-snug text-paper">{s.insight}</p>
          <p className="mt-3 text-sm text-muted">{s.validationQuestion}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">Illustratief voorbeeld. Namen en aantallen zijn fictief.</p>
    </SplitSection>
  );
}

export function Scope({ s }: { s: ScopeSection }) {
  return (
    <SplitSection id={anchors.scopeSection} heading={s.heading} intro={s.intro}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {s.groups.map((g) => (
          <div key={g._key} className="border-t-[3px] border-yellow pt-5">
            <h3 className="text-lg">{g.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3 text-slate">
                  <BlockBullet className="bg-muted" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SplitSection>
  );
}

export function Deliverables({ s }: { s: DeliverablesSection }) {
  const sample = siteConfig.sampleReportUrl;
  return (
    <SplitSection id={anchors.deliverablesSection} heading={s.heading} intro={s.intro} tone="mist">
      <dl className="grid gap-px overflow-hidden rounded-[5px] border border-line bg-line sm:grid-cols-2">
        {s.items.map((d) => (
          <div key={d._key} className="bg-canvas p-6 sm:p-7">
            <dt className="font-semibold text-paper">{d.title}</dt>
            <dd className="mt-2 text-[0.98rem] text-slate">{d.body}</dd>
          </div>
        ))}
      </dl>
      {sample && s.sampleReportCta ? (
        <div className="mt-8">
          <ButtonLink cta={{ ...s.sampleReportCta, label: "Bekijk een voorbeeldrapport", href: sample }} variant="secondary" />
        </div>
      ) : null}
    </SplitSection>
  );
}

export function Process({ s }: { s: ProcessSection }) {
  return (
    <section id={anchors.processSection} className="bg-canvas py-20 sm:py-24 lg:py-28" aria-labelledby="verloop-h">
      <Container>
        <h2 id="verloop-h" className="max-w-[40rem] text-2xl sm:text-3xl">
          {s.heading}
        </h2>
        {s.intro ? <p className="mt-5 max-w-[44rem] text-muted">{s.intro}</p> : null}
        <ol className="mt-12 grid gap-0 lg:grid-cols-5">
          {s.steps.map((step, i) => (
            <li key={step._key} className="relative border-l-[3px] border-line pb-9 pl-6 lg:border-l-0 lg:border-t-[3px] lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-6">
              <span
                aria-hidden="true"
                className={`absolute -left-[3px] top-0 h-8 w-[3px] lg:-top-[3px] lg:left-0 lg:h-[3px] lg:w-10 ${i === s.steps.length - 1 ? "bg-yellow" : "bg-paper"}`}
              />
              <p className="font-mono text-sm text-muted">Stap {i + 1}</p>
              <h3 className="mt-2 text-lg">{step.title}</h3>
              <p className="mt-2 text-[0.98rem] text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Audience({ s }: { s: AudienceSection }) {
  return (
    <SplitSection id={anchors.audienceSection} heading={s.heading} intro={s.intro}>
      <dl className="border-t border-line">
        {s.audiences.map((a) => (
          <div key={a._key} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[minmax(0,17rem)_1fr] sm:gap-8">
            <dt className="font-semibold text-paper">{a.role}</dt>
            <dd className="text-slate">{a.need}</dd>
          </div>
        ))}
      </dl>
    </SplitSection>
  );
}

export function Boundaries({ s }: { s: BoundariesSection }) {
  return (
    <SplitSection id={anchors.boundariesSection} heading={s.heading} intro={s.intro} tone="mist">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="text-lg">Wel inbegrepen</h3>
          <ul className="mt-4 space-y-3">
            {s.included.map((it) => (
              <li key={it} className="flex gap-3 text-slate">
                <svg className="mt-1 size-4 shrink-0 text-ok" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Niet inbegrepen</h3>
          <ul className="mt-4 space-y-3">
            {s.excluded.map((it) => (
              <li key={it} className="flex gap-3 text-slate">
                <svg className="mt-1 size-4 shrink-0 text-muted" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {s.note ? <p className="mt-10 rounded-r-[5px] border-l-4 border-yellow bg-canvas px-5 py-4 text-slate">{s.note}</p> : null}
    </SplitSection>
  );
}

export function Pricing({ s }: { s: PricingSection }) {
  return (
    <section id={anchors.pricingSection} className="bg-canvas py-20 sm:py-24" aria-labelledby="prijs-h">
      <Container>
        <div className="on-ink grid overflow-hidden rounded-[5px] border border-line bg-ink lg:grid-cols-12">
          <div className="p-8 sm:p-11 lg:col-span-5">
            <h2 id="prijs-h" className="text-xl text-on-ink-muted!">
              {s.heading}
              {!s.approved ? <ReviewMarker>commerciële voorwaarden</ReviewMarker> : null}
            </h2>
            <p className="mt-4 text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-[-0.03em] text-paper">
              {s.priceLabel}
              {s.vatNote ? <span className="ml-3 text-lg font-normal tracking-normal text-on-ink-muted">{s.vatNote}</span> : null}
            </p>
            {s.note ? <p className="mt-6 max-w-[40ch] text-on-ink-muted">{s.note}</p> : null}
            <div className="mt-8">
              <ButtonLink cta={s.cta} variant="onInk" />
            </div>
          </div>
          <div className="border-t border-ink-line p-8 sm:p-11 lg:col-span-7 lg:border-l lg:border-t-0">
            <h3 className="text-base font-semibold text-paper!">{s.model === "fixed" ? "Standaardscope" : "Waar de prijs van afhangt"}</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.scope.map((it) => (
                <li key={it} className="flex gap-3 text-on-ink">
                  <BlockBullet />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Faq({ s }: { s: FaqSection }) {
  return (
    <SplitSection id={anchors.faqSection} heading={s.heading}>
      <div className="border-t border-line">
        {s.items.map((f) => (
          <details key={f._key} className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-paper [&::-webkit-details-marker]:hidden">
              {f.question}
              <span aria-hidden="true" className="relative size-3.5 shrink-0">
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-yellow" />
                <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-yellow transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-[62ch] pb-6 text-slate">{f.answer}</p>
          </details>
        ))}
      </div>
    </SplitSection>
  );
}

export function RichText({ s }: { s: RichTextSection }) {
  return (
    <SplitSection heading={s.heading}>
      <PortableTextView value={s.body} />
    </SplitSection>
  );
}

export function CtaBlock({ s }: { s: CtaSection }) {
  return (
    <section className="on-ink relative overflow-hidden bg-ink py-20 sm:py-24" aria-labelledby={`cta-${s._key}`}>
      <CtaPattern />
      <Container className="relative">
        <div className="max-w-[44rem]">
          <h2 id={`cta-${s._key}`} className="text-3xl text-paper!">
            {s.heading}
          </h2>
          {s.body ? <p className="mt-5 text-lg text-on-ink-muted">{s.body}</p> : null}
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink cta={s.primary} variant="onInk" />
            {s.secondary ? <ButtonLink cta={s.secondary} variant="onInkSecondary" /> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Quiet block pattern anchoring the right edge of closing CTAs. */
function CtaPattern() {
  const cells = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 2],
  ];
  return (
    <svg aria-hidden="true" className="absolute -right-6 bottom-0 hidden h-full w-[22rem] md:block" viewBox="0 0 300 300" preserveAspectRatio="xMaxYMax meet">
      {cells.flatMap((row, r) =>
        row.map((v, c) =>
          v ? (
            <rect key={`${r}${c}`} x={c * 100 + 6} y={r * 100 + 6} width="88" height="88" rx="5" fill={v === 2 ? "var(--color-yellow)" : "var(--color-ink-2)"} />
          ) : (
            <rect key={`${r}${c}`} x={c * 100 + 6} y={r * 100 + 6} width="88" height="88" rx="5" fill="none" stroke="var(--color-ink-line)" strokeDasharray="4 4" />
          ),
        ),
      )}
    </svg>
  );
}

/** Renders only verified testimonials; renders nothing until real ones exist. */
export function Testimonials({ s }: { s: TestimonialsSection }) {
  const items = s.items.filter((t) => t.verified);
  if (items.length === 0) return null;
  return (
    <SplitSection heading={s.heading}>
      <div className="space-y-10">
        {items.map((t) => (
          <figure key={t.name} className="border-l-4 border-yellow pl-6">
            <blockquote className="text-xl leading-snug text-paper">{t.quote}</blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              {t.name}, {t.role}, {t.company}
            </figcaption>
          </figure>
        ))}
      </div>
    </SplitSection>
  );
}

/** Registry: maps CMS section types to components. Add a type here once; use it everywhere. */
export function SectionRenderer({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((s) => {
        switch (s._type) {
          case "pillarsSection":
            return <Pillars key={s._key} s={s} />;
          case "layersSection":
            return <Layers key={s._key} s={s} />;
          case "problemSolutionSection":
            return <ProblemSolution key={s._key} s={s} />;
          case "cycleSection":
            return <CycleBlock key={s._key} s={s} />;
          case "capabilitiesSection":
            return <Capabilities key={s._key} s={s} />;
          case "engagementSection":
            return <Engagement key={s._key} s={s} />;
          case "testimonialsSection":
            return <Testimonials key={s._key} s={s} />;
          case "solutionsSection":
            return <SolutionsList key={s._key} s={s} />;
          case "approachSection":
            return <Approach key={s._key} s={s} />;
          case "founderSection":
            return <Founder key={s._key} s={s} />;
          case "insightsSection":
            return <InsightsList key={s._key} s={s} />;
          case "problemSection":
            return <Problem key={s._key} s={s} />;
          case "contrastSection":
            return <Contrast key={s._key} s={s} />;
          case "exampleInsightSection":
            return <ExampleInsight key={s._key} s={s} />;
          case "scopeSection":
            return <Scope key={s._key} s={s} />;
          case "deliverablesSection":
            return <Deliverables key={s._key} s={s} />;
          case "processSection":
            return <Process key={s._key} s={s} />;
          case "audienceSection":
            return <Audience key={s._key} s={s} />;
          case "boundariesSection":
            return <Boundaries key={s._key} s={s} />;
          case "pricingSection":
            return <Pricing key={s._key} s={s} />;
          case "faqSection":
            return <Faq key={s._key} s={s} />;
          case "richTextSection":
            return <RichText key={s._key} s={s} />;
          case "ctaSection":
            return <CtaBlock key={s._key} s={s} />;
          default:
            return null;
        }
      })}
    </>
  );
}
