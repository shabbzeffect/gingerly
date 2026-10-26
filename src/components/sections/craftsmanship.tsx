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
    <section className="py-20 lg:py-24 border-y border-border bg-champagne/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="serif text-center mb-16">
          <h2 className="text-3xl font-bold text-espresso leading-tight">The Craft</h2>
          <p className="mt-3 text-muted-foreground">Details that make the difference.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.title} className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
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
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="serif text-center mb-16">
          <h2 className="text-3xl font-bold text-espresso leading-tight">How a commission works</h2>
          <p className="mt-3 text-muted-foreground">Individual by design, from first conversation to final fitting.</p>
        </div>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <li key={step.title} className="flex flex-col items-start gap-3">
              <span className="serif text-lg font-bold text-ginger">{step.n}</span>
              <h3 className="serif text-xl font-bold text-espresso">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 flex justify-center">
          <Button href="/book">Begin your design brief</Button>
        </div>
      </div>
    </section>
  );
}
