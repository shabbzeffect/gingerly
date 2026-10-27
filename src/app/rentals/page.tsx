import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { formatKes } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rentals — Borrowed Elegance, Nairobi",
  description: "Rental enquiries for occasion wear and ceremony attire. Availability and pricing confirmed by the atelier.",
};

export default async function RentalsPage() {
  let rentalSetting: { value: string | null } | null = null;
  let rentalItems: any[] = [];
  try {
    [rentalSetting, rentalItems] = await Promise.all([
      prisma.setting.findUnique({ where: { key: "rentals_enabled" } }),
      prisma.rentalItem.findMany({
        where: { active: true, available: true },
        include: { images: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      }),
    ]);
  } catch {
    rentalSetting = null;
    rentalItems = [];
  }

  const enabled = rentalSetting?.value === "true";

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif text-center mb-12">
              <h1 className="text-4xl font-bold text-espresso leading-tight">Rentals</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Borrowed elegance for your occasion. Availability, sizing, and terms are confirmed by the atelier — we never show unverified inventory.
              </p>
            </div>

            {!enabled ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <h2 className="serif text-2xl font-bold text-espresso mb-4">Rental enquiry</h2>
                <p className="text-muted-foreground mb-8">
                  The rental catalogue is not yet live. Share your occasion and we'll let you know what's available.
                </p>
                <Button href="/book">Make a rental enquiry</Button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rentalItems.length > 0 ? (
                    rentalItems.map((item: { id: string; slug: string; title: string; occasion: string | null; size: string | null; priceKes: number | null; depositKes: number | null; images: { url: string; alt: string }[] }) => (
                      <div key={item.id} className="group rounded-xl border border-border bg-card overflow-hidden">
                        <div className="aspect-[4/5] relative overflow-hidden bg-champagne/50">
                          {item.images.length > 0 ? (
                            <img src={item.images[0].url} alt={item.images[0].alt || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          ) : (
                            <div className="w-full h-full" />
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="serif text-xl font-bold text-espresso">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.occasion || "Occasion wear"} · {item.size || "Size on enquiry"}</p>
                          <p className="text-sm font-medium text-espresso mt-2">{formatKes(item.priceKes ?? null)}</p>
                          {item.depositKes && (
                            <p className="text-xs text-muted-foreground mt-1">Deposit: {formatKes(item.depositKes)}</p>
                          )}
                        </div>
                        <div className="p-4 border-t border-border">
                          <Button href={`/rentals/${item.slug}`} className="w-full bg-espresso text-ivory hover:bg-ginger text-sm">
                            Enquire to rent
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-muted-foreground">No rental items available at this time.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
