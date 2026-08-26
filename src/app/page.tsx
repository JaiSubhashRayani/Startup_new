import Link from "next/link";
import {
  Zap,
  Shield,
  CreditCard,
  Upload,
  Eye,
  Download,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Once",
    description: "Drop your 4K masters, RAW stills, or source files. We handle transcoding and watermarking automatically.",
  },
  {
    icon: Eye,
    title: "Branded Preview",
    description: "Clients see a sleek, watermarked preview with your branding. No account needed — just a link.",
  },
  {
    icon: CreditCard,
    title: "One-Tap Pay",
    description: "Apple Pay, Google Pay, or card. Stripe-powered checkout in seconds, not 60 days.",
  },
  {
    icon: Download,
    title: "Instant Unlock",
    description: "Payment confirmed → full-resolution files delivered instantly via signed download links.",
  },
];

const pricing = [
  {
    tier: "Free",
    price: "$0",
    period: "",
    description: "Perfect for trying things out",
    features: ["3 active projects", "5GB storage", "3% transaction fee", "Basic watermarking"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    tier: "Pro",
    price: "$29",
    period: "/mo",
    description: "For working professionals",
    features: [
      "Unlimited projects",
      "250GB storage",
      "0% platform fee",
      "Custom domains",
      "Custom branding",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    tier: "Studio",
    price: "$79",
    period: "/mo",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "2TB storage",
      "Milestone unlocks",
      "Team seats",
      "Priority support",
    ],
    cta: "Go Studio",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LockFrame</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Shield className="h-4 w-4 text-primary" />
            Pay-to-Unlock Media Delivery
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance max-w-3xl mx-auto">
            Deliver premium work.
            <br />
            <span className="text-primary">Get paid instantly.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Stop chasing invoices. Upload your masters, share a branded preview link,
            and let clients unlock full-resolution files the moment they pay.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Start for Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="inline-flex h-12 items-center rounded-lg border border-border px-6 text-base font-medium text-foreground hover:bg-muted transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-3xl font-bold text-center">How it works</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Four steps from upload to paid. Zero friction for you or your clients.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div key={i} className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-3xl font-bold text-center">Simple pricing</h2>
          <p className="mt-3 text-center text-muted-foreground">
            Start free, upgrade when you&apos;re ready. No hidden fees.
          </p>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.tier}
                className={`relative rounded-xl border p-8 ${
                  plan.highlighted
                    ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                    : "border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.tier}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-8 flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-semibold">LockFrame</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LockFrame. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
