-- Create table for Stripe webhook idempotency
CREATE TABLE processed_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by Stripe event ID
CREATE INDEX idx_webhook_events_stripe_id ON processed_webhook_events(stripe_event_id);

-- Optional: auto-cleanup old events (older than 30 days)
-- This prevents the table from growing indefinitely
CREATE INDEX idx_webhook_events_created_at ON processed_webhook_events(created_at);
