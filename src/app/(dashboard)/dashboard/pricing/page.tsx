"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    tier: "Free",
    price: "$0",
    period: "",
    description: "Perfect for trying things out",
    features: [
      "3 active projects",
      "5GB storage",
      "3% transaction fee",
      "Basic watermarking",
    ],
    highlighted: false,
    currentPlan: true,
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
    highlighted: true,
    currentPlan: false,
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
    highlighted: false,
    currentPlan: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Pricing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the plan that fits your workflow
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
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
            {plan.currentPlan && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                Current Plan
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
            <Button
              variant={plan.highlighted ? "primary" : "outline"}
              className="w-full mt-8"
              disabled={plan.currentPlan}
            >
              {plan.currentPlan ? "Current Plan" : `Upgrade to ${plan.tier}`}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
