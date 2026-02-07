-- Fix cover_letters RLS policies to use (SELECT auth.uid()) subselect pattern
-- (consistent with migration 00017 optimization applied to all other tables).
-- Also adds WITH CHECK on UPDATE policy for UPSERT compatibility,
-- and drops the redundant non-unique index (UNIQUE constraint already covers it).

-- Drop redundant index (the UNIQUE constraint on user_id already creates one)
DROP INDEX IF EXISTS idx_cover_letters_user_id;

-- Recreate RLS policies with (SELECT auth.uid()) pattern
DROP POLICY IF EXISTS "Users can view own cover letters" ON cover_letters;
CREATE POLICY "Users can view own cover letters" ON cover_letters FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own cover letters" ON cover_letters;
CREATE POLICY "Users can insert own cover letters" ON cover_letters FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own cover letters" ON cover_letters;
CREATE POLICY "Users can update own cover letters" ON cover_letters FOR UPDATE
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own cover letters" ON cover_letters;
CREATE POLICY "Users can delete own cover letters" ON cover_letters FOR DELETE
  USING ((SELECT auth.uid()) = user_id);
