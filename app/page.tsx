import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Rocket, Star } from "lucide-react";
import { FeatureCard, MiniCard, PortfolioCard } from "@/components/cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { HomeHeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buttonClassName } from "@/components/ui/button";
import {
  testimonials,
  trustIndicators,
  whyChooseUs
} from "@/lib/data";
import { getPublicFaqs, getPublicPortfolio, getPublicServices } from "@/lib/content";

export default async function HomePage() {
  const [publicFaqs, publicPortfolio, publicServices] = await Promise.all([
    getPublicFaqs(),
    getPublicPortfolio(),
    getPublicServices()
  ]);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase text-white">
              <span className="h-2 w-2 rounded-full bg-primary" />
              We Build Digital Experiences
            </div>
            <h1 className="mt-7 font-heading text-5xl font-extrabold leading-tight text-white md:text-6xl xl:text-7xl">
              We Build Websites That Build <span className="gradient-text">Businesses</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Modern, fast and SEO-ready websites that help businesses attract customers and grow online.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className={buttonClassName({ size: "lg" })}>
                Book Free Consultation <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/services-pricing" className={buttonClassName({ variant: "secondary", size: "lg" })}>
                View Pricing <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-7 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-5 w-5 text-primary" />
              Proudly serving businesses across India from <span className="text-secondary">Varanasi</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <HomeHeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="container">
        <Reveal>
          <div className="glass grid gap-6 rounded-card p-6 md:grid-cols-2 lg:grid-cols-4">
            {trustIndicators.map((item) => (
              <div key={item.title} className="flex gap-4 border-white/10 lg:border-r lg:last:border-r-0">
                <item.icon className="h-10 w-10 shrink-0 text-primary" />
                <div>
                  <h3 className="font-heading font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="What We Do"
              title="Our Services"
              text="End-to-end solutions to take your business online and help it grow."
            />
            <Link href="/services-pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Explore All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {publicServices.slice(0, 4).map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.06}>
                <FeatureCard icon={service.icon} title={service.title} text={service.short} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <Reveal>
          <div className="glass overflow-hidden rounded-card border-primary/40">
            <div className="grid items-center gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr_0.9fr] lg:p-10">
              <div className="flex aspect-square max-w-56 items-center justify-center rounded-full bg-brand-gradient p-8 shadow-purple">
                <Rocket className="h-24 w-24 text-white" />
              </div>
              <div>
                <span className="rounded-md border border-secondary/60 bg-secondary/20 px-3 py-1 text-xs font-bold uppercase text-white">
                  Launch Offer - Limited Time
                </span>
                <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
                  First 5 Clients Get Business Package at
                </h2>
                <p className="mt-4 font-heading text-5xl font-extrabold">
                  <span className="mr-4 text-3xl text-white/70 line-through">₹14,999</span>
                  <span className="gradient-text">₹9,999</span>
                </p>
              </div>
              <div className="grid gap-4 text-sm text-white">
                {["Free Google Business Profile Setup", "1 Month Free Maintenance", "Priority Onboarding Support"].map((item) => (
                  <p key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {item}
                  </p>
                ))}
                <Link href="/contact" className={buttonClassName({ className: "mt-2" })}>
                  Claim This Offer <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why Choose Stacode Studios?"
            title={
              <>
                We Don&apos;t Just Build Websites,
                <br />
                We Build Long-Term <span className="gradient-text">Partnerships.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <MiniCard icon={item.icon} title={item.title} text={item.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Portfolio Preview"
            title="Websites That Speak Results"
            text="Each website is crafted with purpose, designed to engage and built to grow businesses."
          />
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View Portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {publicPortfolio.slice(0, 3).map((project, index) => (
            <Reveal key={project.name} delay={index * 0.06}>
              <PortfolioCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHeading
            eyebrow="What Clients Can Expect"
            title="Your Success, Our Priority"
            text="We're here to turn your ideas into a powerful online presence."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.06}>
                <div className="glass rounded-card p-7">
                  <p className="text-5xl font-bold text-secondary">“</p>
                  <p className="mt-2 text-sm leading-7 text-white/86">{item.quote}</p>
                  <div className="mt-5 flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted">- {item.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="container pb-16">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-8">
          <FaqAccordion items={publicFaqs} />
        </div>
      </section>

      <section className="container pb-20">
        <Reveal>
          <div className="glass flex flex-col gap-6 rounded-card border-primary/50 bg-brand-gradient p-px md:flex-row md:items-center md:justify-between">
            <div className="rounded-[19px] bg-slate-950/80 p-8 md:flex-1">
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Ready To Take Your Business Online?
              </h2>
              <p className="mt-3 text-muted">Let&apos;s build a website that not only looks great but also grows your business.</p>
            </div>
            <div className="px-8 pb-8 md:p-8">
              <Link href="/contact" className={buttonClassName({ variant: "dark", size: "lg" })}>
                Let&apos;s Talk <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
