import "server-only";
import { headerSafe, type ContactInput } from "./contact";

/**
 * Delivers contact requests by e-mail through Resend's HTTP API.
 * Required env: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (a sender on a verified domain).
 * Swap this function to use Azure Communication Services or another provider; the
 * rest of the form flow does not change.
 */
export const isEmailConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);

export async function sendContactEmail(d: ContactInput, topicLabel: string): Promise<void> {
  const text = [
    `Nieuwe aanvraag via yellowblocks.nl`,
    ``,
    `Onderwerp: ${topicLabel}`,
    `Naam: ${d.name}`,
    `E-mail: ${d.email}`,
    `Organisatie: ${d.company}`,
    d.scope ? `Omvang: ${d.scope}` : null,
    ``,
    `Bericht:`,
    d.message,
    ``,
    `Toestemming privacyverklaring: ja (${new Date().toISOString()})`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: d.email,
      subject: headerSafe(`[${topicLabel}] ${d.company} – ${d.name}`),
      text,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    // Never log message contents; status is enough to diagnose.
    throw new Error(`E-mail delivery failed with status ${res.status}`);
  }
}
