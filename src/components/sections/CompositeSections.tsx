import Link from "next/link";
import type { ApproachSection, FounderSection, InsightsSection, SolutionsSection } from "@/lib/content/types";
import { getArticles, getSiteSettings, getSolutions } from "@/lib/content/repository";
import { BlockBullet, ButtonLink, Container, ReviewMarker, SplitSection } from "@/components/ui/primitives";
import { formatDate } from "@/lib/format";

export async function SolutionsList({ s }: { s: SolutionsSection }) {
  const all = await getSolutions();
  const solutions = s.category ? all.filter((x) => x.category === s.category) : all;
  return (
    <section id="diensten" className="bg-mist py-20 sm:py-24 lg:py-28" aria-labelledby="oplossingen-h">
      <Container>
        <div className="max-w-[44rem]">
          <h2 id="oplossingen-h" className="text-2xl sm:text-3xl">
            {s.heading}
          </h2>
          {s.intro ? <p className="mt-5 text-muted">{s.intro}</p> : null}
        </div>
        <ul className={`mt-12 grid gap-6 md:grid-cols-2 ${solutions.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {solutions.map((sol) => (
            <li key={sol.slug} className="relative flex flex-col overflow-hidden rounded-[5px] border border-line bg-canvas p-7 sm:p-10">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-yellow" />
              <p className="flex items-center gap-3 text-sm font-medium text-muted">
                {sol.title}
                {sol.badge ? <span className="rounded-[5px] bg-yellow px-2 py-0.5 text-xs font-semibold text-ink">{sol.badge}</span> : null}
              </p>
              <h3 className="mt-3 max-w-[24ch] text-xl sm:text-2xl">
                <Link href={`/oplossingen/${sol.slug}`} className="after:absolute after:inset-0 hover:underline hover:decoration-yellow hover:decoration-2 hover:underline-offset-4">
                  {sol.question}
                </Link>
              </h3>
              <p className="mt-5 text-slate">{sol.summary}</p>
              <dl className="mt-7 space-y-4 border-t border-line pt-6 text-[0.98rem]">
                <div>
                  <dt className="font-semibold text-paper">Wat het oplevert</dt>
                  <dd className="mt-1 text-slate">{sol.outcome}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-paper">Voor wie</dt>
                  <dd className="mt-1 text-slate">{sol.audienceSummary}</dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <Link href={`/contact?onderwerp=${sol.slug}`} data-track="contact_cta_clicked" className="relative z-10 font-semibold text-paper hover:text-yellow">
                  Neem contact op
                </Link>
                <span className="font-semibold text-paper underline decoration-yellow decoration-2 underline-offset-4">Bekijk de dienst</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Builds the logo block by block: one block per dimension. */
function DimensionGlyph({ filled }: { filled: number }) {
  const slots = [
    { x: 0, y: 12 },
    { x: 12, y: 12 },
    { x: 12, y: 0 },
  ];
  return (
    <svg width="40" height="40" viewBox="-1 -1 24 24" aria-hidden="true">
      {slots.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width="10"
          height="10"
          fill={i < filled ? (i === 2 ? "var(--color-yellow)" : "var(--color-paper)") : "none"}
          stroke={i < filled ? "none" : "var(--color-faint)"}
          strokeDasharray="2 2"
        />
      ))}
    </svg>
  );
}

export function Approach({ s }: { s: ApproachSection }) {
  return (
    <SplitSection id="aanpak" heading={s.heading} intro={s.intro}>
      <ol className="border-t border-line">
        {s.dimensions.map((d, i) => (
          <li key={d._key} className="grid grid-cols-[3rem_1fr] items-start gap-x-4 gap-y-3 border-b border-line py-8 sm:grid-cols-[3.5rem_minmax(0,13rem)_1fr] sm:gap-8">
            <DimensionGlyph filled={i + 1} />
            <h3 className="self-center text-xl sm:self-start">{d.title}</h3>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-lg font-medium text-paper">{d.question}</p>
              <p className="mt-2 text-slate">{d.body}</p>
            </div>
          </li>
        ))}
      </ol>
      {s.note ? (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start">
          <p className="text-slate sm:max-w-[34ch]">{s.note}</p>
          <ul className="flex flex-wrap gap-2 text-sm font-medium" aria-label="Statussen">
            <li className="rounded-[5px] border border-ok/40 px-3 py-1.5 text-ok">Vastgesteld</li>
            <li className="rounded-[5px] border border-warn/40 px-3 py-1.5 text-warn">Aanwijzing</li>
            <li className="rounded-[5px] border border-unknown/40 px-3 py-1.5 text-unknown">Niet vast te stellen</li>
          </ul>
        </div>
      ) : null}
    </SplitSection>
  );
}

export async function Founder({ s }: { s: FounderSection }) {
  const { founder } = await getSiteSettings();
  return (
    <section id="expertise" className="bg-canvas py-20 sm:py-24 lg:py-28" aria-labelledby="expertise-h">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="expertise-h" className="text-2xl sm:text-3xl">
            {s.heading}
          </h2>
          {founder.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- pre-optimised 800px JPEG
            <img
              src={founder.photo}
              alt={`Portret van ${founder.name}`}
              width={800}
              height={800}
              loading="lazy"
              className="mt-8 aspect-square w-full max-w-[20rem] rounded-[5px] border border-line object-cover"
            />
          ) : (
            <div className="mt-8 flex aspect-[4/5] max-w-[20rem] flex-col justify-end rounded-[5px] border-2 border-dashed border-line bg-mist p-5">
              <p className="text-sm text-muted">Portretfoto van {founder.name} volgt.</p>
              <ReviewMarker>foto aanleveren</ReviewMarker>
            </div>
          )}
        </div>
        <div className="lg:col-span-8">
          <p className="text-xl font-semibold text-paper">
            {founder.name}, {founder.role}
          </p>
          <div className="mt-5 max-w-[62ch] space-y-4 text-slate">
            {founder.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="mt-9 grid gap-px overflow-hidden rounded-[5px] border border-line bg-line sm:grid-cols-2">
            {founder.facts.map((f) => (
              <li key={f.label} className="bg-canvas">
                {f.href ? (
                  <a href={f.href} rel="noopener noreferrer" target="_blank" className="flex min-h-16 items-center gap-3 px-5 py-4 font-medium text-paper hover:bg-mist">
                    <BlockBullet className="mt-0 bg-yellow" />
                    {f.label}
                  </a>
                ) : (
                  <span className="flex min-h-16 items-center gap-3 px-5 py-4 font-medium text-paper">{f.label}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            <ReviewMarker>MVP-categorie en jaren bevestigen</ReviewMarker>
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <a href={founder.blogUrl} rel="noopener noreferrer" target="_blank" className="link font-semibold">
              Lees mee op rozemuller.com
            </a>
            <a href={founder.linkedIn} rel="noopener noreferrer" target="_blank" className="link font-semibold">
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export async function InsightsList({ s }: { s: InsightsSection }) {
  const [articles, settings] = await Promise.all([getArticles(), getSiteSettings()]);
  const list = articles.slice(0, s.limit ?? 3);
  if (list.length === 0 && settings.externalWriting.length === 0) return null;
  return (
    <section id="inzichten" className="bg-mist py-20 sm:py-24 lg:py-28" aria-labelledby="inzichten-h">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="inzichten-h" className="text-2xl sm:text-3xl">
            {s.heading}
          </h2>
          {s.intro ? <p className="mt-5 text-muted">{s.intro}</p> : null}
          <div className="mt-8">
            <ButtonLink cta={{ label: "Alle inzichten", href: "/inzichten" }} variant="secondary" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-rule">
            {list.map((a) => (
              <li key={a.slug} className="group relative border-b border-line py-7">
                <p className="text-sm text-muted">
                  <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>, {a.readingMinutes} min lezen
                </p>
                <h3 className="mt-2 text-xl">
                  <Link href={`/inzichten/${a.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-yellow group-hover:decoration-2 group-hover:underline-offset-4">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[62ch] text-slate">{a.excerpt}</p>
              </li>
            ))}
          </ul>
          {settings.externalWriting.length ? (
            <div className="mt-10">
              <h3 className="text-base font-semibold">Ook van Sander, op rozemuller.com (Engels)</h3>
              <ul className="mt-3 space-y-2">
                {settings.externalWriting.map((e) => (
                  <li key={e.url}>
                    <a href={e.url} rel="noopener noreferrer" target="_blank" className="link">
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
