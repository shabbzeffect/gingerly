import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/layout/admin-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminServicesPage() {
  await requireAdmin();

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="serif space-y-1">
            <h1 className="text-3xl font-bold text-espresso">Services</h1>
            <p className="text-muted-foreground">Manage service offerings.</p>
          </div>
          <Link href="/admin/services/new"><Button>Add service</Button></Link>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-champagne/30">
                <th className="p-4 text-muted-foreground font-medium">Title</th>
                <th className="p-4 text-muted-foreground font-medium">Category</th>
                <th className="p-4 text-muted-foreground font-medium">Active</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((s: { id: string; title: string; category: string | null; active: boolean }) => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-champagne/20">
                    <td className="p-4 text-espresso font-medium">{s.title}</td>
                    <td className="p-4 text-muted-foreground">{s.category || "—"}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.active ? "border border-ginger/30 bg-ginger/10 text-ginger" : "border border-border bg-transparent text-muted-foreground"}`}>
                        {s.active ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/services/${s.id}`} className="text-sm text-ginger hover:underline">Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No services yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
