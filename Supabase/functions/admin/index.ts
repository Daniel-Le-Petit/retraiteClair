/**
 * Edge Function : login admin + stats (events, user_numbers, connection_logs)
 * Secrets requis : SUPABASE_SERVICE_ROLE_KEY, ADMIN_JWT_SECRET (min 32 caractères)
 * Déploiement : supabase functions deploy admin --no-verify-jwt
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import {
  create as jwtCreate,
  getNumericDate,
  verify as jwtVerify,
} from "https://deno.land/x/djwt@v2.9/mod.ts";

/** Préflight + réponses : si une exception échappe, le navigateur affiche « CORS » sans détail. */
const cors: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-api-version, prefer, accept",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

type Range = "7d" | "month" | "year" | "all";

/** Début de période en ISO (UTC), aligné sur les buckets du graphique (jours civils UTC). */
function startDateForRange(r: Range): string | null {
  if (r === "all") return null;
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const d = now.getUTCDate();
  if (r === "7d") {
    const start = new Date(Date.UTC(y, m, d - 6, 0, 0, 0, 0));
    return start.toISOString();
  }
  if (r === "month") {
    return new Date(Date.UTC(y, m, 1, 0, 0, 0, 0)).toISOString();
  }
  if (r === "year") {
    return new Date(Date.UTC(y, 0, 1, 0, 0, 0, 0)).toISOString();
  }
  return null;
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) {
      return json({
        error: "Server misconfigured: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
      }, 500);
    }

    const jwtSecret = Deno.env.get("ADMIN_JWT_SECRET");
    if (!jwtSecret || jwtSecret.length < 16) {
      return json({ error: "Server misconfigured: ADMIN_JWT_SECRET" }, 500);
    }

    let key: CryptoKey;
    try {
      key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(jwtSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"],
      );
    } catch (e) {
      console.error("importKey (ADMIN_JWT_SECRET):", e);
      return json({ error: "ADMIN_JWT_SECRET invalide pour HMAC" }, 500);
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const action = body.action as string;
    const supabase = createClient(supabaseUrl, serviceKey);

    if (action === "login") {
      const username = String(body.username ?? "").trim();
      const password = String(body.password ?? "").trim();
      if (!username || !password) {
        return json({ error: "Missing credentials" }, 400);
      }

      // Même algorithme que crypt(..., gen_salt('bf')) dans l’insert (pgcrypto).
      const { data: rpcRows, error: rpcError } = await supabase.rpc(
        "verify_admin_password",
        { p_username: username, p_plain: password },
      );

      if (rpcError) {
        console.error("verify_admin_password:", rpcError);
        return json(
          {
            error:
              "Erreur vérification login. Exécutez la migration verify_admin_password dans le SQL Editor, puis redéployez la fonction « admin ».",
          },
          500,
        );
      }

      const rows = rpcRows as { id: string; username: string }[] | null;
      if (!rows?.length) {
        return json({ error: "Identifiants invalides" }, 401);
      }
      const row = rows[0];

      let token: string;
      try {
        token = await jwtCreate(
          { alg: "HS256", typ: "JWT" },
          {
            sub: String(row.id),
            user: String(row.username ?? ""),
            exp: getNumericDate(60 * 60 * 8),
          },
          key,
        );
      } catch (e) {
        console.error("jwtCreate:", e);
        return json({ error: "Erreur création session" }, 500);
      }

      return json({ token });
    }

    if (action === "stats") {
      const token = String(body.token ?? "");
      const range = (body.range as Range) || "7d";
      if (!token) {
        return json({ error: "Missing token" }, 401);
      }

      try {
        await jwtVerify(token, key);
      } catch {
        return json({ error: "Session invalide ou expirée" }, 401);
      }

      const from = startDateForRange(range);

      let qEvents = supabase
        .from("events")
        .select(
          "id, event_name, user_id, session_id, page_url, created_at, properties",
        )
        .order("created_at", { ascending: false })
        .limit(500);
      if (from) qEvents = qEvents.gte("created_at", from);

      let qUsers = supabase
        .from("user_numbers")
        .select(
          "user_id, user_number, first_seen, last_seen, ip_address, city, country, timezone",
        )
        .order("last_seen", { ascending: false })
        .limit(500);
      if (from) qUsers = qUsers.gte("last_seen", from);

      // connection_logs : pas de filtre UTC (from) — agrégation côté client (Europe/Paris).
      const qConn = supabase
        .from("connection_logs")
        .select("id, user_label, ip_address, user_agent, created_at")
        .order("created_at", { ascending: false })
        .limit(2500);

      const qConnCount = supabase
        .from("connection_logs")
        .select("*", { count: "exact", head: true });

      const [ev, un, cl, connCount] = await Promise.all([
        qEvents,
        qUsers,
        qConn,
        qConnCount,
      ]);

      return json({
        range,
        events: ev.data ?? [],
        eventsError: ev.error?.message,
        user_numbers: un.data ?? [],
        userNumbersError: un.error?.message,
        connection_logs: cl.data ?? [],
        connectionLogsError: cl.error?.message,
        connection_logs_total:
          typeof connCount.count === "number" ? connCount.count : null,
        connectionLogsCountError: connCount.error?.message,
      });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("admin function error:", msg);
    return json({ error: "Erreur serveur" }, 500);
  }
});
