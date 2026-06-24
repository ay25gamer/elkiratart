import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { STORAGE_BUCKET } from "@/lib/constants";
import type { Painting, PaintingInput } from "@/types/painting";

/**
 * Couche d'accès aux données — ÉCRITURE ADMIN.
 * Utilise la clé Service Role (contourne le RLS). STRICTEMENT côté serveur,
 * et toujours après vérification de la session admin par l'appelant.
 */

export async function adminGetAllPaintings(): Promise<Painting[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminGetPainting(id: string): Promise<Painting | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminCreatePainting(input: PaintingInput): Promise<Painting> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("paintings")
    .insert({
      title: input.title,
      description: input.description || null,
      price: input.price,
      image_url: input.image_url,
      status: input.status,
      details: input.details || null,
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminUpdatePainting(
  id: string,
  input: PaintingInput
): Promise<Painting> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("paintings")
    .update({
      title: input.title,
      description: input.description || null,
      price: input.price,
      image_url: input.image_url,
      status: input.status,
      details: input.details || null,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeletePainting(id: string): Promise<void> {
  const supabase = createAdminClient();

  // Supprime aussi l'image associée dans le Storage si présente.
  const existing = await adminGetPainting(id);
  if (existing?.image_url) {
    const path = extractStoragePath(existing.image_url);
    if (path) {
      await supabase.storage.from(STORAGE_BUCKET).remove([path]);
    }
  }

  const { error } = await supabase.from("paintings").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Téléverse une image vers Supabase Storage et renvoie son URL publique.
 */
export async function adminUploadImage(file: File): Promise<string> {
  const supabase = createAdminClient();

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const path = `oeuvres/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (error) throw new Error(`Échec du téléversement : ${error.message}`);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Extrait le chemin de stockage à partir d'une URL publique Supabase. */
function extractStoragePath(publicUrl: string): string | null {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
}
