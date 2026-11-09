import { readConsent, writeConsent } from "./events";

/** Tiny external store so components can read the consent cookie without effects. */
const listeners = new Set<() => void>();

export const consentStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => readConsent(),
  getServerSnapshot: () => "pending" as const,
  set(value: "granted" | "denied") {
    writeConsent(value);
    listeners.forEach((l) => l());
  },
};
