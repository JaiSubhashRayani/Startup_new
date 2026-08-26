import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LockFrame — Sign In",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LockFrame</span>
          </Link>
          {children}
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
