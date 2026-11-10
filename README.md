# yellowblocks.nl

The YellowBlocks website: Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4, with Sanity as an optional headless CMS. The primary language is Dutch, and the structure is ready for an English version.

- Strategy, design system, SEO and editorial plan: [docs/strategy.md](docs/strategy.md)
- Items that need business or legal sign-off before launch: [docs/approval-checklist.md](docs/approval-checklist.md)

## Status: what works and what needs credentials

| Area | Status |
|---|---|
| All pages, navigation, responsive layouts, 404 and error states | Implemented |
| Content from the local typed seed (no CMS needed) | Implemented |
| Content from Sanity, draft previews, publish webhook | Implemented. Needs a Sanity project and tokens. |
| Sanity Studio with schemas and seed import | Implemented in `/studio`. Builds and validates. |
| SEO: metadata, canonicals, sitemap, robots, JSON-LD, OG images | Implemented |
| Contact form: validation, honeypot, time trap, rate limit, topic preselect | Implemented |
| Contact form e-mail delivery | Implemented for Resend. **Needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.** Without them, production refuses to send and shows the phone number. |
| Analytics (Plausible cookieless, or GA4 after consent) | Implemented. Off by default. |
| Security headers and CSP | Implemented |
| Official logo, portrait photo, final prices, legal texts | **Awaiting approval.** See the checklist. |

Measured on a local production build, simulated mobile: Lighthouse performance 94–96, accessibility 100, best practices 100, SEO 100 on the home, CA Scan and contact pages. axe-core (WCAG 2.2 AA plus best practices) reports 0 violations on all 15 routes. No broken internal links.

## Project structure

```
src/
  app/
    [lang]/                 All pages, per locale (nl, en), with Dutch folder names; root layout lives here
    [lang]/contact/actions.ts  Server action for the contact form
    api/draft               Enables draft mode for CMS previews
    api/revalidate          Sanity webhook target (tag-based revalidation)
    sitemap.ts, robots.ts   Locale-aware sitemap with hreflang alternates
  components/
    layout/                 Header, mobile nav, footer, page hero, content page template
    sections/               Reusable CMS sections + SectionRenderer registry
    ui/                     Primitives (Container, ButtonLink, SplitSection…), Portable Text renderer
    visuals/                Wordmark (official logo), layer stack and diagrams
    forms/                  Contact form (client)
    analytics/              Consent-aware analytics loader, cookie settings button
  config/site.ts            Environment-driven site configuration
  lib/
    content/                Domain types, repository, Sanity client, local seed content
    seo/                    Metadata builder, JSON-LD, OG renderer
    forms/                  Validation, rate limiting, e-mail delivery
    analytics/              Event names, consent store
    i18n/                   Locales, URL mapping, UI dictionaries (nl/en), server + client locale helpers
  fonts/                    Self-hosted Space Grotesk, Inter, JetBrains Mono (SIL OFL)
studio/                     Sanity Studio (separate package)
docs/                       Strategy and approval checklist
```

## Languages (NL / EN)

- Dutch is the default and lives at the root (`/oplossingen/intune-assessment`); English lives under `/en` with English path segments (`/en/solutions/intune-assessment`). The EN | NL switch in the header links to the same page in the other language.
- Internally every page lives under `src/app/[lang]/` with Dutch folder names. `rewrites()` in `next.config.ts` maps the public URLs onto those routes; all pages stay statically generated. `/nl/...` redirects to `/...`.
- In code, always link with the internal Dutch path (`/oplossingen`, `/contact?onderwerp=...`) using `@/components/ui/Link`; it turns that into the right public URL for the active language. The segment and slug translations are in `src/lib/i18n/config.ts`.
- UI strings (navigation, form labels and errors, cookie banner) are in `src/lib/i18n/dictionaries.ts`. Page and service copy is content: `src/lib/content/local/*` (Dutch) and `src/lib/content/local/en/*` (English), or Sanity documents with **Taal** set to Nederlands or English.
- Articles are Dutch only. The English insights page lists them with a note; `/en/insights/<slug>` redirects to the Dutch article.
- Every page has `hreflang` alternates (`nl`, `en`, `x-default`) and the sitemap lists both languages.
- Words between `*asterisks*` in a heading or page title get the yellow gradient accent.

**Content flow:** pages call `src/lib/content/repository.ts`. When `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, it queries Sanity. Otherwise it returns the seed in `src/lib/content/local`. Both return the same types (`src/lib/content/types.ts`), and those match the Studio schemas field for field.

## Local development

```bash
npm install
cp .env.example .env.local   # optional; everything works without it
npm run dev                  # http://localhost:3000
npm run lint && npx tsc --noEmit && npm run build
```

Without Sanity, the site runs entirely on seed content. In development the contact form validates and then logs instead of sending, and "Ter goedkeuring" markers are visible.

## Environment configuration

Every variable is documented in [.env.example](.env.example). In summary:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical base URL |
| `NEXT_PUBLIC_ALLOW_INDEXING` | public | `0` on staging blocks all crawling |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | public | Turns on CMS content |
| `SANITY_API_READ_TOKEN` | server | Draft previews |
| `SANITY_PREVIEW_SECRET`, `SANITY_REVALIDATE_SECRET` | server | Preview link and webhook authentication |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | server | Contact form delivery |
| `NEXT_PUBLIC_SCHEDULING_URL`, `NEXT_PUBLIC_SAMPLE_REPORT_URL` | public | Optional conversion helpers |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` (+ provider IDs) | public | `none` / `plausible` / `ga4` |

`NEXT_PUBLIC_*` values are inlined at build time. Change them and rebuild.

## CMS setup (Sanity)

1. Create a project at sanity.io/manage (EU region if offered). Add a dataset named `production`.
2. In `/studio`, create `.env` with:
   ```
   SANITY_STUDIO_PROJECT_ID=<id>
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_SITE_URL=https://yellowblocks.nl
   SANITY_STUDIO_PREVIEW_SECRET=<same value as SANITY_PREVIEW_SECRET>
   ```
3. Load the launch content:
   ```bash
   cd studio && npm install
   npm run seed:export    # writes seed/seed.ndjson from src/lib/content/local
   npx sanity login
   npm run seed:import
   npm run deploy         # hosts the Studio at <name>.sanity.studio
   ```
4. In the Sanity project, create a **Viewer** API token and set it as `SANITY_API_READ_TOKEN` on the website. Add the website origin under CORS origins.
5. Add a webhook. Trigger: create, update and delete on all documents. URL: `https://yellowblocks.nl/api/revalidate`. Method: POST. Header: `x-revalidate-secret: <SANITY_REVALIDATE_SECRET>`.
6. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` on the website and redeploy.

**Preview:** documents in the Studio get an "Open preview" link to `/api/draft?secret=…&path=…`. It turns on draft mode, and the site shows a yellow bar until you stop it.
Hardening note: `SANITY_STUDIO_*` variables end up in the Studio bundle. Keep the Studio behind Sanity login (the default) and rotate the preview secret if it leaks. For stronger isolation, switch to Sanity's dataset-stored preview secrets (`@sanity/preview-url-secret`).

## Adding a new product or service (no developer needed)

1. In the Studio, open **Oplossingen** and choose **Create**. Make one document per language (**Taal**: Nederlands / English) with the same slug.
2. Fill in **Basis**: name, slug (generated), category (Assessment, Product or Dienst), short name, summary, outcome, audience and an optional price hint.
3. Fill in **Hero**: the core question (becomes the H1), the introduction and the calls to action. Point the primary CTA to `/contact?onderwerp=<slug>`.
4. Under **Secties**, add blocks in any order: Probleem, Contrast, Voorbeeldinzicht, Scope, Opleveringen, Proces, Doelgroepen, Scope en beperkingen, Prijs en scope, Veelgestelde vragen, Tekstblok and Afsluitende CTA.
5. Fill in **SEO**: page title and meta description.
6. Set **Publicatiestatus** to *Concept* and click **Open preview** to check the page.
7. Set the status to *Gepubliceerd op de site* and click **Publish**.

This automatically produces:
- the page at `/oplossingen/<slug>`
- a listing on `/oplossingen`, under its category (a category appears once it has a published item)
- entries in the header dropdown, mobile menu and footer
- an option in the contact form's topic list (preselected from the CTA link)
- metadata, canonical, OG image, Service JSON-LD and a sitemap entry

*Gepland* items never appear. *Concept* items appear only in preview.

Adding a **new kind** of section (a new layout) is developer work done once: add a schema in `studio/schemas/sections.ts`, a type in `types.ts` and a component registered in `SectionRenderer`. After that, every page can use it.

## SEO metadata management

- Per document, the **SEO** tab sets the title, description and "niet indexeren". The title template appends ` | YellowBlocks`, so keep titles to about 50 characters.
- Canonicals, Open Graph and Twitter cards are built in `src/lib/seo/metadata.ts`. OG images are generated per solution and per article.
- JSON-LD: Organization/ProfessionalService (every page), BreadcrumbList (inner pages), Service (solutions; includes a price only for a fixed price) and Article (articles).
- The sitemap includes only published, indexable content. Add redirects in `next.config.ts` → `redirects()`.
- Multilingual: `pageMetadata` adds canonical + `hreflang` alternates for every locale the page exists in (see "Languages").

## Analytics configuration

- `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible` (recommended) with `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` loads cookieless analytics with no banner. In Plausible, add the six goals: `assessment_cta_clicked`, `scheduling_link_clicked`, `sample_report_clicked`, `contact_form_started`, `contact_form_submitted` and `solution_page_visited`.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER=ga4` with `NEXT_PUBLIC_GA_MEASUREMENT_ID` shows a consent banner. GA4 loads only after "Toestaan", and visitors can change their choice later via "Cookie-instellingen" in the footer.
- The CSP adds the provider's domains automatically at build time.
- To track a new CTA, add `data-track="<event>"` to the element, or set the `event` field on a CTA in the CMS.

## Deployment

### Vercel (recommended)
1. Import the repository. The framework is detected automatically.
2. Set the environment variables (Production and Preview). On Preview, set `NEXT_PUBLIC_ALLOW_INDEXING=0`.
3. Under Settings → Functions, choose an EU region (e.g. `fra1`).
4. Add the `yellowblocks.nl` domain, and redirect `www` to the apex.

### Azure Container Apps / App Service
```bash
docker build -t yellowblocks-web \
  --build-arg NEXT_PUBLIC_SITE_URL=https://yellowblocks.nl \
  --build-arg NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible .
docker run -p 3000:3000 --env-file .env.production yellowblocks-web
```
Push the image to Azure Container Registry and deploy to Container Apps (min replicas 1). Put Azure Front Door in front for CDN and TLS. With more than one replica, the in-memory rate limiter and ISR cache are per replica. Add Redis for the rate limiter and a shared cache handler if that matters.

## Production checklist

- [ ] Everything in [docs/approval-checklist.md](docs/approval-checklist.md) is signed off
- [ ] Official logo and portrait in place
- [ ] Contact form e-mail variables set, and a test submission received
- [ ] `NEXT_PUBLIC_SITE_URL` is the production domain; indexing allowed on production only
- [ ] Analytics provider chosen; cookie and privacy texts match it
- [ ] Sanity: content imported, webhook working (publish a change and check it appears)
- [ ] Rate limiting: one instance is enough for launch traffic; for multi-instance hosting, move it to Redis/Upstash
- [ ] Domain: HTTPS, `www` redirect, HSTS preload only after confirming all subdomains use HTTPS
- [ ] Search Console: property verified, sitemap submitted
- [ ] `npm audit` reviewed; Dependabot or Renovate enabled on the repository
- [ ] Lighthouse and axe re-run on the production URL

## Licences
Figtree and JetBrains Mono are licensed under the SIL Open Font License 1.1 (font files in `src/fonts`).
