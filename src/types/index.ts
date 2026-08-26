export type ProjectStatus = "draft" | "processing" | "ready" | "delivered" | "paid";
export type MediaType = "video" | "photo";
export type DeliveryStatus = "pending" | "processing" | "unlocked" | "expired";
export type PricingTier = "free" | "pro" | "studio";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  pricing_tier: PricingTier;
  stripe_customer_id: string | null;
  stripe_connect_account_id: string | null;
  brand_color: string;
  brand_logo_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  price_cents: number;
  status: ProjectStatus;
  brand_color: string;
  brand_logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  project_id: string;
  type: MediaType;
  original_key: string;
  preview_key: string | null;
  filename: string;
  file_size: number;
  processing_status: "pending" | "processing" | "completed" | "failed";
  watermark_text: string | null;
  created_at: string;
}

export interface Delivery {
  id: string;
  project_id: string;
  client_email: string;
  client_name: string;
  access_token: string;
  status: DeliveryStatus;
  stripe_session_id: string | null;
  paid_at: string | null;
  download_count: number;
  created_at: string;
}

export interface ProjectWithMedia extends Project {
  media: Media[];
  deliveries: Delivery[];
}

export interface DeliveryWithProject extends Delivery {
  project: Project & {
    media: Media[];
    creator: Pick<User, "full_name" | "brand_color" | "brand_logo_url">;
  };
}
