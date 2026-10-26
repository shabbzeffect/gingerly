"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Phone, Mail, Calendar, Clock, Image as ImageIcon, Header as HeaderIcon, Award, Image, Users, ShieldCheck } from "@/components/icons";
import { Header as SiteHeader } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const STEPS = [
  { id: "occasion", label: "Occasion", icon: Award },
  { id: "event", label: "Event date", icon: Calendar },
  { id: "location", label: "Location", icon: HeaderIcon },
  { id: "vision", label: "Your vision", icon: ImageIcon },
  { id: "slot", label: "Your details", icon: Phone },
];

const OCCASIONS: { id: string; label: string; hint: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "wedding", label: "White Wedding", hint: "Bridal gowns & veils", icon: Award },
  { id: "ruracio", label: "Ruracio", hint: "Kikuyu traditional ceremony", icon: Image },
  { id: "nyombo", label: "Nyombo", hint: "Luo traditional ceremony", icon: Users },
  { id: "koito", label: "Koito", hint: "Kalenjin celebration", icon: ShieldCheck },
  { id: "bukhwi", label: "Bukhwi", hint: "Luhya tradition", icon: ShieldCheck },
  { id: "bridesmaid", label: "Bridesmaid / Guest", hint: "Coordinated occasion wear", icon: Users },
  { id: "prom", label: "Prom", hint: "Formal occasion dress", icon: Award },
  { id: "menswear", label: "Menswear / Senator", hint: "Tailored suits & grooms", icon: HeaderIcon },
  { id: "other", label: "Other", hint: "Tell us about your occasion", icon: Mail },
];

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<{
    occasion: string;
    eventDate: string;
    kind: "IN_PERSON" | "VIRTUAL";
    timeZone: string;
    garmentType: string;
    budget: string;
    inspiration: string;
    message: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    consent: boolean;
  }>({
    occasion: "",
    eventDate: "",
    kind: "IN_PERSON",
    timeZone: "Africa/Nairobi",
    garmentType: "",
    budget: "",
    inspiration: "",
    message: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  });
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isLastStep = step === STEPS.length - 1;

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
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
        <SiteHeader />
        <main className="flex-1">
          <section className="py-24 lg:py-32 text-center">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ginger/10 text-ginger mb-6">
                <Award size={32} />
              </div>
              <h1 className="serif text-4xl font-bold text-espresso mb-6">Thank you.</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Your consultation request has been received. We'll review your details and respond within one business day to confirm your slot.
              </p>
              <p className="text-sm text-muted-foreground">
                Questions? WhatsApp us or email <a href="mailto:enquiries@gingerly.example" className="text-ginger hover:underline">enquiries@gingerly.example</a>.
              </p>
              <div className="mt-12 flex justify-center gap-4">
                <Button href="/lookbook">Explore the work</Button>
                <Button href="/about" variant="outline">About the atelier</Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <div className="flex flex-col min-h-svh">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="serif space-y-4 mb-12">
              <h1 className="text-4xl font-bold text-espresso leading-tight">Book a Consultation</h1>
              <p className="text-lg text-muted-foreground">
                Nairobi studio or virtual — tell us about your occasion and we'll find the right time for you.
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-10 text-xs uppercase tracking-widest text-muted-foreground">
              {STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight size={14} className="opacity-50" />}
                  <span className={step >= i ? "font-semibold text-espresso" : "text-muted-foreground"}>{s.label}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="rounded-xl border border-terracotta bg-terracotta/10 p-4 text-sm text-terracotta-dark">
                  {error}
                </div>
              )}

              {/* Step 1: Occasion */}
              <div className="space-y-6">
                <h2 className="serif text-2xl font-bold text-espresso">What's the occasion?</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {OCCASIONS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setSelectedOccasion(o.id)}
                      className={`group p-6 rounded-xl border-2 text-center transition-all ${
                        selectedOccasion === o.id
                          ? "border-ginger bg-ginger/10"
                          : "border-border hover:border-ginger/50"
                      }`}
                    >
                      <o.icon size={24} className={`mb-3 block mx-auto ${selectedOccasion === o.id ? "text-ginger" : "text-muted-foreground"}`} />
                      <div className="serif font-bold text-espresso">{o.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{o.hint}</div>
                    </button>
                  ))}
                </div>
                <input
                  type="hidden"
                  name="occasion"
                  value={selectedOccasion || form.occasion}
                  readOnly
                />
              </div>

              {/* Step 2: Event date */}
              <div className="space-y-6">
                <h2 className="serif text-2xl font-bold text-espresso">When is your big day?</h2>
                <label className="flex items-center gap-2 text-sm font-medium text-espresso">
                  <Calendar size={18} /> Event date (optional)
                </label>
                <input
                  type="date"
                  name="eventDate"
                  defaultValue={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
                <p className="text-sm text-muted-foreground">Helps us understand urgency and timeline. Leave blank if not yet decided.</p>
              </div>

              {/* Step 3: Location */}
              <div className="space-y-6">
                <h2 className="serif text-2xl font-bold text-espresso">Where are you?</h2>
                <div className="grid gap-4">
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-ginger transition-colors group">
                    <input type="radio" name="kind" value="IN_PERSON" defaultChecked={form.kind === "IN_PERSON"} onChange={() => setForm({ ...form, kind: "IN_PERSON" })} className="text-ginger" />
                    <div>
                      <div className="font-semibold text-espresso">In-person — Nairobi studio</div>
                      <div className="text-sm text-muted-foreground">Visit us by appointment in Nairobi.</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card cursor-pointer hover:border-ginger transition-colors group">
                    <input type="radio" name="kind" value="VIRTUAL" defaultChecked={form.kind === "VIRTUAL"} onChange={() => setForm({ ...form, kind: "VIRTUAL" })} className="text-ginger" />
                    <div>
                      <div className="font-semibold text-espresso">Virtual consultation</div>
                      <div className="text-sm text-muted-foreground">From London, Sydney, Nairobi, or anywhere. We'll match your time zone.</div>
                    </div>
                  </label>
                </div>
                <label className="flex items-center gap-2 text-sm font-medium text-espresso">
                  <Clock size={18} /> Your time zone
                </label>
                <select
                  name="timeZone"
                  defaultValue={form.timeZone}
                  onChange={(e) => setForm({ ...form, timeZone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                >
                  <option value="Africa/Nairobi">Nairobi (EAT, UTC+3)</option>
                  <option value="Europe/London">London (GMT/BST)</option>
                  <option value="Australia/Sydney">Sydney (AEST/AEDT)</option>
                  <option value="America/New_York">New York (ET)</option>
                </select>
                <p className="text-sm text-muted-foreground">We'll display available slots in your local time.</p>
              </div>

              {/* Step 4: Vision */}
              <div className="space-y-6">
                <h2 className="serif text-2xl font-bold text-espresso">Tell us your vision</h2>
                <label className="flex items-center gap-2 text-sm font-medium text-espresso">
                  <ImageIcon size={18} /> Garment type
                </label>
                <input
                  type="text"
                  name="garmentType"
                  defaultValue={form.garmentType}
                  placeholder="e.g. bridal gown, Senator suit, Ankara set"
                  onChange={(e) => setForm({ ...form, garmentType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
                <label className="flex items-center gap-2 text-sm font-medium text-espresso mt-4">
                  <ImageIcon size={18} /> Inspiration (optional)
                </label>
                <textarea
                  name="inspiration"
                  defaultValue={form.inspiration}
                  placeholder="Pinterest links, photo references, or describe the look you want"
                  rows={3}
                  onChange={(e) => setForm({ ...form, inspiration: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
                <label className="flex items-center gap-2 text-sm font-medium text-espresso mt-4">
                  <Mail size={18} /> Budget (optional)
                </label>
                <input
                  type="text"
                  name="budget"
                  defaultValue={form.budget}
                  placeholder="e.g. KES 150,000–250,000"
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
                <label className="flex items-center gap-2 text-sm font-medium text-espresso mt-4">
                  <HeaderIcon size={18} /> Message (optional)
                </label>
                <textarea
                  name="message"
                  defaultValue={form.message}
                  placeholder="Anything else we should know?"
                  rows={3}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>

              {/* Step 5: Details */}
              <div className="space-y-6">
                <h2 className="serif text-2xl font-bold text-espresso">Your details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-espresso">First name</label>
                    <input
                      name="firstName"
                      defaultValue={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-espresso">Last name</label>
                    <input
                      name="lastName"
                      defaultValue={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-espresso">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-espresso">Phone (WhatsApp)</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={form.phone}
                    placeholder="+254 7XX XXX XXX"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                  />
                  <p className="text-xs text-muted-foreground">We'll confirm via WhatsApp — Kenya's preferred channel.</p>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    defaultChecked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="w-4 h-4 text-ginger border-border rounded focus:ring-ginger"
                  />
                  <label className="text-sm text-muted-foreground leading-relaxed">
                    I consent to Gingerly collecting my personal details to respond to this enquiry.
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {step > 0 && <span>Step {step + 1} of {STEPS.length}</span>}
                </div>
                <div className="flex gap-4">
                  {step > 0 && (
                    <Button type="button" variant="outline" onClick={prev} className="text-espresso border-espresso hover:bg-espresso hover:text-ivory">
                      <ChevronLeft size={16} className="mr-2" /> Back
                    </Button>
                  )}
                  <Button type="submit" disabled={submitting} className="bg-espresso text-ivory hover:bg-ginger">
                    {isLastStep ? "Send enquiry" : <><ChevronRight size={16} className="ml-2" /> Continue</>}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
