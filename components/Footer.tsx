import Link from "next/link";
import { SITE, CONTACT } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-24 border-t border-stone-200 bg-stone-50">
      <div className="container-art grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {/* Marque */}
        <div>
          <p className="font-serif text-lg font-semibold text-ink">
            EL KIRAT<span className="text-gold">-ART</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500">
            Galerie d'art contemporain de l'artiste peintre {SITE.artist}.
            Chaque œuvre est une pièce originale.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-stone-600">
            <li><Link href="/" className="hover:text-ink">Accueil</Link></li>
            <li><Link href="/galerie" className="hover:text-ink">Galerie</Link></li>
            <li><Link href="/#artiste" className="hover:text-ink">L'artiste</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
            Contact
          </h3>
          <p className="mt-4 text-sm font-medium text-ink">{SITE.artist}</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-600">
            <li className="flex items-center gap-2">
              <span className="text-stone-400">WhatsApp :</span>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink hover:text-gold"
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-stone-400">Email :</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-medium text-ink hover:text-gold"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="container-art flex flex-col items-center justify-between gap-2 py-5 text-xs text-stone-400 sm:flex-row">
          <p>© {year} EL KIRAT-ART — Tous droits réservés.</p>
          <p>
            Œuvres originales de {SITE.artist}.
          </p>
        </div>
      </div>
    </footer>
  );
}
