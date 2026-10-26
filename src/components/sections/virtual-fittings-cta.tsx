"use client";

import { Button } from "@/components/ui/button";

export function VirtualFittingsCTA() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-espresso/95" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,169,60,0.15)_0%,transparent_60%)] pointer-events-none"
      />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/10 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-6 animate-fade-in">
          Virtual consultations worldwide
        </div>
        <h2 className="serif text-3xl md:text-5xl font-bold text-ivory leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Fitted from anywhere
        </h2>
        <p className="text-lg text-champagne/90 leading-relaxed mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Virtual consultations, measurement guidance, and design reviews for
          brides in London, Sydney, Nairobi, and beyond. Your gown, fitted
          human-to-human — never by algorithm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button href="/virtual-fittings" size="lg" className="bg-ivory text-espresso hover:bg-ginger hover:text-espresso shadow-lg hover:shadow-ginger/30 transition-all">
            Learn about virtual fittings
          </Button>
          <Button href="/book" variant="outline" size="lg" className="border-ivory text-ivory hover:bg-ivory hover:text-espresso shadow-lg hover:shadow-espresso/25 transition-all">
            Book a virtual consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
