"use client";

import Link from "next/link";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  return (
    <header className="print-hidden sticky top-0 z-50 h-14 border-b border-green-100/80 bg-white/95 shadow-sm shadow-green-900/5 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg tracking-tight text-green-900"
        >
          <span
            className="h-2.5 w-2.5 rounded-full bg-green-500"
            aria-hidden
          />
          RetraiteClair
        </Link>
        <nav
          className="order-3 flex w-full basis-full items-center justify-center gap-4 text-xs text-neutral-600 sm:gap-6 sm:text-sm md:order-none md:w-auto md:basis-auto md:justify-end md:gap-8"
          aria-label="Navigation principale"
        >
          <button
            type="button"
            onClick={() => scrollToId("comment-ca-marche")}
            className="hover:text-green-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Étapes
          </button>
          <button
            type="button"
            onClick={() => scrollToId("simulator")}
            className="hover:text-green-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Simulateur
          </button>
          <button
            type="button"
            onClick={() => scrollToId("faq")}
            className="hover:text-green-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            FAQ
          </button>
        </nav>
        <button
          type="button"
          onClick={() => scrollToId("simulator")}
          className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Simuler
        </button>
      </div>
    </header>
  );
}
