"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  Film,
  Image,
  Clock,
  Check,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectParams {
  id: string;
}

export default function ProjectDetailPage({ params }: { params: Promise<ProjectParams> }) {
  const { id } = use(params);

  // TODO: Fetch project data from Supabase
  const project = {
    id,
    title: "Sample Project",
    description: "A sample project for demonstration purposes",
    price_cents: 120000,
    status: "ready",
    created_at: new Date().toISOString(),
  };

  const media: { id: string; type: string; filename: string; file_size: number; processing_status: string }[] = [];
  const deliveries: { id: string; client_name: string; client_email: string; status: string; access_token: string }[] = [];

  const deliveryLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/d/sample-token`;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            {project.description && (
              <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
            )}
          </div>
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
        </div>
      </div>

      {/* Delivery Link */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Client Delivery Link</h2>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-mono truncate">
            {deliveryLink}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(deliveryLink)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Link href={deliveryLink} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            Price
          </div>
          <p className="mt-1 text-2xl font-bold">
            ${(project.price_cents / 100).toFixed(2)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Film className="h-4 w-4" />
            Media Files
          </div>
          <p className="mt-1 text-2xl font-bold">{media.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Deliveries
          </div>
          <p className="mt-1 text-2xl font-bold">{deliveries.length}</p>
        </div>
      </div>

      {/* Media */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Media Files</h2>
          <Button variant="outline" size="sm">
            Upload More
          </Button>
        </div>
        {media.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No media files uploaded yet.
          </p>
        ) : (
          <div className="space-y-2">
            {media.map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                {m.type === "video" ? (
                  <Film className="h-5 w-5 text-blue-500" />
                ) : (
                  <Image className="h-5 w-5 text-green-500" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.filename}</p>
                  <p className="text-xs text-muted-foreground">
                    {(m.file_size / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
                <Badge
                  variant={
                    m.processing_status === "completed"
                      ? "success"
                      : m.processing_status === "failed"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {m.processing_status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deliveries */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Deliveries</h2>
        </div>
        {deliveries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No deliveries sent yet. Share the delivery link with your client.
          </p>
        ) : (
          <div className="space-y-2">
            {deliveries.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{d.client_name}</p>
                  <p className="text-xs text-muted-foreground">{d.client_email}</p>
                </div>
                <Badge
                  variant={
                    d.status === "unlocked"
                      ? "success"
                      : d.status === "pending"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {d.status}
                </Badge>
                {d.status === "unlocked" && <Check className="h-4 w-4 text-success" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
