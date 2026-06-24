# EL KIRAT-ART 🎨

Site vitrine et galerie d'art en ligne de l'artiste peintre **EL KIRAT Abdelkarim**.
Présentation des œuvres, gestion de leur disponibilité (Disponible / Réservé / Vendu)
et contact direct (WhatsApp / Email) pour l'achat.

## ✨ Fonctionnalités

**Partie publique**
- Page d'accueil élégante (présentation de l'artiste, style, dernières œuvres).
- Galerie complète avec **recherche par nom** et **filtre par statut**.
- Page détail par œuvre (grande image, description, prix, statut, infos artistiques).
- Boutons de contact / demande d'achat **WhatsApp** et **Email** pré-remplis,
  désactivés automatiquement quand l'œuvre est **vendue**.
- Design premium responsive (mobile / tablette / desktop), animations douces.

**Espace administrateur** (`/admin`)
- Authentification sécurisée (identifiant + mot de passe stockés en variables d'environnement).
- Tableau de bord avec statistiques.
- CRUD complet des œuvres (ajout, modification, suppression avec confirmation).
- Upload d'image directement vers **Supabase Storage**.
- Changement de statut (Disponible / Réservé / Vendu).

## 🧱 Stack technique

| Couche | Technologie |
| --- | --- |
| Frontend | Next.js 14 (App Router) + React 18 |
| Langage | TypeScript |
| Styling | Tailwind CSS |
| Base de données | Supabase (PostgreSQL) |
| Stockage images | Supabase Storage |
| Authentification | Session signée HMAC (cookie httpOnly) + middleware |
| Déploiement | Vercel |

## 📁 Architecture

```
app/
  (public)/              → Site public (Navbar + Footer)
    page.tsx             → Accueil
    galerie/             → Galerie
    oeuvre/[id]/         → Détail d'une œuvre
  admin/
    login/               → Connexion administrateur
    (dashboard)/         → Espace protégé (tableau de bord + CRUD)
    actions.ts           → Server Actions (auth + CRUD)
components/              → Composants réutilisables (UI publique + admin)
hooks/                  → Hooks React (recherche / filtre)
lib/
  supabase/             → Clients Supabase (browser / server / admin)
  auth/                 → Sessions & vérification des identifiants
  constants.ts          → Constantes & coordonnées publiques
services/               → Accès aux données (lecture publique / écriture admin)
types/                  → Types TypeScript du domaine
utils/                  → Formatage & génération des liens de contact
middleware.ts           → Protection des routes /admin
supabase/schema.sql     → Schéma SQL + RLS + Storage
```

## 🔒 Sécurité

- **Aucun secret dans le code source.** Identifiants admin et clés Supabase
  vivent dans `.env.local` (ignoré par Git).
- La clé **Service Role** n'est utilisée que côté serveur (`lib/supabase/admin.ts`,
  protégé par `server-only`) et n'est jamais envoyée au navigateur.
- Le public utilise la clé **anonyme**, soumise au RLS : **lecture seule**.
- Les routes `/admin` sont protégées par un **middleware** + une vérification
  serveur dans le layout (double barrière). Cookie de session **httpOnly**,
  `secure` en production, signé en **HMAC-SHA256**.
- Toutes les écritures passent par des **Server Actions** qui re-vérifient la session.

---

## 🚀 Installation locale

### 1. Prérequis
- Node.js 18.17+ (recommandé : 20 ou 22)
- Un compte [Supabase](https://supabase.com)

### 2. Cloner et installer

```bash
git clone <votre-repo> elkirat-art
cd elkirat-art
npm install
```

### 3. Configurer Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécutez le contenu de [`supabase/schema.sql`](supabase/schema.sql).
   Cela crée la table `paintings`, le type `painting_status`, les règles RLS
   et le bucket Storage `paintings`.
3. Dans **Project Settings > API**, récupérez :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ (gardez-la secrète)

### 4. Variables d'environnement

Copiez l'exemple et renseignez vos valeurs :

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

ADMIN_USERNAME=votre_identifiant_admin
ADMIN_PASSWORD=votre_mot_de_passe_admin

# Générez une valeur aléatoire forte :
#   openssl rand -base64 32
SESSION_SECRET=...

NEXT_PUBLIC_SUPABASE_BUCKET=paintings
```

> ⚠️ Ne committez jamais `.env.local`. Le fichier est déjà listé dans `.gitignore`.

### 5. Lancer en développement

```bash
npm run dev
```

- Site public : http://localhost:3000
- Administration : http://localhost:3000/admin

---

## ☁️ Déploiement sur Vercel

1. Poussez le projet sur GitHub (les fichiers `.env*` ne seront pas envoyés).
2. Sur [vercel.com](https://vercel.com), **New Project** → importez le dépôt.
3. Dans **Settings > Environment Variables**, ajoutez **toutes** les variables
   de `.env.local` (mêmes noms, mêmes valeurs) :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_SUPABASE_BUCKET`
4. **Deploy**. Vercel détecte Next.js automatiquement (aucune config requise).
5. Après déploiement, l'administration est accessible sur `https://votre-domaine/admin`.

> Pensez à mettre à jour `SITE.url` dans [`lib/constants.ts`](lib/constants.ts)
> avec votre domaine final (utilisé pour les métadonnées / SEO).

---

## 👤 Accès administrateur

L'identifiant et le mot de passe sont définis **uniquement** via les variables
d'environnement `ADMIN_USERNAME` et `ADMIN_PASSWORD`. Pour les modifier,
changez ces variables (en local dans `.env.local`, en production dans Vercel)
puis redéployez. **Aucun identifiant n'est écrit dans le code.**

## 📞 Contact artiste

- **WhatsApp :** 0613691559
- **Email :** elkiratabdelkarim@gmail.com

---

© EL KIRAT-ART — Œuvres originales de EL KIRAT Abdelkarim.
