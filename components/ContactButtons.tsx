"use client";

import type { Painting } from "@/types/painting";
import { buildWhatsAppLink, buildEmailLink } from "@/utils/contact";

/**
 * Boutons de contact / demande d'achat pour une œuvre.
 * - Affichés uniquement si l'œuvre est "available" ou "reserved".
 * - Pour une œuvre "sold", on affiche "Tableau vendu" et les boutons sont désactivés.
 */
export default function ContactButtons({
  painting,
  size = "md",
}: {
  painting: Painting;
  size?: "sm" | "md";
}) {
  if (painting.status === "sold") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Tableau vendu
      </div>
    );
  }

  const whatsappLink = buildWhatsAppLink(painting.title, painting.price);
  const emailLink = buildEmailLink(painting.title, painting.price);
  const compact = size === "sm";

  return (
    <div className={`flex flex-col gap-2 sm:flex-row ${compact ? "" : "sm:gap-3"}`}>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn-whatsapp ${compact ? "px-4 py-2 text-xs" : ""}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
          <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.75.46 3.45 1.32 4.95L2 22l5.32-1.4a9.83 9.83 0 004.71 1.2h.01c5.44 0 9.87-4.43 9.87-9.87 0-2.64-1.03-5.12-2.9-6.98A9.8 9.8 0 0012.04 2zm0 18.02h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 01-1.25-4.35c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 012.4 5.8c0 4.53-3.68 8.21-8.2 8.21z" />
        </svg>
        Acheter via WhatsApp
      </a>

      <a
        href={emailLink}
        className={`btn btn-outline ${compact ? "px-4 py-2 text-xs" : ""}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Demande par email
      </a>
    </div>
  );
}
