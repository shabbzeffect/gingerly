import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — Gingerly Designs and Fabrics",
  description: "Terms and conditions for Gingerly Designs and Fabrics. Commission, booking, and rental terms.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif mb-12">
              <h1 className="text-4xl font-bold text-espresso leading-tight mb-4">Terms &amp; Conditions</h1>
              <div className="rounded-xl border border-terracotta bg-terracotta/10 p-4 mb-8">
                <p className="text-sm text-terracotta-dark font-medium">
                  ⚠️ This is a template. Review with legal counsel before launch. Gingerly does not claim legal compliance without verification.
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Last updated: Review before launch. These terms govern your use of the Gingerly website and your commissions with us.
              </p>
            </div>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">1. Commissions</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All garments are made to order. Designs, fit, and quotes are individual to each client. Pictured garments are examples of our work and are not necessarily available for purchase.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">2. Consultations</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Booking a consultation is a request, not a confirmed appointment, until the atelier responds and confirms your slot. Consultation fees (where applicable) are payable before or at the consultation.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">3. Virtual fittings</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Virtual fittings are human-led. We do not guarantee that self-measurements will produce a perfect fit. Fit reviews and adjustments are part of the process.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">4. Rentals</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Rental availability, pricing, deposits, and terms are confirmed by the atelier. We do not show unverified inventory or pricing. Rental enquiries are subject to availability.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">5. Payments</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Payments may be made by M-Pesa (where configured), Stripe, or PayPal (where configured). We do not display nonfunctional payment buttons or claim payments were taken unless a provider is verified.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">6. Intellectual property</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All designs, photographs, and content on this site are the property of Gingerly Designs and Fabrics or used under licence. Do not reproduce without permission.
            </p>

            <div className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>This terms and conditions document is a template and must be reviewed by legal counsel before launch.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
