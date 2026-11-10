import Link from "@/components/ui/Link";
import { getSiteSettings, getSolutions } from "@/lib/content/repository";
import { getDictionary } from "@/lib/i18n/server";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/visuals/Wordmark";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";

export async function Footer() {
  const t = getDictionary();
  const [settings, solutions] = await Promise.all([getSiteSettings(), getSolutions()]);
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t.footer.solutions,
      links: [...solutions.map((s) => ({ label: s.shortTitle, href: `/oplossingen/${s.slug}` })), { label: t.nav.allSolutions, href: "/oplossingen" }],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.approach, href: "/werkwijze" },
        { label: t.nav.about, href: "/over-ons" },
        { label: t.nav.insights, href: "/inzichten" },
        { label: t.nav.contact, href: "/contact" },
      ],
    },
    {
      title: t.footer.online,
      links: settings.social.map((s) => ({ label: s.label, href: s.href })),
    },
  ];

  return (
    <footer className="border-t border-line bg-[linear-gradient(180deg,#0c0e12,#0a0b0f)] text-muted">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Wordmark tone="paper" height={24} />
          <p className="mt-5 max-w-[34ch] font-display text-lg font-semibold text-paper">
            Stay <span className="text-accent">in control.</span>
          </p>
          <p className="mt-2 text-sm">{t.common.tagline}</p>
          <p className="mt-6 text-sm">
            <a href={settings.phoneHref} className="text-paper hover:underline">
              {settings.phone}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2 lg:col-start-auto">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-paper!">{col.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} rel="noopener noreferrer" target="_blank" className="hover:text-paper">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="hover:text-paper">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.legalName}. {t.footer.kvk} {settings.kvk}. {t.footer.vat} {settings.vat}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-paper">
                {t.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-paper">
                {t.footer.cookies}
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="hover:text-paper">
                {t.footer.terms}
              </Link>
            </li>
            <li>
              <CookieSettingsButton label={t.footer.cookieSettings} />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
