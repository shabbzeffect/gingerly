import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/layout/admin-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminFaqsPage() {
  await requireAdmin();

  const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="serif space-y-1">
            <h1 className="text-3xl font-bold text-espresso">FAQs</h1>
            <p className="text-muted-foreground">Manage frequently asked questions.</p>
          </div>
          <Link href="/admin/faqs/new"><Button>Add FAQ</Button></Link>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-champagne/30">
                <th className="p-4 text-muted-foreground font-medium">Question</th>
                <th className="p-4 text-muted-foreground font-medium">Category</th>
                <th className="p-4 text-muted-foreground font-medium">Active</th>
                <th className="p-4 text-muted-foreground font-medium">Unverified</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.length > 0 ? (
                faqs.map((f: { id: string; question: string; category: string | null; active: boolean; unverified: boolean }) => (
                  <tr key={f.id} className="border-b border-border/50 hover:bg-champagne/20">
                    <td className="p-4 text-espresso font-medium">{f.question}</td>
                    <td className="p-4 text-muted-foreground">{f.category || "—"}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${f.active ? "border border-ginger/30 bg-ginger/10 text-ginger" : "border border-border bg-transparent text-muted-foreground"}`}>
                        {f.active ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${f.unverified ? "border border-terracotta/30 bg-terracotta/10 text-terracotta-dark" : "border border-border bg-transparent text-muted-foreground"}`}>
                        {f.unverified ? "Review" : "—"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/faqs/${f.id}`} className="text-sm text-ginger hover:underline">Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No FAQs yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
