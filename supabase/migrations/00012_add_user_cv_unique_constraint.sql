-- Delete duplicate CVs keeping newest per user
DELETE FROM cvs a USING cvs b
WHERE a.user_id = b.user_id AND a.updated_at < b.updated_at;

-- Add unique constraint on user_id (one CV per user)
ALTER TABLE cvs ADD CONSTRAINT cvs_user_id_unique UNIQUE (user_id);
