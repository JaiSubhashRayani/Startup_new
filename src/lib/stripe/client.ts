import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}

// Lazy proxy so `stripe` can be imported without immediate initialization
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const STRIPE_PLANS = {
  free: {
    name: "Free",
    price: 0,
    storageBytes: 5 * 1024 * 1024 * 1024, // 5GB
    transactionFeePercent: 3,
    maxProjects: 3,
    customDomain: false,
    teamSeats: 0,
  },
  pro: {
    name: "Pro",
    price: 2900, // $29/month in cents
    storageBytes: 250 * 1024 * 1024 * 1024, // 250GB
    transactionFeePercent: 0,
    maxProjects: Infinity,
    customDomain: true,
    teamSeats: 1,
  },
  studio: {
    name: "Studio",
    price: 7900, // $79/month in cents
    storageBytes: 2 * 1024 * 1024 * 1024 * 1024, // 2TB
    transactionFeePercent: 0,
    maxProjects: Infinity,
    customDomain: true,
    teamSeats: 5,
  },
} as const;
