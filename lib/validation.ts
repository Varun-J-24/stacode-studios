import { z } from "zod";
import { leadStatuses } from "@/lib/constants";
import { projectTypes } from "@/lib/data";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  businessName: z.string().trim().min(2, "Please enter your business name").max(120),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{8,20}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  projectType: z.enum(projectTypes as [string, ...string[]]),
  projectDescription: z.string().trim().min(20, "Please share at least 20 characters").max(2500),
  csrfToken: z.string().min(16)
});

export const leadUpdateSchema = z.object({
  status: z.enum(leadStatuses)
});

export const portfolioSchema = z.object({
  industry: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(80),
  name: z.string().trim().min(2).max(140),
  description: z.string().trim().min(10).max(700),
  technologies: z.array(z.string().trim().min(1).max(40)).min(1).max(12),
  href: z.string().trim().url(),
  thumbnail_url: z.string().trim().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  accent: z.string().trim().max(120).optional()
});

export const serviceSchema = z.object({
  title: z.string().trim().min(2).max(100),
  slug: z.string().trim().min(2).max(120),
  short: z.string().trim().min(8).max(220),
  description: z.string().trim().min(10).max(800),
  featured: z.boolean().default(false)
});

export const faqSchema = z.object({
  question: z.string().trim().min(8).max(180),
  answer: z.string().trim().min(8).max(900),
  category: z.string().trim().max(80).optional()
});

export const pricingSchema = z.object({
  name: z.string().trim().min(2).max(100),
  price: z.string().trim().min(2).max(40),
  delivery: z.string().trim().min(2).max(80),
  label: z.string().trim().max(160).optional(),
  badge: z.string().trim().max(80).optional(),
  features: z.array(z.string().trim().min(1).max(140)).min(1).max(20),
  best_for: z.array(z.string().trim().min(1).max(80)).default([])
});

export type ContactInput = z.infer<typeof contactSchema>;
