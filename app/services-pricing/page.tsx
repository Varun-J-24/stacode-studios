import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDollarSign, ShieldCheck, Star } from "lucide-react";
import { PricingCard } from "@/components/cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { PricingHeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buttonClassName } from "@/components/ui/button";
import {
  additionalServices,
  maintenancePlans,
  serviceTabs
} from "@/lib/data";
import { getPublicFaqs, getPublicPricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Transparent website development pricing for Stacode Studios packages, e-commerce, maintenance and SEO services."
};

export default async function ServicesPricingPage() {
  const [publicFaqs, publicPricing] = await Promise.all([getPublicFaqs(), getPublicPricing()]);

  return (
    <>
      <section className="pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase text-white">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Services & Pricing
            </div>
            <h1 className="mt-7 font-heading text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Transparent Pricing. <span className="gradient-text">Maximum Value.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              We offer the perfect combination of design, performance and SEO to grow your business online.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <p className="flex items-start gap-3 text-white">
                <CircleDollarSign className="h-8 w-8 text-primary" />
                <span>
                  <strong className="block">No Hidden Costs</strong>
                  <span className="text-sm text-muted">100% transparent pricing</span>
                </span>
              </p>
              <p className="flex items-start gap-3 text-white">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <span>
                  <strong className="block">Satisfaction Guaranteed</strong>
                  <span className="text-sm text-muted">We build until you love it</span>
                </span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <PricingHeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="container pb-10">
        <div className="glass flex flex-wrap items-center justify-between gap-5 rounded-card p-6">
          <p className="w-full text-xs font-bold uppercase text-secondary md:w-auto">Our Services</p>
          {serviceTabs.map((tab) => (
            <div key={tab.title} className="flex min-w-40 items-center gap-4">
              <tab.icon className="h-8 w-8 text-primary" />
              <span className="font-semibold text-white">{tab.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-12">
        <SectionHeading eyebrow="Website Development Packages" title="Choose The Right Package" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {publicPricing.map((plan, index) => (
            <Reveal key={plan.slug} delay={index * 0.05}>
              <PricingCard
                name={plan.name}
                label={plan.label}
                price={plan.price}
                delivery={plan.delivery}
                badge={plan.badge}
                features={plan.features}
                highlighted={plan.slug === "business"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pb-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass rounded-card p-7">
              <h2 className="font-heading text-2xl font-bold uppercase text-secondary">Monthly Maintenance Plans</h2>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {maintenancePlans.map((plan) => (
                  <div key={plan.name} className="border-white/10 sm:border-r sm:pr-6 sm:last:border-r-0">
                    <plan.icon className="h-12 w-12 rounded-full border border-secondary/40 bg-secondary/10 p-3 text-secondary" />
                    <h3 className="mt-5 font-heading text-xl font-bold uppercase text-white">{plan.name}</h3>
                    <p className="mt-2 text-3xl font-bold text-white">
                      {plan.price} <span className="text-sm font-normal text-muted">{plan.period}</span>
                    </p>
                    <ul className="mt-6 grid gap-3 text-sm text-white/85">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className={buttonClassName({ variant: "secondary", className: "mt-7 w-full" })}>
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass rounded-card p-7">
              <h2 className="font-heading text-2xl font-bold uppercase text-secondary">Additional Services</h2>
              <div className="mt-7 grid gap-4">
                {additionalServices.map(([name, price]) => (
                  <div key={name} className="flex items-center gap-4 text-sm">
                    <span className="h-px flex-1 bg-white/12" />
                    <span className="order-first text-white">{name}</span>
                    <span className="font-semibold text-white">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="container pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <div>
            <SectionHeading eyebrow="Frequently Asked Questions" title="Everything You Need To Know" />
            <div className="mt-8">
              <FaqAccordion items={publicFaqs} />
            </div>
          </div>
          <div className="glass self-start rounded-card bg-gradient-to-br from-secondary/35 to-primary/15 p-8">
            <h3 className="font-heading text-2xl font-bold text-white">Still have questions?</h3>
            <p className="mt-3 text-muted">Let&apos;s talk about your project.</p>
            <Link href="/contact" className={buttonClassName({ className: "mt-7" })}>
              Schedule a Call <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-sm text-white">5.0 Trusted by businesses</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
