-- Fix encryption_key_id column type
-- The column was incorrectly created as UUID but stores hex-encoded encryption keys (64 char strings)

ALTER TABLE user_profiles
ALTER COLUMN encryption_key_id TYPE TEXT;
