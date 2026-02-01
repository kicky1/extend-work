-- =============================================
-- Cleanup: Remove unused scraper-related tables
-- =============================================

-- Drop unused tables
DROP TABLE IF EXISTS public.job_search_cache;
DROP TABLE IF EXISTS public.scraper_runs;
DROP TABLE IF EXISTS public.search_rate_limits;

-- Drop unused functions
DROP FUNCTION IF EXISTS increment_search_rate_limit(UUID);
DROP FUNCTION IF EXISTS clean_expired_job_cache();
