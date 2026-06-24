/** Formatage du prix en dirham marocain (MAD). */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "Prix sur demande";
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Formatage d'une date ISO en français long. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
