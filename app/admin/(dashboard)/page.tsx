import Link from "next/link";
import Image from "next/image";
import { adminGetAllPaintings } from "@/services/admin-paintings";
import { formatPrice } from "@/utils/format";
import StatusBadge from "@/components/StatusBadge";
import DeletePaintingButton from "@/components/admin/DeletePaintingButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const paintings = await adminGetAllPaintings();

  const stats = {
    total: paintings.length,
    available: paintings.filter((p) => p.status === "available").length,
    reserved: paintings.filter((p) => p.status === "reserved").length,
    sold: paintings.filter((p) => p.status === "sold").length,
  };

  return (
    <div>
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-medium text-ink">
            Gestion des œuvres
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Ajoutez, modifiez et gérez la disponibilité de vos tableaux.
          </p>
        </div>
        <Link href="/admin/paintings/new" className="btn btn-primary">
          + Ajouter une œuvre
        </Link>
      </div>

      {/* Statistiques */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total, color: "text-ink" },
          { label: "Disponibles", value: stats.available, color: "text-emerald-600" },
          { label: "Réservées", value: stats.reserved, color: "text-amber-600" },
          { label: "Vendues", value: stats.sold, color: "text-stone-500" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-stone-200 bg-white p-5"
          >
            <p className={`text-3xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-stone-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tableau des œuvres */}
      <div className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white">
        {paintings.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <p className="text-sm text-stone-500">
              Aucune œuvre pour le moment.
            </p>
            <Link href="/admin/paintings/new" className="btn btn-primary mt-4">
              Ajouter votre première œuvre
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-400">
                <tr>
                  <th className="px-5 py-3 font-medium">Œuvre</th>
                  <th className="px-5 py-3 font-medium">Prix</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paintings.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/60">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-stone-100">
                          {p.image_url && (
                            <Image
                              src={p.image_url}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="font-medium text-ink">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-stone-600">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/paintings/${p.id}/edit`}
                          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-ink"
                        >
                          Modifier
                        </Link>
                        <DeletePaintingButton id={p.id} title={p.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
