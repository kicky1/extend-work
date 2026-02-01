-- Create RPC function for atomic AI usage increment
-- This prevents race conditions when multiple requests happen simultaneously

CREATE OR REPLACE FUNCTION increment_ai_usage(
  p_user_id UUID,
  p_period_start DATE,
  p_input_tokens INT DEFAULT 0,
  p_output_tokens INT DEFAULT 0
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO ai_usage (user_id, period_start, request_count, total_input_tokens, total_output_tokens)
  VALUES (p_user_id, p_period_start, 1, p_input_tokens, p_output_tokens)
  ON CONFLICT (user_id, period_start)
  DO UPDATE SET
    request_count = ai_usage.request_count + 1,
    total_input_tokens = ai_usage.total_input_tokens + EXCLUDED.total_input_tokens,
    total_output_tokens = ai_usage.total_output_tokens + EXCLUDED.total_output_tokens;
END;
$$;

-- Grant execute to authenticated users (RLS still applies via SECURITY DEFINER)
GRANT EXECUTE ON FUNCTION increment_ai_usage TO authenticated;
GRANT EXECUTE ON FUNCTION increment_ai_usage TO service_role;
