"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { localeMeta, locales, parsePublicPath, switchLocalePath } from "@/lib/i18n/config";
import { useDictionary, useLocale } from "@/lib/i18n/client";
import { dictionaries } from "@/lib/i18n/dictionaries";

/** EN | NL pill. Links to the same page in the other language. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  const active = useLocale();
  const t = useDictionary();
  return (
    <nav aria-label={t.common.languageSwitch} className={className}>
      <ul className="flex items-center rounded-[6px] border border-line bg-surface/50 p-0.5 text-xs font-semibold uppercase tracking-[0.04em]">
        {[...locales].reverse().map((l) => {
          const current = l === active;
          // Articles only exist in Dutch: switching to English from an article goes to the insights overview.
          let href = switchLocalePath(pathname, l);
          if (l === "en" && /^\/inzichten\/.+/.test(parsePublicPath(pathname).path)) href = "/en/insights";
          return (
            <li key={l}>
              <NextLink
                href={href}
                hrefLang={localeMeta[l].htmlLang}
                lang={localeMeta[l].htmlLang}
                aria-current={current ? "true" : undefined}
                aria-label={current ? localeMeta[l].name : dictionaries[l].common.switchTo}
                className={`inline-flex min-h-8 min-w-9 items-center justify-center rounded-[4px] px-2.5 transition-colors ${
                  current ? "bg-ink-3 text-paper" : "text-muted hover:text-paper"
                }`}
              >
                {localeMeta[l].label}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
