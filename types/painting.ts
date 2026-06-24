/**
 * Types du domaine — œuvres (paintings).
 */

export type PaintingStatus = "available" | "reserved" | "sold";

export interface Painting {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  status: PaintingStatus;
  /** Informations artistiques supplémentaires (technique, dimensions, année…). */
  details: string | null;
  created_at: string;
}

/** Données d'un formulaire d'édition (sans champs gérés par la base). */
export interface PaintingInput {
  title: string;
  description: string;
  price: number | null;
  image_url: string | null;
  status: PaintingStatus;
  details: string;
}
