-- Create job recommendation cache table for 24h caching
CREATE TABLE IF NOT EXISTS job_recommendation_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  cv_hash TEXT NOT NULL,
  recommendations JSONB NOT NULL,
  search_terms JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, cv_hash)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_job_recommendation_cache_user_hash
ON job_recommendation_cache(user_id, cv_hash);

-- Index for cleanup of old entries
CREATE INDEX IF NOT EXISTS idx_job_recommendation_cache_created_at
ON job_recommendation_cache(created_at);

-- RLS policies
ALTER TABLE job_recommendation_cache ENABLE ROW LEVEL SECURITY;

-- Users can only see their own cache entries
CREATE POLICY "Users can view own cache" ON job_recommendation_cache
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can do everything (for API routes using admin client)
CREATE POLICY "Service role full access" ON job_recommendation_cache
  FOR ALL USING (auth.role() = 'service_role');
