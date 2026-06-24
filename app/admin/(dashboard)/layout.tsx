import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Double protection (en plus du middleware) côté serveur.
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminHeader username={session.username} />
      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        {children}
      </main>
    </div>
  );
}
