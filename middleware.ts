import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

/**
 * Protection des routes /admin.
 *
 * - Toute route /admin/* exige une session admin valide, SAUF /admin/login.
 * - Sans session valide → redirection vers /admin/login.
 * - Avec session valide sur /admin/login → redirection vers le dashboard.
 *
 * La vérification s'effectue ici (runtime Edge) via une signature HMAC :
 * aucune requête réseau, aucun secret exposé.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Toute autre route /admin/* nécessite une session valide.
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
