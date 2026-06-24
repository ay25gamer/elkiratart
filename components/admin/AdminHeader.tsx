import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export default function AdminHeader({ username }: { username: string }) {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-serif text-lg font-semibold text-ink">
            EL KIRAT<span className="text-gold">-ART</span>
            <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Admin
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden text-sm text-stone-500 hover:text-ink sm:inline"
          >
            Voir le site ↗
          </Link>
          <span className="hidden text-sm text-stone-400 sm:inline">
            {username}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-stone-300 px-4 py-1.5 text-sm text-stone-600 transition hover:border-ink hover:text-ink"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
