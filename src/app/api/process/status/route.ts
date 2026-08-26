import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mediaId = searchParams.get("mediaId");

  if (!mediaId) {
    return NextResponse.json({ error: "Missing mediaId" }, { status: 400 });
  }

  // TODO: Look up media processing_status from Supabase
  return NextResponse.json({
    mediaId,
    status: "completed",
    previewKey: null,
  });
}
