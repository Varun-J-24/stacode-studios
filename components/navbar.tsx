"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { buttonClassName } from "@/components/ui/button";
import { business, navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/65 backdrop-blur-2xl">
      <nav className="container flex h-20 items-center justify-between">
        <Link href="/" aria-label="Stacode Studios home">
          <Brand />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-semibold text-white/85 transition hover:text-white",
                  active && "text-white"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-5 left-0 h-0.5 w-full scale-x-0 rounded-full bg-brand-gradient transition",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link href="/contact" className={buttonClassName({ size: "sm" })}>
            Get Free Consultation
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/15 p-2 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="container pb-5 lg:hidden">
          <div className="glass grid gap-2 rounded-card p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-semibold text-white/80",
                  pathname === item.href && "bg-primary/10 text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href={business.whatsapp} className={buttonClassName({ className: "mt-2" })}>
              Get Free Consultation
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
