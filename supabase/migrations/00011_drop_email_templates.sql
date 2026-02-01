-- Drop unused email_templates table
-- This table was created in 00006_create_jobs_tables.sql but never used in the codebase
DROP TABLE IF EXISTS public.email_templates CASCADE;
