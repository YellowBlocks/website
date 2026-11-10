import Link from "@/components/ui/Link";
import { getSolutions } from "@/lib/content/repository";
import { getDictionary } from "@/lib/i18n/server";
import { buttonClass, Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/visuals/Wordmark";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

export async function Header() {
  const t = getDictionary();
  const solutions = await getSolutions();
  const mainNav = [
    { label: t.nav.solutions, href: "/oplossingen" },
    { label: t.nav.approach, href: "/werkwijze" },
    { label: t.nav.about, href: "/over-ons" },
    { label: t.nav.insights, href: "/inzichten" },
    { label: t.nav.contact, href: "/contact" },
  ];
  const solutionLinks = solutions.map((s) => ({ label: s.shortTitle, href: `/oplossingen/${s.slug}`, summary: s.outcome }));

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur-xl supports-[not(backdrop-filter:blur(0))]:bg-canvas">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-[6px] focus:bg-yellow focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        {t.common.skipToContent}
      </a>
      <Container className="flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6">
        <Link href="/" aria-label={t.common.homeLabel} className="flex shrink-0 flex-col gap-1">
          <Wordmark tone="paper" height={22} />
          <span className="hidden text-[0.6875rem] font-medium tracking-[0.02em] text-muted sm:block">{t.common.tagline}</span>
        </Link>

        <nav aria-label={t.common.mainMenu} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) =>
              item.href === "/oplossingen" ? (
                <li key={item.href} className="group relative">
                  <NavLink href={item.href}>{item.label}</NavLink>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="card w-[26rem] p-2 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)]">
                      {solutionLinks.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="block rounded-[10px] px-4 py-3 hover:bg-ink-3 focus-visible:bg-ink-3">
                            <span className="block font-display font-semibold text-paper">{s.label}</span>
                            <span className="mt-0.5 block text-sm text-muted">{s.summary}</span>
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line">
                        <Link href="/oplossingen" className="block rounded-[10px] px-4 py-3 text-sm font-semibold text-yellow hover:bg-ink-3">
                          {t.nav.allSolutions} →
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

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <div className="hidden sm:block">
            <Link href="/contact?onderwerp=kennismaking" data-track="scheduling_link_clicked" className={buttonClass("primary", "sm")}>
              {t.nav.bookIntro}
            </Link>
          </div>
          <MobileNav items={mainNav} solutions={solutionLinks} cta={t.nav.bookIntro} />
        </div>
      </Container>
    </header>
  );
}
