-- ============================================================
-- LA FEYSSONNE — Schéma Supabase
-- À exécuter une fois dans le SQL editor du projet Supabase.
-- ============================================================

-- ----------------------------------------
-- Réservations
-- ----------------------------------------
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('reserved', 'blocked', 'available')),
  note text default '',
  created_at timestamptz not null default now(),
  constraint reservations_dates check (end_date >= start_date)
);

create index if not exists reservations_start_idx on public.reservations (start_date);
create index if not exists reservations_end_idx on public.reservations (end_date);

-- ----------------------------------------
-- Tarifs
-- ----------------------------------------
create table if not exists public.pricing (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  -- 1..12 → mois ciblé pour le calcul automatique côté site (null = libre)
  month_number int check (month_number is null or (month_number between 1 and 12)),
  price int not null check (price >= 0),
  min_nights int not null default 7 check (min_nights >= 1),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists pricing_month_idx on public.pricing (month_number);

-- ----------------------------------------
-- RLS — Row-Level Security
-- ----------------------------------------
alter table public.reservations enable row level security;
alter table public.pricing       enable row level security;

-- Public site → lecture seule
drop policy if exists "reservations_select_public" on public.reservations;
create policy "reservations_select_public" on public.reservations
  for select to anon, authenticated using (true);

drop policy if exists "pricing_select_public" on public.pricing;
create policy "pricing_select_public" on public.pricing
  for select to anon, authenticated using (true);

-- Admin authentifié → écriture totale
drop policy if exists "reservations_write_authed" on public.reservations;
create policy "reservations_write_authed" on public.reservations
  for all to authenticated using (true) with check (true);

drop policy if exists "pricing_write_authed" on public.pricing;
create policy "pricing_write_authed" on public.pricing
  for all to authenticated using (true) with check (true);

-- ----------------------------------------
-- Données initiales (seed)
-- ----------------------------------------
insert into public.pricing (period, month_number, price, min_nights, sort_order) values
  ('Mai',       5, 220,  7, 1),
  ('Juin',      6, 250,  7, 2),
  ('Juillet',   7, 350, 10, 3),
  ('Août',      8, 350, 10, 4),
  ('Septembre', 9, 220,  7, 5)
on conflict do nothing;

insert into public.reservations (start_date, end_date, status, note) values
  ('2026-05-10', '2026-05-17', 'reserved', 'Réservation Airbnb — Famille R.'),
  ('2026-06-05', '2026-06-14', 'reserved', 'Direct — Couple Moreau'),
  ('2026-07-11', '2026-07-25', 'reserved', 'Abritel — Famille Guyot'),
  ('2026-08-01', '2026-08-15', 'reserved', 'Direct — Famille Delorme'),
  ('2026-08-22', '2026-08-29', 'blocked',  'Famille propriétaire'),
  ('2026-09-12', '2026-09-19', 'reserved', 'Airbnb — Couple Leblanc')
on conflict do nothing;
