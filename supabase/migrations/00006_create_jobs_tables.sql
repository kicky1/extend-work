-- =============================================
-- Job Search Module Database Schema
-- =============================================

-- Job source enum (for tracking where jobs came from)
CREATE TYPE job_source AS ENUM (
  'justjoin',
  'nofluffjobs',
  'pracuj',
  'praca',
  'olx',
  'indeed',
  'manual'
);

-- Application status enum
CREATE TYPE application_status AS ENUM (
  'saved',
  'applied',
  'interviewing',
  'offer',
  'rejected',
  'withdrawn'
);

-- Remote preference enum
CREATE TYPE remote_preference AS ENUM (
  'remote',
  'hybrid',
  'onsite',
  'any'
);

-- =============================================
-- Job Listings Table (aggregated from all sources)
-- =============================================
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Core job data
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  remote_type remote_preference DEFAULT 'any',
  description TEXT,
  requirements TEXT,

  -- Salary info
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'PLN',
  salary_type TEXT DEFAULT 'monthly', -- monthly, yearly, hourly

  -- Source tracking
  source job_source NOT NULL,
  source_id TEXT, -- Original ID from source
  source_url TEXT NOT NULL,

  -- Deduplication
  dedup_hash TEXT NOT NULL,

  -- Metadata
  company_logo_url TEXT,
  skills TEXT[], -- Required skills as array
  experience_level TEXT, -- junior, mid, senior
  employment_type TEXT, -- full-time, part-time, contract, b2b

  -- Timestamps
  posted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_dedup_hash UNIQUE (dedup_hash)
);

-- Indexes for job listings
CREATE INDEX IF NOT EXISTS idx_job_listings_source ON job_listings(source);
CREATE INDEX IF NOT EXISTS idx_job_listings_location ON job_listings(location);
CREATE INDEX IF NOT EXISTS idx_job_listings_remote_type ON job_listings(remote_type);
CREATE INDEX IF NOT EXISTS idx_job_listings_posted_at ON job_listings(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_listings_title_search ON job_listings USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_job_listings_company_search ON job_listings USING gin(to_tsvector('english', company));
CREATE INDEX IF NOT EXISTS idx_job_listings_skills ON job_listings USING gin(skills);

-- =============================================
-- Job Search Cache (for caching search results)
-- =============================================
CREATE TABLE IF NOT EXISTS public.job_search_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query_hash TEXT NOT NULL UNIQUE,
  query_params JSONB NOT NULL,
  result_ids UUID[] NOT NULL,
  result_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
);

CREATE INDEX IF NOT EXISTS idx_job_search_cache_query_hash ON job_search_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_job_search_cache_expires ON job_search_cache(expires_at);

-- =============================================
-- Scraper Runs (monitoring scraper health)
-- =============================================
CREATE TABLE IF NOT EXISTS public.scraper_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source job_source NOT NULL,
  status TEXT NOT NULL DEFAULT 'running', -- running, completed, failed
  jobs_found INTEGER DEFAULT 0,
  jobs_inserted INTEGER DEFAULT 0,
  jobs_updated INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER
);

CREATE INDEX IF NOT EXISTS idx_scraper_runs_source ON scraper_runs(source);
CREATE INDEX IF NOT EXISTS idx_scraper_runs_status ON scraper_runs(status);
CREATE INDEX IF NOT EXISTS idx_scraper_runs_started_at ON scraper_runs(started_at DESC);

-- =============================================
-- Job Preferences (user's target job criteria)
-- =============================================
CREATE TABLE IF NOT EXISTS public.job_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Search preferences
  target_roles TEXT[] DEFAULT '{}',
  target_locations TEXT[] DEFAULT '{}',
  remote_preference remote_preference DEFAULT 'any',

  -- Salary expectations
  min_salary INTEGER,
  max_salary INTEGER,
  salary_currency TEXT DEFAULT 'PLN',

  -- Skills
  required_skills TEXT[] DEFAULT '{}',
  preferred_skills TEXT[] DEFAULT '{}',

  -- Experience level
  experience_level TEXT, -- junior, mid, senior
  employment_types TEXT[] DEFAULT '{}', -- full-time, b2b, contract

  -- Notifications
  email_alerts BOOLEAN DEFAULT false,
  alert_frequency TEXT DEFAULT 'daily', -- instant, daily, weekly

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_user_preferences UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE job_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own preferences"
  ON job_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON job_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON job_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON job_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Saved Jobs (bookmarked jobs + compatibility scores)
-- =============================================
CREATE TABLE IF NOT EXISTS public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_listing_id UUID NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,

  -- Status
  is_bookmarked BOOLEAN DEFAULT true,

  -- AI Analysis (Pro feature)
  compatibility_score INTEGER, -- 0-100
  matching_skills TEXT[] DEFAULT '{}',
  missing_skills TEXT[] DEFAULT '{}',
  ai_analysis JSONB, -- Full AI analysis

  -- Notes
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_user_job UNIQUE (user_id, job_listing_id)
);

-- Enable RLS
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own saved jobs"
  ON saved_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved jobs"
  ON saved_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved jobs"
  ON saved_jobs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved jobs"
  ON saved_jobs FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user_id ON saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_job_listing_id ON saved_jobs(job_listing_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_bookmarked ON saved_jobs(user_id, is_bookmarked);

-- =============================================
-- Job Applications (tracking applied jobs)
-- =============================================
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_listing_id UUID REFERENCES job_listings(id) ON DELETE SET NULL,
  cv_id UUID REFERENCES cvs(id) ON DELETE SET NULL,

  -- Application details
  status application_status DEFAULT 'applied',
  cover_letter TEXT,

  -- Contact info (copied from job at time of application)
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_url TEXT,
  contact_email TEXT,

  -- Email sending
  email_sent BOOLEAN DEFAULT false,
  email_sent_at TIMESTAMPTZ,
  email_account_id UUID, -- Reference to user_email_accounts

  -- Follow-up tracking
  next_follow_up_at TIMESTAMPTZ,
  follow_up_count INTEGER DEFAULT 0,

  -- Notes and timeline
  notes TEXT,
  timeline JSONB DEFAULT '[]', -- Array of {date, action, notes}

  -- Timestamps
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own applications"
  ON job_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON job_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON job_applications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications"
  ON job_applications FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(user_id, status);
CREATE INDEX IF NOT EXISTS idx_job_applications_applied_at ON job_applications(applied_at DESC);

-- =============================================
-- Email Templates (reusable email templates)
-- =============================================
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,

  -- Template variables available: {{company}}, {{position}}, {{name}}, etc.

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own templates"
  ON email_templates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own templates"
  ON email_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON email_templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
  ON email_templates FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- User Email Accounts (OAuth tokens for sending)
-- =============================================
CREATE TABLE IF NOT EXISTS public.user_email_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  provider TEXT NOT NULL CHECK (provider IN ('gmail', 'outlook')),
  email TEXT NOT NULL,

  -- OAuth tokens (encrypted via Supabase Vault in production)
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,

  -- Status
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT unique_user_email_provider UNIQUE (user_id, email)
);

-- Enable RLS
ALTER TABLE user_email_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own email accounts"
  ON user_email_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own email accounts"
  ON user_email_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own email accounts"
  ON user_email_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own email accounts"
  ON user_email_accounts FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Rate Limiting Table (for search rate limits)
-- =============================================
CREATE TABLE IF NOT EXISTS public.search_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hour_start TIMESTAMPTZ NOT NULL,
  search_count INTEGER DEFAULT 0,

  CONSTRAINT unique_user_hour UNIQUE (user_id, hour_start)
);

-- Enable RLS
ALTER TABLE search_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rate limits"
  ON search_rate_limits FOR SELECT
  USING (auth.uid() = user_id);

-- Service role for API updates
CREATE POLICY "Service role rate limit access"
  ON search_rate_limits FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================
-- Triggers for updated_at
-- =============================================
CREATE TRIGGER update_job_listings_updated_at
  BEFORE UPDATE ON job_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_preferences_updated_at
  BEFORE UPDATE ON job_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_jobs_updated_at
  BEFORE UPDATE ON saved_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_email_accounts_updated_at
  BEFORE UPDATE ON user_email_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Function to increment search rate limit
-- =============================================
CREATE OR REPLACE FUNCTION increment_search_rate_limit(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_hour_start TIMESTAMPTZ;
  v_count INTEGER;
BEGIN
  v_hour_start := date_trunc('hour', NOW());

  INSERT INTO search_rate_limits (user_id, hour_start, search_count)
  VALUES (p_user_id, v_hour_start, 1)
  ON CONFLICT (user_id, hour_start)
  DO UPDATE SET search_count = search_rate_limits.search_count + 1
  RETURNING search_count INTO v_count;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Function to clean expired cache
-- =============================================
CREATE OR REPLACE FUNCTION clean_expired_job_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM job_search_cache WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
