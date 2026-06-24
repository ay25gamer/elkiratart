import type { PaintingStatus } from "@/types/painting";
import { PAINTING_STATUS_LABELS } from "@/lib/constants";

const STYLES: Record<PaintingStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  reserved: "bg-amber-50 text-amber-700 ring-amber-600/20",
  sold: "bg-stone-200 text-stone-600 ring-stone-500/20",
};

const DOT: Record<PaintingStatus, string> = {
  available: "bg-emerald-500",
  reserved: "bg-amber-500",
  sold: "bg-stone-400",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: PaintingStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${STYLES[status]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
      {PAINTING_STATUS_LABELS[status]}
    </span>
  );
}
