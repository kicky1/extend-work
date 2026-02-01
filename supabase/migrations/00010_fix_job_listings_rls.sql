-- Fix: Disable RLS on job_listings since it's a public table
-- RLS was accidentally enabled but with no policies, blocking all operations
ALTER TABLE job_listings DISABLE ROW LEVEL SECURITY;
