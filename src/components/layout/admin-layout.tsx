"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, Layout, List, Image, Shield, FileText, Settings, LogOut } from "@/components/icons";

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
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-champagne/40">
      <aside className="hidden lg:flex lg:w-64 flex-col border-r border-border bg-card shrink-0">
        <div className="p-6 serif border-b border-border">
          <Link href="/admin/dashboard" className="text-2xl font-bold text-espresso tracking-tighter">GINGERLY</Link>
          <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">Admin Atelier</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-ginger/10 text-ginger border border-ginger/20"
                    : "text-muted-foreground hover:bg-champagne/60 hover:text-espresso"
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={() => fetch("/api/auth/logout", { method: "POST" }).then(() => { window.location.href = "/admin/login"; })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-terracotta-dark hover:bg-terracotta/10 transition-colors border border-terracotta/20"
          >
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto bg-background">
        <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-md flex items-center justify-between px-8 py-5">
          <div className="serif text-lg font-bold text-espresso">Admin Atelier</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-ginger transition-colors uppercase [letter-spacing:0.05em]">
              Visit storefront
            </Link>
          </div>
        </header>

        <main className="p-8 lg:p-12">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
