import Link from "@/components/ui/Link";
import type { ApproachSection, FounderSection, InsightsSection, SolutionsSection } from "@/lib/content/types";
import { getArticles, getSiteSettings, getSolutions } from "@/lib/content/repository";
import { getDictionary, getLocale } from "@/lib/i18n/server";
import { Accent, Arrow, BlockBullet, ButtonLink, Container, IconTile, ReviewMarker, Section, SectionHeader, SplitSection } from "@/components/ui/primitives";
import { formatDate } from "@/lib/format";

export async function SolutionsList({ s }: { s: SolutionsSection }) {
  const t = getDictionary();
  const all = await getSolutions();
  const solutions = s.category ? all.filter((x) => x.category === s.category) : all;
  return (
    <Section id="diensten" tone="mist">
      <Container>
        <SectionHeader id="diensten" eyebrow={t.eyebrows.services} heading={s.heading} intro={s.intro} />
        <ul className={`mt-14 grid gap-6 md:grid-cols-2 ${solutions.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {solutions.map((sol, i) => (
            <li key={sol.slug} className="card card-hover group relative flex flex-col p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <IconTile index={i} />
                {sol.badge ? (
                  <span className="rounded-full border border-yellow/40 bg-yellow/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-yellow">{sol.badge}</span>
                ) : null}
              </div>
              <p className="mt-6 text-sm font-semibold text-yellow">{sol.title}</p>
              <h3 className="mt-2 text-xl">
                <Link href={`/oplossingen/${sol.slug}`} className="after:absolute after:inset-0 after:rounded-[var(--radius-card)]">
                  {sol.question}
                </Link>
              </h3>
              <p className="mt-4 text-muted">{sol.summary}</p>
              <dl className="mt-6 space-y-4 border-t border-line pt-6 text-[0.95rem]">
                <div>
                  <dt className="font-semibold text-paper">{t.solution.whatItDelivers}</dt>
                  <dd className="mt-1 text-muted">{sol.outcome}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-paper">{t.solution.forWhom}</dt>
                  <dd className="mt-1 text-muted">{sol.audienceSummary}</dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <Link href={`/contact?onderwerp=${sol.slug}`} data-track="contact_cta_clicked" className="relative z-10 text-sm font-semibold text-paper hover:text-yellow">
                  {t.solution.contact}
                </Link>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-yellow">
                  {t.solution.viewService}
                  <Arrow />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function Approach({ s }: { s: ApproachSection }) {
  const t = getDictionary();
  return (
    <SplitSection id="aanpak" eyebrow={t.eyebrows.approach} heading={s.heading} intro={s.intro} width="wide">
      <ol className="grid gap-6 md:grid-cols-3">
        {s.dimensions.map((d, i) => (
          <li key={d._key} className="card card-hover p-7">
            <IconTile index={i} />
            <h3 className="mt-6 text-xl">{d.title}</h3>
            <p className="mt-2 font-medium text-paper">{d.question}</p>
            <p className="mt-3 text-muted">{d.body}</p>
          </li>
        ))}
      </ol>
      {s.note ? (
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="max-w-[48ch] text-muted">{s.note}</p>
          <ul className="flex flex-wrap justify-center gap-2 text-sm font-medium" aria-label={t.solution.statuses}>
            <li className="rounded-full border border-ok/40 px-3 py-1.5 text-ok">{t.solution.statusFact}</li>
            <li className="rounded-full border border-warn/40 px-3 py-1.5 text-warn">{t.solution.statusHint}</li>
            <li className="rounded-full border border-unknown/40 px-3 py-1.5 text-unknown">{t.solution.statusUnknown}</li>
          </ul>
        </div>
      ) : null}
    </SplitSection>
  );
}

export async function Founder({ s }: { s: FounderSection }) {
  const t = getDictionary();
  const { founder } = await getSiteSettings();
  return (
    <Section id="expertise">
      <Container>
        <SectionHeader id="expertise" eyebrow={t.eyebrows.founder} heading={s.heading} />
        <div className="card mx-auto mt-14 grid max-w-[68rem] gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            {founder.photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- pre-optimised 800px JPEG
              <img
                src={founder.photo}
                alt={t.founder.portrait(founder.name)}
                width={800}
                height={800}
                loading="lazy"
                className="aspect-square w-full max-w-[20rem] rounded-[12px] border border-line object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] max-w-[20rem] flex-col justify-end rounded-[12px] border-2 border-dashed border-line bg-ink p-5">
                <p className="text-sm text-muted">{t.founder.photoPending(founder.name)}</p>
                <ReviewMarker>foto aanleveren</ReviewMarker>
              </div>
            )}
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl font-bold text-paper">{founder.name}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-yellow">{founder.role}</p>
            <div className="mt-5 max-w-[62ch] space-y-4 text-muted">
              {founder.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {founder.facts.map((f) => (
                <li key={f.label}>
                  {f.href ? (
                    <a
                      href={f.href}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex min-h-14 items-center gap-3 rounded-[10px] border border-line bg-ink px-4 py-3 text-sm font-medium text-paper transition-colors hover:border-yellow/50"
                    >
                      <BlockBullet className="mt-0 bg-yellow" />
                      {f.label}
                    </a>
                  ) : (
                    <span className="flex min-h-14 items-center gap-3 rounded-[10px] border border-line bg-ink px-4 py-3 text-sm font-medium text-paper">{f.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              <ReviewMarker>MVP-categorie en jaren bevestigen</ReviewMarker>
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              <a href={founder.blogUrl} rel="noopener noreferrer" target="_blank" className="link font-semibold">
                {t.founder.readBlog}
              </a>
              <a href={founder.linkedIn} rel="noopener noreferrer" target="_blank" className="link font-semibold">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export async function InsightsList({ s }: { s: InsightsSection }) {
  const t = getDictionary();
  const lang = getLocale();
  const [articles, settings] = await Promise.all([getArticles(), getSiteSettings()]);
  const list = articles.slice(0, s.limit ?? 3);
  if (list.length === 0 && settings.externalWriting.length === 0) return null;
  return (
    <Section id="inzichten" tone="mist">
      <Container>
        <SectionHeader id="inzichten" eyebrow={t.eyebrows.insights} heading={s.heading} intro={s.intro} />
        {t.insights.languageNote ? <p className="mx-auto mt-4 max-w-[42rem] text-center text-sm text-faint">{t.insights.languageNote}</p> : null}
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((a) => (
            <li key={a.slug} className="card card-hover group relative flex flex-col p-7">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-muted">
                <time dateTime={a.publishedAt}>{formatDate(a.publishedAt, lang)}</time> · {a.readingMinutes} {t.common.minutesRead}
              </p>
              <h3 className="mt-3 text-lg leading-snug" lang="nl">
                <Link href={`/inzichten/${a.slug}`} locale="nl" className="after:absolute after:inset-0 after:rounded-[var(--radius-card)]">
                  <Accent text={a.title} />
                </Link>
              </h3>
              <p className="mt-3 text-sm text-muted" lang="nl">
                {a.excerpt}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-yellow">
                {t.common.readMore}
                <Arrow />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <ButtonLink cta={{ label: t.insights.all, href: "/inzichten" }} variant="secondary" />
        </div>
        {settings.externalWriting.length ? (
          <div className="mx-auto mt-14 max-w-[48rem] text-center">
            <h3 className="text-base">{t.insights.externalHeading}</h3>
            <ul className="mt-4 space-y-2">
              {settings.externalWriting.map((e) => (
                <li key={e.url}>
                  <a href={e.url} rel="noopener noreferrer" target="_blank" className="link" lang="en">
                    {e.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
