"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";

type Setting = { key: string; value: string };

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => { setSettings(data.settings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = Object.fromEntries(settings.map((s) => [s.key, s.value]));
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("Settings saved");
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="h-64 flex items-center justify-center">Loading…</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="serif space-y-1">
          <h1 className="text-3xl font-bold text-espresso">Settings</h1>
          <p className="text-muted-foreground">Configure brand and contact details.</p>
        </div>

        <form onSubmit={save} className="rounded-xl border border-border bg-card p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {settings.map((s) => (
              <div key={s.key} className="space-y-2">
                <label className="text-sm font-medium text-espresso uppercase tracking-wider">{s.key}</label>
                <input
                  name={s.key}
                  defaultValue={s.value}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
            ))}
          </div>
          <Button type="submit" disabled={saving} className="bg-espresso text-ivory hover:bg-ginger">
            Save settings
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
