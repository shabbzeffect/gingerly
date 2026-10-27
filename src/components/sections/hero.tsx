"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "@/components/icons";
import { useEffect, useState } from "react";

const diaspora = [
  { label: "London", tz: "Europe/London" },
  { label: "Sydney", tz: "Australia/Sydney" },
  { label: "New York", tz: "America/New_York" },
];

export function Hero() {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src="/images/placeholder-hero.svg"
          alt="Atelier placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/65 via-espresso/25 to-transparent" />
        <div
          className="absolute -top-1/3 -left-1/3 w-full h-full bg-[radial-gradient(circle_at_50%_-15%,rgba(200,150,74,0.14)_0%,transparent_55%)] pointer-events-none"
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] h-[45%] bg-gradient-to-t from-espresso/80 to-transparent pointer-events-none"
        />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[1px] w-[12%] bg-gold-light/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/10 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            Based in Nairobi • Dressing brides worldwide
          </div>
          <h1 className="serif text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-ivory leading-tight mb-8 animate-slide-up" style={{ animationDelay: "0.25s" }}>
            Where Heritage <br />
            <span className="italic text-ginger">Meets Couture</span>
          </h1>
          <p className="text-lg md:text-xl text-champagne/90 leading-relaxed mb-12 max-w-lg animate-slide-up" style={{ animationDelay: "0.35s" }}>
            Bespoke bridal gowns, traditional ceremony attire, and occasion wear
            crafted by hand in Nairobi. For brides in Kenya, London, Sydney, and
            everywhere between.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-slide-up" style={{ animationDelay: "0.45s" }}>
            <Button href="/book" size="lg" className="w-full sm:w-auto gold-shine bg-ivory text-espresso hover:bg-ginger hover:text-espresso shadow-lg hover:shadow-ginger/25 transition-all px-10 py-4">
              Book a Consultation
            </Button>
            <Button href="/lookbook" variant="outline" size="lg" className="w-full sm:w-auto border-ivory text-ivory hover:bg-ivory hover:text-espresso shadow-lg hover:shadow-espresso/20 transition-all px-10 py-4">
              Explore the Work
            </Button>
          </div>

          <div className="mt-20 border-t border-border/30 pt-14 animate-fade-in" style={{ animationDelay: "0.55s" }}>
            <h3 className="text-[10px] font-semibold text-champagne/60 uppercase tracking-[0.3em] mb-8">Serving</h3>
            <div className="flex flex-wrap gap-10 text-sm text-champagne/75">
              {diaspora.map((d) => (
                <div key={d.label} className="flex items-center gap-2.5 group">
                  <span className="w-2 h-2 rounded-full bg-ginger shadow-[0_0_10px_rgba(200,150,74,0.6)] transition-all group-hover:scale-110" />
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-[bounce_3s_infinite]">
        <ChevronRight className="h-6 w-6 text-ginger drop-shadow-[0_0_10px_rgba(200,150,74,0.5)]" />
      </div>
    </section>
  );
}

export function EditorialIntro() {
  return (
    <section className="py-14 sm:py-24 lg:py-32 border-y border-border relative reveal">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-8 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="serif space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-1 h-6 bg-ginger rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-espresso leading-tight">
                An atelier for the stories you wear
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Gingerly Designs and Fabrics is a Nairobi-based bespoke fashion
              house. We make wedding gowns, Ruracio, Nyombo, Koito, and Bukhwi
              attire, bridesmaid dresses, prom looks, and tailored Senator
              suits — each piece cut to the individual, never off the rack.
            </p>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Work with us in our Nairobi studio, or through virtual
              consultations and fittings from London, Sydney, and beyond.
            </p>
          </div>
          <div className="relative h-[320px] sm:h-[440px] rounded-2xl border border-border overflow-hidden bg-champagne group shadow-elegant">
            <Image
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90"
              src="/images/placeholder-atelier.svg"
              alt="Atelier workspace placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-espresso/15 to-transparent" />
            <div className="absolute bottom-10 left-10 serif text-xl md:text-2xl text-ivory font-semibold drop-shadow-md">
              &ldquo;Every stitch is a conversation.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
