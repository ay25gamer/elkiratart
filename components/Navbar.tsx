"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/constants";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/galerie", label: "Galerie" },
  { href: "/#artiste", label: "L'artiste" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-canvas/85 backdrop-blur">
      <nav className="container-art flex h-16 items-center justify-between">
        <Link href="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl font-semibold tracking-tight text-ink">
            EL KIRAT<span className="text-gold">-ART</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
            {SITE.tagline}
          </span>
        </Link>

        {/* Navigation desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href.replace("/#", "/"));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm tracking-wide hover:text-ink ${
                    active ? "text-ink" : "text-stone-500"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bouton menu mobile */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      {open && (
        <ul className="border-t border-stone-200 bg-canvas px-5 pb-4 pt-2 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-stone-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
