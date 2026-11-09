"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

interface Item {
  label: string;
  href: string;
}

export function MobileNav({ items, solutions }: { items: Item[]; solutions: Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Close the menu after navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center text-paper"
      >
        <span className="sr-only">{open ? "Menu sluiten" : "Menu openen"}</span>
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          {open ? (
            <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" />
          ) : (
            <>
              <rect x="2" y="5" width="18" height="2" fill="currentColor" />
              <rect x="2" y="10" width="18" height="2" fill="currentColor" />
              <rect x="2" y="15" width="11" height="2" fill="var(--color-yellow)" />
            </>
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto border-t border-ink-line bg-ink px-5 pb-10 pt-4 sm:px-8"
      >
        <nav aria-label="Mobiel menu">
          <ul className="divide-y divide-ink-line">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-14 items-center text-xl font-semibold text-paper">
                  {item.label}
                </Link>
                {item.href === "/oplossingen" ? (
                  <ul className="mb-4 space-y-1 border-l-2 border-yellow pl-4">
                    {solutions.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="flex min-h-11 items-center text-on-ink">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/contact?onderwerp=kennismaking"
          data-track="scheduling_link_clicked"
          className="mt-8 flex min-h-13 items-center justify-center rounded-[5px] bg-yellow px-5 font-semibold text-ink"
        >
          Plan een kennismaking
        </Link>
      </div>
    </div>
  );
}
