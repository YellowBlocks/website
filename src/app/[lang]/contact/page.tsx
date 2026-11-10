import type { Metadata } from "next";
import { getContactTopics, getSiteSettings } from "@/lib/content/repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { getDictionary, resolveLocale } from "@/lib/i18n/server";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const t = getDictionary(await resolveLocale(params)).contact;
  return pageMetadata({ title: t.metaTitle, description: t.metaDescription, path: "/contact" });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang).contact;
  const [topics, settings] = await Promise.all([getContactTopics(), getSiteSettings()]);

  return (
    <>
      <PageHero title={t.title} intro={t.intro} crumbs={[{ label: getDictionary(lang).nav.contact, path: "/contact" }]} />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="card p-6 sm:p-9 lg:col-span-7">
            <ContactForm topics={topics} phone={settings.phone} phoneHref={settings.phoneHref} />
          </div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="card p-7">
              <h2 className="text-lg">{t.nextTitle}</h2>
              <ol className="mt-5 space-y-4">
                {t.next.map((step, i) => (
                  <li key={step} className="flex gap-4 text-slate">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-yellow font-mono text-sm font-semibold text-ink">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-7">
              <h2 className="text-lg">{t.directTitle}</h2>
              <p className="mt-3">
                <a href={settings.phoneHref} className="link text-lg font-semibold">
                  {settings.phone}
                </a>
              </p>
              {siteConfig.schedulingUrl ? (
                <p className="mt-4">
                  <a href={siteConfig.schedulingUrl} target="_blank" rel="noopener noreferrer" data-track="scheduling_link_clicked" className="link font-semibold">
                    {t.pickSlot}
                  </a>
                </p>
              ) : null}
            </div>
            <div className="rounded-[12px] border border-yellow/30 bg-yellow/[0.06] p-5 text-sm text-slate">{t.sensitive}</div>
          </aside>
        </Container>
      </section>
    </>
  );
}
