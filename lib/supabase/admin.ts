import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Client Supabase ADMIN — utilise la clé Service Role.
 *
 * ⚠️ STRICTEMENT CÔTÉ SERVEUR. L'import "server-only" garantit qu'une
 * inclusion accidentelle dans un bundle client provoque une erreur de build.
 * Cette clé contourne le RLS : elle ne doit JAMAIS être exposée au navigateur.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Variables NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquantes."
    );
  }

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
