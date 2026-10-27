"use client";

import { useEffect, useRef, useState } from "react";
import { QuoteMarks, Star } from "@/components/icons";

const testimonials = [
  {
    name: "Aisha N.",
    occasion: "White Wedding · Nairobi",
    text: "Gingerly transformed my vision into a gown I could never have imagined. Every bead, every seam — perfect.",
    rating: 5,
  },
  {
    name: "Nia & Kwame",
    occasion: "Ruracio · London → Nairobi",
    text: "The virtual fitting process was seamless. From London, we collaborated on every detail and the garment arrived flawless.",
    rating: 5,
  },
  {
    name: "Thandi M.",
    occasion: "Nyombo · Sydney",
    text: "A regal silhouette that carried our heritage with contemporary grace. We felt seen, heard, and celebrated.",
    rating: 5,
  },
];

export function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 lg:py-32 relative overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 transition-all duration-700 ease-out"}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="serif text-center mb-16">
          <div className="flex items-center justify-center gap-2 rounded-full border border-ginger/25 bg-ginger/8 px-3 py-1 text-[10px] font-semibold text-ginger uppercase tracking-[0.25em] mb-6 mx-auto">
            Client voices
          </div>
          <h2 className="text-3xl font-bold text-espresso leading-tight mb-6">Words from our brides</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">Honoured to be part of your most important day.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="p-10 rounded-2xl border border-border bg-card shadow-card hover:shadow-elegant transition-all duration-700">
              <div className="flex items-start gap-2 mb-6">
                <QuoteMarks size={20} className="text-ginger/40" />
                <Star size={16} className="text-ginger" />
                <Star size={16} className="text-ginger" />
                <Star size={16} className="text-ginger" />
                <Star size={16} className="text-ginger" />
                <Star size={16} className="text-ginger" />
              </div>
              <p className="serif text-lg text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="serif space-y-1">
                <span className="font-bold text-espresso">{t.name}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.occasion}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
