"use client";

import type { Painting } from "@/types/painting";
import { usePaintingFilters, type StatusFilter } from "@/hooks/usePaintingFilters";
import PaintingCard from "./PaintingCard";

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "available", label: "Disponibles" },
  { value: "reserved", label: "Réservées" },
  { value: "sold", label: "Vendues" },
];

export default function GalleryView({ paintings }: { paintings: Painting[] }) {
  const { query, setQuery, status, setStatus, filtered } =
    usePaintingFilters(paintings);

  return (
    <div>
      {/* Barre de recherche + filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une œuvre…"
            className="field pl-10"
            aria-label="Rechercher une œuvre par nom"
          />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                status === f.value
                  ? "border-ink bg-ink text-canvas"
                  : "border-stone-300 text-stone-600 hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Compteur */}
      <p className="mt-6 text-sm text-stone-500">
        {filtered.length} œuvre{filtered.length > 1 ? "s" : ""}
        {status !== "all" || query ? " trouvée" + (filtered.length > 1 ? "s" : "") : ""}
      </p>

      {/* Grille */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PaintingCard key={p.id} painting={p} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center text-stone-400">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <p className="mt-4 text-sm">Aucune œuvre ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
