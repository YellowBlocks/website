/**
 * Contact form schema and validation. Shared by the server action (authoritative)
 * and the client (instant feedback only).
 */
export interface ContactInput {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
  consent: boolean;
  /** Optional scoping question, depends on topic. */
  scope?: string;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export const scopeQuestions: Record<string, { label: string; options: string[] }> = {
  "conditional-access-assessment": {
    label: "Hoeveel Conditional Access-policies heb je ongeveer?",
    options: ["Tot 30", "30 tot 60", "Meer dan 60", "Weet ik niet"],
  },
  "intune-assessment": {
    label: "Hoeveel apparaten beheer je ongeveer met Intune?",
    options: ["Tot 250", "250 tot 1.000", "1.000 tot 5.000", "Meer dan 5.000", "Weet ik niet"],
  },
  "microsoft-365-health-check": {
    label: "Hoeveel apparaten beheer je ongeveer met Intune?",
    options: ["Tot 250", "250 tot 1.000", "1.000 tot 5.000", "Meer dan 5.000", "Weet ik niet"],
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max) : "";

export function parseContact(form: FormData, allowedTopics: string[]): { data: ContactInput; errors: FieldErrors } {
  const data: ContactInput = {
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200).toLowerCase(),
    company: clean(form.get("company"), 160),
    topic: clean(form.get("topic"), 80),
    message: clean(form.get("message"), 4000),
    consent: form.get("consent") === "on",
    scope: clean(form.get("scope"), 80) || undefined,
  };
  return { data, errors: validateContact(data, allowedTopics) };
}

export function validateContact(d: ContactInput, allowedTopics: string[]): FieldErrors {
  const e: FieldErrors = {};
  if (d.name.length < 2) e.name = "Vul je naam in.";
  if (!EMAIL.test(d.email)) e.email = "Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.";
  if (d.company.length < 2) e.company = "Vul de naam van je organisatie in.";
  if (!allowedTopics.includes(d.topic)) e.topic = "Kies een onderwerp.";
  if (d.message.length < 10) e.message = "Beschrijf je vraag in minimaal een paar woorden.";
  if (!d.consent) e.consent = "Geef toestemming om je gegevens te gebruiken voor het beantwoorden van je vraag.";
  const q = scopeQuestions[d.topic];
  if (d.scope && (!q || !q.options.includes(d.scope))) e.scope = "Kies een van de opties.";
  return e;
}

/** Removes characters that could break e-mail headers. */
export const headerSafe = (v: string) => v.replace(/[\r\n]+/g, " ").slice(0, 160);
