import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { EditorialIntro } from "@/components/sections/hero";
import { CollectionsGrid } from "@/components/sections/collections";
import { Craftsmanship } from "@/components/sections/craftsmanship";
import { CommissionProcess } from "@/components/sections/craftsmanship";
import { VirtualFittingsCTA } from "@/components/sections/virtual-fittings-cta";

export const metadata: Metadata = {
  title: "Gingerly Designs and Fabrics — Bespoke Bridal & Occasion Wear, Nairobi",
  description:
    "Nairobi bespoke fashion atelier for bridal gowns, Ruracio, Nyombo, Koito, and Bukhui attire, bridesmaid dresses, prom looks, and Senator suits. Virtual fittings worldwide.",
  openGraph: {
    title: "Gingerly Designs and Fabrics — Where Heritage Meets Couture",
    description: "Bespoke bridal and occasion wear from Nairobi. Virtual fittings worldwide.",
    type: "website",
    locale: "en-KE",
    siteName: "Gingerly Designs and Fabrics",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <Hero />
        <EditorialIntro />
        <CollectionsGrid />
        <Craftsmanship />
        <CommissionProcess />
        <VirtualFittingsCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
