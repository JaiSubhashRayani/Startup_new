import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - server component placeholder; real auth check in middleware */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span className="text-lg font-bold">LockFrame</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {[
            { href: "/dashboard", label: "Dashboard" },
            { href: "/dashboard/projects", label: "Projects" },
            { href: "/dashboard/pricing", label: "Pricing" },
            { href: "/dashboard/settings", label: "Settings" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="h-16 border-b border-border flex items-center px-6 lg:hidden">
          <span className="text-lg font-bold">LockFrame</span>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
