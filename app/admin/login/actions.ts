"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, startAdminSession } from "@/lib/auth/admin";

export interface LoginState {
  error?: string;
}

/**
 * Server Action de connexion administrateur.
 * Validation 100% côté serveur ; les identifiants attendus proviennent
 * exclusivement des variables d'environnement.
 */
export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!username || !password) {
    return { error: "Veuillez renseigner l'identifiant et le mot de passe." };
  }

  let valid = false;
  try {
    valid = verifyCredentials(username, password);
  } catch (e) {
    return {
      error:
        "Configuration serveur incomplète. Contactez l'administrateur du site.",
    };
  }

  if (!valid) {
    return { error: "Identifiant ou mot de passe incorrect." };
  }

  await startAdminSession(username);

  // Redirige vers la page demandée initialement (si interne et sûre).
  const target = from.startsWith("/admin") ? from : "/admin";
  redirect(target);
}
