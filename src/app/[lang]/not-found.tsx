"use client";

import Link from "@/components/ui/Link";
import { Container } from "@/components/ui/primitives";
import { BlockMark } from "@/components/visuals/Wordmark";
import { useDictionary } from "@/lib/i18n/client";

export default function NotFound() {
  const t = useDictionary().notFound;
  return (
    <section className="hero-glow py-24 sm:py-32">
      <Container className="max-w-[48rem] text-center">
        <div className="flex justify-center">
          <BlockMark size={44} />
        </div>
        <title>{t.title}</title>
        <meta name="robots" content="noindex" />
        <h1 className="mt-8 text-3xl">{t.title}</h1>
        <p className="mt-5 text-lg text-muted">{t.body}</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { href: "/oplossingen", label: t.solutions },
            { href: "/inzichten", label: t.insights },
            { href: "/contact", label: t.contact },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-11 items-center rounded-[var(--radius-block)] border border-line bg-surface px-5 font-semibold text-paper hover:border-yellow/50">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
