import Link from "next/link";
import { getSiteSettings, getSolutions } from "@/lib/content/repository";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/visuals/Wordmark";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";

export async function Footer() {
  const [settings, solutions] = await Promise.all([getSiteSettings(), getSolutions()]);
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Oplossingen",
      links: [...solutions.map((s) => ({ label: s.shortTitle, href: `/oplossingen/${s.slug}` })), { label: "Alle oplossingen", href: "/oplossingen" }],
    },
    {
      title: "YellowBlocks",
      links: [
        { label: "Werkwijze", href: "/werkwijze" },
        { label: "Over YellowBlocks", href: "/over-ons" },
        { label: "Inzichten", href: "/inzichten" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Online",
      links: settings.social.map((s) => ({ label: s.label, href: s.href })),
    },
  ];

  return (
    <footer className="on-ink border-t border-ink-line bg-ink text-on-ink-muted">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Wordmark tone="paper" />
          <p className="mt-5 max-w-[34ch] text-sm">{settings.tagline}.</p>
          <p className="mt-6 text-sm">
            <a href={settings.phoneHref} className="text-paper hover:underline">
              {settings.phone}
            </a>
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2 lg:col-start-auto">
            <h2 className="text-sm font-semibold text-paper!">{col.title}</h2>
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
      <div className="border-t border-ink-line">
        <Container className="flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.legalName}. KvK {settings.kvk}. Btw {settings.vat}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-paper">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/voorwaarden" className="hover:text-paper">
                Voorwaarden
              </Link>
            </li>
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
