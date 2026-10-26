"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function VirtualFittingsCTA() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-espresso/90" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="serif text-3xl md:text-4xl font-bold text-ivory leading-tight mb-6">
          Fitted from anywhere
        </h2>
        <p className="text-lg text-champagne/90 leading-relaxed mb-10 max-w-2xl mx-auto">
          Virtual consultations, measurement guidance, and design reviews for
          brides in London, Sydney, Nairobi, and beyond. Your gown, fitted
          human-to-human — never by algorithm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/virtual-fittings" size="lg" className="bg-ivory text-espresso hover:bg-ginger hover:text-espresso">
            Learn about virtual fittings
          </Button>
          <Button href="/book" variant="outline" size="lg" className="border-ivory text-ivory hover:bg-ivory hover:text-espresso">
            Book a virtual consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
