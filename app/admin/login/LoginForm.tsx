"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-full">
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}

export default function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="from" value={from} />

      <div>
        <label htmlFor="username" className="label">
          Identifiant
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="field"
          placeholder="Votre identifiant"
        />
      </div>

      <div>
        <label htmlFor="password" className="label">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
          placeholder="••••••••"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
