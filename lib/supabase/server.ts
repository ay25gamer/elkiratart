import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Client Supabase pour le SERVEUR en lecture publique (Server Components).
 * Utilise la clé anonyme — respecte le RLS (lecture seule du public).
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Variables NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquantes."
    );
  }

  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
}
