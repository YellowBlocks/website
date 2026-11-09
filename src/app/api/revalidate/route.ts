import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { CONTENT_TAG } from "@/lib/content/sanity";

/**
 * Called by a Sanity webhook on publish/unpublish so changes appear without a redeploy.
 * Webhook: POST https://<site>/api/revalidate with header "x-revalidate-secret: <SANITY_REVALIDATE_SECRET>".
 */
export async function POST(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET ?? "";
  const given = request.headers.get("x-revalidate-secret") ?? "";
  const valid = expected.length > 0 && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!valid) return Response.json({ revalidated: false }, { status: 401 });

  revalidateTag(CONTENT_TAG, "max");
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
