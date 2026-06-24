"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endAdminSession, getAdminSession } from "@/lib/auth/admin";
import {
  adminCreatePainting,
  adminUpdatePainting,
  adminDeletePainting,
  adminUploadImage,
} from "@/services/admin-paintings";
import type { PaintingInput, PaintingStatus } from "@/types/painting";

const VALID_STATUSES: PaintingStatus[] = ["available", "reserved", "sold"];
const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 Mo

export interface PaintingFormState {
  error?: string;
}

/** Garde-fou : toute action d'écriture re-vérifie la session côté serveur. */
async function assertAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Non authentifié.");
  }
}

/** Revalide les pages publiques après une mutation. */
function revalidatePublic(id?: string) {
  revalidatePath("/");
  revalidatePath("/galerie");
  revalidatePath("/admin");
  if (id) revalidatePath(`/oeuvre/${id}`);
}

/** Déconnexion. */
export async function logoutAction() {
  endAdminSession();
  redirect("/admin/login");
}

/**
 * Crée ou met à jour une œuvre (selon la présence de `id`).
 * Gère l'upload de l'image vers Supabase Storage.
 */
export async function savePaintingAction(
  _prev: PaintingFormState,
  formData: FormData
): Promise<PaintingFormState> {
  try {
    await assertAdmin();
  } catch {
    return { error: "Session expirée. Veuillez vous reconnecter." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const status = String(formData.get("status") ?? "available") as PaintingStatus;
  const existingImageUrl = String(formData.get("existing_image_url") ?? "").trim();
  const imageFile = formData.get("image") as File | null;

  // --- Validation ---
  if (!title) return { error: "Le nom de l'œuvre est obligatoire." };
  if (!VALID_STATUSES.includes(status)) {
    return { error: "Statut invalide." };
  }

  let price: number | null = null;
  if (priceRaw !== "") {
    const parsed = Number(priceRaw.replace(",", "."));
    if (Number.isNaN(parsed) || parsed < 0) {
      return { error: "Le prix doit être un nombre positif." };
    }
    price = parsed;
  }

  // --- Image ---
  let image_url: string | null = existingImageUrl || null;
  if (imageFile && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      return { error: "Le fichier doit être une image." };
    }
    if (imageFile.size > MAX_IMAGE_BYTES) {
      return { error: "L'image ne doit pas dépasser 8 Mo." };
    }
    try {
      image_url = await adminUploadImage(imageFile);
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Échec du téléversement de l'image.",
      };
    }
  }

  if (!id && !image_url) {
    return { error: "Veuillez ajouter une image pour la nouvelle œuvre." };
  }

  const input: PaintingInput = {
    title,
    description,
    details,
    price,
    status,
    image_url,
  };

  // --- Persistance ---
  try {
    if (id) {
      await adminUpdatePainting(id, input);
      revalidatePublic(id);
    } else {
      await adminCreatePainting(input);
      revalidatePublic();
    }
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Échec de l'enregistrement.",
    };
  }

  redirect("/admin");
}

/** Supprime une œuvre (et son image). */
export async function deletePaintingAction(formData: FormData) {
  await assertAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await adminDeletePainting(id);
  revalidatePublic(id);
  redirect("/admin");
}
