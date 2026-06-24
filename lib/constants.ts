/**
 * Constantes globales du site EL KIRAT-ART.
 * Aucune donnée sensible ici — uniquement des informations publiques.
 */

export const SITE = {
  name: "EL KIRAT-ART",
  artist: "EL KIRAT Abdelkarim",
  tagline: "Galerie d'art contemporain",
  description:
    "Galerie en ligne de l'artiste peintre EL KIRAT Abdelkarim. Découvrez et acquérez des œuvres originales.",
  url: "https://elkirat-art.vercel.app",
} as const;

/** Coordonnées publiques de l'artiste (affichées et utilisées pour le contact). */
export const CONTACT = {
  /** Numéro affiché. */
  phoneDisplay: "0613691559",
  /** Numéro au format international pour les liens WhatsApp (Maroc +212). */
  whatsapp: "212613691559",
  email: "elkiratabdelkarim@gmail.com",
} as const;

export const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET ?? "paintings";

export const PAINTING_STATUS_LABELS: Record<string, string> = {
  available: "Disponible",
  reserved: "Réservé",
  sold: "Vendu",
};

export const PAINTING_STATUS_OPTIONS = [
  { value: "available", label: "Disponible" },
  { value: "reserved", label: "Réservé" },
  { value: "sold", label: "Vendu" },
] as const;
