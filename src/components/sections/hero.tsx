"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "@/components/icons";

const diaspora = [
  { label: "London", tz: "Europe/London", offset: "+0" },
  { label: "Sydney", tz: "Australia/Sydney", offset: "+10" },
  { label: "New York", tz: "America/New_York", offset: "-8" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          src="/images/placeholder-hero.svg"
          alt="Atelier placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/20 to-transparent" />
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(212,169,60,0.18)_0%,transparent_55%)] pointer-events-none"
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] bg-gradient-to-t from-espresso/70 to-transparent pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
        <div className="max-w-2xl lg:max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/10 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Based in Nairobi • Dressing brides worldwide
          </div>
          <h1 className="serif text-4xl md:text-6xl lg:text-8xl font-bold text-ivory leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Where Heritage <br />
            <span className="italic text-ginger">Meets Couture</span>
          </h1>
          <p className="text-lg md:text-xl text-champagne/95 leading-relaxed mb-10 max-w-lg animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Bespoke bridal gowns, traditional ceremony attire, and occasion wear
            crafted by hand in Nairobi. For brides in Kenya, London, Sydney, and
            everywhere between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button href="/book" size="lg" className="w-full sm:w-auto gold-shine bg-ivory text-espresso hover:bg-ginger hover:text-espresso shadow-lg hover:shadow-ginger/25 transition-all">
              Book a Consultation
            </Button>
            <Button href="/lookbook" variant="outline" size="lg" className="w-full sm:w-auto border-ivory text-ivory hover:bg-ivory hover:text-espresso shadow-lg hover:shadow-espresso/20 transition-all">
              Explore the Work
            </Button>
            <Button href="/virtual-fittings" variant="ghost" size="lg" className="w-full sm:w-auto border-ivory/30 text-ivory hover:bg-ivory/10 shadow-lg hover:shadow-espresso/15 transition-all">
              Virtual Fittings
            </Button>
          </div>

          <div className="mt-16 border-t border-border/30 pt-10 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-sm font-semibold text-champagne/70 uppercase tracking-widest mb-4">Serving</h3>
            <div className="flex flex-wrap gap-6 text-sm text-champagne/80">
              {diaspora.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ginger shadow-[0_0_8px_rgba(212,169,60,0.6)]" />
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[bounce_2s_infinite]">
        <ChevronRight className="h-6 w-6 text-ginger drop-shadow-[0_0_8px_rgba(212,169,60,0.5)]" />
      </div>
    </section>
  );
}

export function EditorialIntro() {
  return (
    <section className="py-20 lg:py-28 border-y border-border relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Work with us in our Nairobi studio, or through virtual
              consultations and fittings from London, Sydney, and beyond.
            </p>
          </div>
          <div className="relative h-[420px] rounded-2xl border border-border overflow-hidden bg-champagne group">
            <Image
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              src="/images/placeholder-atelier.svg"
              alt="Atelier workspace placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/15 to-transparent" />
            <div className="absolute bottom-8 left-8 serif text-xl md:text-2xl text-ivory font-semibold drop-shadow-md">
              &ldquo;Every stitch is a conversation.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
