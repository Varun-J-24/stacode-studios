# Stacode Studios Website

Production-ready Next.js 15 website for Stacode Studios with dark premium UI, contact lead capture, Supabase-backed admin dashboard, CMS tables, Resend email notifications, SEO routes and Vercel deployment support.

## Stack

- Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion
- Supabase PostgreSQL and Supabase Auth
- Resend email automation
- React Hook Form and Zod validation
- Vercel Analytics, sitemap, robots, Open Graph and business schema
- Optional Google Analytics through `NEXT_PUBLIC_GA_ID`

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill all values.
3. In Supabase SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
4. Create an admin user in Supabase Auth using `contact.stacodestudios@gmail.com` or add allowed emails in `ADMIN_EMAILS`.
5. Start locally with `npm run dev`.

## Environment Variables

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `OWNER_EMAIL`
- `ADMIN_EMAILS`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`

## Routes

- `/` home page
- `/services-pricing` services and pricing
- `/portfolio` CMS-backed portfolio
- `/contact` lead capture and WhatsApp CTA
- `/admin` authenticated lead management and CMS dashboard

## Deployment

Deploy on Vercel, add the same environment variables, and connect the GitHub repository. Use Supabase hosted Postgres and Resend verified domain email for production sending.
