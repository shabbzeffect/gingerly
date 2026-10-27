"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "@/components/icons";
import { useEffect, useState } from "react";

export function Craftsmanship() {
  const items = [
    {
      title: "Silhouette",
      body: "Every garment is cut to your measurements and posture. We draft individual patterns — no two are the same.",
    },
    {
      title: "Fabric",
      body: "Lace, Ankara, beadwork, rhinestones, cowrie shells, and textured fabrics — sourced and handled with care.",
    },
    {
      title: "Embellishment",
      body: "Hand-applied beadwork and shell details that honour the ceremony and the wearer.",
    },
    {
      title: "Collaboration",
      body: "Your vision shapes the design. We sketch, fit, and refine with you until it is exactly right.",
    },
  ];

  return (
    <section className="py-14 sm:py-24 lg:py-32 border-y border-border bg-champagne/40 relative overflow-hidden reveal">
      <div className="absolute -top-1/3 left-1/3 -translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-ginger/10 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="serif text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-ginger/25 bg-ginger/8 px-3 py-1 text-[10px] font-semibold text-ginger uppercase tracking-[0.25em] mx-auto mb-6">
            The atelier standard
          </div>
          <h2 className="text-3xl font-bold text-espresso leading-tight mb-5">The Craft</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">Details that make the difference.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.title} className="group relative p-8 rounded-2xl border border-border bg-card hover:border-ginger/40 hover:shadow-gold transition-all duration-700">
              <div className="w-11 h-11 rounded-full bg-ginger/10 flex items-center justify-center mb-7 group-hover:bg-ginger group-hover:text-espresso transition-colors duration-500">
                <span className="text-ginger group-hover:text-espresso font-bold text-lg">✦</span>
              </div>
              <h3 className="serif text-xl font-bold text-espresso mb-4">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommissionProcess() {
  const steps = [
    { n: "01", title: "Consultation", body: "Nairobi studio or virtual — we discuss your occasion, vision, and measurements." },
    { n: "02", title: "Design brief", body: "We draft sketches and confirm fabrics, embellishments, and an individual quote." },
    { n: "03", title: "Fittings", body: "In person or virtual, with fit reviews and adjustments until the garment is perfect." },
    { n: "04", title: "Delivery", body: "Your garment is finished, pressed, and ready — collected locally or shipped worldwide." },
  ];

  return (
    <section className="py-14 sm:py-24 lg:py-32 relative reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="serif text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-ginger/25 bg-ginger/8 px-3 py-1 text-[10px] font-semibold text-ginger uppercase tracking-[0.25em] mx-auto mb-6">
            How it works
          </div>
          <h2 className="text-3xl font-bold text-espresso leading-tight mb-5">How a commission works</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">Individual by design, from first conversation to final fitting.</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-[80px] bottom-0 w-[1px] bg-ginger/20 hidden lg:block" />
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col items-start gap-3 reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="serif text-lg font-bold text-ginger">{step.n}</span>
                  <span className="w-[1px] h-4 bg-ginger hidden md:block" />
                </div>
                <h3 className="serif text-xl font-bold text-espresso">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-20 flex justify-center">
          <Button href="/book" className="gold-shine shadow-lg hover:shadow-ginger/30 transition-all px-10 py-4">
            Begin your design brief
          </Button>
        </div>
      </div>
    </section>
  );
}
