import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Reusable page sections. Each one maps to a component in
 * src/components/sections/Sections.tsx (SectionRenderer). Editors compose
 * pages from these; no code changes are needed for new offerings.
 */

const heading = defineField({ name: "heading", title: "Kop", type: "string", validation: (r) => r.required() });
const intro = defineField({ name: "intro", title: "Inleiding", type: "text", rows: 3 });
const strings = (name: string, title: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })], validation: (r) => r.min(1) });

export const problemSection = defineType({
  name: "problemSection",
  title: "Probleem",
  type: "object",
  fields: [heading, intro, defineField({ name: "points", title: "Punten", type: "array", of: [defineArrayMember({ type: "titledText" })] })],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title, subtitle: "Probleem" }) },
});

export const contrastSection = defineType({
  name: "contrastSection",
  title: "Contrast (gewoon vs. YellowBlocks)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({ name: "ordinaryLabel", title: "Label gewone aanpak", type: "string" }),
    strings("ordinary", "Gewone aanpak"),
    defineField({ name: "contextualLabel", title: "Label YellowBlocks-aanpak", type: "string" }),
    strings("contextual", "YellowBlocks-aanpak"),
  ],
  preview: { select: { title: "heading" }, prepare: ({ title }) => ({ title, subtitle: "Contrast" }) },
});

export const exampleInsightSection = defineType({
  name: "exampleInsightSection",
  title: "Voorbeeldinzicht (illustratief)",
  type: "object",
  description: "Altijd fictieve, synthetische gegevens. Nooit echte klantomgevingen.",
  fields: [
    heading,
    intro,
    defineField({ name: "observationSource", title: "Bron van de waarneming", type: "string" }),
    defineField({ name: "observation", title: "Waarneming", type: "string" }),
    defineField({
      name: "chain",
      title: "Redeneerketen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "detail", type: "string" }),
            defineField({ name: "kind", type: "string", options: { list: ["fact", "hypothesis", "effect"], layout: "radio" } }),
          ],
        }),
      ],
    }),
    defineField({ name: "insight", title: "Inzicht", type: "text", rows: 2 }),
    defineField({ name: "validationQuestion", title: "Te bevestigen vraag", type: "string" }),
  ],
});

export const scopeSection = defineType({
  name: "scopeSection",
  title: "Scope (wat we onderzoeken)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "groups",
      title: "Groepen",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), strings("items", "Onderdelen")] })],
    }),
  ],
});

export const deliverablesSection = defineType({
  name: "deliverablesSection",
  title: "Opleveringen",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({ name: "items", title: "Onderdelen", type: "array", of: [defineArrayMember({ type: "titledText" })] }),
    defineField({ name: "sampleReportCta", title: "CTA voorbeeldrapport", type: "cta", description: "Wordt alleen getoond als NEXT_PUBLIC_SAMPLE_REPORT_URL is ingesteld." }),
  ],
});

export const processSection = defineType({
  name: "processSection",
  title: "Proces (stappen)",
  type: "object",
  fields: [heading, intro, defineField({ name: "steps", title: "Stappen", type: "array", of: [defineArrayMember({ type: "titledText" })] })],
});

export const audienceSection = defineType({
  name: "audienceSection",
  title: "Doelgroepen",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "audiences",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "role", type: "string" }), defineField({ name: "need", type: "text", rows: 2 })] })],
    }),
  ],
});

export const boundariesSection = defineType({
  name: "boundariesSection",
  title: "Scope en beperkingen",
  type: "object",
  fields: [heading, intro, strings("included", "Wel inbegrepen"), strings("excluded", "Niet inbegrepen"), defineField({ name: "note", type: "text", rows: 2 })],
});

export const pricingSection = defineType({
  name: "pricingSection",
  title: "Prijs en scope",
  type: "object",
  fields: [
    heading,
    defineField({ name: "model", title: "Prijsmodel", type: "string", options: { list: [{ title: "Vaste prijs", value: "fixed" }, { title: "Op offerte", value: "quote" }], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "amount", title: "Bedrag (EUR, excl. btw)", type: "number", hidden: ({ parent }) => parent?.model !== "fixed" }),
    defineField({ name: "priceLabel", title: "Weergave prijs", type: "string", description: "Bijv. € 2.950 of Op offerte" }),
    defineField({ name: "vatNote", title: "Btw-notitie", type: "string" }),
    strings("scope", "Scope / prijsbepalende factoren"),
    defineField({ name: "note", type: "text", rows: 2 }),
    defineField({ name: "approved", title: "Commercieel goedgekeurd", type: "boolean", initialValue: false, description: "Zolang dit uit staat, toont de previewomgeving een markering." }),
    defineField({ name: "cta", type: "cta" }),
  ],
});

export const faqSection = defineType({
  name: "faqSection",
  title: "Veelgestelde vragen",
  type: "object",
  fields: [
    heading,
    defineField({
      name: "items",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text", rows: 3 })] })],
    }),
  ],
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Tekstblok",
  type: "object",
  fields: [heading, defineField({ name: "body", type: "portableText" })],
});

export const ctaSection = defineType({
  name: "ctaSection",
  title: "Afsluitende CTA",
  type: "object",
  fields: [heading, defineField({ name: "body", type: "text", rows: 2 }), defineField({ name: "primary", type: "cta" }), defineField({ name: "secondary", type: "cta" })],
});

export const solutionsSection = defineType({
  name: "solutionsSection",
  title: "Overzicht oplossingen (automatisch)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({ name: "category", title: "Alleen categorie (optioneel)", type: "string", options: { list: ["assessment", "product", "service"] } }),
  ],
});

export const pillarsSection = defineType({
  name: "pillarsSection",
  title: "Pijlers (consultancy, dienstverlening)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "lead", type: "string" }),
            defineField({ name: "body", type: "text", rows: 3 }),
            strings("points", "Punten"),
            defineField({ name: "cta", type: "cta" }),
          ],
        }),
      ],
    }),
  ],
});

export const approachSection = defineType({
  name: "approachSection",
  title: "Aanpak (dimensies)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "dimensions",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "question", type: "string" }), defineField({ name: "body", type: "text", rows: 2 })] })],
    }),
    defineField({ name: "note", type: "text", rows: 2 }),
  ],
});

export const founderSection = defineType({ name: "founderSection", title: "Oprichter (uit instellingen)", type: "object", fields: [heading, intro] });

export const insightsSection = defineType({
  name: "insightsSection",
  title: "Laatste inzichten (automatisch)",
  type: "object",
  fields: [heading, intro, defineField({ name: "limit", type: "number", initialValue: 3 })],
});

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Klantervaringen (alleen geverifieerd)",
  type: "object",
  fields: [heading, defineField({ name: "items", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })] })],
});

export const capabilitiesSection = defineType({
  name: "capabilitiesSection",
  title: "Vakgebieden (gegroepeerd)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "groups",
      title: "Groepen",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "string" }),
            defineField({
              name: "items",
              title: "Vakgebieden",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "title", type: "string" }),
                    defineField({ name: "lead", title: "Kernzin", type: "string" }),
                    strings("points", "Onderwerpen"),
                    defineField({ name: "link", title: "Link (optioneel)", type: "cta" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

export const engagementSection = defineType({
  name: "engagementSection",
  title: "Samenwerkingsvormen",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({ name: "cta", type: "cta" }),
            defineField({ name: "needsApproval", title: "Nog ter goedkeuring", type: "boolean", initialValue: false }),
          ],
        }),
      ],
    }),
  ],
});

export const cycleSection = defineType({
  name: "cycleSection",
  title: "Verbetercyclus (plan, do, check, act)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({ name: "centerLabel", title: "Label in het midden", type: "string", description: "Gebruik \\n voor een regelafbreking." }),
    defineField({
      name: "steps",
      title: "Stappen (4)",
      type: "array",
      validation: (r) => r.length(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "letter", type: "string", validation: (r) => r.max(2) }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "subtitle", type: "string" }),
            defineField({ name: "body", type: "text", rows: 2 }),
            strings("points", "Punten"),
          ],
        }),
      ],
    }),
    defineField({ name: "note", type: "text", rows: 2 }),
    defineField({ name: "cta", type: "cta" }),
  ],
});

export const problemSolutionSection = defineType({
  name: "problemSolutionSection",
  title: "Probleem en aanpak (per oorzaak)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "problem", title: "Probleem", type: "string" }),
            defineField({ name: "problemBody", title: "Toelichting probleem", type: "text", rows: 2 }),
            defineField({ name: "answer", title: "Wat we eraan doen", type: "string" }),
            defineField({ name: "answerBody", title: "Toelichting aanpak", type: "text", rows: 2 }),
            defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "cta" })] }),
          ],
          preview: { select: { title: "problem", subtitle: "answer" } },
        }),
      ],
    }),
  ],
});

export const layersSection = defineType({
  name: "layersSection",
  title: "Lagen (van ingesteld naar geregeld)",
  type: "object",
  fields: [
    heading,
    intro,
    defineField({ name: "topLabel", title: "Label bovenste laag", type: "string", initialValue: "Geregeld" }),
    defineField({
      name: "layers",
      title: "Lagen (van onder naar boven)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "question", type: "string" }),
            defineField({ name: "body", type: "text", rows: 2 }),
            strings("capabilities", "Wat we doen (labels)"),
          ],
          preview: { select: { title: "name", subtitle: "question" } },
        }),
      ],
    }),
    defineField({ name: "note", type: "string" }),
  ],
});

export const sectionTypes = [
  pillarsSection,
  layersSection,
  problemSolutionSection,
  cycleSection,
  capabilitiesSection,
  engagementSection,
  problemSection,
  contrastSection,
  exampleInsightSection,
  scopeSection,
  deliverablesSection,
  processSection,
  audienceSection,
  boundariesSection,
  pricingSection,
  faqSection,
  richTextSection,
  ctaSection,
  solutionsSection,
  approachSection,
  founderSection,
  insightsSection,
  testimonialsSection,
];

export const sectionsField = (name = "sections") =>
  defineField({
    name,
    title: "Secties",
    type: "array",
    of: sectionTypes.map((t) => defineArrayMember({ type: t.name })),
  });
