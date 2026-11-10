"use client";

import Link from "@/components/ui/Link";
import { startTransition, useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { submitContact, type ContactState } from "@/app/[lang]/contact/actions";
import { scopeQuestions } from "@/lib/forms/contact";
import { track } from "@/lib/analytics/events";
import { useDictionary, useLocale } from "@/lib/i18n/client";

interface Props {
  topics: { value: string; label: string }[];
  phone: string;
  phoneHref: string;
}

const initial: ContactState = { status: "idle" };

const noopSubscribe = () => () => {};

const fieldBase =
  "mt-2 block w-full rounded-[var(--radius-field)] border bg-ink px-4 py-3 text-base text-paper placeholder:text-faint transition-[border-color,box-shadow] focus:border-rule focus:outline-none focus:ring-2 focus:ring-yellow";

export function ContactForm({ topics, phone, phoneHref }: Props) {
  const lang = useLocale();
  const t = useDictionary().form;
  const [state, action, pending] = useActionState(submitContact, initial);
  const [chosenTopic, setChosenTopic] = useState<string | null>(null);
  const started = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const renderedAtRef = useRef<HTMLInputElement>(null);

  // Preselect the topic from ?onderwerp=… (solution pages link here with it).
  const urlTopic = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("onderwerp") ?? "",
    () => "",
  );
  const topic = chosenTopic ?? (state.values?.topic || (topics.some((t) => t.value === urlTopic) ? urlTopic : ""));
  const setTopic = setChosenTopic;

  // Time trap for bots: record when the form became interactive.
  useEffect(() => {
    if (renderedAtRef.current) renderedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") track("contact_form_submitted", { topic });
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state, topic]);

  const onFirstInput = () => {
    if (!started.current) {
      started.current = true;
      track("contact_form_started");
    }
  };

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[12px] border border-yellow/40 bg-yellow/[0.06] p-8 focus:outline-none">
        <h2 className="text-2xl">{t.thanksTitle}</h2>
        <p className="mt-3 max-w-[52ch] text-slate">
          {state.message ?? t.thanksBody}
        </p>
        <p className="mt-6">
          <Link href="/inzichten" className="link font-semibold">
            {t.thanksLink}
          </Link>
        </p>
      </div>
    );
  }

  const err = state.errors ?? {};
  const v = state.values ?? {};
  const scopeQ = scopeQuestions(lang)[topic];

  return (
    <form
      action={action}
      onSubmit={(e) => {
        // With JavaScript: dispatch manually so React does not reset the fields after submit.
        // Without JavaScript: the native form post runs the same server action.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      onInput={onFirstInput}
      noValidate className="space-y-6" aria-describedby="form-status">
      <div ref={statusRef} tabIndex={-1} id="form-status" aria-live="polite" className="focus:outline-none">
        {state.status === "error" && state.message ? (
          <p className="border-l-4 border-risk rounded-r-[var(--radius-block)] bg-[#3a2424] px-4 py-3 text-paper">
            {state.message}{" "}
            {!state.errors ? (
              <a href={phoneHref} className="link font-semibold">
                {phone}
              </a>
            ) : null}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label={t.name} error={err.name}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!err.name} aria-describedby={err.name ? "name-error" : undefined} className={`${fieldBase} ${err.name ? "border-risk" : "border-line"}`} />
        </Field>
        <Field id="company" label={t.company} error={err.company}>
          <input id="company" name="company" autoComplete="organization" required defaultValue={v.company} aria-invalid={!!err.company} aria-describedby={err.company ? "company-error" : undefined} className={`${fieldBase} ${err.company ? "border-risk" : "border-line"}`} />
        </Field>
      </div>

      <Field id="email" label={t.email} error={err.email}>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required defaultValue={v.email} aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} className={`${fieldBase} ${err.email ? "border-risk" : "border-line"}`} />
      </Field>

      <Field id="topic" label={t.topic} error={err.topic}>
        <select
          id="topic"
          name="topic"
          required
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          aria-invalid={!!err.topic}
          aria-describedby={err.topic ? "topic-error" : undefined}
          className={`${fieldBase} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23a3a3a3' stroke-width='2'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10 ${err.topic ? "border-risk" : "border-line"}`}
        >
          <option value="" disabled>
            {t.chooseTopic}
          </option>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      {scopeQ ? (
        <fieldset>
          <legend className="font-semibold text-paper">
            {scopeQ.label} <span className="font-normal text-muted">{t.optional}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {scopeQ.options.map((o) => (
              <label key={o} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-block)] border border-line px-4 has-[:checked]:border-yellow/60 has-[:checked]:bg-yellow/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-yellow">
                <input type="radio" name="scope" value={o} defaultChecked={v.scope === o} className="accent-[var(--color-yellow)]" />
                {o}
              </label>
            ))}
          </div>
          {err.scope ? <p className="mt-2 text-sm text-risk">{err.scope}</p> : null}
        </fieldset>
      ) : null}

      <Field id="message" label={t.message} hint={t.messageHint} error={err.message}>
        <textarea id="message" name="message" rows={6} required defaultValue={v.message} aria-invalid={!!err.message} aria-describedby={`message-hint${err.message ? " message-error" : ""}`} className={`${fieldBase} resize-y ${err.message ? "border-risk" : "border-line"}`} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={renderedAtRef} type="hidden" name="t" defaultValue="" />
      <input type="hidden" name="lang" value={lang} />

      <div>
        <label className="flex cursor-pointer gap-3">
          <input type="checkbox" name="consent" required aria-invalid={!!err.consent} aria-describedby={err.consent ? "consent-error" : undefined} className="mt-1 size-5 shrink-0 accent-[var(--color-yellow)]" />
          <span className="text-slate">
            {t.consentBefore}{" "}
            <Link href="/privacy" className="link" target="_blank">
              {t.consentLink}
            </Link>
            .
          </span>
        </label>
        {err.consent ? (
          <p id="consent-error" className="mt-2 text-sm text-risk">
            {err.consent}
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-block)] bg-yellow px-7 font-semibold text-ink shadow-[0_8px_24px_-12px_rgb(254_198_31/0.6)] transition-colors hover:bg-yellow-2 disabled:cursor-wait disabled:opacity-70">
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-paper">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-risk">
          {error}
        </p>
      ) : null}
    </div>
  );
}
