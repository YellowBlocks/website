import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/**
 * Enables draft mode for CMS previews.
 * Sanity preview URL: https://<site>/api/draft?secret=<SANITY_PREVIEW_SECRET>&path=/oplossingen/<slug>
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const expected = process.env.SANITY_PREVIEW_SECRET;

  if (!expected || secret !== expected) return new Response("Invalid preview secret", { status: 401 });
  // Only allow relative paths to prevent open redirects.
  const safePath = path.startsWith("/") && !path.startsWith("//") ? path : "/";

  (await draftMode()).enable();
  redirect(safePath);
}
