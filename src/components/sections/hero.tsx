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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/placeholder-hero.svg"
          alt="Atelier placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/10 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-6">
            Based in Nairobi • Dressing brides worldwide
          </div>
          <h1 className="serif text-4xl md:text-6xl lg:text-7xl font-bold text-ivory leading-tight mb-6">
            Where Heritage <br />
            <span className="italic text-ginger">Meets Couture</span>
          </h1>
          <p className="text-lg md:text-xl text-champagne/90 leading-relaxed mb-8 max-w-lg">
            Bespoke bridal gowns, traditional ceremony attire, and occasion wear
            crafted by hand in Nairobi. For brides in Kenya, London, Sydney, and
            everywhere between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/book" size="lg" className="w-full sm:w-auto bg-ivory text-espresso hover:bg-ginger hover:text-espresso">
              Book a Consultation
            </Button>
            <Button href="/lookbook" variant="outline" size="lg" className="w-full sm:w-auto border-ivory text-ivory hover:bg-ivory hover:text-espresso">
              Explore the Work
            </Button>
            <Button href="/virtual-fittings" variant="ghost" size="lg" className="w-full sm:w-auto border-ivory/30 text-ivory hover:bg-ivory/10">
              Virtual Fittings
            </Button>
          </div>

          <div className="mt-12 border-t border-border/30 pt-8">
            <h3 className="text-sm font-semibold text-champagne/70 uppercase tracking-widest mb-4">Serving</h3>
            <div className="flex flex-wrap gap-6 text-sm text-champagne/80">
              {diaspora.map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ginger" />
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronRight className="h-6 w-6 text-ginger" />
      </div>
    </section>
  );
}

export function EditorialIntro() {
  return (
    <section className="py-20 lg:py-24 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="serif space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-espresso leading-tight">
              An atelier for the stories you wear
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Gingerly Designs and Fabrics is a Nairobi-based bespoke fashion
              house. We make wedding gowns, Ruracio, Nyombo, Koito, and Bukhwi
              attire, bridesmaid dresses, prom looks, and tailored Senator
              suits — each piece cut to the individual, never off the rack.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Work with us in our Nairobi studio, or through virtual
              consultations and fittings from London, Sydney, and beyond.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl border border-border overflow-hidden bg-champagne">
            <Image
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              src="/images/placeholder-atelier.svg"
              alt="Atelier workspace placeholder"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/20 to-transparent" />
            <div className="absolute bottom-6 left-6 serif text-xl text-ivory font-semibold">
              "Every stitch is a conversation."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
