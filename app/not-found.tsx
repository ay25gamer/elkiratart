import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <p className="font-serif text-6xl font-semibold text-stone-300">404</p>
      <h1 className="mt-4 font-serif text-2xl text-ink">Page introuvable</h1>
      <p className="mt-2 max-w-sm text-sm text-stone-500">
        L'œuvre ou la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Retour à l'accueil
      </Link>
    </main>
  );
}
