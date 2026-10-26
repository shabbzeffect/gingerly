"use client";

import Link from "next/link";
import { Instagram, Phone, Mail, MapPin, Clock } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-espresso text-ivory mt-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="serif">
            <h2 className="text-2xl font-bold tracking-tighter">GINGERLY</h2>
            <p className="mt-3 text-champagne-light/80 text-sm leading-relaxed">
              Bespoke bridal and occasion attire from Nairobi. Honouring heritage — Ruracio, Nyombo, Koito, Bukhwi — with contemporary glamour.
            </p>
          </div>
          <div>
            <h3 className="serif text-lg font-semibold mb-4">Studio</h3>
            <ul className="text-sm text-champagne-light/80 space-y-2">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>By appointment, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="mt-0.5" />
                <a href="https://wa.me/254700000000" className="hover:text-ginger transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="mt-0.5" />
                <a href="mailto:enquiries@gingerly.co.ke" className="hover:text-ginger transition-colors">enquiries@gingerly.co.ke</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="serif text-lg font-semibold mb-4">Follow</h3>
            <div className="flex gap-3">
              {["Instagram", "TikTok", "WhatsApp"].map((s) => (
                <a key={s} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-champagne-light/30 text-champagne-light hover:bg-champagne-light hover:text-espresso transition-colors">
                  {s === "Instagram" ? <Instagram size={18} /> : s === "TikTok" ? <Clock size={18} /> : <Phone size={18} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-border/50 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-champagne-light/60">
          <p>© {new Date().getFullYear()} Gingerly Designs and Fabrics. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ginger transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ginger transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-ginger transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
