import Link from "next/link";
import { getLatestPaintings } from "@/services/paintings";
import { SITE } from "@/lib/constants";
import PaintingCard from "@/components/PaintingCard";

// Revalidation toutes les 60s (ISR) — équilibre fraîcheur / performance.
export const revalidate = 60;

export default async function HomePage() {
  const latest = await getLatestPaintings(3);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="container-art grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
          <div className="animate-fade-in">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {SITE.tagline}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {SITE.artist}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
              Une exploration sensible de la matière, de la lumière et de
              l'émotion. Chaque toile est une pièce unique, peinte à la main,
              porteuse d'une histoire singulière.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/galerie" className="btn btn-primary">
                Découvrir la galerie
              </Link>
              <Link href="#artiste" className="btn btn-outline">
                À propos de l'artiste
              </Link>
            </div>
          </div>

          {/* Visuel d'ambiance */}
          <div className="relative animate-fade-in-slow">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 shadow-2xl shadow-stone-300/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-7xl font-semibold text-stone-400/60">
                  EK
                </span>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/40" />
            </div>
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full border border-gold/30" />
          </div>
        </div>
      </section>

      {/* ===================== STYLE ARTISTIQUE ===================== */}
      <section id="artiste" className="border-y border-stone-200 bg-stone-50">
        <div className="container-art grid gap-12 py-20 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="section-title text-left">Un style, une signature</h2>
            <div className="mt-4 h-px w-16 bg-gold" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            {[
              {
                title: "Matière & texture",
                text: "Des empâtements généreux et une matière vivante qui captent la lumière différemment selon l'heure du jour.",
              },
              {
                title: "Palette contemporaine",
                text: "Des accords chromatiques sobres et profonds, au service de l'émotion plutôt que de l'effet.",
              },
              {
                title: "Pièces uniques",
                text: "Chaque œuvre est originale, peinte à la main et signée par l'artiste EL KIRAT Abdelkarim.",
              },
              {
                title: "Émotion & narration",
                text: "Une peinture habitée, où chaque toile raconte un fragment d'histoire intérieure.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DERNIÈRES ŒUVRES ===================== */}
      <section className="container-art py-20 sm:py-24">
        <div className="text-center">
          <h2 className="section-title">Dernières œuvres</h2>
          <div className="gold-rule" />
          <p className="mx-auto mt-4 max-w-md text-sm text-stone-500">
            Les créations les plus récentes de l'atelier.
          </p>
        </div>

        {latest.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <PaintingCard key={p.id} painting={p} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-sm text-stone-400">
            Les œuvres seront bientôt disponibles. Revenez prochainement.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link href="/galerie" className="btn btn-primary">
            Voir toute la galerie
          </Link>
        </div>
      </section>
    </>
  );
}
