import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/r2/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, contentType, projectId } = body;

    if (!filename || !contentType || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields: filename, contentType, projectId" },
        { status: 400 }
      );
    }

    // Generate unique key for the upload
    const ext = filename.split(".").pop();
    const key = `projects/${projectId}/originals/${uuidv4()}.${ext}`;

    // Generate presigned URL for direct browser upload
    const uploadUrl = await getPresignedUploadUrl(key, contentType, 3600);

    return NextResponse.json({
      uploadUrl,
      key,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Upload URL generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
