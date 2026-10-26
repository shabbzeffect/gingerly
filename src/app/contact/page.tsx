"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, Phone, MapPin, Instagram } from "@/components/icons";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Message failed to send");
      setSubmitted(true);
      setSubmitting(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-svh">
        <Header />
        <main className="flex-1">
          <section className="py-24 lg:py-32 text-center">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ginger/10 text-ginger mb-6">
                <Mail size={32} />
              </div>
              <h1 className="serif text-4xl font-bold text-espresso mb-6">Message sent.</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We'll respond within one business day. In the meantime, you can reach us on WhatsApp.
              </p>
              <a href="https://wa.me/" className="inline-flex items-center gap-2 text-ginger hover:underline">
                <Phone size={16} /> WhatsApp us
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="serif space-y-8">
                <h1 className="text-4xl font-bold text-espresso leading-tight">Get in touch</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Have a question about a commission, virtual fitting, or rental enquiry? We'd love to hear from you.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail size={20} className="mt-0.5 text-ginger" />
                    <div>
                      <div className="font-semibold text-espresso">Email</div>
                      <a href="mailto:enquiries@gingerly.example" className="text-muted-foreground hover:text-ginger transition-colors">enquiries@gingerly.example</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="mt-0.5 text-ginger" />
                    <div>
                      <div className="font-semibold text-espresso">WhatsApp</div>
                      <a href="https://wa.me/" className="text-muted-foreground hover:text-ginger transition-colors">Chat on WhatsApp</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="mt-0.5 text-ginger" />
                    <div>
                      <div className="font-semibold text-espresso">Studio</div>
                      <div className="text-muted-foreground">By appointment, Nairobi, Kenya</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Instagram size={20} className="mt-0.5 text-ginger" />
                    <div>
                      <div className="font-semibold text-espresso">Instagram</div>
                      <a href="#" className="text-muted-foreground hover:text-ginger transition-colors">@gingerlydesigns</a>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="serif text-2xl font-bold text-espresso">Send a message</h2>
                {error && (
                  <div className="rounded-xl border border-terracotta bg-terracotta/10 p-4 text-sm text-terracotta-dark">
                    {error}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-espresso">Name</label>
                    <input
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-espresso">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-espresso">Subject</label>
                  <input
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-espresso">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-espresso text-ivory hover:bg-ginger">
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
