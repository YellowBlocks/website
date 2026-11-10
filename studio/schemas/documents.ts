import { defineArrayMember, defineField, defineType, type SlugValidationContext } from "sanity";
import { sectionsField } from "./sections";

const status = defineField({
  name: "status",
  title: "Publicatiestatus",
  type: "string",
  options: {
    list: [
      { title: "Gepubliceerd op de site", value: "published" },
      { title: "Concept (alleen zichtbaar in preview)", value: "draft" },
      { title: "Gepland (niet zichtbaar)", value: "planned" },
    ],
    layout: "radio",
  },
  initialValue: "draft",
  validation: (r) => r.required(),
});

/**
 * Language of the document. Dutch and English versions are separate documents with
 * the same slug; the website picks the one matching the visitor's locale.
 */
const language = defineField({
  name: "language",
  title: "Taal",
  type: "string",
  options: { list: [{ title: "Nederlands", value: "nl" }, { title: "English", value: "en" }], layout: "radio", direction: "horizontal" },
  initialValue: "nl",
  validation: (r) => r.required(),
});

/** Slugs only need to be unique per document type and language (nl and en share slugs). */
const isUniquePerLanguage = async (value: string, context: SlugValidationContext) => {
  const { document, getClient } = context;
  const id = (document?._id ?? "").replace(/^drafts\./, "");
  const params = { type: document?._type, slug: value, lang: (document as { language?: string } | undefined)?.language ?? "nl", draft: `drafts.${id}`, published: id };
  const query = `!defined(*[_type == $type && slug.current == $slug && coalesce(language, "nl") == $lang && !(_id in [$draft, $published])][0]._id)`;
  return getClient({ apiVersion: "2025-01-01" }).fetch<boolean>(query, params);
};

const slug = (source = "title") =>
  defineField({ name: "slug", type: "slug", options: { source, maxLength: 80, isUnique: isUniquePerLanguage }, validation: (r) => r.required() });

export const solution = defineType({
  name: "solution",
  title: "Oplossing (assessment / product / dienst)",
  type: "document",
  groups: [
    { name: "main", title: "Basis", default: true },
    { name: "hero", title: "Hero" },
    { name: "content", title: "Secties" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Naam", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({ ...language, group: "main" }),
    slug(),
    defineField({ ...status, group: "main" }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      group: "main",
      options: { list: [{ title: "Assessment", value: "assessment" }, { title: "Product", value: "product" }, { title: "Dienst", value: "service" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Volgorde", type: "number", group: "main", initialValue: 10 }),
    defineField({ name: "shortTitle", title: "Korte naam (menu, formulier)", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Samenvatting", type: "text", rows: 3, group: "main", validation: (r) => r.required().max(260) }),
    defineField({ name: "outcome", title: "Wat het oplevert", type: "string", group: "main" }),
    defineField({ name: "audienceSummary", title: "Voor wie (kort)", type: "string", group: "main" }),
    defineField({ name: "priceHint", title: "Prijsindicatie in overzichten", type: "string", group: "main", description: "Leeg laten bij prijs op offerte." }),
    defineField({ name: "badge", title: "Label (bijv. Nieuw)", type: "string", group: "main" }),
    defineField({ name: "serviceType", title: "Servicetype (structured data)", type: "string", group: "seo" }),
    defineField({ name: "question", title: "Kernvraag (H1)", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroIntro", title: "Inleiding", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "primaryCta", title: "Primaire CTA", type: "cta", group: "hero" }),
    defineField({ name: "secondaryCta", title: "Secundaire CTA", type: "cta", group: "hero" }),
    { ...sectionsField(), group: "content" },
    defineField({ name: "relatedArticles", title: "Gerelateerde artikelen", type: "array", group: "content", of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })] }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Volgorde", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "status" } },
});

export const solutionCategory = defineType({
  name: "solutionCategory",
  title: "Categorie oplossingen",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    language,
    defineField({
      name: "slug",
      type: "slug",
      options: { isUnique: isUniquePerLanguage },
      description: "Moet overeenkomen met de categorie op een oplossing: assessment, product of service.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "order", type: "number" }),
  ],
});

export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [defineField({ name: "name", type: "string" }), defineField({ name: "role", type: "string" }), defineField({ name: "url", type: "url" })],
});

export const article = defineType({
  name: "article",
  title: "Artikel",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slug(),
    status,
    defineField({ name: "excerpt", title: "Samenvatting", type: "text", rows: 3, validation: (r) => r.required().max(280) }),
    defineField({ name: "topics", title: "Onderwerpen", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }], validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Publicatiedatum", type: "date", validation: (r) => r.required() }),
    defineField({ name: "readingMinutes", title: "Leestijd (minuten)", type: "number" }),
    defineField({ name: "body", type: "portableText" }),
    defineField({ name: "relatedSolutions", title: "Gerelateerde oplossingen", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "solution" }] })] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Nieuwste eerst", name: "date", by: [{ field: "publishedAt", direction: "desc" }] }],
});

export const page = defineType({
  name: "page",
  title: "Pagina",
  type: "document",
  description: "Home, werkwijze, over-ons en juridische pagina's. De slug bepaalt welke route de pagina gebruikt; maak per taal een eigen document.",
  fields: [
    defineField({ name: "title", type: "string", description: "Woorden tussen *sterretjes* krijgen de gele accentkleur.", validation: (r) => r.required() }),
    language,
    defineField({
      name: "slug",
      type: "slug",
      options: { isUnique: isUniquePerLanguage },
      validation: (r) => r.required(),
      description: "home, werkwijze, over-ons, privacy, cookies of voorwaarden",
    }),
    defineField({ name: "intro", type: "text", rows: 3 }),
    defineField({
      name: "hero",
      title: "Hero (alleen home)",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 3 }),
        defineField({ name: "primaryCta", type: "cta" }),
        defineField({ name: "secondaryCta", type: "cta" }),
        defineField({
          name: "stack",
          title: "Lagen-visual",
          type: "object",
          fields: [
            defineField({ name: "layers", title: "Lagen (van onder naar boven)", type: "array", of: [defineArrayMember({ type: "string" })] }),
            defineField({ name: "topLabel", type: "string" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),
    sectionsField(),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Klantervaring",
  type: "document",
  description: "Alleen echte, schriftelijk goedgekeurde citaten.",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "verified", title: "Goedkeuring van de klant ontvangen", type: "boolean", initialValue: false, description: "Pas na schriftelijke toestemming aanzetten. Niet-geverifieerde citaten worden nooit getoond." }),
    defineField({ name: "approvalReference", title: "Referentie toestemming", type: "string" }),
  ],
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  description: "Alleen echte opdrachten met toestemming van de klant. Nog niet gekoppeld aan een route.",
  fields: [
    defineField({ name: "title", type: "string" }),
    slug(),
    status,
    defineField({ name: "client", title: "Klant (of geanonimiseerde omschrijving)", type: "string" }),
    defineField({ name: "solution", type: "reference", to: [{ type: "solution" }] }),
    defineField({ name: "challenge", type: "portableText" }),
    defineField({ name: "approach", type: "portableText" }),
    defineField({ name: "outcome", type: "portableText" }),
    defineField({ name: "clientApproved", title: "Goedgekeurd door klant", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "seo" }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-instellingen",
  type: "document",
  fields: [
    language,
    defineField({ name: "name", type: "string" }),
    defineField({ name: "legalName", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "phoneHref", type: "string" }),
    defineField({ name: "kvk", title: "KvK-nummer", type: "string" }),
    defineField({ name: "vat", title: "Btw-nummer", type: "string" }),
    defineField({ name: "social", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "url" })] })] }),
    defineField({
      name: "founder",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "photo", title: "Portretfoto (pad of URL)", type: "string" }),
        defineField({ name: "role", type: "string" }),
        defineField({ name: "bio", type: "array", of: [defineArrayMember({ type: "text" })] }),
        defineField({ name: "facts", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "url" })] })] }),
        defineField({ name: "blogUrl", type: "url" }),
        defineField({ name: "linkedIn", type: "url" }),
        defineField({ name: "github", type: "url" }),
      ],
    }),
    defineField({
      name: "externalWriting",
      title: "Externe artikelen",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "url", type: "url" }), defineField({ name: "publishedAt", type: "date" })] })],
    }),
  ],
});

export const documentTypes = [solution, solutionCategory, article, author, page, testimonial, caseStudy, siteSettings];
