-- ==============================================================================
-- JS0pro Database Schema (Supabase / PostgreSQL)
-- Execute this script in Supabase -> SQL Editor -> Run
-- ==============================================================================

-- 1. Profiles Table (Linked to Supabase Auth users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  username text unique,
  avatar_letter text default 'A',
  is_pro boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. User Progress Table (XP, Level, Streak, Preferences)
create table if not exists public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  xp integer default 0,
  level integer default 1,
  streak_days integer default 1,
  last_active_date date default current_date,
  sound_enabled boolean default true,
  dark_mode boolean default true,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Completed Lessons Table
create table if not exists public.user_lessons (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id text not null,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- 4. Unlocked Badges Table
create table if not exists public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, badge_id)
);

-- 5. Game Scores Table
create table if not exists public.user_game_scores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  game_id text not null,
  high_score integer default 0,
  completed_times integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, game_id)
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_lessons enable row level security;
alter table public.user_badges enable row level security;
alter table public.user_game_scores enable row level security;

-- Profiles: users can read all profiles (for rankings/leaderboards) and update their own
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on public.profiles
  for insert with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile." on public.profiles;
create policy "Users can update their own profile." on public.profiles
  for update using ((select auth.uid()) = id);

-- User Progress: users can read & update their own progress
drop policy if exists "Users can view their own progress." on public.user_progress;
create policy "Users can view their own progress." on public.user_progress
  for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own progress." on public.user_progress;
create policy "Users can insert their own progress." on public.user_progress
  for insert with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own progress." on public.user_progress;
create policy "Users can update their own progress." on public.user_progress
  for update using ((select auth.uid()) = user_id);

-- User Lessons: users can view & insert their completed lessons
drop policy if exists "Users can view their completed lessons." on public.user_lessons;
create policy "Users can view their completed lessons." on public.user_lessons
  for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can record completed lessons." on public.user_lessons;
create policy "Users can record completed lessons." on public.user_lessons
  for insert with check ((select auth.uid()) = user_id);

-- User Badges: users can view & earn badges
drop policy if exists "Users can view their unlocked badges." on public.user_badges;
create policy "Users can view their unlocked badges." on public.user_badges
  for select using ((select auth.uid()) = user_id);

drop policy if exists "Users can unlock badges." on public.user_badges;
create policy "Users can unlock badges." on public.user_badges
  for insert with check ((select auth.uid()) = user_id);

-- Game Scores: viewable for leaderboards, updated by owner
drop policy if exists "Game scores are viewable by everyone." on public.user_game_scores;
create policy "Game scores are viewable by everyone." on public.user_game_scores
  for select using (true);

drop policy if exists "Users can insert their game scores." on public.user_game_scores;
create policy "Users can insert their game scores." on public.user_game_scores
  for insert with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their game scores." on public.user_game_scores;
create policy "Users can update their game scores." on public.user_game_scores
  for update using ((select auth.uid()) = user_id);

-- ==============================================================================
-- Automatic Trigger on New Signup
-- When a user registers via Supabase Auth, automatically create their profile & progress!
-- ==============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  user_name text;
begin
  user_name := coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1), 'User');
  
  insert into public.profiles (id, email, name, username, avatar_letter)
  values (
    new.id,
    new.email,
    user_name,
    '@' || lower(replace(user_name, ' ', '.')),
    upper(substring(user_name from 1 for 1))
  )
  on conflict (id) do nothing;

  insert into public.user_progress (user_id, xp, level, streak_days)
  values (new.id, 0, 1, 1)
  on conflict (user_id) do nothing;

  -- First welcome badge
  insert into public.user_badges (user_id, badge_id)
  values (new.id, 'b1')
  on conflict (user_id, badge_id) do nothing;

  return new;
end;
$$;

-- Drop trigger if already exists
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Revoke execute permissions from public, anon, and authenticated roles
-- (Prevents exposing trigger functions to REST API / RPC callers)
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_new_user() from anon;
revoke execute on function public.handle_new_user() from authenticated;

