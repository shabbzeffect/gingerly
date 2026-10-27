"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, Instagram, Clock } from "@/components/icons";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/lookbook", label: "The Work" },
  { href: "/services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/virtual-fittings", label: "Virtual" },
  { href: "/rentals", label: "Rentals" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL = [
  { href: "https://instagram.com/gingerlydesigns", label: "Instagram", icon: Instagram },
  { href: "https://wa.me/254700000000", label: "WhatsApp", icon: Phone },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md transition-colors">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="serif text-2xl font-bold text-espresso tracking-tighter">
          GINGERLY
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-espresso uppercase [letter-spacing:0.02em]">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ginger transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ))}
          <Link href="/book" className="ml-4 flex items-center gap-2 rounded-full border border-espresso px-4 py-1.5 text-xs font-semibold text-espresso hover:bg-espresso hover:text-ivory transition-all uppercase [letter-spacing:0.04em] whitespace-nowrap">
            <Phone size={12} /> Book
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 text-espresso hover:bg-champagne rounded-full"
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-6">
          <nav className="flex flex-col gap-1 text-sm font-medium text-espresso uppercase [letter-spacing:0.03em]">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 hover:text-ginger transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border flex items-center gap-3">
              <Link
                href="/book"
                className="flex items-center gap-2 rounded-full border border-espresso px-5 py-2 text-xs font-semibold text-espresso w-full justify-center hover:bg-espresso hover:text-ivory transition-all uppercase [letter-spacing:0.05em]"
                onClick={() => setOpen(false)}
              >
                <Phone size={13} /> Book a Consultation
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} className="flex items-center gap-1 hover:text-ginger transition-colors">
                  <s.icon size={14} /> {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );

}

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/254700000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-terracotta text-ivory shadow-lg hover:bg-terracotta-dark transition-all transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
      aria-label="Chat on WhatsApp"
    >
      <Phone size={20} />
    </a>
  );
}
