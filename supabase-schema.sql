-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

-- Profiles table
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  email        text,
  dob          date,
  gender       text,
  sexuality    text,
  bio          text,
  avatar_url   text,
  location     text,
  plan         text default 'trial',
  trial_start  timestamptz,
  subscribed   boolean default false,
  created_at   timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can only read/write their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, dob, gender, sexuality)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    (new.raw_user_meta_data->>'dob')::date,
    new.raw_user_meta_data->>'gender',
    new.raw_user_meta_data->>'sexuality'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
