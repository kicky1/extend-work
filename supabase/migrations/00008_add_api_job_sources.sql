ALTER TYPE job_source ADD VALUE IF NOT EXISTS 'adzuna';
ALTER TYPE job_source ADD VALUE IF NOT EXISTS 'jooble';
ALTER TYPE job_source ADD VALUE IF NOT EXISTS 'jsearch';

-- Add auto_matched flag to distinguish manual bookmarks from batch matches
ALTER TABLE saved_jobs ADD COLUMN IF NOT EXISTS auto_matched BOOLEAN DEFAULT false;

-- Index for fetching auto-matched jobs sorted by score
CREATE INDEX IF NOT EXISTS idx_saved_jobs_auto_matched
  ON saved_jobs(user_id, auto_matched, compatibility_score DESC)
  WHERE auto_matched = true;

-- Cleanup old auto-matches (30 days)
CREATE INDEX IF NOT EXISTS idx_saved_jobs_auto_matched_age
  ON saved_jobs(created_at) WHERE auto_matched = true AND is_bookmarked = false;
