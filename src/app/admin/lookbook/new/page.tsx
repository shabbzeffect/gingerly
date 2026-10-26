"use client";

import { useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewLookbookProjectPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [occasion, setOccasion] = useState("");
  const [garmentType, setGarmentType] = useState("");
  const [fabric, setFabric] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/lookbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, occasion, garmentType, fabric, description, featured }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create project");
      window.location.href = "/admin/lookbook";
    } catch (err: any) {
      setError(err.message || "Failed to create project");
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <Link href="/admin/lookbook" className="text-sm text-ginger hover:underline flex items-center gap-1">
          ← Back to lookbook
        </Link>

        <div className="serif space-y-1">
          <h1 className="text-3xl font-bold text-espresso">Add lookbook project</h1>
          <p className="text-muted-foreground">Sample imagery only — replace with authentic brand photography.</p>
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
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="ruracio-beaded-gown"
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
                <option value="ruracio">Ruracio</option>
                <option value="nyombo">Nyombo</option>
                <option value="koito">Koito</option>
                <option value="bukhwi">Bukhwi</option>
                <option value="white-wedding">White wedding</option>
                <option value="bridesmaid">Bridesmaid</option>
                <option value="menswear">Menswear</option>
                <option value="occasion">Occasion</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Garment type</label>
              <input
                value={garmentType}
                onChange={(e) => setGarmentType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Fabric</label>
              <input
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
              />
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
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-ginger border-border rounded focus:ring-ginger mt-0.5"
              />
              <label className="text-sm text-muted-foreground">Featured project</label>
            </div>
            <Button type="submit" disabled={submitting} className="bg-espresso text-ivory hover:bg-ginger">
              Create project
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
