"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";
import { dictionaries } from "./dictionaries";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
export const useDictionary = () => dictionaries[useContext(LocaleContext)];
