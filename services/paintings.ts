import { createServerClient } from "@/lib/supabase/server";
import type { Painting } from "@/types/painting";

/**
 * Couche d'accès aux données — LECTURE PUBLIQUE.
 * Utilise la clé anonyme (RLS : lecture seule). À appeler depuis des
 * Server Components / Route Handlers publics.
 */

/** Récupère toutes les œuvres, les plus récentes d'abord. */
export async function getAllPaintings(): Promise<Painting[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[paintings] getAllPaintings:", error.message);
    return [];
  }
  return data ?? [];
}

/** Récupère les N dernières œuvres (section "Dernières œuvres"). */
export async function getLatestPaintings(limit = 3): Promise<Painting[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[paintings] getLatestPaintings:", error.message);
    return [];
  }
  return data ?? [];
}

/** Récupère une œuvre par son identifiant, ou `null`. */
export async function getPaintingById(id: string): Promise<Painting | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[paintings] getPaintingById:", error.message);
    return null;
  }
  return data;
}

/** Renvoie tous les identifiants (pour la génération statique des pages détail). */
export async function getAllPaintingIds(): Promise<string[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("paintings").select("id");
  if (error) return [];
  return (data ?? []).map((row) => row.id);
}
