import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Client navigateur (anon) pour Edge Functions publiques et admin. */
export function getBrowserClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "").trim();
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL manquant");
  }
  if (!anon) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY manquant");
  }
  return createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
