"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "retraiteclair_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === null) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss(value: "accepted" | "refused") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="print-hidden fixed inset-x-0 bottom-0 z-[100] border-t border-neutral-200 bg-white px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-600">
          Nous utilisons un cookie technique mémorisé localement pour enregistrer
          votre choix. Aucun traceur tiers n’est chargé sans votre accord.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => dismiss("refused")}
            className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
