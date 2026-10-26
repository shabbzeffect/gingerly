"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "@/components/icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Login failed");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-champagne/50">
      <div className="w-full max-w-md px-4 sm:px-6 lg:px-8">
        <div className="serif text-center mb-10">
          <Link href="/" className="text-3xl font-bold text-espresso">GINGERLY</Link>
          <h2 className="text-2xl font-bold text-espresso mt-4">Admin Atelier</h2>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
          {error && (
            <div className="mb-6 rounded-xl border border-terracotta bg-terracotta/10 p-4 text-sm text-terracotta-dark">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-espresso">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-input text-espresso focus:outline-none focus:ring-2 focus:ring-ginger"
                />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-espresso text-ivory hover:bg-ginger">
              Sign in
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Gingerly Atelier &mdash; secure admin area
          </p>
        </div>
      </div>
    </div>
  );
}
