import { NextRequest, NextResponse } from "next/server";
import { getPresignedDownloadUrl } from "@/lib/r2/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    // Generate a signed URL for previewing a specific media file
    const url = await getPresignedDownloadUrl(key, 3600);

    return NextResponse.json({ url, expiresIn: 3600 });
  } catch (error) {
    console.error("Preview URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview URL" },
      { status: 500 }
    );
  }
}
