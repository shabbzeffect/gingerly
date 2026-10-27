import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Bespoke Services — Bridal, Traditional, Menswear & Occasion Wear",
  description: "Bespoke bridal gowns, traditional ceremony attire (Ruracio, Nyombo, Koito, Bukhwi), bridesmaid dresses, Senator suits, and occasion wear from Nairobi.",
};

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
  } catch {
    services = [];
  }

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif text-center mb-16">
              <h1 className="text-4xl font-bold text-espresso leading-tight mb-4">Bespoke Services</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every garment is made to order — cut to your measurements, your posture, your vision. Nothing is off the rack.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.length > 0 ? (
                services.map((service: { id: string; title: string; category: string | null; description: string | null }) => (
                  <div key={service.id} className="p-8 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                    <Badge variant="outline" className="mb-4">{service.category}</Badge>
                    <h3 className="serif text-2xl font-bold text-espresso mb-4">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted-foreground">No services configured yet. Add them in the admin atelier.</p>
                </div>
              )}
            </div>

            <div className="mt-16 border-t border-border pt-12 serif text-center">
              <h2 className="text-3xl font-bold text-espresso mb-4">Design details we work with</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Lace, Ankara, beadwork, rhinestones, cowrie shells, and textured fabrics — sourced and handled with care. The exact materials for your commission are confirmed during consultation and may vary by design.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/book">Begin your design brief</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
