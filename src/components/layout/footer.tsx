"use client";

import Link from "next/link";
import { Instagram, Phone, Mail, MapPin, Clock } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-espresso text-ivory mt-auto reveal">
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="serif">
            <h2 className="text-3xl font-bold tracking-tighter mb-5">GINGERLY</h2>
            <p className="text-champagne-light/80 text-sm leading-relaxed max-w-xs">
              Bespoke bridal and occasion attire from Nairobi. Honouring heritage — Ruracio, Nyombo, Koito, Bukhwi — with contemporary glamour.
            </p>
          </div>
          <div>
            <h3 className="serif text-lg font-semibold mb-6">Studio</h3>
            <ul className="text-sm text-champagne-light/80 space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5" />
                <span className="leading-relaxed">By appointment, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="mt-0.5" />
                <a href="https://wa.me/254700000000" className="hover:text-ginger transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="mt-0.5" />
                <a href="mailto:enquiries@gingerly.co.ke" className="hover:text-ginger transition-colors">enquiries@gingerly.co.ke</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="serif text-lg font-semibold mb-6">Book</h3>
            <ul className="text-sm text-champagne-light/80 space-y-5">
              <li>
                <Link href="/book" className="hover:text-ginger transition-colors">Consultation</Link>
              </li>
              <li>
                <Link href="/virtual-fittings" className="hover:text-ginger transition-colors">Virtual fittings</Link>
              </li>
              <li>
                <Link href="/rentals" className="hover:text-ginger transition-colors">Rentals</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="serif text-lg font-semibold mb-6">Follow</h3>
            <div className="flex gap-4">
              {["Instagram", "TikTok", "WhatsApp"].map((s) => (
                <a key={s} href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne-light/30 text-champagne-light hover:bg-champagne-light hover:text-espresso transition-all">
                  {s === "Instagram" ? <Instagram size={18} /> : s === "TikTok" ? <Clock size={18} /> : <Phone size={18} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-border/40 mb-12" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-champagne-light/50 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Gingerly Designs and Fabrics. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-ginger transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ginger transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-ginger transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
