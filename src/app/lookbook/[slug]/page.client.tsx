"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: string;
  title: string;
  slug: string;
  occasion: string | null;
  garmentType: string | null;
  fabric: string | null;
  details: string | null;
  description: string | null;
  featured: boolean;
  images: { id: string; url: string; alt: string; order: number }[];
};

export default function LookbookProjectPage({
  project,
}: {
  project: Project;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const images = project.images.length > 0 ? project.images : [{ id: "placeholder", url: "/images/placeholder-collection.svg", alt: project.title, order: 0 }];

  return (
    <div className="flex flex-col min-h-svh">
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          {images.length > 0 && (
            <Image
              src={images[0].url}
              alt={images[0].alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-start mb-12">
            <Link href="/lookbook" className="text-sm text-ivory/90 hover:text-ginger transition-colors">
              ← Back to lookbook
            </Link>
            <Badge variant="outline" className="bg-black/30 border-ivory/30 text-ivory">
              {project.occasion ? project.occasion.charAt(0).toUpperCase() + project.occasion.slice(1) : "Look"}
            </Badge>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-ivory/30 bg-black/20">
              {images.map((img, i) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-opacity duration-500 ${i === 0 ? "opacity-100" : "opacity-0 absolute inset-0"}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              <button
                onClick={() => { setActiveImage(0); setLightboxOpen(true); }}
                className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 backdrop-blur text-espresso hover:bg-ivory transition-colors"
                aria-label="Open gallery lightbox"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            <div className="serif space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-ivory leading-tight mb-4">{project.title}</h1>
                <p className="text-lg text-champagne/90 leading-relaxed">{project.description || "A bespoke look from the Gingerly atelier."}</p>
              </div>

              <div className="space-y-4 text-champagne/80 text-sm">
                {project.garmentType && <p><span className="font-semibold text-ivory mr-2">Garment:</span> {project.garmentType}</p>}
                {project.fabric && <p><span className="font-semibold text-ivory mr-2">Fabric:</span> {project.fabric}</p>}
                {project.details && <p><span className="font-semibold text-ivory mr-2">Details:</span> {project.details}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button href="/book" size="lg" className="bg-ivory text-espresso hover:bg-ginger hover:text-espresso">
                  Book This Look
                </Button>
                <a href="https://wa.me/" className="flex items-center gap-2 border border-ivory/50 text-ivory hover:bg-ivory/10 px-6 py-3 rounded-full text-sm transition-colors">
                  WhatsApp enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-4
          ${lightboxOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none transition-opacity duration-300"}
        `}
        onClick={() => setLightboxOpen(false)}
        aria-hidden={!lightboxOpen}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={(e) => e.stopPropagation()} />
        <div className="relative z-10 max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full p-2 text-ivory hover:text-ginger transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <Image
            src={images[activeImage].url}
            alt={images[activeImage].alt}
            className="max-h-[80vh] rounded-xl border border-ivory/30 shadow-2xl"
            sizes="(max-width: 768px) 90vw, 60vw"
          />
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1))}
              disabled={images.length === 1}
              className="rounded-full p-3 text-ivory hover:bg-ivory/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-xs text-champagne/60 uppercase tracking-widest">
              {activeImage + 1} / {images.length}
            </span>
            <button
              onClick={() => setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1))}
              disabled={images.length === 1}
              className="rounded-full p-3 text-ivory hover:bg-ivory/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
