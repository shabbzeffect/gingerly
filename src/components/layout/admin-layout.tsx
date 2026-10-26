import Link from "next/link";
import { Phone, Mail, Layout, List, Image, Settings, FileText, Shield, LogOut } from "@/components/icons";

const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Layout },
  { href: "/admin/enquiries", label: "Enquiries", icon: List },
  { href: "/admin/lookbook", label: "Lookbook", icon: Image },
  { href: "/admin/services", label: "Services", icon: Shield },
  { href: "/admin/faqs", label: "FAQs", icon: FileText },
  { href: "/admin/rentals", label: "Rentals", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-champagne/50">
      <aside className="hidden lg:flex lg:w-64 flex-col border-r border-border bg-card">
        <div className="p-6 serif">
          <Link href="/admin/dashboard" className="text-2xl font-bold text-espresso">GINGERLY</Link>
          <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">Admin Atelier</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-champagne hover:text-espresso transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href="#"
            onClick={(e) => { e.preventDefault(); fetch("/api/auth/logout", { method: "POST" }).then(() => window.location.href = "/admin/login"); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-terracotta-dark hover:bg-terracotta/10 transition-colors"
          >
            <LogOut size={18} /> Sign out
          </Link>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto bg-background">
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-6 py-4">
          <div className="serif text-lg font-bold text-espresso">Admin Atelier</div>
          <div className="flex items-center gap-4">
            <Link href="/book" className="text-sm text-muted-foreground hover:text-ginger transition-colors">View site</Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-ginger transition-colors">Visit storefront</Link>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
