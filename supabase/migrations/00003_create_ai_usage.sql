-- Create ai_usage table for tracking AI request usage
CREATE TABLE IF NOT EXISTS public.ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  request_count INT DEFAULT 0,
  total_input_tokens INT DEFAULT 0,
  total_output_tokens INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, period_start)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_id ON ai_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_usage_period_start ON ai_usage(period_start);
CREATE INDEX IF NOT EXISTS idx_ai_usage_user_period ON ai_usage(user_id, period_start);

-- Enable Row Level Security
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own usage" ON ai_usage;
DROP POLICY IF EXISTS "Users can insert own usage" ON ai_usage;
DROP POLICY IF EXISTS "Users can update own usage" ON ai_usage;

-- RLS Policies
CREATE POLICY "Users can view own usage"
  ON ai_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON ai_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON ai_usage FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role can do anything (for API route updates)
DROP POLICY IF EXISTS "Service role full access" ON ai_usage;
CREATE POLICY "Service role full access"
  ON ai_usage FOR ALL
  USING (auth.role() = 'service_role');
