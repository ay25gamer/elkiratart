import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Client Supabase pour le NAVIGATEUR (composants client).
 * Utilise uniquement la clé anonyme publique — soumise au RLS (lecture seule).
 */
export function createBrowserClient() {
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
