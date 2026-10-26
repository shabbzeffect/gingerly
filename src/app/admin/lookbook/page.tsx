import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/layout/admin-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminLookbookPage() {
  await requireAdmin();

  const projects = await prisma.lookbookProject.findMany({
    include: { images: { select: { id: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="serif space-y-1">
            <h1 className="text-3xl font-bold text-espresso">Lookbook</h1>
            <p className="text-muted-foreground">Manage lookbook projects.</p>
          </div>
          <Link href="/admin/lookbook/new">
            <Button>Add project</Button>
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-champagne/30">
                <th className="p-4 text-muted-foreground font-medium">Title</th>
                <th className="p-4 text-muted-foreground font-medium">Occasion</th>
                <th className="p-4 text-muted-foreground font-medium">Garment type</th>
                <th className="p-4 text-muted-foreground font-medium">Images</th>
                <th className="p-4 text-muted-foreground font-medium">Featured</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((p: { id: string; title: string; occasion: string | null; garmentType: string | null; images: { id: string }[]; featured: boolean }) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-champagne/20">
                    <td className="p-4 text-espresso font-medium">{p.title}</td>
                    <td className="p-4 text-muted-foreground">{p.occasion || "—"}</td>
                    <td className="p-4 text-muted-foreground">{p.garmentType || "—"}</td>
                    <td className="p-4 text-muted-foreground">{p.images.length}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.featured ? "border border-ginger/30 bg-ginger/10 text-ginger" : "border border-border bg-transparent text-muted-foreground"}`}>
                        {p.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/lookbook/${p.id}`} className="text-sm text-ginger hover:underline">Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
