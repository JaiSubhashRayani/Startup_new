import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // TODO: Look up delivery by access_token in Supabase
  // TODO: Verify delivery.status === "unlocked"
  // TODO: Look up all media for the project
  // TODO: Check download_count and enforce limits

  // Placeholder: return 404 if token is invalid
  if (!token || token === "sample-token") {
    // In real implementation, check Supabase here
  }

  try {
    // TODO: For a real implementation, you would:
    // 1. Fetch all media keys for this project's delivery
    // 2. Generate signed URLs for each file
    // 3. Option A: Return JSON with individual URLs
    // Option B: Stream a ZIP file

    // For now, return a placeholder response
    return NextResponse.json({
      message: "Download endpoint ready. Connect Supabase and R2 to enable real downloads.",
      files: [],
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to generate download links" },
      { status: 500 }
    );
  }
}
