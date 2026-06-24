import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion administrateur",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { from?: string };
}) {
  const from = searchParams.from ?? "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-5">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="font-serif text-2xl font-semibold text-ink">
            EL KIRAT<span className="text-gold">-ART</span>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-stone-400">
            Espace administrateur
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="font-serif text-xl font-medium text-ink">Connexion</h1>
          <p className="mt-1 text-sm text-stone-500">
            Accès réservé à l'artiste.
          </p>
          <div className="mt-6">
            <LoginForm from={from} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-stone-400">
          <Link href="/" className="hover:text-ink">
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
