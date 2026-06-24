import { CONTACT } from "@/lib/constants";
import { formatPrice } from "./format";

/**
 * Construit le lien WhatsApp avec un message pré-rempli pour une œuvre.
 */
export function buildWhatsAppLink(title: string, price: number | null): string {
  const message = `Bonjour EL KIRAT Abdelkarim,

Je suis intéressé(e) par votre tableau :
${title}

Prix :
${formatPrice(price)}

Je souhaite avoir plus d'informations concernant son achat.`;

  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Construit le lien `mailto:` avec sujet et corps pré-remplis pour une œuvre.
 */
export function buildEmailLink(title: string, price: number | null): string {
  const subject = `Demande d'achat - ${title}`;
  const body = `Bonjour EL KIRAT Abdelkarim,

Je souhaite avoir plus d'informations concernant l'achat du tableau :

Nom :
${title}

Prix :
${formatPrice(price)}

Merci.`;

  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
