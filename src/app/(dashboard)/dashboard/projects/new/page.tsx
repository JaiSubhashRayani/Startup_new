"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Film, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface UploadFile {
  id: string;
  file: File;
  type: "video" | "photo";
  preview: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brandColor, setBrandColor] = useState("#7c3aed");
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [saving, setSaving] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const newFiles: UploadFile[] = selected.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      type: file.type.startsWith("video/") ? "video" : "photo",
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const f = prev.find((f) => f.id === id);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Upload files to R2, create project in Supabase
    setTimeout(() => {
      setSaving(false);
      router.push("/dashboard/projects");
    }, 2000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">New Project</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload media, set a price, and generate a delivery link for your client.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Project Details</h2>
          <Input
            label="Project Title"
            placeholder="Wedding Video — Smith & Johnson"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Description (optional)"
            placeholder="Deliverables include 4K master edit, color-graded stills..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Price"
                type="number"
                min="0"
                step="0.01"
                placeholder="1200.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground">Brand Color</label>
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="h-10 w-10 rounded-lg border border-border cursor-pointer"
                />
                <Input
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Media Files</h2>
          <p className="text-sm text-muted-foreground">
            Upload your master files (4K video, high-res photos). We&apos;ll automatically
            create watermarked previews.
          </p>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">
              MP4, MOV, ProRes, JPG, PNG, RAW — up to 10GB per file
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="video/*,image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  {f.type === "video" ? (
                    <Film className="h-5 w-5 text-blue-500 shrink-0" />
                  ) : (
                    <Image className="h-5 w-5 text-green-500 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(f.file.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
