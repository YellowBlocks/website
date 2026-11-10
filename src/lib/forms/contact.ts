import { dictionaries } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

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

/** Scope questions per topic, per language (labels and options come from the dictionary). */
export const scopeQuestions = (lang: Locale) => dictionaries[lang].form.scope;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\u0000/g, "").trim().slice(0, max) : "";

export function parseContact(form: FormData, allowedTopics: string[], lang: Locale): { data: ContactInput; errors: FieldErrors } {
  const data: ContactInput = {
    name: clean(form.get("name"), 120),
    email: clean(form.get("email"), 200).toLowerCase(),
    company: clean(form.get("company"), 160),
    topic: clean(form.get("topic"), 80),
    message: clean(form.get("message"), 4000),
    consent: form.get("consent") === "on",
    scope: clean(form.get("scope"), 80) || undefined,
  };
  return { data, errors: validateContact(data, allowedTopics, lang) };
}

export function validateContact(d: ContactInput, allowedTopics: string[], lang: Locale): FieldErrors {
  const m = dictionaries[lang].form.errors;
  const e: FieldErrors = {};
  if (d.name.length < 2) e.name = m.name;
  if (!EMAIL.test(d.email)) e.email = m.email;
  if (d.company.length < 2) e.company = m.company;
  if (!allowedTopics.includes(d.topic)) e.topic = m.topic;
  if (d.message.length < 10) e.message = m.message;
  if (!d.consent) e.consent = m.consent;
  const q = scopeQuestions(lang)[d.topic];
  if (d.scope && (!q || !q.options.includes(d.scope))) e.scope = m.scope;
  return e;
}

/** Removes characters that could break e-mail headers. */
export const headerSafe = (v: string) => v.replace(/[\r\n]+/g, " ").slice(0, 160);
