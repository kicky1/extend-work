-- Add source_metadata JSONB column to store extra API-specific data
ALTER TABLE job_listings ADD COLUMN IF NOT EXISTS source_metadata JSONB DEFAULT '{}';
