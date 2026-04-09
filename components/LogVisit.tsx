"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase-browser";

const STORAGE_KEY = "retraiteclair_log_visit_v1";

/** Une fois par session : enregistre une ligne dans connection_logs (Edge log-visit). */
export function LogVisit() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const ua =
      typeof navigator !== "undefined" ? navigator.userAgent : undefined;

    void (async () => {
      try {
        const supabase = getBrowserClient();
        const { error } = await supabase.functions.invoke("log-visit", {
          body: { user_agent: ua },
        });
        if (!error) {
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* ignore */
          }
        }
      } catch {
        /* réseau / CORS : ne pas bloquer la page */
      }
    })();
  }, [pathname]);

  return null;
}
