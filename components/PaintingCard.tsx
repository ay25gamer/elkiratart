import Image from "next/image";
import Link from "next/link";
import type { Painting } from "@/types/painting";
import { formatPrice } from "@/utils/format";
import StatusBadge from "./StatusBadge";

export default function PaintingCard({ painting }: { painting: Painting }) {
  return (
    <Link
      href={`/oeuvre/${painting.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {painting.image_url ? (
          <Image
            src={painting.image_url}
            alt={painting.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={painting.status} className="bg-white/90 backdrop-blur" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-medium text-ink">{painting.title}</h3>
        {painting.description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-500">
            {painting.description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-semibold text-ink">
            {formatPrice(painting.price)}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-gold opacity-0 transition-opacity group-hover:opacity-100">
            Découvrir →
          </span>
        </div>
      </div>
    </Link>
  );
}
