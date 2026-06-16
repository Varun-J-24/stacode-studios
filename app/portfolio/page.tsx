import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gauge, MonitorCheck, Rocket, Smile } from "lucide-react";
import { PortfolioFilter } from "@/components/portfolio-filter";
import { PortfolioHeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { buttonClassName } from "@/components/ui/button";
import { getPublicPortfolio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Stacode Studios portfolio projects across business, healthcare, education, corporate and e-commerce websites."
};

export default async function PortfolioPage() {
  const portfolioProjects = await getPublicPortfolio();

  return (
    <>
      <section className="pb-12 pt-12 md:pb-16 md:pt-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-button border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase text-white">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Our Portfolio
            </div>
            <h1 className="mt-7 font-heading text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Websites That <span className="gradient-text">Speak Results.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Explore our work. Each website is crafted with purpose, designed to engage and built to grow businesses.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              <Stat icon={MonitorCheck} value="15+" label="Projects Completed" />
              <Stat icon={Smile} value="10+" label="Happy Clients" />
              <Stat icon={Rocket} value="100%" label="Client Satisfaction" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <PortfolioHeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="container pb-6">
        <PortfolioFilter projects={portfolioProjects} />
      </section>

      <section className="container pb-8">
        <div className="glass flex flex-col gap-6 rounded-card border-primary/50 bg-brand-gradient p-px md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-6 rounded-[19px] bg-slate-950/80 p-7">
            <Rocket className="h-16 w-16 rounded-full border border-secondary/50 bg-secondary/15 p-4 text-white" />
            <div>
              <h2 className="font-heading text-3xl font-bold text-white">Have a Project in Mind?</h2>
              <p className="mt-1 text-muted">Let&apos;s create something amazing together.</p>
            </div>
          </div>
          <div className="px-7 pb-7 md:p-7">
            <Link href="/contact" className={buttonClassName({ variant: "secondary", size: "lg" })}>
              Start Your Project <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="glass grid gap-6 rounded-card p-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Custom Design", "Every website is uniquely designed for your brand.", MonitorCheck],
            ["Mobile First", "Responsive and optimized for all devices.", Smile],
            ["SEO Optimized", "Built with SEO best practices to help you rank higher.", Rocket],
            ["Fast Performance", "Speed optimized websites for better user experience.", Gauge]
          ].map(([title, text, Icon]) => (
            <div key={title as string} className="flex items-center gap-4 border-white/10 lg:border-r lg:last:border-r-0">
              <Icon className="h-10 w-10 shrink-0 text-primary" />
              <div>
                <h3 className="font-heading font-semibold text-white">{title as string}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{text as string}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof MonitorCheck; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-8 w-8 text-secondary" />
      <div>
        <p className="font-heading text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
