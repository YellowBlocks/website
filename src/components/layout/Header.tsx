import Link from "next/link";
import { getSolutions } from "@/lib/content/repository";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/visuals/Wordmark";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export const mainNav = [
  { label: "Oplossingen", href: "/oplossingen" },
  { label: "Werkwijze", href: "/werkwijze" },
  { label: "Over YellowBlocks", href: "/over-ons" },
  { label: "Inzichten", href: "/inzichten" },
  { label: "Contact", href: "/contact" },
];

export async function Header() {
  const solutions = await getSolutions();
  const solutionLinks = solutions.map((s) => ({ label: s.shortTitle, href: `/oplossingen/${s.slug}`, summary: s.outcome }));

  return (
    <header className="on-ink sticky top-0 z-40 border-b border-ink-line bg-ink">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Naar de inhoud
      </a>
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="/" aria-label="YellowBlocks, naar de homepage" className="shrink-0">
          <Wordmark tone="paper" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.href === "/oplossingen" ? (
                <li key={item.href} className="group relative">
                  <NavLink href={item.href}>{item.label}</NavLink>
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="w-[26rem] rounded-[5px] border border-line bg-mist p-2 shadow-[0_18px_40px_-20px_rgba(24,33,47,0.45)]">
                      {solutionLinks.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="block rounded-[5px] px-4 py-3 hover:bg-fog focus-visible:bg-fog">
                            <span className="block font-semibold text-paper">{s.label}</span>
                            <span className="mt-0.5 block text-sm text-muted">{s.summary}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line">
                        <Link href="/oplossingen" className="block rounded-[5px] px-4 py-3 text-sm font-semibold text-paper hover:bg-fog">
                          Alle oplossingen
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact?onderwerp=kennismaking"
            data-track="scheduling_link_clicked"
            className="hidden min-h-11 items-center rounded-[5px] bg-yellow px-4 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-[#ffd65a] sm:inline-flex"
          >
            Plan een kennismaking
          </Link>
          <MobileNav items={mainNav} solutions={solutionLinks} />
        </div>
      </Container>
    </header>
  );
}
