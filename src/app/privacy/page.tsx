import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Gingerly Designs and Fabrics",
  description: "Privacy policy for Gingerly Designs and Fabrics. Client photos, measurements, and personal data handling.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif mb-12">
              <h1 className="text-4xl font-bold text-espresso leading-tight mb-4">Privacy Policy</h1>
              <div className="rounded-xl border border-terracotta bg-terracotta/10 p-4 mb-8">
                <p className="text-sm text-terracotta-dark font-medium">
                  ⚠️ This is a template. Review with legal counsel before launch. Gingerly does not claim legal compliance without verification.
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Last updated: Review before launch. This policy describes how Gingerly Designs and Fabrics collects, uses, and protects your personal information.
              </p>
            </div>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">1. Information we collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We collect contact details (name, email, phone), occasion and event details, garment preferences, inspiration links, body measurements, and reference photos you submit through consultation, virtual fitting, and rental enquiry forms.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">2. How we use your information</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To respond to enquiries, schedule consultations, create design briefs, manage fittings, and communicate about your order. Measurements and photos are used only for garment design and fitting purposes.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">3. Data protection</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Body measurements, event details, and personal photos are sensitive. We restrict access to the design team, store files privately, and use signed URLs for file access. We do not sell your personal data.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">4. Your rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You may request access to, correction of, or deletion of your personal data. Contact us at the atelier email to make a request. Retention and deletion settings are documented in the admin area and subject to your approved retention process.
            </p>

            <h2 className="serif text-2xl font-bold text-espresso mb-4">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We use essential cookies for admin sessions. Analytics cookies are only set when you consent and when analytics providers are configured.
            </p>

            <div className="mt-16 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>Questions about this policy? Contact us at the atelier email listed in the site footer.</p>
              <p>This privacy policy is a template and must be reviewed by legal counsel before launch to confirm alignment with Kenyan data protection obligations and applicable international requirements.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
