"use client";

import { Button } from "@/components/ui/button";

export function VirtualFittingsCTA() {
  return (
    <section className="py-14 sm:py-24 lg:py-32 relative overflow-hidden reveal">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-espresso/97" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(200,150,74,0.16)_0%,transparent_60%)] pointer-events-none"
        />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[1px] w-[12%] bg-gold-light/30" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/12 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-8 animate-fade-in">
          Virtual consultations worldwide
        </div>
        <h2 className="serif text-3xl md:text-5xl font-bold text-ivory leading-tight mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          Fitted from anywhere
        </h2>
        <p className="text-lg text-champagne/85 leading-relaxed mb-14 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.25s" }}>
          Virtual consultations, measurement guidance, and design reviews for
          brides in London, Sydney, Nairobi, and beyond. Your gown, fitted
          human-to-human — never by algorithm.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-slide-up" style={{ animationDelay: "0.35s" }}>
          <Button href="/virtual-fittings" size="lg" className="bg-ivory text-espresso hover:bg-ginger hover:text-espresso shadow-lg hover:shadow-ginger/30 transition-all px-10 py-4">
            Learn about virtual fittings
          </Button>
          <Button href="/book" variant="outline" size="lg" className="border-ivory text-ivory hover:bg-ivory hover:text-espresso shadow-lg hover:shadow-espresso/25 transition-all px-10 py-4">
            Book a virtual consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
