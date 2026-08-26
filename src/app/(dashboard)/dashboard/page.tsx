"use client";

import Link from "next/link";
import {
  Plus,
  DollarSign,
  FolderOpen,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$0.00", icon: DollarSign, change: "+0%" },
  { label: "Active Projects", value: "0", icon: FolderOpen, change: "" },
  { label: "Deliveries Sent", value: "0", icon: TrendingUp, change: "" },
];

const recentProjects: { id: string; title: string; status: string; price: string; date: string }[] = [];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your media delivery business
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            {stat.change && (
              <p className="mt-1 text-xs text-success">{stat.change} from last month</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <Link
            href="/dashboard/projects"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="p-6">
          {recentProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground/50 mx-auto" />
              <h3 className="mt-4 text-sm font-medium">No projects yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first project to start delivering media.
              </p>
              <Link
                href="/dashboard/projects/new"
                className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Project
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{project.price}</span>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {project.status}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
