"use server";

import { headers } from "next/headers";
import { getContactTopics } from "@/lib/content/repository";
import { parseContact, type FieldErrors } from "@/lib/forms/contact";
import { rateLimit } from "@/lib/forms/rate-limit";
import { isEmailConfigured, sendContactEmail } from "@/lib/forms/email";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
  values?: Record<string, string>;
}

const MIN_FILL_MS = 2500;

export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Spam traps: hidden honeypot field, and a minimum time between render and submit.
  if (String(form.get("website") ?? "").length > 0) return { status: "success" };
  // "t" is set by the client after hydration; without JavaScript it is absent and only the honeypot applies.
  const renderedAt = Number(form.get("t") || NaN);
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.allowed) {
    return { status: "error", message: `Je hebt het formulier een paar keer kort na elkaar verstuurd. Probeer het over ${Math.ceil(limit.retryAfterSeconds / 60)} minuten opnieuw, of bel ons.` };
  }

  const topics = await getContactTopics();
  const { data, errors } = parseContact(form, topics.map((t) => t.value));
  const values = { name: data.name, email: data.email, company: data.company, topic: data.topic, message: data.message, scope: data.scope ?? "" };
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Controleer de gemarkeerde velden.", errors, values };
  }

  const topicLabel = topics.find((t) => t.value === data.topic)?.label ?? data.topic;

  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] E-mail not configured; submission accepted in development only.", { topic: data.topic });
      return { status: "success", message: "Ontwikkelmodus: het bericht is gevalideerd maar niet verzonden, omdat e-mail niet is geconfigureerd." };
    }
    return { status: "error", message: "Het formulier kan op dit moment niet worden verzonden. Bel ons, dan helpen we je direct.", values };
  }

  try {
    await sendContactEmail(data, topicLabel);
  } catch (err) {
    console.error("[contact] delivery failed:", err instanceof Error ? err.message : "unknown");
    return { status: "error", message: "Verzenden is niet gelukt. Probeer het opnieuw, of bel ons.", values };
  }
  return { status: "success" };
}
