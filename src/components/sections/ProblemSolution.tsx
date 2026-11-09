import Link from "next/link";
import type { ProblemSolutionSection } from "@/lib/content/types";
import { Container } from "@/components/ui/primitives";

/** Problem → answer rows: the spine of the home page. */
export function ProblemSolution({ s }: { s: ProblemSolutionSection }) {
  return (
    <section id="probleem" className="bg-canvas py-20 sm:py-24 lg:py-28" aria-labelledby="probleem-h">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 id="probleem-h" className="text-3xl lg:col-span-6 lg:text-[2.75rem] lg:leading-[1.08]">
            {s.heading}
          </h2>
          {s.intro ? <p className="text-lg text-slate lg:col-span-6 lg:pt-2">{s.intro}</p> : null}
        </div>

        <div className="mt-14 hidden grid-cols-[1fr_3rem_1fr] border-b border-rule pb-3 text-sm font-semibold md:grid">
          <span className="text-muted">Het probleem</span>
          <span />
          <span className="pl-7 text-paper">Wat we eraan doen</span>
        </div>
        <ol className="md:mt-0 mt-12">
          {s.items.map((item) => (
            <li key={item._key} className="grid gap-5 border-b border-line py-9 md:grid-cols-[1fr_3rem_1fr] md:gap-0">
              <div className="md:pr-8">
                <p className="text-sm font-semibold text-muted md:hidden">Het probleem</p>
                <h3 className="mt-1 text-xl md:mt-0">{item.problem}</h3>
                <p className="mt-2 text-slate">{item.problemBody}</p>
              </div>
              <div aria-hidden="true" className="hidden items-start justify-center pt-2 md:flex">
                <svg width="28" height="16" viewBox="0 0 28 16">
                  <path d="M0 8 H24 M18 2 L24 8 L18 14" fill="none" stroke="var(--color-muted)" strokeWidth="2" />
                </svg>
              </div>
              <div className="rounded-r-[5px] border-l-4 border-yellow bg-mist px-6 py-5">
                <p className="text-sm font-semibold text-ochre md:hidden">Wat we eraan doen</p>
                <h3 className="mt-1 text-xl md:mt-0">{item.answer}</h3>
                <p className="mt-2 text-slate">{item.answerBody}</p>
                {item.links.length ? (
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {item.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} data-track={l.event} className="link font-semibold">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
