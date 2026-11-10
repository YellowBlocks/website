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
import { Accent, BlockBullet, ButtonLink, Container, IconTile, ReviewMarker, Section, SectionHeader, SplitSection } from "@/components/ui/primitives";
import { PortableTextView } from "@/components/ui/PortableTextView";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/i18n/server";
import { Approach, Founder, InsightsList, SolutionsList } from "./CompositeSections";
import { Capabilities, Engagement } from "./OverviewSections";
import { CycleBlock } from "./CycleSection";
import { ProblemSolution } from "./ProblemSolution";
import { Layers } from "./LayersSection";
import { Pillars } from "./Pillars";

/* Stable, readable anchors for in-page links and CTAs (kept identical across languages). */
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
  const t = getDictionary();
  return (
    <SplitSection id={anchors.problemSection} eyebrow={t.eyebrows.problem} heading={s.heading} intro={s.intro} width="wide">
      <ol className="grid gap-6 md:grid-cols-3">
        {s.points.map((p, i) => (
          <li key={p._key} className="card card-hover p-7">
            <span className="font-mono text-sm text-yellow">0{i + 1}</span>
            <h3 className="mt-3 text-xl">{p.title}</h3>
            <p className="mt-3 text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </SplitSection>
  );
}

export function Contrast({ s }: { s: ContrastSection }) {
  return (
    <Section id={anchors.contrastSection} tone="mist">
      <Container>
        <SectionHeader id={anchors.contrastSection} heading={s.heading} intro={s.intro} />
        <div className="mx-auto mt-14 grid max-w-[64rem] gap-6 md:grid-cols-2">
          <div className="card p-7 sm:p-9">
            <h3 className="flex items-center gap-2 text-base font-semibold text-muted!">
              <span aria-hidden="true" className="size-2 rounded-full bg-faint" />
              {s.ordinaryLabel}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {s.ordinary.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <svg className="mt-1 size-4 shrink-0 text-faint" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 8h8" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card relative overflow-hidden border-yellow/40 p-7 shadow-[0_0_60px_-20px_rgb(254_198_31/0.35)] sm:p-9">
            <h3 className="flex items-center gap-2 text-base font-semibold text-yellow!">
              <span aria-hidden="true" className="size-2 rounded-full bg-yellow" />
              {s.contextualLabel}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {s.contextual.map((item) => (
                <li key={item} className="flex gap-3 text-slate">
                  <svg className="mt-1 size-4 shrink-0 text-yellow" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ExampleInsight({ s }: { s: ExampleInsightSection }) {
  const t = getDictionary();
  return (
    <SplitSection id={anchors.exampleInsightSection} eyebrow={t.eyebrows.example} heading={s.heading} intro={s.intro} tone="mist">
      <div className="card overflow-hidden">
        <div className="border-b border-line bg-ink-3/60 px-6 py-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">{s.observationSource}</p>
          <p className="mt-2 font-mono text-[0.92rem] text-paper">{s.observation}</p>
        </div>
        <ol className="relative px-6 py-6 sm:px-8">
          <span aria-hidden="true" className="absolute bottom-10 left-[2.15rem] top-10 w-px bg-line sm:left-[2.65rem]" />
          {s.chain.map((c) => (
            <li key={c._key} className="relative flex gap-4 py-3">
              <span
                aria-hidden="true"
                className={`relative z-10 mt-1 size-3.5 shrink-0 rounded-[3px] ${
                  c.kind === "effect" ? "bg-yellow" : c.kind === "hypothesis" ? "border-2 border-dashed border-unknown bg-surface" : "bg-paper"
                }`}
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-paper">{c.label}</span>
                  <span className="ml-2 text-muted">{t.solution.kind[c.kind]}</span>
                </p>
                <p className="mt-1 text-slate">{c.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t border-yellow/40 bg-yellow/[0.06] px-6 py-6 sm:px-8">
          <p className="font-display text-lg font-semibold leading-snug text-paper">{s.insight}</p>
          <p className="mt-3 text-sm text-muted">{s.validationQuestion}</p>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-faint">{t.solution.illustrative}</p>
    </SplitSection>
  );
}

export function Scope({ s }: { s: ScopeSection }) {
  const t = getDictionary();
  return (
    <SplitSection id={anchors.scopeSection} eyebrow={t.eyebrows.scope} heading={s.heading} intro={s.intro} width="wide">
      <div className="grid gap-6 sm:grid-cols-2">
        {s.groups.map((g, i) => (
          <div key={g._key} className="card card-hover p-7">
            <IconTile index={i} />
            <h3 className="mt-5 text-lg">{g.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3 text-muted">
                  <BlockBullet />
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
  const t = getDictionary();
  const sample = siteConfig.sampleReportUrl;
  return (
    <SplitSection id={anchors.deliverablesSection} eyebrow={t.eyebrows.deliverables} heading={s.heading} intro={s.intro} tone="mist" width="wide">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((d) => (
          <div key={d._key} className="card card-hover p-6 sm:p-7">
            <dt className="flex items-center gap-3 font-display font-semibold text-paper">
              <svg className="size-4 shrink-0 text-yellow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              {d.title}
            </dt>
            <dd className="mt-2 text-[0.95rem] text-muted">{d.body}</dd>
          </div>
        ))}
      </dl>
      {sample && s.sampleReportCta ? (
        <div className="mt-8 flex justify-center">
          <ButtonLink cta={{ ...s.sampleReportCta, label: t.solution.sampleReport, href: sample }} variant="outline" />
        </div>
      ) : null}
    </SplitSection>
  );
}

export function Process({ s }: { s: ProcessSection }) {
  const t = getDictionary();
  return (
    <Section id={anchors.processSection}>
      <Container>
        <SectionHeader id={anchors.processSection} eyebrow={t.eyebrows.process} heading={s.heading} intro={s.intro} />
        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {s.steps.map((step, i) => (
            <li key={step._key} className={`card relative p-6 ${i === s.steps.length - 1 ? "border-yellow/40" : ""}`}>
              <span
                className={`flex size-9 items-center justify-center rounded-full font-mono text-sm font-semibold ${
                  i === s.steps.length - 1 ? "bg-yellow text-ink" : "border border-rule text-paper"
                }`}
              >
                {i + 1}
              </span>
              <p className="sr-only">
                {t.solution.step} {i + 1}
              </p>
              <h3 className="mt-5 text-lg">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function Audience({ s }: { s: AudienceSection }) {
  const t = getDictionary();
  return (
    <SplitSection id={anchors.audienceSection} eyebrow={t.eyebrows.audience} heading={s.heading} intro={s.intro} width="wide">
      <dl className="grid gap-6 md:grid-cols-3">
        {s.audiences.map((a, i) => (
          <div key={a._key} className="card card-hover p-7">
            <IconTile index={i + 1} />
            <dt className="mt-5 font-display text-lg font-semibold text-paper">{a.role}</dt>
            <dd className="mt-2 text-muted">{a.need}</dd>
          </div>
        ))}
      </dl>
    </SplitSection>
  );
}

export function Boundaries({ s }: { s: BoundariesSection }) {
  const t = getDictionary();
  return (
    <SplitSection id={anchors.boundariesSection} heading={s.heading} intro={s.intro} tone="mist">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="card p-7">
          <h3 className="text-lg">{t.solution.included}</h3>
          <ul className="mt-5 space-y-3">
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
        <div className="card p-7">
          <h3 className="text-lg">{t.solution.excluded}</h3>
          <ul className="mt-5 space-y-3">
            {s.excluded.map((it) => (
              <li key={it} className="flex gap-3 text-muted">
                <svg className="mt-1 size-4 shrink-0 text-faint" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {s.note ? <p className="mt-6 rounded-[12px] border border-yellow/30 bg-yellow/[0.06] px-6 py-4 text-center text-slate">{s.note}</p> : null}
    </SplitSection>
  );
}

export function Pricing({ s }: { s: PricingSection }) {
  const t = getDictionary();
  return (
    <Section id={anchors.pricingSection}>
      <Container>
        <div className="card mx-auto grid max-w-[64rem] overflow-hidden lg:grid-cols-12">
          <div className="p-8 sm:p-11 lg:col-span-5">
            <h2 id="prijs-h" className="text-xl text-muted!">
              {s.heading}
              {!s.approved ? <ReviewMarker>commerciële voorwaarden</ReviewMarker> : null}
            </h2>
            <p className="mt-4 font-display text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.03em] text-paper">
              {s.priceLabel}
              {s.vatNote ? <span className="ml-3 font-sans text-lg font-normal tracking-normal text-muted">{s.vatNote}</span> : null}
            </p>
            {s.note ? <p className="mt-6 max-w-[40ch] text-muted">{s.note}</p> : null}
            <div className="mt-8">
              <ButtonLink cta={s.cta} />
            </div>
          </div>
          <div className="border-t border-line p-8 sm:p-11 lg:col-span-7 lg:border-l lg:border-t-0">
            <h3 className="text-base font-semibold">{s.model === "fixed" ? t.solution.standardScope : t.solution.priceDepends}</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.scope.map((it) => (
                <li key={it} className="flex gap-3 text-slate">
                  <BlockBullet />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function Faq({ s }: { s: FaqSection }) {
  const t = getDictionary();
  return (
    <SplitSection id={anchors.faqSection} eyebrow={t.eyebrows.faq} heading={s.heading}>
      <div className="space-y-3">
        {s.items.map((f) => (
          <details key={f._key} className="card group open:border-rule">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-6 py-4 font-display text-lg font-semibold text-paper [&::-webkit-details-marker]:hidden">
              {f.question}
              <span aria-hidden="true" className="relative size-3.5 shrink-0">
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-yellow" />
                <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-yellow transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-[62ch] px-6 pb-6 text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </SplitSection>
  );
}

export function RichText({ s }: { s: RichTextSection }) {
  return (
    <SplitSection heading={s.heading}>
      <div className="mx-auto max-w-[44rem]">
        <PortableTextView value={s.body} />
      </div>
    </SplitSection>
  );
}

export function CtaBlock({ s }: { s: CtaSection }) {
  return (
    <section className="py-20 lg:py-24" aria-labelledby={`cta-${s._key}`}>
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-line bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_18rem_at_50%_0%,rgb(254_198_31/0.16),transparent_70%)]"
          />
          <div aria-hidden="true" className="grid-fade pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-[44rem]">
            <h2 id={`cta-${s._key}`} className="text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
              <Accent text={s.heading} />
            </h2>
            {s.body ? <p className="mt-5 text-lg text-muted">{s.body}</p> : null}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink cta={s.primary} />
              {s.secondary ? <ButtonLink cta={s.secondary} variant="secondary" /> : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
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
