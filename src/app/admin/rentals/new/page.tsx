"use client";

import { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewRentalPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [occasion, setOccasion] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [priceKes, setPriceKes] = useState("");
  const [depositKes, setDepositKes] = useState("");
  const [terms, setTerms] = useState("");
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(false);
  const [order, setOrder] = useState("0");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const occasions = ["ruracio", "nyombo", "koito", "bukhwi", "white-wedding", "bridesmaid", "prom", "menswear", "occasion"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          occasion,
          size,
          color,
          priceKes,
          depositKes,
          terms,
          active,
          available,
          order: Number(order),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create rental item");
      window.location.href = "/admin/rentals";
    } catch (err: any) {
      setError(err.message || "Failed to create rental item");
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <Link href="/admin/rentals" className="text-sm text-ginger hover:underline flex items-center gap-1">
          ← Back to rentals
        </Link>

        <div className="serif space-y-1">
          <h1 className="text-3xl font-bold text-espresso">Add rental item</h1>
          <p className="text-muted-foreground">Add an item to the rental catalogue.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          {error && (
            <div className="mb-4 rounded-xl border border-terracotta bg-terracotta/10 p-3 text-sm text-terracotta-dark">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Ivory Bridal Gown"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="ivory-bridal-gown"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              >
                <option value="">None</option>
                {occasions.map((o) => (
                  <option key={o} value={o}>
                    {o.charAt(0).toUpperCase() + o.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-espresso">Size</label>
                <input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. 36 / Medium"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-espresso">Color</label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Ivory / Champagne"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-espresso">Price (KES)</label>
                <input
                  type="number"
                  value={priceKes}
                  onChange={(e) => setPriceKes(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-espresso">Deposit (KES)</label>
                <input
                  type="number"
                  value={depositKes}
                  onChange={(e) => setDepositKes(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Terms</label>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={3}
                placeholder="e.g. 3-day rental, cleaning fee applies"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="w-4 h-4 text-ginger border-border rounded focus:ring-ginger mt-0.5"
                />
                <label className="text-sm text-muted-foreground">Active</label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="w-4 h-4 text-ginger border-border rounded focus:ring-ginger mt-0.5"
                />
                <label className="text-sm text-muted-foreground">Available</label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Order</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                defaultValue="0"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <Button type="submit" disabled={submitting} className="bg-espresso text-ivory hover:bg-ginger">
              Create rental item
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
