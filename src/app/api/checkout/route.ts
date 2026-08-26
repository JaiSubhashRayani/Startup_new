import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, projectName, creatorName, amountCents } = body;

    if (!token || !amountCents) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Look up delivery and project from Supabase using token
    // For now, use the provided data
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: projectName || "Media Delivery",
              description: `Full resolution files from ${creatorName || "Creator"}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/d/${token}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/d/${token}`,
      metadata: {
        access_token: token,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    // TODO: Update delivery record with stripe_session_id in Supabase

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
