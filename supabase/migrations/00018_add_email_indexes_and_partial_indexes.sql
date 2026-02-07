-- Add missing indexes for email_threads and email_messages tables,
-- add partial indexes for saved_jobs, and drop unused GIN indexes.

-- ============================================================
-- email_threads indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_email_threads_account_provider
  ON email_threads(email_account_id, provider_thread_id);

CREATE INDEX IF NOT EXISTS idx_email_threads_user_id
  ON email_threads(user_id);

CREATE INDEX IF NOT EXISTS idx_email_threads_last_message
  ON email_threads(user_id, last_message_at DESC);

-- ============================================================
-- email_messages indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_email_messages_thread_provider
  ON email_messages(thread_id, provider_message_id);

CREATE INDEX IF NOT EXISTS idx_email_messages_thread_id
  ON email_messages(thread_id);

-- ============================================================
-- saved_jobs: replace generic index with partial indexes
-- ============================================================
-- Drop existing non-partial index if it exists
DROP INDEX IF EXISTS idx_saved_jobs_bookmarked;

-- Partial index for bookmarked jobs (most queries filter is_bookmarked = true)
CREATE INDEX IF NOT EXISTS idx_saved_jobs_bookmarked_active
  ON saved_jobs(user_id, created_at DESC)
  WHERE is_bookmarked = true;

-- idx_saved_jobs_auto_matched already has a WHERE clause, but lacks ordering for
-- the common query pattern. It's fine as-is since it includes compatibility_score DESC.

-- ============================================================
-- Drop unused GIN full-text search indexes on job_listings.
-- The code uses .ilike() not to_tsvector/to_tsquery, so these indexes
-- add write overhead with zero read benefit.
-- ============================================================
DROP INDEX IF EXISTS idx_job_listings_title_search;
DROP INDEX IF EXISTS idx_job_listings_company_search;

-- Add trigram indexes instead (support ILIKE queries).
-- Requires pg_trgm extension.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_job_listings_title_trgm
  ON job_listings USING gin(title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_job_listings_company_trgm
  ON job_listings USING gin(company gin_trgm_ops);
