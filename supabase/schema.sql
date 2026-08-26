-- Supabase Schema for Pay-to-Unlock Media Delivery SaaS

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  pricing_tier TEXT NOT NULL DEFAULT 'free' CHECK (pricing_tier IN ('free', 'pro', 'studio')),
  stripe_customer_id TEXT UNIQUE,
  stripe_connect_account_id TEXT UNIQUE,
  brand_color TEXT NOT NULL DEFAULT '#7c3aed',
  brand_logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'processing', 'ready', 'delivered', 'paid')),
  brand_color TEXT NOT NULL DEFAULT '#7c3aed',
  brand_logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Media table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('video', 'photo')),
  original_key TEXT NOT NULL,
  preview_key TEXT,
  filename TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  processing_status TEXT NOT NULL DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  watermark_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Deliveries table
CREATE TABLE public.deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  client_email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  access_token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'unlocked', 'expired')),
  stripe_session_id TEXT,
  paid_at TIMESTAMPTZ,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_creator_id ON public.projects(creator_id);
CREATE INDEX idx_media_project_id ON public.media(project_id);
CREATE INDEX idx_deliveries_project_id ON public.deliveries(project_id);
CREATE INDEX idx_deliveries_access_token ON public.deliveries(access_token);
CREATE INDEX idx_deliveries_stripe_session_id ON public.deliveries(stripe_session_id);

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Creators can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can insert own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = creator_id);

-- Media policies
CREATE POLICY "Creators can view media for own projects"
  ON public.media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = media.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Creators can insert media for own projects"
  ON public.media FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = media.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Creators can update media for own projects"
  ON public.media FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = media.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Creators can delete media for own projects"
  ON public.media FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = media.project_id
      AND projects.creator_id = auth.uid()
    )
  );

-- Deliveries policies
CREATE POLICY "Creators can view deliveries for own projects"
  ON public.deliveries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = deliveries.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Creators can insert deliveries for own projects"
  ON public.deliveries FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = deliveries.project_id
      AND projects.creator_id = auth.uid()
    )
  );

CREATE POLICY "Creators can update deliveries for own projects"
  ON public.deliveries FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = deliveries.project_id
      AND projects.creator_id = auth.uid()
    )
  );

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
