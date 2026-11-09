import type { ReactNode } from "react";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";

/** Dark page header for inner pages, with breadcrumbs and BreadcrumbList JSON-LD. */
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
  const all = [{ label: "Home", path: "/" }, ...crumbs];
  return (
    <section className="on-ink border-b border-ink-line bg-ink pb-16 pt-10 text-on-ink sm:pb-20 sm:pt-12">
      <Container>
        <div className="text-on-ink-muted">
          <Breadcrumbs items={all.map((c, i) => ({ label: c.label, href: i === all.length - 1 ? undefined : c.path }))} />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={aside ? "lg:col-span-6" : "lg:col-span-9"}>
            <h1 className="text-[clamp(2.1rem,1.4rem+2.6vw,3.5rem)] leading-[1.06] text-paper!">{title}</h1>
            {intro ? <p className="mt-6 max-w-[60ch] text-lg text-on-ink">{intro}</p> : null}
            {children}
          </div>
          {aside ? <div className="lg:col-span-6">{aside}</div> : null}
        </div>
      </Container>
      <JsonLd data={breadcrumbSchema(all)} />
    </section>
  );
}
