"use client";

import { useMemo, useState } from "react";
import type { Painting, PaintingStatus } from "@/types/painting";

export type StatusFilter = "all" | PaintingStatus;

/**
 * Hook de recherche (par nom) et de filtre (par statut) côté client
 * pour la galerie.
 */
export function usePaintingFilters(paintings: Painting[]) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return paintings.filter((p) => {
      const matchesQuery = q === "" || p.title.toLowerCase().includes(q);
      const matchesStatus = status === "all" || p.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [paintings, query, status]);

  return { query, setQuery, status, setStatus, filtered };
}
