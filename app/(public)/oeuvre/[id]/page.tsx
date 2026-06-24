import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPaintingById, getAllPaintingIds } from "@/services/paintings";
import { formatPrice, formatDate } from "@/utils/format";
import StatusBadge from "@/components/StatusBadge";
import ContactButtons from "@/components/ContactButtons";

export const revalidate = 60;

export async function generateStaticParams() {
  const ids = await getAllPaintingIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const painting = await getPaintingById(params.id);
  if (!painting) return { title: "Œuvre introuvable" };
  return {
    title: painting.title,
    description: painting.description ?? undefined,
    openGraph: {
      images: painting.image_url ? [painting.image_url] : [],
    },
  };
}

export default async function OeuvrePage({
  params,
}: {
  params: { id: string };
}) {
  const painting = await getPaintingById(params.id);
  if (!painting) notFound();

  return (
    <article className="container-art py-12 sm:py-16">
      <Link
        href="/galerie"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Retour à la galerie
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image haute qualité */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 shadow-xl shadow-stone-200/60">
            {painting.image_url ? (
              <Image
                src={painting.image_url}
                alt={painting.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-300">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Détails */}
        <div className="flex flex-col">
          <StatusBadge status={painting.status} className="w-fit" />

          <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {painting.title}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-ink">
            {formatPrice(painting.price)}
          </p>

          {painting.description && (
            <div className="mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Description
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-stone-600">
                {painting.description}
              </p>
            </div>
          )}

          {painting.details && (
            <div className="mt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Informations artistiques
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-stone-600">
                {painting.details}
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-stone-400">
            Ajoutée le {formatDate(painting.created_at)}
          </p>

          {/* Contact / achat */}
          <div className="mt-8 border-t border-stone-200 pt-8">
            <p className="mb-4 text-sm font-medium text-ink">
              {painting.status === "sold"
                ? "Cette œuvre a trouvé son acquéreur."
                : "Cette œuvre vous intéresse ?"}
            </p>
            <ContactButtons painting={painting} />
          </div>
        </div>
      </div>
    </article>
  );
}
