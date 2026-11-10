"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/client";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  /** Force a locale, e.g. to link to Dutch-only articles from the English site. */
  locale?: Locale;
};

/** next/link that turns internal Dutch paths into the public URL for the active locale. */
export default function Link({ href, locale, ...rest }: Props) {
  const active = useLocale();
  return <NextLink href={localizePath(href, locale ?? active)} {...rest} />;
}
