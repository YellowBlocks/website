import "server-only";

/**
 * Minimal Sanity HTTP client (GROQ over fetch). Avoids shipping an SDK and
 * integrates with Next.js caching through fetch tags.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2025-02-19";
const readToken = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId);
export const CONTENT_TAG = "content";

export async function sanityQuery<T>(
  query: string,
  params: Record<string, string | number> = {},
  options: { draft?: boolean } = {},
): Promise<T> {
  if (!projectId) throw new Error("Sanity is not configured (NEXT_PUBLIC_SANITY_PROJECT_ID missing).");

  const draft = Boolean(options.draft && readToken);
  const host = draft ? "api.sanity.io" : "apicdn.sanity.io";
  const url = new URL(`https://${projectId}.${host}/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", draft ? "drafts" : "published");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));

  const res = await fetch(url, {
    headers: draft ? { Authorization: `Bearer ${readToken}` } : undefined,
    ...(draft ? { cache: "no-store" as const } : { cache: "force-cache" as const, next: { tags: [CONTENT_TAG], revalidate: 3600 } }),
  });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${res.statusText}`);
  const json = (await res.json()) as { result: T };
  return json.result;
}
