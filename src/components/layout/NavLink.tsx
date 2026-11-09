"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex min-h-11 items-center px-3 text-[0.95rem] font-medium transition-colors ${
        active ? "text-paper" : "text-on-ink-muted hover:text-paper"
      }`}
    >
      {children}
      {active ? <span aria-hidden="true" className="absolute inset-x-3 -bottom-[0.95rem] h-[3px] bg-yellow" /> : null}
    </Link>
  );
}
