import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "The Work — Bridal & Occasion Lookbook",
  description: "Explore Gingerly's bespoke bridal, traditional ceremony, and occasion wear lookbook. Ruracio, Nyombo, Koito, Bukhwi, white weddings, bridesmaids, menswear.",
};

export default async function LookbookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const occasionFilter = typeof searchParams.occasion === "string" ? searchParams.occasion : undefined;

  const [projects, ceremonies] = await Promise.all([
    prisma.lookbookProject.findMany({
      where: occasionFilter ? { occasion: occasionFilter } : undefined,
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    }),
    prisma.ceremonyPage.findMany({ select: { key: true, title: true }, orderBy: { title: "asc" } }),
  ]);

  const occasions = [
    { key: "all", label: "All Occasions" },
    ...ceremonies.map((c: { key: string; title: string }) => ({ key: c.key, label: c.title })),
  ];

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="serif">
                <h1 className="text-4xl font-bold text-espresso leading-tight mb-2">The Work</h1>
                <p className="text-muted-foreground">Each look is made to order. Browse by occasion, then book a pre-filled consultation.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {occasions.map((o) => (
                  <Button
                    key={o.key}
                    href={`/lookbook${o.key === "all" ? "" : `?occasion=${o.key}`}`}
                    variant={occasionFilter === o.key || (!occasionFilter && o.key === "all") ? "primary" : "outline"}
                    size="sm"
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map((project: { id: string; slug: string; title: string; occasion: string | null; garmentType: string | null; fabric: string | null; images: { alt: string; url: string }[]; featured: boolean }) => (
                  <Link
                    key={project.id}
                    href={`/lookbook/${project.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-champagne/50 mb-4">
                      {project.images.length > 0 ? (
                        <Image
                          src={project.images[0].url}
                          alt={project.images[0].alt || project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src="/images/placeholder-collection.svg"
                          alt="Collection placeholder"
                          fill
                          className="object-cover opacity-60"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      {project.featured && (
                        <span className="absolute top-4 left-4 rounded-full border border-ivory bg-espresso text-ivory px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="serif space-y-2">
                      <h3 className="text-xl font-bold text-espresso">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.occasion ? project.occasion.charAt(0).toUpperCase() + project.occasion.slice(1) : "Look"} · {project.garmentType || "Bespoke garment"}</p>
                      {project.fabric && (
                        <p className="text-sm text-muted-foreground">{project.fabric}</p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted-foreground">No looks available yet. Add projects in the admin atelier.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
