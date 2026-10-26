import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminLayout from "@/components/layout/admin-layout";

export default async function DashboardPage() {
  const session = await requireAdmin();

  const [enquiriesCount, virtualCount, rentalsCount, servicesCount, recentEnquiries] = await Promise.all([
    prisma.consultationEnquiry.count(),
    prisma.virtualFittingSubmission.count(),
    prisma.rentalEnquiry.count(),
    prisma.service.count(),
    prisma.consultationEnquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, firstName: true, lastName: true, occasion: true, kind: true, status: true, createdAt: true },
    }),
  ]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="serif space-y-2">
          <h1 className="text-3xl font-bold text-espresso">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session.admin.name}.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Consultation enquiries</p>
            <p className="serif text-3xl font-bold text-espresso">{enquiriesCount}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Virtual fittings</p>
            <p className="serif text-3xl font-bold text-espresso">{virtualCount}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Rental enquiries</p>
            <p className="serif text-3xl font-bold text-espresso">{rentalsCount}</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Services</p>
            <p className="serif text-3xl font-bold text-espresso">{servicesCount}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="p-6 border-b border-border">
            <h3 className="serif text-lg font-bold text-espresso">Recent enquiries</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-champagne/30">
                  <th className="p-4 text-muted-foreground font-medium">Name</th>
                  <th className="p-4 text-muted-foreground font-medium">Occasion</th>
                  <th className="p-4 text-muted-foreground font-medium">Kind</th>
                  <th className="p-4 text-muted-foreground font-medium">Status</th>
                  <th className="p-4 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((e: { id: string; firstName: string; lastName: string; occasion: string; kind: string; status: string; createdAt: Date }) => (
                    <tr key={e.id} className="border-b border-border/50 hover:bg-champagne/20 transition-colors">
                      <td className="p-4 text-espresso font-medium">{e.firstName} {e.lastName}</td>
                      <td className="p-4 text-muted-foreground">{e.occasion}</td>
                      <td className="p-4 text-muted-foreground">{e.kind}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          e.status === "PENDING" ? "border border-ginger/30 bg-ginger/10 text-ginger" :
                          e.status === "CONFIRMED" ? "border border-green/30 bg-green/10 text-green" :
                          "border border-border bg-transparent text-muted-foreground"
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{new Date(e.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No enquiries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
