import Link from "next/link";
import type { ReactNode } from "react";
import type { Cta } from "@/lib/content/types";
import { siteConfig } from "@/config/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

type Variant = "primary" | "secondary" | "quiet" | "onInk" | "onInkSecondary";

const variants: Record<Variant, string> = {
  primary: "bg-yellow text-ink hover:bg-[#ffd65a]",
  secondary: "bg-transparent text-paper ring-1 ring-inset ring-paper/25 hover:ring-paper",
  quiet: "bg-transparent text-paper underline decoration-yellow decoration-2 underline-offset-[0.3em] hover:decoration-paper px-0!",
  onInk: "bg-yellow text-ink hover:bg-[#ffd65a]",
  onInkSecondary: "bg-transparent text-paper ring-1 ring-inset ring-paper/30 hover:ring-paper",
};

export function ButtonLink({ cta, variant = "primary", className = "" }: { cta: Cta; variant?: Variant; className?: string }) {
  const external = /^https?:\/\//.test(cta.href);
  const classes = `inline-flex min-h-12 items-center justify-center rounded-[var(--radius-block)] px-5 text-[0.98rem] font-semibold transition-[background-color,box-shadow,text-decoration-color] duration-150 ${variants[variant]} ${className}`;
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

/** Marks content that needs business approval. Hidden in production unless enabled. */
export function ReviewMarker({ children }: { children: ReactNode }) {
  if (!siteConfig.showReviewMarkers) return null;
  return (
    <span className="ml-2 inline-flex items-center gap-1 rounded-[4px] border border-dashed border-warn px-1.5 py-0.5 align-middle text-xs font-medium text-warn">
      Ter goedkeuring: {children}
    </span>
  );
}

/**
 * Split heading layout: heading in the left four columns, content in the right
 * eight. Used where a section introduces a body of content.
 */
export function SplitSection({
  id,
  heading,
  intro,
  children,
  tone = "paper",
  headingLevel = 2,
}: {
  id?: string;
  heading: string;
  intro?: string;
  children: ReactNode;
  tone?: "paper" | "mist" | "ink";
  headingLevel?: 2 | 3;
}) {
  const bg = tone === "mist" ? "bg-mist" : tone === "ink" ? "bg-ink on-ink" : "bg-canvas";
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <section id={id} className={`${bg} py-18 sm:py-22 lg:py-26`} aria-labelledby={id ? `${id}-h` : undefined}>
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <H id={id ? `${id}-h` : undefined} className={`text-2xl sm:text-3xl ${tone === "ink" ? "text-paper!" : ""}`}>
            {heading}
          </H>
          {intro ? <p className={`mt-5 max-w-[46ch] ${tone === "ink" ? "text-on-ink-muted" : "text-muted"}`}>{intro}</p> : null}
        </div>
        <div className="lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Kruimelpad" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="opacity-75 hover:opacity-100 hover:underline">
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
  return <span aria-hidden="true" className={`mt-[0.55em] inline-block size-2 shrink-0 rounded-[1.5px] ${className}`} />;
}
