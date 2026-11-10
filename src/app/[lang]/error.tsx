"use client";

import Link from "@/components/ui/Link";
import { buttonClass, Container } from "@/components/ui/primitives";
import { useDictionary } from "@/lib/i18n/client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useDictionary().error;
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-[48rem] text-center">
        <h1 className="text-3xl">{t.title}</h1>
        <p className="mt-5 text-lg text-muted">{t.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className={buttonClass("primary")}>
            {t.retry}
          </button>
          <Link href="/" className={buttonClass("secondary")}>
            {t.home}
          </Link>
        </div>
      </Container>
    </section>
  );
}
