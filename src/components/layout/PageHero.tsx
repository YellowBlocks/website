import type { ReactNode } from "react";
import { Accent, Breadcrumbs, Container } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { getDictionary, getLocale } from "@/lib/i18n/server";

/**
 * Inner page header: centered title with accent words over the warm glow,
 * breadcrumbs (+ BreadcrumbList JSON-LD) and optional aside below the intro.
 */
export function PageHero({
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  title: string;
  intro?: string;
  crumbs: { label: string; path: string }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const t = getDictionary();
  const all = [{ label: t.common.home, path: "/" }, ...crumbs];
  return (
    <section className="hero-glow relative overflow-hidden border-b border-line pb-16 pt-10 sm:pb-20 sm:pt-12">
      <div aria-hidden="true" className="grid-fade pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="text-muted">
          <Breadcrumbs label={t.common.breadcrumb} items={all.map((c, i) => ({ label: c.label, href: i === all.length - 1 ? undefined : c.path }))} />
        </div>
        <div className="mx-auto mt-10 max-w-[56rem] text-center">
          <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.75rem)] leading-[1.04]">
            <Accent text={title} />
          </h1>
          {intro ? <p className="mx-auto mt-6 max-w-[44rem] text-lg text-muted">{intro}</p> : null}
          {children}
        </div>
        {aside ? <div className="mx-auto mt-12 max-w-[56rem]">{aside}</div> : null}
      </Container>
      <JsonLd data={breadcrumbSchema(all, getLocale())} />
    </section>
  );
}
