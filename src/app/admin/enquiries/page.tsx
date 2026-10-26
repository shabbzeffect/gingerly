import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";

export default async function EnquiriesPage() {
  await requireAdmin();

  const enquiries = await prisma.consultationEnquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="serif space-y-1">
            <h1 className="text-3xl font-bold text-espresso">Consultation enquiries</h1>
            <p className="text-muted-foreground">Review and manage consultation requests.</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-champagne/30">
                <th className="p-4 text-muted-foreground font-medium">Name</th>
                <th className="p-4 text-muted-foreground font-medium">Email</th>
                <th className="p-4 text-muted-foreground font-medium">Occasion</th>
                <th className="p-4 text-muted-foreground font-medium">Kind</th>
                <th className="p-4 text-muted-foreground font-medium">Status</th>
                <th className="p-4 text-muted-foreground font-medium">Date</th>
                <th className="p-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((e: { id: string; firstName: string; lastName: string; email: string; occasion: string; kind: string; status: string; createdAt: Date }) => (
                  <tr key={e.id} className="border-b border-border/50 hover:bg-champagne/20 transition-colors group">
                    <td className="p-4 text-espresso font-medium">{e.firstName} {e.lastName}</td>
                    <td className="p-4 text-muted-foreground">{e.email}</td>
                    <td className="p-4 text-muted-foreground">{e.occasion}</td>
                    <td className="p-4 text-muted-foreground">{e.kind}</td>
                    <td className="p-4">
                      <select
                        defaultValue={e.status}
                        onChange={(ev) => {
                          // Status update would go here via API
                          console.log("Update status:", ev.target.value);
                        }}
                        className="px-2 py-1 rounded border border-border bg-input text-espresso focus:outline-none focus:ring-ginger"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="RESCHEDULED">Rescheduled</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>
                    <td className="p-4 text-muted-foreground">{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <Button href={`/admin/enquiries/${e.id}`} size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No enquiries yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
