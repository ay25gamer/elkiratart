import Link from "next/link";
import PaintingForm from "@/components/admin/PaintingForm";

export const dynamic = "force-dynamic";

export default function NewPaintingPage() {
  return (
    <div>
      <Link
        href="/admin"
        className="text-sm text-stone-500 hover:text-ink"
      >
        ← Retour au tableau de bord
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-medium text-ink">
        Ajouter une œuvre
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Renseignez les informations et téléversez l'image du tableau.
      </p>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <PaintingForm />
      </div>
    </div>
  );
}
