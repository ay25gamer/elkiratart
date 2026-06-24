/**
 * Gestion de session administrateur — sans dépendance externe.
 *
 * Le jeton est un cookie signé HMAC-SHA256 (format proche d'un JWT) :
 *   base64url(payload).base64url(signature)
 *
 * On utilise l'API Web Crypto (`crypto.subtle`), disponible à la fois dans
 * le runtime Node et le runtime Edge (middleware). Aucun secret en clair
 * n'est jamais envoyé au client : seule la signature voyage dans le cookie.
 */

export const SESSION_COOKIE = "elkirat_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours (secondes)

export interface SessionPayload {
  sub: "admin";
  username: string;
  iat: number; // émis le (epoch s)
  exp: number; // expire le (epoch s)
}

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET manquant ou trop court (>= 16 caractères requis)."
    );
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(input.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Comparaison à temps constant pour éviter les attaques temporelles. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Crée un jeton de session signé pour l'administrateur. */
export async function createSessionToken(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: "admin",
    username,
    iat: now,
    exp: now + SESSION_MAX_AGE,
  };

  const payloadPart = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const key = await importKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadPart)
  );
  const signaturePart = base64UrlEncode(new Uint8Array(signature));
  return `${payloadPart}.${signaturePart}`;
}

/** Vérifie un jeton et renvoie son contenu, ou `null` si invalide/expiré. */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadPart, signaturePart] = parts;

  try {
    const key = await importKey();
    const expected = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payloadPart)
    );
    const provided = base64UrlDecode(signaturePart);

    if (!timingSafeEqual(new Uint8Array(expected), provided)) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payloadPart))
    ) as SessionPayload;

    if (payload.sub !== "admin") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
