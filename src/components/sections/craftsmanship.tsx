"use client";

import { Button } from "@/components/ui/button";

export function Craftsmanship() {
  const items = [
    {
      title: "Silhouette",
      body: "Every garment is cut to your measurements and posture. We draft individual patterns — no two are the same.",
    },
    {
      title: "Fabric",
      body: "Lace, Ankara, beadwork, rhinestones, cowrie shells, and textured fabrics — sourced and handled with care.",
    },
    {
      title: "Embellishment",
      body: "Hand-applied beadwork and shell details that honour the ceremony and the wearer.",
    },
    {
      title: "Collaboration",
      body: "Your vision shapes the design. We sketch, fit, and refine with you until it is exactly right.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-28 border-y border-border bg-champagne/30 relative overflow-hidden">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-ginger/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="serif text-center mb-16">
          <h2 className="text-3xl font-bold text-espresso leading-tight">The Craft</h2>
          <p className="mt-3 text-muted-foreground">Details that make the difference.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.title} className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-ginger/50 hover:shadow-xl hover:shadow-ginger/10 transition-all duration-500 gold-shine">
              <div className="w-10 h-10 rounded-full bg-ginger/10 flex items-center justify-center mb-5 group-hover:bg-ginger group-hover:text-espresso transition-colors">
                <span className="text-ginger group-hover:text-espresso font-bold text-lg">✦</span>
              </div>
              <h3 className="serif text-xl font-bold text-espresso mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CommissionProcess() {
  const steps = [
    { n: "01", title: "Consultation", body: "Nairobi studio or virtual — we discuss your occasion, vision, and measurements." },
    { n: "02", title: "Design brief", body: "We draft sketches and confirm fabrics, embellishments, and an individual quote." },
    { n: "03", title: "Fittings", body: "In person or virtual, with fit reviews and adjustments until the garment is perfect." },
    { n: "04", title: "Delivery", body: "Your garment is finished, pressed, and ready — collected locally or shipped worldwide." },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="serif text-center mb-16">
          <h2 className="text-3xl font-bold text-espresso leading-tight">How a commission works</h2>
          <p className="mt-3 text-muted-foreground">Individual by design, from first conversation to final fitting.</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/50 hidden lg:block" />
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col items-start gap-3 animate-slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="serif text-lg font-bold text-ginger">{step.n}</span>
                  <span className="w-px h-4 bg-ginger hidden md:block" />
                </div>
                <h3 className="serif text-xl font-bold text-espresso">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-16 flex justify-center">
          <Button href="/book" className="gold-shine shadow-lg hover:shadow-ginger/25 transition-all">
            Begin your design brief
          </Button>
        </div>
      </div>
    </section>
  );
}
