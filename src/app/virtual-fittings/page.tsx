import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Smartphone, Users, Mail, ShieldCheck, Clock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Virtual Fittings — Bespoke Bridal from Anywhere",
  description: "Virtual consultations, measurement guidance, and design reviews for brides in London, Sydney, Nairobi, and beyond. Human-to-human fitting, never by algorithm.",
};

export default function VirtualFittingsPage() {
  const steps = [
    {
      n: "01",
      title: "Consultation",
      body: "Book a virtual consultation. We'll discuss your occasion, vision, and measurements over video call.",
      icon: Smartphone,
    },
    {
      n: "02",
      title: "Measurement guidance",
      body: "We provide a measurement guide for self-measuring at home, illustrated step by step.",
      icon: Users,
    },
    {
      n: "03",
      title: "Design discussion",
      body: "We share sketches, fabric swatches, and mood boards for your approval.",
      icon: Mail,
    },
    {
      n: "04",
      title: "Fit review",
      body: "Fit reviews happen over video. Adjustments are made until the garment is perfect.",
      icon: ShieldCheck,
    },
    {
      n: "05",
      title: "Delivery",
      body: "Your finished garment is pressed and shipped worldwide, or collected locally.",
      icon: Clock,
    },
  ];

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-espresso/90" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ginger/30 bg-ginger/10 px-3 py-1 text-xs font-semibold text-ginger uppercase tracking-wider mb-6">
              Virtual fittings for diaspora brides
            </span>
            <h1 className="serif text-4xl md:text-5xl font-bold text-ivory leading-tight mb-6">
              Fitted from anywhere
            </h1>
            <p className="text-lg text-champagne/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              Virtual consultations, measurement guidance, and design reviews for brides in London, Sydney, Nairobi, and beyond.
              Your gown, fitted human-to-human — never by algorithm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/book" size="lg" className="bg-ivory text-espresso hover:bg-ginger hover:text-espresso">
              Book a virtual consultation
            </Button>
            <Button href="/lookbook" variant="outline" size="lg" className="border-ivory text-ivory hover:bg-ivory hover:text-espresso">
              Explore the work
            </Button>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif text-center mb-16">
              <h2 className="text-3xl font-bold text-espresso leading-tight">How virtual fittings work</h2>
              <p className="mt-3 text-muted-foreground">A human-led process, step by step.</p>
            </div>
            <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step) => (
                <li key={step.title} className="p-8 rounded-xl border border-border bg-card">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="serif text-xl font-bold text-ginger">{step.n}</div>
                    <step.icon size={20} className="text-ginger" />
                  </div>
                  <h3 className="serif text-xl font-bold text-espresso mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 border-t border-border pt-12">
              <div className="serif text-center mb-8">
                <h2 className="text-3xl font-bold text-espresso leading-tight">Measurement guide</h2>
                <p className="mt-3 text-muted-foreground">Edit this guide in the admin atelier.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-xl border border-border bg-champagne/40">
                  <div className="text-ginger font-semibold mb-2">Bust</div>
                  <p className="text-sm text-muted-foreground">Measure around the fullest part.</p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-champagne/40">
                  <div className="text-ginger font-semibold mb-2">Waist</div>
                  <p className="text-sm text-muted-foreground">Natural waistline, snug but not tight.</p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-champagne/40">
                  <div className="text-ginger font-semibold mb-2">Hips</div>
                  <p className="text-sm text-muted-foreground">Widest part of the hips.</p>
                </div>
              </div>
              <div className="mt-12 flex justify-center">
                <Button href="/book">Book a virtual consultation</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 border-y border-border bg-champagne/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="serif text-3xl font-bold text-espresso mb-6">Ready to begin?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Book a virtual consultation and we'll send you a time-zone-smart slot, measurement guide, and prep checklist.
            </p>
              <Button href="/book" size="lg" className="bg-espresso text-ivory hover:bg-ginger">
                Book a virtual consultation
              </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
