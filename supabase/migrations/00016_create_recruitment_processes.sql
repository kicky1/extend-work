-- Create recruitment_processes table
CREATE TABLE IF NOT EXISTS recruitment_processes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'offer_received', 'accepted', 'rejected', 'withdrawn')),
  stages JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  job_application_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE recruitment_processes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own recruitment processes"
  ON recruitment_processes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recruitment processes"
  ON recruitment_processes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recruitment processes"
  ON recruitment_processes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recruitment processes"
  ON recruitment_processes FOR DELETE
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER update_recruitment_processes_updated_at
  BEFORE UPDATE ON recruitment_processes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add recruitment_process_id to interviews table
ALTER TABLE interviews
  ADD COLUMN IF NOT EXISTS recruitment_process_id UUID REFERENCES recruitment_processes(id) ON DELETE SET NULL;

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_recruitment_processes_user_id ON recruitment_processes(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_recruitment_process_id ON interviews(recruitment_process_id);
