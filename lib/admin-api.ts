/** Appels à l’Edge Function `admin` via le client Supabase (en-têtes / CORS gérés). */

import { getBrowserClient } from "@/lib/supabase-browser";

export type AdminRange = "7d" | "month" | "year" | "all";

/**
 * Pour les codes HTTP non-2xx, le client Supabase ne remplit pas `data` : il met la
 * `Response` brute dans `error.context`. On lit le JSON `{ error: "..." }` de la fonction.
 */
async function messageFromFunctionsError(error: unknown): Promise<string | undefined> {
  if (!(error instanceof Error) || error.name !== "FunctionsHttpError") {
    return undefined;
  }
  const ctx = (error as { context?: unknown }).context;
  if (!ctx || typeof ctx !== "object" || !("json" in ctx)) {
    return undefined;
  }
  try {
    const j = (await (ctx as Response).json()) as { error?: string };
    if (typeof j?.error === "string" && j.error.length > 0) {
      return j.error;
    }
  } catch {
    // corps non JSON
  }
  return undefined;
}

function hintIfFetchFailed(error: unknown): string {
  return `${error instanceof Error ? error.message : "Erreur"} — Si « Failed to fetch » : vérifiez .env (URL + clé anon sans retour à la ligne), déploiement \`npx supabase functions deploy admin --no-verify-jwt\`, projet Supabase non en pause.`;
}

export async function adminLogin(
  username: string,
  password: string,
): Promise<{ token: string }> {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.functions.invoke("admin", {
    body: { action: "login", username, password },
  });

  const d = data as { token?: string; error?: string } | null;
  if (d?.error) {
    throw new Error(d.error);
  }

  if (error) {
    const fromBody = await messageFromFunctionsError(error);
    if (fromBody) {
      throw new Error(fromBody);
    }
    if (error instanceof Error && error.name === "FunctionsFetchError") {
      throw new Error(hintIfFetchFailed(error));
    }
    if (error instanceof Error && error.name === "FunctionsHttpError") {
      const ctx = (error as { context?: Response }).context;
      const status = ctx instanceof Response ? ctx.status : undefined;
      throw new Error(
        status
          ? `Erreur HTTP ${status}. Ouvrez les logs : Supabase → Edge Functions → admin.`
          : `${error.message}. Ouvrez les logs : Supabase → Edge Functions → admin.`,
      );
    }
    throw new Error(hintIfFetchFailed(error));
  }
  if (!d?.token) {
    throw new Error("Réponse invalide");
  }
  return { token: d.token };
}

export async function adminStats(
  token: string,
  range: AdminRange,
): Promise<AdminStatsResponse> {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.functions.invoke("admin", {
    body: { action: "stats", token, range },
  });

  const d = data as (AdminStatsResponse & { error?: string }) | null;
  if (d?.error) {
    throw new Error(d.error);
  }

  if (error) {
    const fromBody = await messageFromFunctionsError(error);
    if (fromBody) {
      throw new Error(fromBody);
    }
    if (error instanceof Error && error.name === "FunctionsFetchError") {
      throw new Error(hintIfFetchFailed(error));
    }
    if (error instanceof Error && error.name === "FunctionsHttpError") {
      const ctx = (error as { context?: Response }).context;
      const status = ctx instanceof Response ? ctx.status : undefined;
      throw new Error(
        status
          ? `Erreur HTTP ${status}. Ouvrez les logs : Supabase → Edge Functions → admin.`
          : `${error.message}. Ouvrez les logs : Supabase → Edge Functions → admin.`,
      );
    }
    throw new Error(error instanceof Error ? error.message : "Chargement impossible");
  }
  return d as AdminStatsResponse;
}

export interface AdminStatsResponse {
  range: AdminRange;
  events: Record<string, unknown>[];
  eventsError?: string;
  user_numbers: Record<string, unknown>[];
  userNumbersError?: string;
  connection_logs: Record<string, unknown>[];
  connectionLogsError?: string;
  /** Nombre exact de lignes sur la période (requête count côté serveur). */
  connection_logs_total?: number | null;
  connectionLogsCountError?: string;
}
