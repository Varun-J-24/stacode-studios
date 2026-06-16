import Link from "next/link";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { Brand } from "@/components/brand";
import { business, navItems } from "@/lib/constants";
import { services } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/45">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_0.9fr_1.4fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            Modern, fast and SEO-friendly websites that help businesses grow online and achieve their goals.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted">
            <span>Fast Delivery</span>
            <span>SEO Ready</span>
            <span>Mobile First</span>
          </div>
        </div>

        <FooterColumn title="Quick Links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {services.slice(0, 5).map((service) => (
            <Link key={service.slug} href="/services-pricing">
              {service.title}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Support">
          <Link href="/services-pricing#faq">FAQs</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </FooterColumn>

        <div>
          <h3 className="font-heading text-base font-semibold text-white">Contact Info</h3>
          <div className="mt-5 grid gap-3 text-sm text-muted">
            <a className="flex items-center gap-3" href={business.whatsapp}>
              <Smartphone className="h-4 w-4 text-primary" />
              {business.phone}
            </a>
            <a className="flex items-center gap-3" href={`tel:${business.phoneCompact}`}>
              <Phone className="h-4 w-4 text-primary" />
              {business.phone}
            </a>
            <a className="flex items-center gap-3" href={`mailto:${business.email}`}>
              <Mail className="h-4 w-4 text-primary" />
              {business.email}
            </a>
            <span className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              {business.location}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Stacode Studios. All Rights Reserved.</p>
          <p>Designed with care by Stacode Studios</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-heading text-base font-semibold text-white">{title}</h3>
      <div className="mt-5 grid gap-3 text-sm text-muted [&_a]:transition [&_a:hover]:text-primary">{children}</div>
    </div>
  );
}
