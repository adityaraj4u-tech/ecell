-- GEC Banka E-Cell — Supabase schema
-- Run once in Supabase Dashboard → SQL Editor. Safe to re-run.
-- The site talks to Supabase only from the server with the secret key, so
-- RLS is enabled with no policies: the public (publishable) key can't read
-- or write any of these tables.

create extension if not exists pgcrypto;

-- Events managed from /admin
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  start_time text,
  end_time text,
  venue text not null,
  mode text not null default 'In-person'
    check (mode in ('In-person', 'Online', 'Hybrid')),
  type text not null default 'workshop'
    check (type in ('workshop', 'speaker', 'pitch')),
  description text not null,
  capacity integer not null default 0,
  seats_left integer not null default 0,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Public "Submit your idea" form
create table if not exists public.idea_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  branch text not null,
  year text not null,
  team_size integer not null default 1,
  title text not null,
  problem text not null,
  solution text not null,
  stage text not null,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'shortlisted', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  branch text not null,
  year text not null,
  "rollNumber" text not null,
  phone text not null,
  "eventId" text not null,
  "eventTitle" text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.idea_submissions enable row level security;
alter table public.event_registrations enable row level security;
alter table public.contacts enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public bucket for event cover images (uploads happen server-side)
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

-- Refresh the API schema cache so new tables are available immediately
notify pgrst, 'reload schema';
