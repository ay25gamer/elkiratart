import { createServerClient } from "@/lib/supabase/server";
import type { Painting } from "@/types/painting";

/**
 * Couche d'accès aux données — LECTURE PUBLIQUE.
 * Utilise la clé anonyme (RLS : lecture seule). À appeler depuis des
 * Server Components / Route Handlers publics.
 *
 * Toutes les fonctions sont défensives : si les variables d'environnement
 * Supabase sont absentes (ex. premier build Vercel avant configuration) ou
 * si la base est injoignable, elles renvoient une valeur vide plutôt que de
 * faire échouer le build / le rendu.
 */

/** Récupère toutes les œuvres, les plus récentes d'abord. */
export async function getAllPaintings(): Promise<Painting[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("paintings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch (e) {
    console.error("[paintings] getAllPaintings:", (e as Error).message);
    return [];
  }
}

/** Récupère les N dernières œuvres (section "Dernières œuvres"). */
export async function getLatestPaintings(limit = 3): Promise<Painting[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("paintings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  } catch (e) {
    console.error("[paintings] getLatestPaintings:", (e as Error).message);
    return [];
  }
}

/** Récupère une œuvre par son identifiant, ou `null`. */
export async function getPaintingById(id: string): Promise<Painting | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("paintings")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  } catch (e) {
    console.error("[paintings] getPaintingById:", (e as Error).message);
    return null;
  }
}

/** Renvoie tous les identifiants (pour la génération statique des pages détail). */
export async function getAllPaintingIds(): Promise<string[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from("paintings").select("id");
    if (error) throw error;
    return (data ?? []).map((row) => row.id);
  } catch (e) {
    console.error("[paintings] getAllPaintingIds:", (e as Error).message);
    return [];
  }
}
