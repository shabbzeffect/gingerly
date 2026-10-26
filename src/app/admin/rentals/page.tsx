import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/layout/admin-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminRentalsPage() {
  await requireAdmin();

  const [rentals, rentalSetting] = await Promise.all([
    prisma.rentalItem.findMany({ orderBy: { order: "asc" } }),
    prisma.setting.findUnique({ where: { key: "rentals_enabled" } }),
  ]);

  const enabled = rentalSetting?.value === "true";

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="serif space-y-1">
            <h1 className="text-3xl font-bold text-espresso">Rentals</h1>
            <p className="text-muted-foreground">Manage rental inventory.</p>
          </div>
          <Link href="/admin/rentals/new"><Button>Add rental item</Button></Link>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              id="rentals_enabled"
              type="checkbox"
              defaultChecked={enabled}
              className="w-4 h-4 text-ginger border-border rounded focus:ring-ginger"
            />
            <label htmlFor="rentals_enabled" className="text-sm font-medium text-espresso">
              Enable public rental catalogue
            </label>
            {enabled ? null : <span className="text-xs text-terracotta-dark ml-2">Catalogue is hidden until confirmed</span>}
          </div>
          <p className="text-sm text-muted-foreground">
            Toggle to show/hide rentals on the public site. Only enable when inventory and pricing are verified.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-champagne/30">
                <th className="p-4 text-muted-foreground font-medium">Title</th>
                <th className="p-4 text-muted-foreground font-medium">Occasion</th>
                <th className="p-4 text-muted-foreground font-medium">Price (KES)</th>
                <th className="p-4 text-muted-foreground font-medium">Active</th>
                <th className="p-4 text-muted-foreground font-medium">Available</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rentals.length > 0 ? (
                rentals.map((r: { id: string; title: string; occasion: string | null; priceKes: number | null; active: boolean; available: boolean }) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-champagne/20">
                    <td className="p-4 text-espresso font-medium">{r.title}</td>
                    <td className="p-4 text-muted-foreground">{r.occasion || "—"}</td>
                    <td className="p-4 text-muted-foreground">{r.priceKes ?? "—"}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${r.active ? "border border-ginger/30 bg-ginger/10 text-ginger" : "border border-border bg-transparent text-muted-foreground"}`}>
                        {r.active ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${r.available ? "border border-ginger/30 bg-ginger/10 text-ginger" : "border border-border bg-transparent text-muted-foreground"}`}>
                        {r.available ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/rentals/${r.id}`} className="text-sm text-ginger hover:underline">Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No rental items yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
