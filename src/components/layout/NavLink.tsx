"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { localizePath, parsePublicPath } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const lang = useLocale();
  const target = localizePath(href, lang);
  const current = parsePublicPath(pathname).path;
  const active = current === href || current.startsWith(`${href}/`);
  return (
    <NextLink
      href={target}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex min-h-10 items-center rounded-[6px] px-3 text-[0.9rem] font-medium transition-colors ${
        active ? "text-paper" : "text-muted hover:text-paper"
      }`}
    >
      {children}
      {active ? <span aria-hidden="true" className="absolute inset-x-3 -bottom-[1.05rem] h-[2px] rounded-full bg-yellow" /> : null}
    </NextLink>
  );
}
