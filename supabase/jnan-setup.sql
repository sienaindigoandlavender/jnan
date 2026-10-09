-- Jnan: run once in the Supabase SQL Editor. Safe to run again.
create table if not exists public.jnan_progress (
  room text not null,
  item_id text not null,
  box int not null default 0,
  due_at timestamptz,
  seen int not null default 0,
  correct int not null default 0,
  wrong int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (room, item_id)
);

create table if not exists public.jnan_lessons (
  room text not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (room, lesson_id)
);

create table if not exists public.jnan_events (
  id bigint generated always as identity primary key,
  room text not null,
  type text not null,
  data jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.jnan_progress enable row level security;
alter table public.jnan_lessons enable row level security;
alter table public.jnan_events enable row level security;
