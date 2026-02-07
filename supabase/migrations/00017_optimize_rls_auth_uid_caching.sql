-- Optimize all RLS policies to use (SELECT auth.uid()) subselect pattern.
-- This forces Postgres to evaluate auth.uid() once per query instead of per-row.

-- ============================================================
-- cvs
-- ============================================================
DROP POLICY IF EXISTS "Users can view own CVs" ON cvs;
CREATE POLICY "Users can view own CVs" ON cvs FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own CVs" ON cvs;
CREATE POLICY "Users can insert own CVs" ON cvs FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own CVs" ON cvs;
CREATE POLICY "Users can update own CVs" ON cvs FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own CVs" ON cvs;
CREATE POLICY "Users can delete own CVs" ON cvs FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- user_profiles
-- ============================================================
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT
  USING ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE
  USING ((SELECT auth.uid()) = id);

-- ============================================================
-- ai_usage
-- ============================================================
DROP POLICY IF EXISTS "Users can view own usage" ON ai_usage;
CREATE POLICY "Users can view own usage" ON ai_usage FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own usage" ON ai_usage;
CREATE POLICY "Users can insert own usage" ON ai_usage FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own usage" ON ai_usage;
CREATE POLICY "Users can update own usage" ON ai_usage FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- job_preferences
-- ============================================================
DROP POLICY IF EXISTS "Users can view own preferences" ON job_preferences;
CREATE POLICY "Users can view own preferences" ON job_preferences FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own preferences" ON job_preferences;
CREATE POLICY "Users can insert own preferences" ON job_preferences FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON job_preferences;
CREATE POLICY "Users can update own preferences" ON job_preferences FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own preferences" ON job_preferences;
CREATE POLICY "Users can delete own preferences" ON job_preferences FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- saved_jobs
-- ============================================================
DROP POLICY IF EXISTS "Users can view own saved jobs" ON saved_jobs;
CREATE POLICY "Users can view own saved jobs" ON saved_jobs FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own saved jobs" ON saved_jobs;
CREATE POLICY "Users can insert own saved jobs" ON saved_jobs FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own saved jobs" ON saved_jobs;
CREATE POLICY "Users can update own saved jobs" ON saved_jobs FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own saved jobs" ON saved_jobs;
CREATE POLICY "Users can delete own saved jobs" ON saved_jobs FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- job_applications
-- ============================================================
DROP POLICY IF EXISTS "Users can view own applications" ON job_applications;
CREATE POLICY "Users can view own applications" ON job_applications FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own applications" ON job_applications;
CREATE POLICY "Users can insert own applications" ON job_applications FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own applications" ON job_applications;
CREATE POLICY "Users can update own applications" ON job_applications FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own applications" ON job_applications;
CREATE POLICY "Users can delete own applications" ON job_applications FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- user_email_accounts
-- ============================================================
DROP POLICY IF EXISTS "Users can view own email accounts" ON user_email_accounts;
CREATE POLICY "Users can view own email accounts" ON user_email_accounts FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own email accounts" ON user_email_accounts;
CREATE POLICY "Users can insert own email accounts" ON user_email_accounts FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own email accounts" ON user_email_accounts;
CREATE POLICY "Users can update own email accounts" ON user_email_accounts FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own email accounts" ON user_email_accounts;
CREATE POLICY "Users can delete own email accounts" ON user_email_accounts FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- job_recommendation_cache
-- ============================================================
DROP POLICY IF EXISTS "Users can view own cache" ON job_recommendation_cache;
CREATE POLICY "Users can view own cache" ON job_recommendation_cache FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

-- ============================================================
-- recruitment_processes
-- ============================================================
DROP POLICY IF EXISTS "Users can view own recruitment processes" ON recruitment_processes;
CREATE POLICY "Users can view own recruitment processes" ON recruitment_processes FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own recruitment processes" ON recruitment_processes;
CREATE POLICY "Users can insert own recruitment processes" ON recruitment_processes FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own recruitment processes" ON recruitment_processes;
CREATE POLICY "Users can update own recruitment processes" ON recruitment_processes FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own recruitment processes" ON recruitment_processes;
CREATE POLICY "Users can delete own recruitment processes" ON recruitment_processes FOR DELETE
  USING ((SELECT auth.uid()) = user_id);
