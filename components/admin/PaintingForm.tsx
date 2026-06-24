"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import {
  savePaintingAction,
  type PaintingFormState,
} from "@/app/admin/actions";
import { PAINTING_STATUS_OPTIONS } from "@/lib/constants";
import type { Painting } from "@/types/painting";

const initialState: PaintingFormState = {};

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary">
      {pending
        ? "Enregistrement…"
        : isEdit
        ? "Enregistrer les modifications"
        : "Ajouter l'œuvre"}
    </button>
  );
}

export default function PaintingForm({ painting }: { painting?: Painting }) {
  const isEdit = Boolean(painting);
  const [state, formAction] = useFormState(savePaintingAction, initialState);
  const [preview, setPreview] = useState<string | null>(
    painting?.image_url ?? null
  );

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-3">
      {/* Champs principaux */}
      <div className="space-y-5 lg:col-span-2">
        {painting && <input type="hidden" name="id" value={painting.id} />}
        <input
          type="hidden"
          name="existing_image_url"
          value={painting?.image_url ?? ""}
        />

        <div>
          <label htmlFor="title" className="label">
            Nom du tableau *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={painting?.title ?? ""}
            className="field"
            placeholder="Ex : Aube sur l'Atlas"
          />
        </div>

        <div>
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={painting?.description ?? ""}
            className="field resize-y"
            placeholder="Décrivez l'œuvre, son inspiration…"
          />
        </div>

        <div>
          <label htmlFor="details" className="label">
            Informations artistiques (technique, dimensions, année…)
          </label>
          <textarea
            id="details"
            name="details"
            rows={3}
            defaultValue={painting?.details ?? ""}
            className="field resize-y"
            placeholder="Ex : Huile sur toile, 80 × 100 cm, 2024"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="label">
              Prix (MAD)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="any"
              defaultValue={painting?.price ?? ""}
              className="field"
              placeholder="Ex : 3500"
            />
          </div>

          <div>
            <label htmlFor="status" className="label">
              Statut *
            </label>
            <select
              id="status"
              name="status"
              defaultValue={painting?.status ?? "available"}
              className="field"
            >
              {PAINTING_STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {state.error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
            {state.error}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <SubmitButton isEdit={isEdit} />
          <Link href="/admin" className="btn btn-outline">
            Annuler
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="lg:col-span-1">
        <label htmlFor="image" className="label">
          Image {isEdit ? "(laisser vide pour conserver)" : "*"}
        </label>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-dashed border-stone-300 bg-white">
          {preview ? (
            <Image
              src={preview}
              alt="Aperçu"
              fill
              sizes="320px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-stone-300">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="mt-2 text-xs">Aperçu de l'image</span>
            </div>
          )}
        </div>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="field mt-3 cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:text-canvas"
        />
        <p className="mt-2 text-xs text-stone-400">
          Formats : JPG, PNG, WebP. Taille max : 8 Mo.
        </p>
      </div>
    </form>
  );
}
