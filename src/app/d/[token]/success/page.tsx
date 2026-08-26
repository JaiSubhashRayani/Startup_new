"use client";

import { use } from "react";
import { Check, Download, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-400" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="mt-3 text-white/60">
            Your files have been unlocked. You can now download the full-resolution masters.
          </p>
        </div>

        <Button
          onClick={handleDownload}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white h-12 px-8"
        >
          <Download className="h-5 w-5" />
          Download All Files
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-xs text-white/40">
          Download links are valid for 24 hours. An email with your invoice and download link has also been sent.
        </p>

        <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
          <Zap className="h-4 w-4" />
          Powered by LockFrame
        </div>
      </div>
    </div>
  );
}
