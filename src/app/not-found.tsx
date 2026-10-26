import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Gingerly Designs and Fabrics",
};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <div className="serif text-9xl font-bold text-espresso mb-6">404</div>
            <h1 className="serif text-3xl font-bold text-espresso mb-4">That page isn't here.</h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
              The page you're looking for doesn't exist. Let us help you find your way back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/">Return home</Button>
              <Button href="/lookbook" variant="outline">Explore the work</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
