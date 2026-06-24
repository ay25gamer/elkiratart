-- =====================================================================
-- EL KIRAT-ART — Schéma de base de données Supabase (PostgreSQL)
-- À exécuter dans : Supabase Dashboard > SQL Editor > New query
-- =====================================================================

-- Extension pour générer des UUID
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- 1. Type énuméré du statut de disponibilité
-- ---------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'painting_status') then
    create type painting_status as enum ('available', 'reserved', 'sold');
  end if;
end$$;

-- ---------------------------------------------------------------------
-- 2. Table des œuvres
-- ---------------------------------------------------------------------
create table if not exists public.paintings (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  price       numeric(12, 2),
  image_url   text,
  status      painting_status not null default 'available',
  details     text,
  created_at  timestamptz not null default now()
);

-- Index pour le tri par date (galerie / dernières œuvres)
create index if not exists paintings_created_at_idx
  on public.paintings (created_at desc);

-- Index pour le filtre par statut
create index if not exists paintings_status_idx
  on public.paintings (status);

-- ---------------------------------------------------------------------
-- 3. Row Level Security (RLS)
-- ---------------------------------------------------------------------
alter table public.paintings enable row level security;

-- Public (clé anonyme) : LECTURE SEULE.
drop policy if exists "Lecture publique des oeuvres" on public.paintings;
create policy "Lecture publique des oeuvres"
  on public.paintings
  for select
  to anon, authenticated
  using (true);

-- Les écritures (insert/update/delete) ne sont PAS autorisées via la clé
-- anonyme : aucune policy d'écriture n'est créée pour `anon`.
-- L'administration du site utilise la clé Service Role (côté serveur
-- uniquement), qui contourne le RLS. Les routes admin sont protégées par
-- l'authentification applicative (cookie de session signé + middleware).

-- =====================================================================
-- 4. Supabase Storage — bucket public pour les images
-- =====================================================================
-- Crée le bucket "paintings" en accès public (lecture).
insert into storage.buckets (id, name, public)
values ('paintings', 'paintings', true)
on conflict (id) do nothing;

-- Lecture publique des images du bucket.
drop policy if exists "Lecture publique images paintings" on storage.objects;
create policy "Lecture publique images paintings"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'paintings');

-- Les uploads/suppressions d'images se font côté serveur avec la clé
-- Service Role (qui contourne le RLS). Aucune policy d'écriture pour `anon`.

-- =====================================================================
-- 5. (Optionnel) Jeu de données de démonstration
-- =====================================================================
-- insert into public.paintings (title, description, price, status, details)
-- values
--   ('Aube sur l''Atlas', 'Lumière naissante sur les montagnes.', 3500, 'available', 'Huile sur toile, 80 × 100 cm, 2024'),
--   ('Silence bleu', 'Étude monochrome.', 2800, 'reserved', 'Acrylique, 60 × 80 cm, 2023'),
--   ('Médina', 'Fragments de mémoire.', 4200, 'sold', 'Technique mixte, 90 × 120 cm, 2022');
