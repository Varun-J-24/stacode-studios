create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  business_name text not null,
  phone text not null,
  email text not null,
  project_type text not null,
  project_description text not null,
  status text not null default 'new' check (
    status in ('new', 'contacted', 'proposal_sent', 'closed_won', 'closed_lost')
  )
);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.leads(id) on delete cascade,
  owner_email_id text,
  client_email_id text,
  status text not null default 'pending',
  error_message text
);

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  industry text not null,
  category text not null,
  name text not null,
  description text not null,
  technologies text[] not null default '{}',
  href text not null,
  thumbnail_url text,
  accent text,
  featured boolean not null default false
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  short text not null,
  description text not null,
  featured boolean not null default false
);

create table if not exists public.pricing_packages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  price text not null,
  delivery text not null,
  label text,
  badge text,
  features text[] not null default '{}',
  best_for text[] not null default '{}'
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  question text not null,
  answer text not null,
  category text default 'General'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_projects_updated_at on public.portfolio_projects;
create trigger set_portfolio_projects_updated_at
before update on public.portfolio_projects
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_pricing_packages_updated_at on public.pricing_packages;
create trigger set_pricing_packages_updated_at
before update on public.pricing_packages
for each row execute function public.set_updated_at();

drop trigger if exists set_faqs_updated_at on public.faqs;
create trigger set_faqs_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

alter table public.leads enable row level security;
alter table public.email_events enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.services enable row level security;
alter table public.pricing_packages enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "service role full access leads" on public.leads;
create policy "service role full access leads" on public.leads
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

drop policy if exists "service role full access email events" on public.email_events;
create policy "service role full access email events" on public.email_events
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

drop policy if exists "service role full access portfolio" on public.portfolio_projects;
create policy "service role full access portfolio" on public.portfolio_projects
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

drop policy if exists "service role full access services" on public.services;
create policy "service role full access services" on public.services
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

drop policy if exists "service role full access pricing" on public.pricing_packages;
create policy "service role full access pricing" on public.pricing_packages
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

drop policy if exists "service role full access faqs" on public.faqs;
create policy "service role full access faqs" on public.faqs
for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists portfolio_category_idx on public.portfolio_projects(category);
