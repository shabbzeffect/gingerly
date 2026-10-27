"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type LookbookProject = {
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

export default function LookbookProjectPage({ project }: { project: LookbookProject }) {
  const coverImage = project.images[0];
  const galleryImages = project.images.slice(1);

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 z-0">
            {coverImage && (
              <Image
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                src={coverImage.url}
                alt={coverImage.alt || project.title}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                priority
              />
            )}
            {!coverImage && <div className="absolute inset-0 bg-champagne/50" />}
            <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/20 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
            <div className="max-w-2xl lg:max-w-3xl animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/10 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                {project.occasion ? project.occasion.charAt(0).toUpperCase() + project.occasion.slice(1) : "Lookbook"} · {project.featured ? "Featured" : "Made to order"}
              </div>
              <h1 className="serif text-3xl sm:text-5xl lg:text-7xl font-bold text-ivory leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {project.title}
              </h1>
              {project.garmentType && (
                <p className="text-lg text-champagne/90 leading-relaxed mb-10 max-w-lg animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  {project.garmentType}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <Button href="/book" size="lg" className="w-full sm:w-auto bg-ivory text-espresso hover:bg-ginger hover:text-espresso shadow-lg">
                  Book this look
                </Button>
                <Link href="/lookbook" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-ivory text-ivory font-medium text-lg hover:bg-ivory hover:text-espresso transition-colors">
                  Back to lookbook <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {galleryImages.map((img) => (
                      <div key={img.id} className="aspect-[4/5] rounded-xl overflow-hidden border border-border bg-champagne/50 group cursor-pointer">
                        <Image
                          src={img.url}
                          alt={img.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}
                {project.fabric && (
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-ginger uppercase tracking-wider">Fabric</span>
                    <p className="serif text-lg text-espresso mt-1">{project.fabric}</p>
                  </div>
                )}
                {project.details && (
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-ginger uppercase tracking-wider">Details</span>
                    <p className="serif text-lg text-espresso mt-1">{project.details}</p>
                  </div>
                )}
                {project.description && (
                  <div className="serif text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </div>
                )}
                <div className="mt-12 flex gap-4">
                  <Button href="/book" className="bg-espresso text-ivory hover:bg-ginger px-8 py-3 text-lg">
                    Book a consultation
                  </Button>
                  <Button href="/lookbook" variant="outline" className="border-espresso text-espresso hover:bg-espresso hover:text-ivory px-8 py-3 text-lg">
                    Explore more
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                {coverImage && (
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-champagne/50 shadow-2xl shadow-ginger/10">
                    <Image
                      src={coverImage.url}
                      alt={coverImage.alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
