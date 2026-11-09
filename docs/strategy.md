# YellowBlocks website: strategy and design rationale

Status: phase 1–4 deliverable, 1 November 2026. Facts that need business sign-off are listed in [approval-checklist.md](approval-checklist.md).

## 1. Research findings

| Source | What it contains | Used for |
|---|---|---|
| yellowblocks.nl | A single holding page: white logo (linked to rozemuller.com), phone, KvK 93533985, BTW NL005026448B28, GitHub, X and LinkedIn links. No other URLs. | Company details, footer, legal page. No redirects needed. |
| rozemuller.com (+ /about) | Microsoft MVP banner, crew member of WP Ninjas NL, Az.Avd PowerShell module, Intune CLI, IntuneAssistant, blog topics (Intune, identity, AVD, Graph, automation, monitoring), recent articles. | Founder section and trust signals (verified facts only), external writing links. |
| intuneassistant.cloud | Community platform for Intune admins with free core features and licensed extensions. The site does not name the builder. | Mentioned as the founder's work, not as a YellowBlocks product. |
| beady.ai | Clear H1/H2/H3 hierarchy, product mock-ups with a fictitious-data disclaimer, a numbered process strip, a comparison block, repeated CTAs. | Principles only: show the product's actual output, label it as fictitious, structure pages around a process and a comparison. |
| YellowBlocks house style (document generator) | Charcoal `#18212F`, yellow `#F4C430`, ochre `#B8860B`, neutral greys; about 80% neutral, 15% dark, 5% yellow; Avenir Next. | The web palette and its proportions. |

The original logo file could not be downloaded from the build environment. The site uses an interim mark (see §4) that is isolated in a single component, so you can swap in the official logo.

## 2. Positioning and messaging

**Positioning:** YellowBlocks is the independent, engineering-led second opinion on Microsoft cloud environments. It turns configuration into an understanding of cause and consequence.

**Core message:** *Ingesteld is nog niet hetzelfde als geregeld.* Between the two sit five layers; YellowBlocks brings each layer into view and into order. (Earlier line: *Je ziet de instellingen. Wij laten zien wat ze betekenen.*)

**Proof of the difference:** the site never just claims "context". It shows it, three times, with synthetic data:
1. Hero diagram: configuration blocks resolve into one piece of advice.
2. The CA Scan example: a correct MFA policy that still leaves two admins unprotected.
3. The home example: "15% non-compliant" traced back to one assignment filter.

**Audience routing**
- Technical readers get exact terminology (assignment filters, `compliantDevice`, named locations, report-only), scope lists and the evidence grades.
- Decision-makers get the H1 question, the "Wat het oplevert" line, the management summary deliverable and the price.
- MSPs: every page states that YellowBlocks complements their services and does not replace them.

**Tone:** "je" form, active and specific. The copy avoids superlatives and promises. Every capability is tied to a consequence. The site keeps four things separate: assessment, advice, software and monitoring (/werkwijze).

**Differentiating the two offerings**

| | Conditional Access Scan | Microsoft 365 Health Scan |
|---|---|---|
| Question | Does access protection work as intended? | How healthy is the environment as a system? |
| Depth / breadth | One domain, scenario by scenario | Several domains, connected findings |
| Price | Fixed starting price (€ 2.950, pending approval) | Quote after intake |
| Primary CTA | Vraag een Conditional Access Scan aan | Vraag een offerte aan |

**Homepage (fourth revision, 9 Nov 2026): Stay in control.** The slogan is now *Stay in control*. The home page explains what YellowBlocks does in two pillars:
- **Consultancy:** advice, design, implementation, automation, monitoring and documentation.
- **Dienstverlening:** three fixed assessments, the Conditional Access Assessment, the Intune Assessment (new) and the Microsoft 365 Health Check.

The layer model ("Waarom: ingesteld is nog niet hetzelfde als geregeld") and the PDCA cycle ("Hoe we je in control houden") follow as the reasoning behind both pillars. The official vector logo replaces the interim mark, and the site yellow matches the logo (#FEC61F).

*Third revision (1 Nov 2026), kept for reference: one layered model.* The whole page now tells one story:
- **Hero:** *Ingesteld is nog niet hetzelfde als geregeld.* The visual stacks five layers as rows of blocks, with "Geregeld" on top. The higher the layer, the bigger the gap.
- **Five layers:** Ingesteld → Toegewezen → Werkzaam → Actueel → Aantoonbaar. Each layer has its question, a typical gap, and which kind of work addresses it.
- **What we do, in one cycle:** Inzicht en analyse (Plan) → (Auto)remediatie (Do) → Monitoring (Check) → Vastlegging (Act). Tenant maturity sits in the centre; the scans are the measuring instrument.
- **Op elk vlak:** the same work applies in Identity, Microsoft 365 and Modern work.
- **Waar je instapt:** a scan, a concrete question, or the full cycle (Tenant-continuïteit).

Every offering is therefore a place to enter the same model. The Tenant-continuïteit page uses the same four cycle steps.

*Earlier revision, kept for reference: problem first.* Everything YellowBlocks offers is presented as the answer to one problem: *the gap between what is intended and what actually happens* in Microsoft 365. Hero: *Ingesteld is nog niet hetzelfde als geregeld*, next to the diagram that shows such a gap.
1. **Het probleem:** four causes, each paired with what YellowBlocks does about it. Niemand overziet de samenhang → scans. Handwerk schaalt niet → automatisering. Alles blijft bewegen → borgen in een vaste cyclus. Geen meting, geen voortgang → volwassenheid meetbaar maken.
2. **Continuïteit:** the Plan–Do–Check–Act cycle. Scans are the measuring instrument; each cycle shows the delta and the change in maturity level.
3. **Waar we werken:** three domains (Identity, Microsoft 365, Modern work) and three engineering disciplines (Automation, Schaalbaarheid, Monitoring).
4. Founder, insights, FAQ and CTA.

A new service, **Tenant-continuïteit** (working name), carries the cycle as an offering. The domains diagram moved to /over-ons.

## 3. Information architecture

```
/                               Home: what YellowBlocks does (CMS page "home")
/oplossingen                    Overview, grouped by category (empty categories hidden)
/oplossingen/[slug]             Generated per published solution document
/werkwijze                      Method, evidence grades, what an assessment is and is not
/over-ons                       Purpose, founder, way of working
/inzichten                      Article hub + selected rozemuller.com articles
/inzichten/[slug]               Article
/contact                        Form with topic preselect (?onderwerp=<slug>)
/privacy /cookies /voorwaarden  Draft legal pages, marked for legal review
```
Future industry or use-case pages are a new `page` slug or a new `solution` document. No empty pages were created.

## 4. Visual concept

**Idea:** *blocks that only mean something together.* The brand name becomes the analytical method: loose configuration blocks, connected, resolve into one yellow insight block.

- **Mark:** three solid squares and one dashed, missing square, which stands for the thing you didn't see. Interim, pending the official logo.
- **Home hero:** the layer stack. Five rows of blocks run from Ingesteld up to Aantoonbaar, with gaps shown as dashed blocks and a yellow "Geregeld" row on top. It is the brand name made literal. The same stack reappears as a small icon next to each layer further down the page.
- **Lattice diagram (on /werkwijze):** the lattice diagram with real configuration vocabulary (`osVersion 10.0.22*`, `grant: compliantDevice`). It has one orchestrated reveal on load and none after that. It is static under `prefers-reduced-motion` and has its own vertical layout on mobile.
- **Yellow is information:** in diagrams it marks insight or advice only. In UI it marks the primary action (a yellow underline on dark buttons, a solid yellow button on dark backgrounds) and link underlines. Never decoration.
- **Evidence grades as a visual system:** solid square = vastgesteld, dashed = te bevestigen, yellow = gevolg/inzicht. The same code appears in the hero, the examples and the method page.
- **Layout:** a 12-column grid with a recurring 4/8 split (heading left, content right). Content is shown in ruled lists, definition lists and bordered grids instead of card stacks. Numbering appears only where the content is a sequence (the five process steps).
- **Avoided on purpose:** gradients, glow, glassmorphism, stock photos, emoji, icon grids, uppercase eyebrows, fake dashboards.

### Design tokens (src/app/globals.css) — dark theme, 2 Nov 2026

On request, the site switched to a dark, neutral look modelled on the Copilot new-tab page: warm-neutral greys with no blue tint, yellow as the only accent, and 5px corners.

| Token | Value | Role |
|---|---|---|
| ink | #191919 | Darkest frame: header, hero, footer, panels |
| canvas | #212121 | Page background |
| mist / fog | #2A2A2A / #333333 | Surfaces: alternate sections, cards, inputs |
| line / rule | #3A3A3A / #5C5C5C | Hairlines / strong rules |
| paper | #EDEDED | Headings and foreground (light text) |
| slate / muted / faint | #CBCBCB / #A3A3A3 / #747474 | Body text / secondary text / decorative |
| yellow | #F4C430 | Accent: primary buttons (dark text), insight, focus ring |
| ok / warn / risk / unknown | #4ADE80 / #FB923C / #F87171 / #A8B3C2 | Evidence and status only |

The token names are semantic: "paper" is the light foreground and "canvas" the page background. All text meets WCAG AA (axe: 0 violations).

- **Type:** Figtree (OFL, self-hosted), the closest open match to the house font Avenir Next. JetBrains Mono appears only for literal configuration values. Scale ratio about 1.25; fluid H1.
- **Radius:** 5px for cards, panels, buttons and fields; 3px or less for small blocks in diagrams. Square, deliberately.
- **Motion:** the hero reveal only. FAQ disclosure and menu respond to user actions. `prefers-reduced-motion` is respected globally.

## 5. Technical architecture

- **Framework:** Next.js 16 App Router, TypeScript strict, Tailwind CSS 4. Static generation with tag-based revalidation. Cache Components is off on purpose, so CMS caching stays predictable.
- **Content layer:** one repository (`src/lib/content/repository.ts`) returns domain types from either Sanity (GROQ over fetch, no SDK in the app bundle) or the typed local seed. Both use identical shapes.
- **Modular sections:** 22 section types, each mapped to a component in `SectionRenderer`. Solutions, the home page and content pages are all composed from these sections.
- **Client JavaScript:** limited to the header's active state, mobile menu, contact form and analytics/consent.
- **Security:** CSP and security headers, a server action with server-side validation, a honeypot and time trap, rate limiting, header-safe e-mail and no secrets in client code. Customer data is never collected through the form, and the form says so.

## 6. Hosting evaluation

| | Vercel | Azure (Container Apps / App Service) |
|---|---|---|
| Next.js feature support | Native: ISR, `revalidateTag`, draft mode, OG images, server actions | Works with `output: "standalone"` (Dockerfile included). ISR cache is per instance unless a shared cache handler is configured. |
| Operating overhead | Minimal: Git push deploys, previews per branch | Container registry, scaling rules, TLS, CDN (Front Door) to configure and maintain |
| Performance | Global CDN by default; functions can be pinned to an EU region (fra1/ams) | Good with Front Door in front. Without it, single region. |
| Fit with the brand | Neutral | Azure-native story for a Microsoft specialist, and data can stay in a Microsoft tenant |

**Decision: Vercel for launch.** It has the lowest overhead and full support for every feature the site uses. Pin functions to an EU region. Azure Container Apps is the documented alternative if hosting in your own Microsoft tenant matters more than operating effort. In that case use the Dockerfile, put Front Door in front and run a single replica, or add a shared cache handler.

## 7. SEO approach

**Search intent assessment.** No keyword-volume tool was available during the build, so the priorities below come from intent and commercial fit. They are hypotheses to validate in Google Search Console and a keyword tool after launch, not measured volumes.

| Cluster | Example queries | Intent | Priority | Target page |
|---|---|---|---|---|
| Conditional Access assessment | conditional access scan, conditional access assessment, conditional access controle | Commercial, high | 1 | /oplossingen/conditional-access-scan |
| Entra security review | microsoft entra security assessment, entra id review | Commercial | 2 | CA Scan (+ future Entra article) |
| M365 health/tenant review | microsoft 365 health check, microsoft 365 tenant assessment, microsoft 365 security scan | Commercial, competitive (MSP-heavy) | 1 | /oplossingen/microsoft-365-health-scan |
| Intune review | intune health check, intune assessment | Commercial, niche | 2 | Health Scan + Intune articles |
| Problem-led | intune compliance problemen, conditional access exclusions, apparaten niet compliant intune | Informational, very relevant | 1 | /inzichten articles |
| Audit-led | microsoft 365 security audit | Mixed; often expects a formal audit | 3 | Only via the "wat het niet is" content. Do not claim "audit". |

**Implemented:** unique titles and descriptions (titles ≤ ~60 characters before the suffix), one H1 per page, semantic sections, canonical URLs, Open Graph and Twitter cards, generated OG images per solution and article, XML sitemap (published content only), robots.txt (switchable for staging), breadcrumbs plus BreadcrumbList, Organization/ProfessionalService, Service (with price only when fixed) and Article JSON-LD. FAQPage schema was left out on purpose, because FAQ rich results are restricted and the schema would only serve search engines. hreflang is not emitted until English pages exist; `pageMetadata` has the hook.

**Redirects:** the old site had no sub-URLs. Protective permanent redirects (308, treated like a 301 by search engines) for likely guesses (`/over`, `/diensten`, `/blog`) are in `next.config.ts`.

## 8. Editorial plan (first six months)

Mix: one commercial-support article and one problem-led technical article per month. Original Dutch content. Link to rozemuller.com where it adds depth; never republish its articles.

| # | Title (working) | Type | Supports | Status |
|---|---|---|---|---|
| 1 | Waarom een Conditional Access-configuratie niet altijd de verwachte bescherming biedt | Problem-led | CA Scan | Draft written |
| 2 | De verborgen risico's van Conditional Access-exclusions | Problem-led | CA Scan | Draft written |
| 3 | Wat vertelt een Intune compliance-percentage eigenlijk? | Problem-led | Health Scan | Draft written |
| 4 | Waarom een Microsoft 365 Health Scan meer moet doen dan instellingen controleren | Commercial support | Health Scan | Planned |
| 5 | Het verschil tussen een security baseline en effectieve bescherming | Problem-led | Both | Planned |
| 6 | Van technische bevindingen naar een verbeterplan | Commercial support | Werkwijze | Planned |
| 7 | Emergency access-accounts: uitsluiten, en dan? | Technical | CA Scan | Planned |
| 8 | Toewijzingsfilters in Intune: krachtig, en een bron van stille fouten | Technical | Health Scan | Planned |
| 9 | Een tweede mening naast je MSP: hoe werkt dat in de praktijk? | Commercial / MSP | Both | Planned |

Each article has a named author, publish and update dates, related solutions, its own SEO fields and Article JSON-LD.

## 9. Conversion and measurement

- **Primary conversions:** request an assessment, request a quote, plan an introduction. All go to `/contact?onderwerp=<slug>`, which preselects the topic and shows one optional scoping question (policy count, device count).
- **Secondary conversions:** "Bekijk wat je ontvangt" (anchor to deliverables; a sample-report link appears when `NEXT_PUBLIC_SAMPLE_REPORT_URL` is set), related articles and the method page.
- **Events:** `assessment_cta_clicked`, `scheduling_link_clicked`, `sample_report_clicked`, `contact_form_started`, `contact_form_submitted`, `solution_page_visited`. All are fired through `data-track` attributes and one delegated listener, so no per-component code is needed.
- **Recommendation:** Plausible or a similar cookieless tool, which needs no consent banner and is enough for these six events. GA4 is supported but loads only after consent. Google Tag Manager is not used, because no use case justifies it.

## 10. Phase 4 self-review

| Question | Finding | Action taken |
|---|---|---|
| Does it look generic? | The first pass had soft yellow corner tiles on the offering cards: decoration without meaning. | Removed. Yellow now carries meaning only. |
| Could it be mistaken for another consultancy? | The hero diagram with real config vocabulary and the evidence-grade system are specific to this method. | Kept as the single bold element. |
| Is the value proposition clear within seconds? | H1 + subline + diagram answer "what" and "how different". "Read-only en onafhankelijk" answers "is it safe". | — |
| Are the two services differentiated? | Yes, by question, depth and price model. Shown side by side on home and on the overview. | — |
| Repetition? | The home problem and the home example both used the filter story. | Problem point replaced with the "no compliance policy = compliant" case. |
| Is the Dutch natural? | Removed a promise ("binnen twee werkdagen") that had not been agreed. Lowercased roles in bylines. | Fixed |
| Mobile | The diagram was too tall; the approach rows stacked awkwardly. | Compact mobile diagram; glyph and title on one row. |
| Accessibility | axe found one contrast issue (status chip). | Darkened the unknown-status colour. 0 violations on 15 routes. |
| Can a non-developer add an offering? | Yes. See the README section "Adding a new product or service". | — |
