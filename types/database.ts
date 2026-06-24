import type { PaintingStatus } from "./painting";

/**
 * Schéma typé de la base Supabase (table `paintings`).
 * Permet d'obtenir l'autocomplétion sur les clients Supabase.
 */
export interface Database {
  public: {
    Tables: {
      paintings: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number | null;
          image_url: string | null;
          status: PaintingStatus;
          details: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price?: number | null;
          image_url?: string | null;
          status?: PaintingStatus;
          details?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number | null;
          image_url?: string | null;
          status?: PaintingStatus;
          details?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [key: string]: never };
    Functions: { [key: string]: never };
    Enums: {
      painting_status: PaintingStatus;
    };
    CompositeTypes: { [key: string]: never };
  };
}
