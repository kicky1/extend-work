-- Add retention policy for processed_webhook_events (delete events older than 90 days).
-- This should be run as a scheduled cron job via pg_cron or Supabase Edge Functions.
CREATE OR REPLACE FUNCTION cleanup_old_webhook_events()
RETURNS void AS $$
BEGIN
  DELETE FROM processed_webhook_events
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule cleanup daily at 3 AM UTC (requires pg_cron extension)
-- Uncomment if pg_cron is enabled:
-- SELECT cron.schedule('cleanup-webhook-events', '0 3 * * *', 'SELECT cleanup_old_webhook_events()');

-- Ensure anon role can only SELECT from job_listings (no write access).
-- job_listings has RLS disabled, so grants are the only protection.
REVOKE INSERT, UPDATE, DELETE ON job_listings FROM anon;
GRANT SELECT ON job_listings TO anon;

-- Ensure authenticated role also only has SELECT (writes go through service_role)
REVOKE INSERT, UPDATE, DELETE ON job_listings FROM authenticated;
GRANT SELECT ON job_listings TO authenticated;
