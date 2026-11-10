import { notFound } from "next/navigation";
import { resolveLocale } from "@/lib/i18n/server";

export const dynamicParams = true;

/** Any unknown path under a locale renders the localized not-found page. */
export default async function CatchAll({ params }: PageProps<"/[lang]/[...rest]">) {
  await resolveLocale(params);
  notFound();
}
