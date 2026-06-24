"use client";

import { useState } from "react";
import { deletePaintingAction } from "@/app/admin/actions";

/**
 * Bouton de suppression avec confirmation (modale légère).
 */
export default function DeletePaintingButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
      >
        Supprimer
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-serif text-lg font-medium text-ink">
              Supprimer cette œuvre ?
            </h3>
            <p className="mt-2 text-sm text-stone-500">
              L'œuvre «&nbsp;<span className="font-medium text-ink">{title}</span>
              &nbsp;» et son image seront définitivement supprimées. Cette action
              est irréversible.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:border-ink"
              >
                Annuler
              </button>
              <form action={deletePaintingAction}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
