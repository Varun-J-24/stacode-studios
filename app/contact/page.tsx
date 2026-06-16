import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Instagram, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { ContactHeroVisual } from "@/components/hero-visual";
import { Reveal } from "@/components/reveal";
import { buttonClassName } from "@/components/ui/button";
import { business } from "@/lib/constants";
import { contactChannels, contactHighlights, processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Stacode Studios for a free website consultation, project proposal or WhatsApp discussion."
};

export default function ContactPage() {
  return (
    <>
      <section className="pb-12 pt-12 md:pb-16 md:pt-20">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-bold uppercase text-white">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Get In Touch
            </div>
            <h1 className="mt-7 font-heading text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Let&apos;s Build Something <span className="gradient-text">Amazing Together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              Have a project in mind or a question?
              <br />
              We&apos;d love to hear from you.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {contactHighlights.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <item.icon className="h-9 w-9 rounded-xl border border-secondary/45 bg-secondary/10 p-2 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ContactHeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="container pb-12">
        <div className="grid gap-7 lg:grid-cols-[1.18fr_0.82fr]">
          <ContactForm />

          <div className="grid gap-5">
            <div className="glass rounded-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-white">Get In Touch</h2>
              <p className="mt-3 text-sm text-muted">Reach out to us through any of these channels.</p>
              <div className="mt-6 grid gap-4">
                {contactChannels.map((channel) => (
                  <Link
                    key={channel.title}
                    href={channel.href}
                    className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-primary/50"
                  >
                    <channel.icon className="h-12 w-12 rounded-full border border-primary/30 bg-primary/10 p-3 text-primary" />
                    <span className="min-w-0 flex-1">
                      <strong className="block text-white">{channel.title}</strong>
                      <span className="block break-words text-sm text-white">{channel.value}</span>
                      <span className="block text-sm text-muted">{channel.text}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-white" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass rounded-card p-6">
              <h3 className="font-heading text-lg font-bold text-white">Connect With Us</h3>
              <p className="mt-2 text-sm text-muted">Follow us for updates and tips</p>
              <div className="mt-5 flex flex-wrap gap-4">
                {[Instagram, Linkedin, Mail, Phone, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href={index === 2 ? `mailto:${business.email}` : business.whatsapp}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-12">
        <div className="glass rounded-card p-7">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-white">Our Process</h2>
            <p className="mt-2 text-muted">A simple and transparent process from idea to launch.</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-secondary/50 bg-secondary/10">
                  <step.icon className="h-9 w-9 text-secondary" />
                </div>
                <span className="absolute left-1/2 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-heading font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="glass flex flex-col gap-6 rounded-card border-green-400/40 bg-gradient-to-r from-green-500/20 via-secondary/20 to-primary/15 p-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-[0_0_50px_rgba(34,197,94,0.35)]">
              <Phone className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-white">Need a Quick Response?</h2>
              <p className="mt-2 text-muted">Chat with us on WhatsApp and get instant answers to your questions.</p>
            </div>
          </div>
          <div className="text-center">
            <a href={business.whatsappPrefill} className={buttonClassName({ className: "bg-green-500 hover:bg-green-400" })}>
              Chat on WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-3 text-sm text-white">{business.phone}</p>
          </div>
        </div>
      </section>
    </>
  );
}
