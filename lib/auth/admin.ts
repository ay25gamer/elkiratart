import "server-only";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "./session";

/**
 * Helpers d'authentification administrateur utilisables dans les
 * Server Components, Server Actions et Route Handlers.
 */

/** Comparaison à temps constant de deux chaînes. */
function safeCompare(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ba = enc.encode(a);
  const bb = enc.encode(b);
  if (ba.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ba.length; i++) diff |= ba[i] ^ bb[i];
  return diff === 0;
}

/**
 * Vérifie les identifiants fournis contre les variables d'environnement.
 * Les valeurs réelles ne sont JAMAIS écrites dans le code source.
 */
export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    throw new Error(
      "ADMIN_USERNAME / ADMIN_PASSWORD non configurés dans l'environnement."
    );
  }

  // On évalue les deux comparaisons pour limiter les fuites temporelles.
  const userOk = safeCompare(username, expectedUser);
  const passOk = safeCompare(password, expectedPass);
  return userOk && passOk;
}

/** Crée la session et pose le cookie httpOnly sécurisé. */
export async function startAdminSession(username: string): Promise<void> {
  const token = await createSessionToken(username);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Supprime le cookie de session (déconnexion). */
export function endAdminSession(): void {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/** Renvoie la session courante si elle est valide, sinon `null`. */
export async function getAdminSession(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

/** Renvoie `true` si la requête courante est authentifiée en admin. */
export async function isAuthenticated(): Promise<boolean> {
  return (await getAdminSession()) !== null;
}
