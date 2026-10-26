"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
    image: "/images/placeholder-collection.svg",
    alt: "White wedding gown detail",
    badge: "Bridal",
  },
  {
    slug: "ruracio",
    title: "Ruracio",
    occasion: "Kikuyu traditional ceremony",
    image: "/images/placeholder-collection.svg",
    alt: "Ruracio attire detail",
    badge: "Traditional",
  },
  {
    slug: "nyombo",
    title: "Nyombo",
    occasion: "Luo traditional ceremony",
    image: "/images/placeholder-collection.svg",
    alt: "Nyombo attire detail",
    badge: "Traditional",
  },
  {
    slug: "koito",
    title: "Koito",
    occasion: "Kalenjin celebration",
    image: "/images/placeholder-collection.svg",
    alt: "Koito attire detail",
    badge: "Traditional",
  },
  {
    slug: "bukhwi",
    title: "Bukhwi",
    occasion: "Luhya tradition",
    image: "/images/placeholder-collection.svg",
    alt: "Bukhwi attire detail",
    badge: "Traditional",
  },
  {
    slug: "menswear",
    title: "Senator Suits",
    occasion: "Tailored menswear",
    image: "/images/placeholder-collection.svg",
    alt: "Senator suit detail",
    badge: "Menswear",
  },
];

export function CollectionsGrid() {
  return (
    <section className="py-12 sm:py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="serif">
            <h2 className="text-3xl font-bold text-espresso leading-tight">Featured Collections</h2>
            <p className="mt-3 text-muted-foreground">Each look is made to order. Select an occasion to view the gallery and book a pre-filled consultation.</p>
          </div>
          <Link href="/lookbook" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ginger hover:underline gold-shine">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS.map((c, i) => (
            <Link
              key={c.slug}
              href={`/lookbook?occasion=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-ginger/10 transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/10 to-black/30" />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="group-hover:border-ginger group-hover:text-ginger transition-colors">{c.badge}</Badge>
                </div>
                <h3 className="serif text-xl font-bold text-espresso group-hover:text-ginger transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.occasion}</p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
