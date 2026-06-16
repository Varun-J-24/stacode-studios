import { createServiceClient, hasSupabaseEnv } from "@/lib/supabase/server";
import {
  faqs,
  portfolioProjects,
  pricingPackages,
  services
} from "@/lib/data";

async function readTable<T>(table: string, fallback: T[]) {
  if (!hasSupabaseEnv()) {
    return fallback;
  }

  try {
    const { data, error } = await createServiceClient().from(table).select("*").order("created_at");

    if (error || !data?.length) {
      return fallback;
    }

    return data as T[];
  } catch {
    return fallback;
  }
}

export async function getPublicPortfolio() {
  const data = await readTable<{
    industry: string;
    category: string;
    name: string;
    description: string;
    technologies: string[];
    href: string;
    accent?: string;
    featured?: boolean;
  }>("portfolio_projects", portfolioProjects);

  return data.map((project, index) => ({
    ...project,
    accent: project.accent || portfolioProjects[index % portfolioProjects.length]?.accent,
    technologies: project.technologies || []
  }));
}

export async function getPublicFaqs() {
  return readTable<{ question: string; answer: string }>("faqs", faqs);
}

export async function getPublicPricing() {
  const data = await readTable<{
    slug?: string;
    name: string;
    label?: string;
    price: string;
    delivery: string;
    badge?: string;
    features: string[];
    best_for?: string[];
  }>("pricing_packages", pricingPackages);

  return data.map((plan, index) => ({
    ...pricingPackages[index % pricingPackages.length],
    ...plan,
    label: plan.label || pricingPackages[index % pricingPackages.length].label,
    slug: plan.slug || pricingPackages[index % pricingPackages.length].slug,
    features: plan.features || []
  }));
}

export async function getPublicServices() {
  const data = await readTable<{
    slug: string;
    title: string;
    short: string;
    description: string;
    featured?: boolean;
  }>("services", services);

  return data.map((service, index) => ({
    ...services[index % services.length],
    ...service
  }));
}
