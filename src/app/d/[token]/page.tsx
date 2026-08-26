"use client";

import { use, useState } from "react";
import { Play, Pause, Download, Lock, Unlock, Zap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaItem {
  id: string;
  type: "video" | "photo";
  previewUrl: string;
  filename: string;
}

interface ProjectData {
  title: string;
  description: string;
  priceCents: number;
  brandColor: string;
  creatorName: string;
  media: MediaItem[];
  status: "preview" | "unlocked";
}

export default function DeliveryPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(0);

  // TODO: Fetch delivery data using access token
  const project: ProjectData = {
    title: "Your Deliverables Are Ready",
    description: "Thank you for your payment. Preview your files below and download the full-resolution masters.",
    priceCents: 120000,
    brandColor: "#7c3aed",
    creatorName: "Studio Name",
    media: [],
    status: "preview",
  };

  const handlePay = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, amountCents: project.priceCents }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Fallback
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(`/api/download/${token}`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: project.brandColor }} />
            <span className="text-sm font-semibold">{project.creatorName}</span>
          </div>
          <div className="flex items-center gap-3">
            {project.status === "preview" ? (
              <Button
                onClick={handlePay}
                className="text-white font-semibold shadow-lg"
                style={{ backgroundColor: project.brandColor }}
              >
                <CreditCard className="h-4 w-4" />
                Pay ${(project.priceCents / 100).toFixed(0)} to Unlock
              </Button>
            ) : (
              <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="h-4 w-4" />
                Download Files
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 mb-6">
          {project.status === "preview" ? (
            <>
              <Lock className="h-4 w-4" />
              Preview Mode — Watermarked
            </>
          ) : (
            <>
              <Unlock className="h-4 w-4 text-green-400" />
              Unlocked — Full Resolution
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">{project.title}</h1>
        <p className="mt-3 text-white/60 max-w-xl mx-auto">{project.description}</p>
      </div>

      {/* Media Preview Area */}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        {project.media.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-16 text-center">
            <Lock className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Media Preview</h2>
            <p className="mt-2 text-sm text-white/50 max-w-md mx-auto">
              Your watermarked preview will appear here once your creator uploads the files.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Video Player Placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </button>
              </div>

              {/* Watermark overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.08]">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-white/30 font-bold text-lg rotate-[-30deg] whitespace-nowrap"
                      style={{
                        top: `${(i * 14) + 2}%`,
                        left: `${(i % 3) * 35}%`,
                      }}
                    >
                      PREVIEW ONLY — {project.creatorName.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status badge */}
              {project.status === "preview" && (
                <div className="absolute top-4 right-4 rounded-full bg-red-500/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                  UNPAID
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {project.media.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setCurrentMedia(i)}
                  className={`shrink-0 h-16 w-24 rounded-lg border-2 overflow-hidden ${
                    currentMedia === i ? "border-white" : "border-white/20"
                  }`}
                >
                  <div className="h-full w-full bg-zinc-800 flex items-center justify-center text-xs text-white/50">
                    {m.type === "video" ? "Video" : "Photo"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pay CTA - sticky bottom on mobile */}
        {project.status === "preview" && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/90 backdrop-blur-md p-4 lg:hidden">
            <Button
              onClick={handlePay}
              className="w-full h-12 text-base font-semibold text-white"
              style={{ backgroundColor: project.brandColor }}
            >
              <Lock className="h-5 w-5" />
              Pay ${(project.priceCents / 100).toFixed(0)} to Unlock Full Resolution
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
