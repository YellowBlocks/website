import { defineArrayMember, defineField, defineType } from "sanity";

/** Shared objects. Field names mirror src/lib/content/types.ts. */

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Knoptekst", type: "string", validation: (r) => r.required().max(48) }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Intern pad (bijv. /contact?onderwerp=conditional-access-scan) of volledige URL.",
      validation: (r) => r.required().custom((v) => (!v || v.startsWith("/") || v.startsWith("#") || /^https?:\/\//.test(v) ? true : "Begin met /, # of https://")),
    }),
    defineField({
      name: "event",
      title: "Analytics-event",
      type: "string",
      options: { list: ["assessment_cta_clicked", "scheduling_link_clicked", "sample_report_clicked", "contact_cta_clicked"] },
    }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Paginatitel", type: "string", validation: (r) => r.required().max(70).warning("Houd titels onder de 60–70 tekens.") }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (r) => r.required().min(70).max(170) }),
    defineField({ name: "noIndex", title: "Niet indexeren", type: "boolean", initialValue: false }),
  ],
});

export const titledText = defineType({
  name: "titledText",
  title: "Titel en tekst",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "note", type: "string" }),
  ],
});

export const portableText = defineType({
  name: "portableText",
  title: "Tekst",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normaal", value: "normal" },
        { title: "Kop 2", value: "h2" },
        { title: "Kop 3", value: "h3" },
        { title: "Citaat", value: "blockquote" },
      ],
      lists: [
        { title: "Opsomming", value: "bullet" },
        { title: "Genummerd", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Vet", value: "strong" },
          { title: "Cursief", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [{ name: "href", type: "string", title: "URL of pad", validation: (r) => r.required() }],
          },
        ],
      },
    }),
  ],
});

export const objectTypes = [cta, seo, titledText, portableText];
