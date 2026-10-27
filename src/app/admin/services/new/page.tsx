"use client";

import { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewServicePage() {
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState("0");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = ["bridal", "traditional", "menswear", "occasion", "rental"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, key, category, description, active, order: Number(order) }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create service");
      window.location.href = "/admin/services";
    } catch (err: any) {
      setError(err.message || "Failed to create service");
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <Link href="/admin/services" className="text-sm text-ginger hover:underline flex items-center gap-1">
          ← Back to services
        </Link>

        <div className="serif space-y-1">
          <h1 className="text-3xl font-bold text-espresso">Add service</h1>
          <p className="text-muted-foreground">Create a new bespoke service offering.</p>
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
                placeholder="e.g. Bridal Gown Commission"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Key (unique ID)</label>
              <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="bridal-gown"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
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
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 text-ginger border-border rounded focus:ring-ginger mt-0.5"
              />
              <label className="text-sm text-muted-foreground">Active</label>
            </div>
            <Button type="submit" disabled={submitting} className="bg-espresso text-ivory hover:bg-ginger">
              Create service
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
