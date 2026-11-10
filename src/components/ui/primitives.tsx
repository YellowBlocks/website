import type { ReactNode } from "react";
import Link from "./Link";
import type { Cta } from "@/lib/content/types";
import { siteConfig } from "@/config/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/**
 * Renders a heading string where words between asterisks get the yellow gradient:
 * "Stay *in control.*" -> Stay <span class="text-accent">in control.</span>
 */
export function Accent({ text }: { text: string }) {
  const parts = text.split(/\*([^*]+)\*/g);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

/** Plain-text version of an accent heading (metadata, aria labels). */
export const stripAccent = (text: string) => text.replace(/\*/g, "");

type Variant = "primary" | "secondary" | "outline" | "quiet" | "onInk" | "onInkSecondary";

const variants: Record<Variant, string> = {
  primary: "bg-yellow text-ink hover:bg-yellow-2 shadow-[0_8px_24px_-12px_rgb(254_198_31/0.6)]",
  onInk: "bg-yellow text-ink hover:bg-yellow-2 shadow-[0_8px_24px_-12px_rgb(254_198_31/0.6)]",
  secondary: "bg-transparent text-slate ring-1 ring-inset ring-paper/25 hover:text-paper hover:ring-paper/60",
  onInkSecondary: "bg-transparent text-slate ring-1 ring-inset ring-paper/25 hover:text-paper hover:ring-paper/60",
  outline: "bg-transparent text-yellow ring-1 ring-inset ring-yellow hover:bg-yellow/10",
  quiet: "bg-transparent text-yellow hover:text-yellow-2 px-0!",
};

export const buttonClass = (variant: Variant = "primary", size: "md" | "sm" = "md") =>
  `inline-flex items-center justify-center gap-2 rounded-[var(--radius-block)] font-semibold transition-[background-color,box-shadow,color] duration-150 ${
    size === "sm" ? "min-h-10 px-5 text-sm" : "min-h-12 px-7 text-[0.95rem]"
  } ${variants[variant]}`;

export function ButtonLink({
  cta,
  variant = "primary",
  size = "md",
  className = "",
}: {
  cta: Cta;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
}) {
  const external = /^https?:\/\//.test(cta.href);
  const classes = `${buttonClass(variant, size)} ${className}`;
  if (external) {
    return (
      <a href={cta.href} className={classes} data-track={cta.event} rel="noopener noreferrer" target="_blank">
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={classes} data-track={cta.event}>
      {cta.label}
    </Link>
  );
}

/** Arrow used in "Read more →" style links. */
export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
      <path d="M1 7h11M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** Marks content that needs business approval (internal, Dutch only). Hidden in production unless enabled. */
export function ReviewMarker({ children }: { children: ReactNode }) {
  if (!siteConfig.showReviewMarkers) return null;
  return (
    <span className="ml-2 inline-flex items-center gap-1 rounded-[4px] border border-dashed border-warn px-1.5 py-0.5 align-middle font-sans text-xs font-medium tracking-normal text-warn">
      Ter goedkeuring: {children}
    </span>
  );
}

/** Centered section header: optional pill, heading with accent words, intro. */
export function SectionHeader({
  id,
  eyebrow,
  heading,
  intro,
  align = "center",
  level = 2,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  align?: "center" | "left";
  level?: 2 | 3;
  className?: string;
}) {
  const H = level === 2 ? "h2" : "h3";
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-[48rem] text-center" : "max-w-[46rem]"} ${className}`}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <H id={id ? `${id}-h` : undefined} className="text-3xl">
        <Accent text={heading} />
      </H>
      {intro ? <p className={`mt-5 text-lg text-muted ${centered ? "mx-auto max-w-[42rem]" : ""}`}>{intro}</p> : null}
    </div>
  );
}

export type Tone = "paper" | "mist" | "ink";

/** Standard section shell: vertical rhythm and an optional alternate background. */
export function Section({
  id,
  tone = "paper",
  children,
  className = "",
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const bg = tone === "mist" ? "bg-surface/40" : tone === "ink" ? "bg-ink" : "bg-canvas";
  return (
    <section id={id} className={`${bg} py-20 lg:py-28 ${className}`} aria-labelledby={labelledBy ?? (id ? `${id}-h` : undefined)}>
      {children}
    </section>
  );
}

/**
 * Section with a centered header and content below. (Name kept from the earlier
 * split layout so every section using it picks up the new look.)
 */
export function SplitSection({
  id,
  eyebrow,
  heading,
  intro,
  children,
  tone = "paper",
  headingLevel = 2,
  width = "narrow",
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  children: ReactNode;
  tone?: Tone;
  headingLevel?: 2 | 3;
  width?: "narrow" | "wide";
}) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <SectionHeader id={id} eyebrow={eyebrow} heading={heading} intro={intro} level={headingLevel} />
        <div className={`mx-auto mt-12 lg:mt-14 ${width === "wide" ? "" : "max-w-[60rem]"}`}>{children}</div>
      </Container>
    </Section>
  );
}

export function Breadcrumbs({ items, label }: { items: { label: string; href?: string }[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm">
      <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="opacity-80 hover:opacity-100 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A filled square bullet: the block motif at its smallest. */
export function BlockBullet({ className = "bg-yellow" }: { className?: string }) {
  return <span aria-hidden="true" className={`mt-[0.6em] inline-block size-1.5 shrink-0 rounded-[1.5px] ${className}`} />;
}

/** Small square icon tile at the top of a card, built from the block motif. */
export function IconTile({ index = 0 }: { index?: number }) {
  const filled = (index % 4) + 1;
  const slots = [
    { x: 2, y: 12 },
    { x: 12, y: 12 },
    { x: 12, y: 2 },
    { x: 2, y: 2 },
  ];
  return (
    <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-[10px] border border-yellow/25 bg-yellow/10">
      <svg width="22" height="22" viewBox="0 0 22 22">
        {slots.map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width="8"
            height="8"
            rx="1.5"
            fill={i < filled ? (i === filled - 1 ? "var(--color-yellow)" : "rgb(254 198 31 / 0.45)") : "none"}
            stroke={i < filled ? "none" : "rgb(254 198 31 / 0.35)"}
            strokeDasharray="2 2"
          />
        ))}
      </svg>
    </span>
  );
}
