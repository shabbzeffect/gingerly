"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Instagram, Phone, Mail, ChevronUp } from "@/components/icons";
import { Button } from "@/components/ui/button";

const NAV_COLUMNS = [
  {
    title: "Studio",
    links: [
      { label: "Nairobi, Kenya", href: "#" },
      { label: "By appointment", href: "#" },
      { label: "WhatsApp", href: "https://wa.me/254700000000" },
      { label: "enquiries@gingerly.co.ke", href: "mailto:enquiries@gingerly.co.ke" },
    ],
  },
  {
    title: "Book",
    links: [
      { label: "Consultation", href: "/book" },
      { label: "Virtual fittings", href: "/virtual-fittings" },
      { label: "Rentals", href: "/rentals" },
    ],
  },
  {
    title: "The Work",
    links: [
      { label: "Lookbook", href: "/lookbook" },
      { label: "Services", href: "/services" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {scrolled && (
        <button
          onClick={scrollTop}
          className="fixed bottom-14 right-10 z-50 w-10 h-10 rounded-full bg-espresso text-ivory flex items-center justify-center shadow-lg hover:bg-ginger hover:text-espresso transition-all transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ChevronUp size={16} />
        </button>
      )}
      <footer className="border-t border-border/60 bg-espresso text-ivory mt-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,150,74,0.08)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-6 pointer-events-none" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 lg:mb-14">
              <div className="col-span-1 lg:col-span-1">
                <h2 className="serif text-3xl font-bold tracking-tighter mb-4 leading-tight">GINGERLY</h2>
                <p className="text-champagne/70 text-xs leading-relaxed max-w-xs">
                  Bespoke bridal and occasion attire from Nairobi. Honouring heritage — Ruracio,
                  Nyombo, Koito, Bukhwi — with contemporary glamour.
                </p>
              </div>

              {NAV_COLUMNS.map((column) => (
                <div key={column.title} className="reveal-up">
                  <h3 className="serif text-xs font-semibold uppercase tracking-wider text-champagne/60 mb-4">
                    {column.title}
                  </h3>
                  <ul className="text-xs text-champagne/70 space-y-3 leading-relaxed">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="hover:text-ginger transition-colors group flex items-center gap-1"
                        >
                          {link.label}
                          <span className="group-hover:translate-x-0.5 transition-transform w-0.5 h-0.5 rounded-full bg-current opacity-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <hr className="border-border/30 mb-8 lg:mb-10" />

            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="serif text-sm font-semibold text-ivory">Newsletter</h3>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="w-48 px-3 py-2 rounded-lg border border-border/50 bg-transparent text-ivory placeholder-champagne/40 focus:ring-2 focus:ring-ginger focus:border-ginger transition-all text-xs"
                  />
                  <Button type="submit" size="sm" className="px-4 bg-ginger text-ivory hover:bg-ginger-dark transition-all text-xs">
                    Join
                  </Button>
                </form>
              </div>

              <div className="flex items-center gap-4 text-[10px] text-champagne/50 uppercase tracking-wider">
                <p>© {new Date().getFullYear()} Gingerly Designs and Fabrics.</p>
                <span>All rights reserved.</span>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/gingerlydesignsandfabrics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-light/30 text-champagne-light hover:bg-ginger hover:text-espresso transition-all group"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-light/30 text-champagne-light hover:bg-ginger hover:text-espresso transition-all group"
                >
                  <Phone size={16} />
                </a>
                <a
                  href="mailto:enquiries@gingerly.co.ke"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-light/30 text-champagne-light hover:bg-ginger hover:text-espresso transition-all group"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
