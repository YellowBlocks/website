import "server-only";

/**
 * Sliding-window rate limiter, in memory per server instance.
 * Sufficient for a single instance or as a first line of defence on serverless.
 * For strict limits across instances, back this with a shared store (e.g. Upstash
 * Redis or Azure Cache for Redis); see README "Production checklist".
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
