-- Create cover_letters table
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
  title VARCHAR(255) DEFAULT 'My Cover Letter',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on user_id (also serves as unique constraint)
CREATE INDEX IF NOT EXISTS idx_cover_letters_user_id ON cover_letters(user_id);

-- Enable Row Level Security
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;

-- RLS Policies (same pattern as cvs table)
CREATE POLICY "Users can view own cover letters"
  ON cover_letters FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cover letters"
  ON cover_letters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cover letters"
  ON cover_letters FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cover letters"
  ON cover_letters FOR DELETE
  USING (auth.uid() = user_id);

-- Reuse existing trigger function for updated_at
DROP TRIGGER IF EXISTS update_cover_letters_updated_at ON cover_letters;
CREATE TRIGGER update_cover_letters_updated_at
  BEFORE UPDATE ON cover_letters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
