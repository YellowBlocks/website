import { absoluteUrl } from "@/config/site";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Article, SiteSettings, Solution } from "@/lib/content/types";

/** Renders JSON-LD safely (escapes "<" to prevent script injection). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const ORG_ID = absoluteUrl("/#organization");

export function organizationSchema(s: SiteSettings, lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: s.name,
    url: absoluteUrl(localizePath("/", lang)),
    inLanguage: lang,
    logo: absoluteUrl("/icon.svg"),
    description: s.description,
    telephone: s.phone,
    vatID: s.vat,
    areaServed: { "@type": "Country", name: lang === "nl" ? "Nederland" : "Netherlands" },
    knowsAbout: ["Microsoft Intune", "Microsoft Entra", "Conditional Access", "Microsoft 365", "Microsoft Graph"],
    founder: { "@type": "Person", name: s.founder.name, url: s.founder.blogUrl, sameAs: [s.founder.linkedIn, s.founder.github] },
    sameAs: s.social.map((x) => x.href),
  };
}

export function serviceSchema(solution: Solution, lang: Locale) {
  const pricing = solution.sections.find((x) => x._type === "pricingSection");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    serviceType: solution.serviceType,
    description: solution.summary,
    url: absoluteUrl(localizePath(`/oplossingen/${solution.slug}`, lang)),
    inLanguage: lang,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: lang === "nl" ? "Nederland" : "Netherlands" },
    ...(pricing && pricing._type === "pricingSection" && pricing.model === "fixed" && pricing.amount
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            priceSpecification: { "@type": "PriceSpecification", minPrice: pricing.amount, priceCurrency: "EUR", valueAddedTaxIncluded: false },
          },
        }
      : {}),
  };
}

export function articleSchema(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title.replace(/\*/g, ""),
    description: a.excerpt,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    inLanguage: "nl-NL",
    mainEntityOfPage: absoluteUrl(`/inzichten/${a.slug}`),
    author: { "@type": "Person", name: a.author.name, url: a.author.url },
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { label: string; path: string }[], lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: absoluteUrl(localizePath(it.path, lang)) })),
  };
}
