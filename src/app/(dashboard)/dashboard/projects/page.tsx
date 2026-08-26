"use client";

import Link from "next/link";
import { Plus, FolderOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects: { id: string; title: string; status: string; mediaCount: number; price: string }[] = [];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your media delivery projects
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

      {projects.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <FolderOpen className="h-16 w-16 text-muted-foreground/50 mx-auto" />
          <h3 className="mt-4 text-lg font-medium">No projects yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
            Create your first project to upload media, generate watermarked previews, and share delivery links with clients.
          </p>
          <Link
            href="/dashboard/projects/new"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Badge
                  variant={
                    project.status === "paid"
                      ? "success"
                      : project.status === "ready"
                      ? "default"
                      : "secondary"
                  }
                >
                  {project.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {project.mediaCount} files
                </span>
              </div>
              <p className="mt-3 text-lg font-bold">{project.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
