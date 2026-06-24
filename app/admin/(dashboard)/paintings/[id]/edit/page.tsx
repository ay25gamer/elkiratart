import Link from "next/link";
import { notFound } from "next/navigation";
import { adminGetPainting } from "@/services/admin-paintings";
import PaintingForm from "@/components/admin/PaintingForm";

export const dynamic = "force-dynamic";

export default async function EditPaintingPage({
  params,
}: {
  params: { id: string };
}) {
  const painting = await adminGetPainting(params.id);
  if (!painting) notFound();

  return (
    <div>
      <Link href="/admin" className="text-sm text-stone-500 hover:text-ink">
        ← Retour au tableau de bord
      </Link>
      <h1 className="mt-3 font-serif text-2xl font-medium text-ink">
        Modifier l'œuvre
      </h1>
      <p className="mt-1 text-sm text-stone-500">
        Mettez à jour les informations, l'image ou le statut de disponibilité.
      </p>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <PaintingForm painting={painting} />
      </div>
    </div>
  );
}
