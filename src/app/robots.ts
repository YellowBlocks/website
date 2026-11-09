import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

/** Set NEXT_PUBLIC_ALLOW_INDEXING=0 on preview/staging deployments to keep them out of search. */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "0";
  return {
    rules: allow ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
