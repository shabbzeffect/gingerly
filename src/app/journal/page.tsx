import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal — Bridal Inspiration & Nairobi Wedding Planning",
  description: "Editorial insights on planning your Ruracio, white wedding, and occasion wear from Gingerly Designs and Fabrics.",
};

const POSTS = [
  {
    title: "Planning Your Ruracio: A Complete Guide",
    excerpt: "Everything you need to know about the Kikuyu traditional ceremony — from attire to family protocol.",
    date: "14 March 2025",
  },
  {
    title: "2025 Bridal Trends in Nairobi",
    excerpt: "From beadwork to cathedral veils, what's shaping wedding gowns this year.",
    date: "2 February 2025",
  },
  {
    title: "Choosing Your Senator Suit",
    excerpt: "A guide to tailored menswear for grooms and groomsmen.",
    date: "10 January 2025",
  },
];

export default function JournalPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif text-center mb-16">
              <h1 className="text-4xl font-bold text-espresso leading-tight mb-4">Journal</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Editorial inspiration for your ceremony, wedding, and occasion wear.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {POSTS.map((post) => (
                <article key={post.title} className="group">
                  <div className="aspect-[4/3] rounded-xl border border-border bg-champagne/50 mb-6 overflow-hidden">
                    <div className="w-full h-full" />
                  </div>
                  <div className="serif space-y-3">
                    <time className="text-xs text-ginger font-semibold uppercase tracking-wider">{post.date}</time>
                    <Link href="#" className="text-2xl font-bold text-espresso hover:text-ginger transition-colors leading-tight">
                      {post.title}
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                  </div>
                </article>
              ))}
              <div className="col-span-full py-20 text-center lg:col-span-auto">
                <p className="text-muted-foreground">More editorial content coming soon.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
