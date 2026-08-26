"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  CreditCard,
  LogOut,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/pricing", label: "Pricing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  user?: {
    full_name?: string | null;
    email?: string;
    avatar_url?: string | null;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Zap className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">LockFrame</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={user?.avatar_url}
            fallback={user?.full_name?.[0] || user?.email?.[0] || "?"}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.full_name || "Creator"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
