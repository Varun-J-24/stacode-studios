import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string }>;

export function FeatureCard({ icon: Icon, title, text }: { icon: IconType; title: string; text: string }) {
  return (
    <div className="glass rounded-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
      <Link href="/services-pricing" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
        Learn More <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function MiniCard({ icon: Icon, title, text }: { icon: IconType; title: string; text: string }) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <Icon className="mx-auto h-8 w-8 text-secondary" />
      <h3 className="mt-5 font-heading text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}

export function PricingCard({
  name,
  label,
  price,
  delivery,
  badge,
  features,
  highlighted
}: {
  name: string;
  label: string;
  price: string;
  delivery: string;
  badge?: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass relative rounded-card p-7",
        highlighted && "border-primary/80 shadow-glow"
      )}
    >
      {badge ? (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-button bg-brand-gradient px-6 py-2 text-xs font-bold uppercase text-white">
          {badge}
        </div>
      ) : null}
      <h3 className="font-heading text-2xl font-bold uppercase text-white">{name}</h3>
      <p className="mt-2 text-sm text-muted">{label}</p>
      <p className="mt-7 font-heading text-4xl font-bold text-white">{price}</p>
      <div className="my-7 h-px bg-white/12" />
      <ul className="grid gap-3 text-sm text-white/88">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="my-7 h-px bg-white/12" />
      <p className="flex items-center gap-2 text-sm text-white">
        <Clock className="h-4 w-4 text-primary" />
        Delivery: {delivery}
      </p>
      <Link
        href="/contact"
        className={buttonClassName({
          variant: highlighted ? "primary" : "secondary",
          className: "mt-5 w-full"
        })}
      >
        Get Started
      </Link>
    </div>
  );
}

export function PortfolioCard({
  project,
  large
}: {
  project: {
    industry: string;
    category: string;
    name: string;
    description: string;
    technologies: string[];
    href: string;
    accent?: string;
    featured?: boolean;
  };
  large?: boolean;
}) {
  return (
    <article className="glass overflow-hidden rounded-card transition duration-300 hover:-translate-y-1 hover:border-primary/55">
      <div className={cn("relative h-52 overflow-hidden", large && "h-60")}>
        <div className={cn("absolute inset-0 bg-gradient-to-br", project.accent || "from-primary via-accent to-secondary")} />
        <div className="absolute inset-4 rounded-2xl border border-white/25 bg-slate-950/40 p-4 backdrop-blur">
          <div className="h-3 w-24 rounded-full bg-white/60" />
          <div className="mt-10 max-w-[70%]">
            <div className="h-5 rounded-full bg-white/80" />
            <div className="mt-3 h-5 w-3/4 rounded-full bg-white/55" />
          </div>
          <div className="absolute bottom-4 right-4 h-20 w-24 rounded-2xl bg-black/35" />
        </div>
        {project.featured ? (
          <span className="absolute right-4 top-4 rounded-button bg-brand-gradient px-4 py-1 text-xs font-bold uppercase text-white">
            New
          </span>
        ) : null}
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase text-primary">{project.industry}</p>
        <h3 className="mt-2 font-heading text-xl font-bold text-white">{project.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-button border border-white/10 px-3 py-1 text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>
        <Link href={project.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
          Visit Website <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
