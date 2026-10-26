import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About the Atelier — Gingerly Designs and Fabrics, Nairobi",
  description: "About Gingerly Designs and Fabrics — Nairobi bespoke fashion atelier for bridal, traditional ceremony, and occasion wear.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif text-center mb-16">
              <h1 className="text-4xl font-bold text-espresso leading-tight mb-4">About the atelier</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nairobi's bespoke fashion house for bridal gowns, traditional ceremony attire, and occasion wear.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="serif space-y-8">
                <h2 className="text-3xl font-bold text-espresso leading-tight">Heritage, made contemporary</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Gingerly Designs and Fabrics is a Nairobi-based atelier. We make wedding gowns, Ruracio, Nyombo, Koito,
                  and Bukhwi attire, bridesmaid dresses, prom looks, and tailored Senator suits — each piece cut to the
                  individual, never off the rack.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Work with us in our Nairobi studio, or through virtual consultations and fittings from London, Sydney,
                  and beyond. Every garment begins with a conversation and ends with a fitting.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <Button href="/book">Book a consultation</Button>
                  <Button href="/lookbook" variant="outline">Explore the work</Button>
                </div>
              </div>
              <div className="relative h-[500px] rounded-xl border border-border overflow-hidden bg-champagne/50">
                <Image
                  src="/images/placeholder-atelier.svg"
                  alt="Atelier workspace"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/20 to-transparent" />
                <div className="absolute bottom-6 left-6 serif text-xl text-ivory font-semibold">
                  "Every stitch is a conversation."
                </div>
              </div>
            </div>

            <div className="mt-20 border-t border-border pt-16 serif text-center">
              <h2 className="text-3xl font-bold text-espresso leading-tight mb-8">Ceremonies we honour</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { name: "Ruracio", hint: "Kikuyu traditional" },
                  { name: "Nyombo", hint: "Luo traditional" },
                  { name: "Koito", hint: "Kalenjin celebration" },
                  { name: "Bukhwi", hint: "Luhya tradition" },
                  { name: "White wedding", hint: "Bridal gowns" },
                  { name: "Menswear", hint: "Senator suits" },
                ].map((c) => (
                  <div key={c.name} className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="serif text-xl font-bold text-espresso">{c.name}</h3>
                    <p className="text-sm text-muted-foreground">{c.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
