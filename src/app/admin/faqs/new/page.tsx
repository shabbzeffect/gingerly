import { requireAdmin } from "@/lib/admin-auth";
import AdminLayout from "@/components/layout/admin-layout";

export default async function NewFaqPage() {
  await requireAdmin();
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-espresso">Add FAQ</h1>
        <p className="text-muted-foreground">Coming soon — create FAQs directly in the database for now.</p>
      </div>
    </AdminLayout>
  );
}
