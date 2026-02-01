-- Migration: Add profile fields for user settings
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Add columns to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policies for avatars bucket
-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Public avatar read" ON storage.objects;
DROP POLICY IF EXISTS "User avatar upload" ON storage.objects;
DROP POLICY IF EXISTS "User avatar update" ON storage.objects;
DROP POLICY IF EXISTS "User avatar delete" ON storage.objects;

-- Public read access
CREATE POLICY "Public avatar read" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

-- Authenticated users can upload to their own folder
CREATE POLICY "User avatar upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own avatars
CREATE POLICY "User avatar update" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own avatars
CREATE POLICY "User avatar delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
