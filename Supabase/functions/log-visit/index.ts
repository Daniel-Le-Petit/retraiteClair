/**
 * Edge Function publique : enregistre une ligne dans connection_logs (IP depuis en-têtes proxy).
 * Déploiement : supabase functions deploy log-visit --no-verify-jwt
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function clientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  let userLabel: string | null = null;
  let userAgent: string | null = null;
  try {
    const j = await req.json();
    userLabel = typeof j.user_label === "string" ? j.user_label.slice(0, 500) : null;
    userAgent = typeof j.user_agent === "string" ? j.user_agent.slice(0, 500) : null;
  } catch {
    /* body vide ok */
  }
  if (!userAgent) {
    userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;
  }

  const ip = clientIp(req);

  const { error } = await supabase.from("connection_logs").insert({
    user_label: userLabel,
    ip_address: ip,
    user_agent: userAgent,
  });

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
