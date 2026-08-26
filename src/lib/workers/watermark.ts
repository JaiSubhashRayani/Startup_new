/**
 * FFmpeg Video Watermarking Worker
 *
 * This module handles video transcoding and watermarking using FFmpeg.
 * In production, this would run as a background job (e.g., via BullMQ, AWS Lambda, or Modal).
 *
 * Required: FFmpeg installed on the system (brew install ffmpeg on macOS)
 */

export interface WatermarkOptions {
  inputKey: string;
  outputKey: string;
  watermarkText: string;
  brandColor?: string;
  quality?: "preview" | "full";
}

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  codec: string;
}

/**
 * Generate FFmpeg command for video watermarking
 * Creates an HLS stream with burned-in diagonal watermark text
 */
export function buildWatermarkCommand(options: WatermarkOptions): string[] {
  const {
    inputKey,
    outputKey,
    watermarkText,
    brandColor = "#ffffff",
    quality = "preview",
  } = options;

  const watermarkOpacity = 0.15;
  const fontSize = quality === "preview" ? 24 : 48;
  const videoBitrate = quality === "preview" ? "1000k" : "5000k";
  const maxWidth = quality === "preview" ? 1920 : 3840;
  const maxHeight = quality === "preview" ? 1080 : 2160;

  // Convert hex color to FFmpeg drawtext format
  const hexColor = brandColor.replace("#", "0x");

  // Build the watermark text with moving position
  // Using scrolltext filter for diagonal watermark effect
  const drawtextFilter = [
    `drawtext=text='${watermarkText.replace(/'/g, "\\'")}'`,
    `fontsize=${fontSize}`,
    `fontcolor=${hexColor}@${watermarkOpacity}`,
    `x='mod(t*80+100, w+200)-200'`,
    `y='mod(t*40+50, h+200)-200'`,
    `angle=-30*PI/180`,
  ].join(":");

  const ffmpegArgs = [
    "-y",
    "-i", inputKey,
    "-vf",
    [
      `scale='min(${maxWidth},iw)':min'(${maxHeight},ih)':force_original_aspect_ratio=decrease`,
      drawtextFilter,
    ].join(","),
    "-c:v", "libx264",
    "-preset", quality === "preview" ? "fast" : "slow",
    "-b:v", videoBitrate,
    "-c:a", "aac",
    "-b:a", "128k",
    "-movflags", "+faststart",
    "-f", "mp4",
    outputKey,
  ];

  return ffmpegArgs;
}

/**
 * Generate FFmpeg command for HLS preview stream
 */
export function buildHLSCommand(options: WatermarkOptions): string[] {
  const {
    inputKey,
    outputKey,
    watermarkText,
    brandColor = "#ffffff",
  } = options;

  const hexColor = brandColor.replace("#", "0x");
  const drawtextFilter = [
    `drawtext=text='${watermarkText.replace(/'/g, "\\'")}'`,
    `fontsize=24`,
    `fontcolor=${hexColor}@0.15`,
    `x='mod(t*80+100, w+200)-200'`,
    `y='mod(t*40+50, h+200)-200'`,
    `angle=-30*PI/180`,
  ].join(":");

  return [
    "-y",
    "-i", inputKey,
    "-vf", drawtextFilter,
    "-c:v", "libx264",
    "-preset", "fast",
    "-b:v:0", "1000k",
    "-b:v:1", "2000k",
    "-b:v:2", "4000k",
    "-c:a", "aac",
    "-b:a", "128k",
    "-f", "hls",
    "-hls_time", "6",
    "-hls_playlist_type", "vod",
    "-hls_segment_filename", `${outputKey}/seg_%03d.ts`,
    `${outputKey}/master.m3u8`,
  ];
}

/**
 * Photo watermarking - generates WebP thumbnail with overlaid text
 */
export function buildPhotoWatermarkCommand(options: WatermarkOptions): string[] {
  const {
    inputKey,
    outputKey,
    watermarkText,
    brandColor = "#ffffff",
    quality = "preview",
  } = options;

  const hexColor = brandColor.replace("#", "0x");
  const maxDim = quality === "preview" ? 1920 : 3840;
  const compression = quality === "preview" ? 80 : 95;

  const drawtextFilter = [
    `drawtext=text='${watermarkText.replace(/'/g, "\\'")}'`,
    `fontsize=36`,
    `fontcolor=${hexColor}@0.2`,
    `x='w-tw-20'`,
    `y='h-th-20'`,
  ].join(":");

  return [
    "-y",
    "-i", inputKey,
    "-vf",
    [
      `scale='min(${maxDim},iw)':'min(${maxDim},ih)':force_original_aspect_ratio=decrease`,
      drawtextFilter,
    ].join(","),
    "-quality", String(compression),
    "-f", "webp",
    outputKey,
  ];
}
