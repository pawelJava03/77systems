"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leady / CRM", icon: MessageSquare },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <aside className="w-64 shrink-0 bg-[#0D0D0D] border-r border-white/5 flex flex-col min-h-screen fixed left-0 top-0 z-50">
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <span className="font-heading font-black text-primary text-sm">77</span>
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">77systems</p>
              <p className="text-xs text-muted-foreground mt-0.5">Panel Admin</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-black"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {loggingOut ? "Wylogowywanie..." : "Wyloguj się"}
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
