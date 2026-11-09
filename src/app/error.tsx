"use client";

import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-[48rem]">
        <h1 className="text-3xl">Deze pagina kon niet worden geladen</h1>
        <p className="mt-5 text-lg text-slate">Er ging iets mis bij het ophalen van de inhoud. Probeer het opnieuw, of ga terug naar de homepage.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="min-h-12 rounded-[5px] bg-yellow px-5 font-semibold text-ink hover:bg-[#ffd65a]">
            Opnieuw proberen
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-[5px] px-5 font-semibold text-paper ring-1 ring-inset ring-paper/25 hover:ring-paper">
            Naar de homepage
          </Link>
        </div>
      </Container>
    </section>
  );
}
