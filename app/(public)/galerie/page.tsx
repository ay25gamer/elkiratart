import type { Metadata } from "next";
import { getAllPaintings } from "@/services/paintings";
import GalleryView from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez l'ensemble des œuvres de EL KIRAT Abdelkarim — disponibles, réservées et vendues.",
};

export const revalidate = 60;

export default async function GaleriePage() {
  const paintings = await getAllPaintings();

  return (
    <section className="container-art py-16 sm:py-20">
      <header className="text-center">
        <h1 className="section-title">La Galerie</h1>
        <div className="gold-rule" />
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-500">
          Parcourez l'ensemble de la collection. Utilisez la recherche et les
          filtres pour trouver l'œuvre qui vous touche.
        </p>
      </header>

      <div className="mt-12">
        <GalleryView paintings={paintings} />
      </div>
    </section>
  );
}
