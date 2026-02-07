-- Add Google Calendar event ID to interviews
ALTER TABLE interviews
  ADD COLUMN IF NOT EXISTS google_calendar_event_id TEXT;

-- Create user_calendar_accounts table
CREATE TABLE IF NOT EXISTS user_calendar_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'google',
  email TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, email)
);

-- RLS
ALTER TABLE user_calendar_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calendar accounts"
  ON user_calendar_accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calendar accounts"
  ON user_calendar_accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calendar accounts"
  ON user_calendar_accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calendar accounts"
  ON user_calendar_accounts FOR DELETE
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER update_user_calendar_accounts_updated_at
  BEFORE UPDATE ON user_calendar_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index
CREATE INDEX IF NOT EXISTS idx_user_calendar_accounts_user_id ON user_calendar_accounts(user_id);
