"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

type Collection = {
  slug: string;
  title: string;
  occasion: string;
  image: string;
  alt: string;
  badge?: string;
};

const COLLECTIONS: Collection[] = [
  {
    slug: "white-wedding",
    title: "White Wedding",
    occasion: "Bridal gowns & veils",
    image: "https://images.unsplash.com/photo-1519237914241-a16bb6bb1dbb?w=600&q=85",
    alt: "White wedding gown detail",
    badge: "Bridal",
  },
  {
    slug: "ruracio",
    title: "Ruracio",
    occasion: "Kikuyu traditional ceremony",
    image: "https://images.unsplash.com/photo-1595618963492-a6890504181f?w=600&q=85",
    alt: "Ruracio attire detail",
    badge: "Traditional",
  },
  {
    slug: "nyombo",
    title: "Nyombo",
    occasion: "Luo traditional ceremony",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=85",
    alt: "Nyombo attire detail",
    badge: "Traditional",
  },
  {
    slug: "koito",
    title: "Koito",
    occasion: "Kalenjin celebration",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=85",
    alt: "Koito attire detail",
    badge: "Traditional",
  },
  {
    slug: "bukhwi",
    title: "Bukhwi",
    occasion: "Luhya tradition",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85",
    alt: "Bukhwi attire detail",
    badge: "Traditional",
  },
  {
    slug: "menswear",
    title: "Senator Suits",
    occasion: "Tailored menswear",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&q=85",
    alt: "Senator suit detail",
    badge: "Menswear",
  },
];

export function CollectionsGrid() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-14 sm:py-24 lg:py-32 relative reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="serif">
            <div className="inline-flex items-center gap-2 rounded-full border border-ginger/25 bg-ginger/8 px-2 py-1 text-[10px] font-semibold text-ginger uppercase tracking-[0.25em] mb-6">
              New season
            </div>
            <h2 className="text-3xl font-bold text-espresso leading-tight">Featured Collections</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Each look is made to order. Select an occasion to view the gallery and book a pre-filled consultation.
            </p>
          </div>
          <Link href="/lookbook" className="inline-flex items-center gap-2 text-sm font-medium text-ginger hover:text-ginger-dark underline-offset-4 hover:underline transition-colors gold-shine">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {COLLECTIONS.map((c, i) => (
            <Link
              key={c.slug}
              href={`/lookbook?occasion=${c.slug}`}
              className="group block"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-champagne/40 mb-5 shadow-card transition-all duration-700 group-hover:shadow-gold group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-black/35" />
                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-ivory/95 flex items-center justify-center text-ginger font-bold text-lg shadow-lg">
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
                <Image
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                {c.badge && (
                  <span className="absolute top-5 left-5 rounded-full border border-ivory bg-espresso text-ivory px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-lg">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="serif space-y-2">
                <h3 className="text-xl font-bold text-espresso leading-tight group-hover:text-ginger transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground tracking-wide uppercase [letter-spacing:0.05em]">{c.occasion}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
