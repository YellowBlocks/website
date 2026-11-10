import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { localizePath } from "../src/lib/i18n/config";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "replace-me";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const siteUrl = (process.env.SANITY_STUDIO_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET ?? "";

/** Path on the website for a given document, used for "Open preview". */
function pathFor(doc: { _type: string; language?: string; slug?: { current?: string } }): string | undefined {
  const slug = doc.slug?.current;
  const lang = doc.language === "en" ? "en" : "nl";
  const internal = (() => {
    switch (doc._type) {
      case "solution":
        return slug ? `/oplossingen/${slug}` : undefined;
      case "article":
        return slug ? `/inzichten/${slug}` : undefined;
      case "page":
        return slug === "home" ? "/" : slug ? `/${slug}` : undefined;
      default:
        return undefined;
    }
  })();
  return internal ? localizePath(internal, doc._type === "article" ? "nl" : lang) : undefined;
}

export default defineConfig({
  name: "yellowblocks",
  title: "YellowBlocks",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhoud")
          .items([
            S.listItem().title("Site-instellingen (NL)").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("Site settings (EN)").id("siteSettings.en").child(S.document().schemaType("siteSettings").documentId("siteSettings.en")),
            S.divider(),
            S.documentTypeListItem("solution").title("Oplossingen"),
            S.documentTypeListItem("solutionCategory").title("Categorieën"),
            S.documentTypeListItem("page").title("Pagina's"),
            S.documentTypeListItem("article").title("Artikelen"),
            S.documentTypeListItem("author").title("Auteurs"),
            S.divider(),
            S.documentTypeListItem("testimonial").title("Klantervaringen"),
            S.documentTypeListItem("caseStudy").title("Case studies"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    productionUrl: async (prev, { document }) => {
      const path = pathFor(document as never);
      if (!path || !previewSecret) return prev;
      return `${siteUrl}/api/draft?secret=${encodeURIComponent(previewSecret)}&path=${encodeURIComponent(path)}`;
    },
  },
});
